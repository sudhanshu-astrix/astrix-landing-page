import { Release } from "@/app/components/Releases/ReleasesClient";
import axios from "axios"
const API_BASE_URL = "https://astrix-main-staging.azurewebsites.net"


// Public API used across the app
export const backendService = {
  // Get only published releases (user-facing)
  async getPublishedReleases(): Promise<Release[]> {
    try{
      const {data} = await axios.get(
        `${API_BASE_URL}/release/published`, {
          headers: {
            "Content-Type": "application/json",
          }
        })
      return data?.data;
    }catch(err){
      throw new Error(`Failed to get published releases: ${err}`);
    }
  }
}

import { ReleasesClient } from "@/app/components/Releases/ReleasesClient"
import { Release } from "@/app/components/Releases/ReleasesClient";
import { backendService } from "@/lib/backendServices";

// Always render this route dynamically so it fetches latest releases on each request
export const dynamic = "force-dynamic"

async function getReleases(): Promise<Release[]> {
  try {
    const data = await backendService.getPublishedReleases();
    const list = data || []

    // Ensure releases are sorted latest -> oldest by release_date
    return [...list].sort((a, b) => {
      const aTime = a.release_date ? new Date(a.release_date).getTime() : 0
      const bTime = b.release_date ? new Date(b.release_date).getTime() : 0
      return bTime - aTime
    })
  } catch (error) {
    console.error("Error fetching releases:", error)
    return [];
  }
}

export default async function ReleasesPage() {
  const releases = await getReleases()

  return <ReleasesClient releases={releases} />
}


"use client";
import ToolkitSection from "../components/ToolkitSection";

export default function MiniPortfolioPage() {
  return (
    <main className="min-h-screen bg-[#0F0F0F] text-white">
      {/* <Navbar trackingContext="Mini Portfolio" /> */}
      <ToolkitSection
        title="First step to build your community, keep your fans updated on what's next with a gallery, collections, upcoming events and embedded playlists."
        subtitle="Share your page and ask fans to subscribe, so you get direct access to their emails for future updates."
        actionText="SMART PROFILE"
        mp4Src="https://astrix.blob.core.windows.net/cdn/landing-site/Mini_Portfolio.mp4"
        webmSrc="/Assets/Images/Toolkit/Temp/Mini_Portfolio.webm"
        layout="text-left"
        objectFit="contain"
        label="Discover"
      />
      {/* <FooterSection /> */}
    </main>
  );
}


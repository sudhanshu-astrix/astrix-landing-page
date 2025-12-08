"use client";
import ToolkitSection from "../components/ToolkitSection";

export default function DiscoveryChannelPage() {
  return (
    <main className="min-h-screen bg-[#0F0F0F] text-white">
      {/* <Navbar trackingContext="Discovery Channel" /> */}
      <ToolkitSection
        title="Let your audience explore nearby experiences on the map, RSVP with a tap, view an interactive calendar"
        subtitle="Empower superfans, boost ticket sales, with frictionless campaign tools."
        actionText="DISCOVERY CHANNEL"
        mp4Src="https://astrix.blob.core.windows.net/cdn/landing-site/Discovery_Channel.mp4"
        webmSrc="/Assets/Images/Toolkit/Temp/Discovery_Channel.webm"
        layout="reversed"
        objectFit="cover"
        label="Discover"
      />
      {/* <FooterSection /> */}
    </main>
  );
}


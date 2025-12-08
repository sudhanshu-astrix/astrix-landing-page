"use client";
import ToolkitSection from "../components/ToolkitSection";

export default function CreateEventPage() {
  return (
    <main className="min-h-screen bg-[#0F0F0F] text-white">
      {/* <Navbar trackingContext="Create Event" /> */}
      <ToolkitSection
        title="Host anything from standard events to multi-day festivals and tours."
        subtitle="Add multiple time slots, customise ticket formats, and launch instantly."
        actionText="Create Event"
        mp4Src="https://astrix.blob.core.windows.net/cdn/landing-site/Create_Event.mp4"
        webmSrc="/Assets/Images/Toolkit/Temp/Create_Event.webm"
        layout="default"
        objectFit="cover"
        label="Distribute"
      />
      {/* <FooterSection /> */}
    </main>
  );
}


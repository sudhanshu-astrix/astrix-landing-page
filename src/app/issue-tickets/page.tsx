"use client";
import ToolkitSection from "../components/ToolkitSection";

export default function IssueTicketsPage() {
  return (
    <main className="min-h-screen bg-[#0F0F0F] text-white">
      {/* <Navbar trackingContext="Issue Tickets" /> */}
      <ToolkitSection
        title="Issue paid tickets or RSVPs, limit quantities to prevent scalping, and add surveys to collect additional information."
        subtitle="tickets are issued and stored on blockchain, making it impossible to forge or duplicate."
        actionText="Issue Tickets"
        mp4Src="https://astrix.blob.core.windows.net/cdn/landing-site/Issue_Tickets.mp4"
        webmSrc="/Assets/Images/Toolkit/Temp/Issue_Tickets.webm"
        layout="default"
        objectFit="cover"
        label="Distribute"
      />
      {/* <FooterSection /> */}
    </main>
  );
}


"use client";
import ToolkitSection from "../components/ToolkitSection";

export default function EmailMarketingPage() {
  return (
    <main className="min-h-screen bg-[#0F0F0F] text-white">
      {/* <Navbar trackingContext="Email Marketing" /> */}
      <ToolkitSection
        title="Send targeted email and SMS campaigns directly to attendees, or import contacts from your dashboard."
        subtitle="Reach fans where they are with data-backed precision."
        actionText="EMAIL MARKETING"
        mp4Src="https://astrix.blob.core.windows.net/cdn/landing-site/Email_Marketing.mp4"
        webmSrc="/Assets/Images/Toolkit/Temp/Email_Marketing.webm"
        layout="text-left"
        objectFit="contain"
        label="Retarget"
      />
      {/* <FooterSection /> */}
    </main>
  );
}


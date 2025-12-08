"use client";
import ToolkitSection from "../components/ToolkitSection";

export default function PurchaseRSVPPage() {
  return (
    <main className="min-h-screen bg-[#0F0F0F] text-white">
      {/* <Navbar trackingContext="Purchase/RSVP" /> */}
      <ToolkitSection
        title="Give your fans a seamless way to book their tickets – apply discounts, confirm instantly."
        subtitle="Flexible phases, codes, and RSVPs designed for every event format."
        actionText="Purchase/RSVP"
        mp4Src="https://astrix.blob.core.windows.net/cdn/landing-site/Purchase.mp4"
        webmSrc="/Assets/Images/Toolkit/Temp/Purchase.webm"
        layout="reversed"
        objectFit="cover"
        label="Distribute"
      />
      {/* <FooterSection /> */}
    </main>
  );
}


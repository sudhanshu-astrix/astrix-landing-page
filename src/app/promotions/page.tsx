"use client";
import ToolkitSection from "../components/ToolkitSection";

export default function PromotionsPage() {
  return (
    <main className="min-h-screen bg-[#0F0F0F] text-white">
      {/* <Navbar trackingContext="Promotions" /> */}
      <ToolkitSection
        title="Set up exclusive promoter codes and custom discounts in seconds."
        subtitle="Boost sales, empower superfans, and simplify campaign tracking."
        actionText="PROMOTIONS AND DISCOUNT CODES"
        mp4Src="https://astrix.blob.core.windows.net/cdn/landing-site/Promotions.mp4"
        webmSrc="/Assets/Images/Toolkit/Temp/Promotions.webm"
        layout="reversed"
        objectFit="cover"
        label="Retarget"
      />
      {/* <FooterSection /> */}
    </main>
  );
}


"use client";
import ToolkitSection from "../components/ToolkitSection";

export default function MarketingInsightsPage() {
  return (
    <main className="min-h-screen bg-[#0F0F0F] text-white">
      {/* <Navbar trackingContext="Marketing Insights" /> */}
      <ToolkitSection
        title="See the full story with live analytics - track revenue, reach, contacts and performance."
        subtitle="Know what's working, fix what's not, and maximise every campaign."
        actionText="MARKETING INSIGHTS"
        mp4Src="https://astrix.blob.core.windows.net/cdn/landing-site/Marketing_Insights.mp4"
        webmSrc="/Assets/Images/Toolkit/Temp/Marketing-Insights.webm"
        layout="text-left"
        objectFit="cover"
        label="Retarget"
      />
      {/* <FooterSection /> */}
    </main>
  );
}


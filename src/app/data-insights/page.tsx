"use client";
import ToolkitSection from "../components/ToolkitSection";

export default function DataInsightsPage() {
  return (
    <main className="min-h-screen bg-[#0F0F0F] text-white">
      {/* <Navbar trackingContext="Data Insights" /> */}
      <ToolkitSection
        title="Own your data and make data-driven decisions."
        subtitle="Unlock actionable insights on every event - from ticket sales to demographics and traffic sources."
        actionText="DATA INSIGHTS"
        mp4Src="https://astrix.blob.core.windows.net/cdn/landing-site/Data_Insights.mp4"
        webmSrc="/Assets/Images/Toolkit/Temp/Data_Insights.webm"
        layout="text-left"
        objectFit="contain"
        label="Retarget"
      />
      {/* <FooterSection /> */}
    </main>
  );
}


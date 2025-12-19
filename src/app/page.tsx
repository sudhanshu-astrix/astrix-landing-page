"use client";
import dynamic from "next/dynamic";
import HeroSection from "./components/heroSection";
import { optimizeForIOS } from "@/utils";
import { useEffect } from "react";
import { useSectionTracker } from "@/hooks/useSectionTracker";
import { trackEvent } from "@/utils/MetaPixel";

// Lazy load below-the-fold components
const CollaboratorSectionMobile = dynamic(
  () => import("./components/collaboratorSectionMobile"),
  {
    loading: () => <div className="h-screen bg-[#0A0A0A]" />,
  }
);
const CollaboratorSectionWeb = dynamic(
  () => import("./components/collaboratoSectionWeb"),
  {
    loading: () => <div className="h-screen bg-[#0A0A0A]" />,
  }
);
const GrowthCycleSection = dynamic(
  () => import("./components/growthCycleSection"),
  {
    loading: () => <div className="h-screen bg-[#0A0A0A]" />,
  }
);
const ProductCycleSection = dynamic(
  () => import("./components/productCycleSection"),
  {
    loading: () => <div className="h-screen bg-[#0A0A0A]" />,
  }
);
const ContactSection = dynamic(() => import("./components/contactSection"), {
  loading: () => <div className="h-screen bg-[#0A0A0A]" />,
});
const TeaserSection = dynamic(() => import("./components/teaserSection"), {
  loading: () => <div className="h-screen bg-[#0A0A0A]" />,
});
const FooterSection = dynamic(() => import("./components/footerSection"), {
  loading: () => <div className="min-h-[200px] bg-[#0A0A0A]" />,
});
export default function Home() {
  // Initialize iOS optimizations on page load
  function getDeviceType() {
    if (typeof window === "undefined") return "unknown";
    const ua = navigator.userAgent.toLowerCase();
    if (/mobile|android|iphone|ipad|ipod/i.test(ua)) return "mobile";
    if (/tablet|ipad/i.test(ua)) return "tablet";
    return "desktop";
  }
  useEffect(() => {
    optimizeForIOS();
    trackEvent("Landing-page-view", {
      source: "Landing-page",
      device_type: getDeviceType(),
    });
  }, []);

  useSectionTracker([
    "hero",
    "collaborators-mobile",
    "collaborators-web",
    "growth-cycle-root",
    "product-cycle",
    "contact",
    "teaser",
    "footer",
  ]);

  return (
    <div className="w-full min-h-screen">
      <HeroSection />
      <div className="md:hidden block">
        <CollaboratorSectionMobile />
      </div>
      <div className="hidden md:block">
        <CollaboratorSectionWeb />
      </div>

      <GrowthCycleSection />
      <ProductCycleSection />
      <ContactSection />
      <TeaserSection />
      <FooterSection />
    </div>
  );
}

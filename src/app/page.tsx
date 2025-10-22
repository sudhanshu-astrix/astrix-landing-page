"use client";
import dynamic from 'next/dynamic';
import HeroSection from "./components/heroSection";

// Lazy load below-the-fold components with optimized loading placeholders
// Use ssr: false for mobile-only components to reduce initial bundle
const CollaboratorSectionMobile = dynamic(
  () => import("./components/collaboratorSectionMobile"), 
  {
    loading: () => <div className="h-screen bg-[#0A0A0A]" />,
    ssr: false, // Client-side only for mobile
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

const ContactSection = dynamic(
  () => import("./components/contactSection"), 
  {
    loading: () => <div className="h-screen bg-[#0A0A0A]" />,
  }
);

const TeaserSection = dynamic(
  () => import("./components/teaserSection"), 
  {
    loading: () => <div className="h-screen bg-[#0A0A0A]" />,
  }
);

const FooterSection = dynamic(
  () => import("./components/footerSection"), 
  {
    loading: () => <div className="min-h-[200px] bg-[#0A0A0A]" />,
  }
);

export default function Home() {
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

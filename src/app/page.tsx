"use client";
import HeroSection from "./components/heroSection";
import ContactSection from "./components/contactSection";
import TeaserSection from "./components/teaserSection";
import FooterSection from "./components/footerSection";
import { useMediaQuery } from "react-responsive";
import CollaboratorSectionMobile from "./components/collaboratorSectionMobile";
import CollaboratorSectionWeb from "./components/collaboratoSectionWeb";
import GrowthCycleSection from "./components/growthCycleSection";
import ProductCycleSection from "./components/productCycleSection";

export default function Home() {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  return (
    <div className="w-full min-h-screen">
      <HeroSection />
      {isMobile ? <CollaboratorSectionMobile /> : <CollaboratorSectionWeb />}
      <GrowthCycleSection />
      <ProductCycleSection />
      <ContactSection />
      <TeaserSection />
      <FooterSection />
    </div>
  );
}

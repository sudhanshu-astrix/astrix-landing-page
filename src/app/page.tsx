"use client";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroSection from "@/components/HeroSection";
import CollaboratorSection from "@/components/CollaboratorSection";
import GrowthCycleSection from "@/components/GrowthCycleSection";
import ContactSection from "@/components/ContactSection";
import TeaserSection from "@/components/TeaserSection";
import FooterSection from "@/components/FooterSection";
import ToolkitSection from "@/components/ToolkitSection";
import ProductCycleSection from "@/components/ProductCycleSection";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  useEffect(() => {
    // Smooth scroll animation for all sections
    const sections = gsap.utils.toArray("section");
    
    sections.forEach((section: any, index) => {
      // Skip hero section (index 0) and collaborator section (index 1) as they have their own animations
      if (index === 0 || index === 1) return;

      // Set initial state
      gsap.set(section, {
        y: 100,
        opacity: 0,
      });

      // Create scroll trigger animation
      gsap.to(section, {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      });
    });

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="min-h-screen">
      <HeroSection />
      <CollaboratorSection />
      <GrowthCycleSection />
      <ProductCycleSection />
      <ContactSection />
      <TeaserSection />
      <FooterSection />
    </div>
  );
}

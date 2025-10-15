"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import HeroSection from "@/components/HeroSection";
import CollaboratorSection from "@/components/CollaboratorSection";
import GrowthCycleSection from "@/components/GrowthCycleSection";
import ContactSection from "@/components/ContactSection";
import TeaserSection from "@/components/TeaserSection";
import FooterSection from "@/components/FooterSection";
import ToolkitSection from "@/components/ToolkitSection";
import ProductCycleSection from "@/components/ProductCycleSection";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
}

export default function Home() {
  const smootherRef = useRef<any>(null);

  useEffect(() => {
    // Detect Safari and mobile
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    const isMobile = window.innerWidth < 768;
    const isSafariMobile = isSafari && isMobile;

    // Optimize ScrollSmoother settings for Safari
    smootherRef.current = ScrollSmoother.create({
      smooth: isSafariMobile ? 0.5 : 1.5,  // Much lighter smoothing on Safari mobile
      effects: !isSafariMobile,             // Disable effects on Safari mobile for performance
      smoothTouch: isSafariMobile ? 0.1 : 1.2, // Minimal smoothing on Safari mobile
      normalizeScroll: isSafariMobile,      // Enable on Safari mobile to prevent issues
      ignoreMobileResize: true,
    });

    // Setup section animations after ScrollSmoother is created
    const setupSectionAnimations = () => {
    // Smooth scroll animation for all sections
    const sections = gsap.utils.toArray("section");
    
    sections.forEach((section: any, index) => {
      // Skip hero section (index 0) and collaborator section (index 1) as they have their own animations
      if (index === 0 || index === 1) return;

      // Simplified animations for Safari mobile
      if (isSafariMobile) {
        gsap.set(section, {
          opacity: 0,
        });

        gsap.to(section, {
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });
      } else {
        // Full animations for other browsers
        gsap.set(section, {
          y: 100,
          opacity: 0,
        });

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
      }
    });

    };

    setupSectionAnimations();

    // Safari-specific fix: Delayed ScrollTrigger refresh
    if (isSafari) {
      gsap.delayedCall(2, () => {
        ScrollTrigger.refresh();
      });
    }

    // Handle anchor link clicks for smooth scrolling to contact
    const handleAnchorClick = (e: Event) => {
      const target = e.target as HTMLAnchorElement;
      if (target.hash === '#contact') {
        e.preventDefault();
        const contactSection = document.getElementById('contact');
        if (contactSection && smootherRef.current) {
          // Use ScrollSmoother's scrollTo method for smooth scrolling
          smootherRef.current.scrollTo(contactSection, true, "top 0%");
        }
      }
    };

    // Add click listeners to all anchor links
    document.querySelectorAll('a[href="#contact"]').forEach(link => {
      link.addEventListener('click', handleAnchorClick);
    });

    // Cleanup
    return () => {
      if (smootherRef.current) {
        smootherRef.current.kill();
      }
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      
      // Remove anchor link listeners
      document.querySelectorAll('a[href="#contact"]').forEach(link => {
        link.removeEventListener('click', handleAnchorClick);
      });
    };
  }, []);

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content" className="min-h-screen bg-[#0A0A0A]">
        <HeroSection />
        <CollaboratorSection />
        <GrowthCycleSection />
        <ProductCycleSection />
        <ContactSection />
        <TeaserSection />
        <FooterSection />
      </div>
    </div>
  );
}

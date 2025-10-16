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

  // Preload all critical assets
  useEffect(() => {
    const preloadAssets = () => {
      // Critical assets to preload with high priority
      const criticalAssets = [
        // Hero Section
        '/Assets/Images/HeroSection.mp4',
        '/Assets/Images/HeroImage.png',
        '/Assets/Images/NoiseEffectBg.svg',
        '/Assets/Icons/LogoIcon.png',
        '/Assets/Icons/DownArrow.svg',
        
        // Toolkit Section (appears early)
        '/Assets/Images/Star.svg',
        '/Assets/Images/LeftCorner.svg',
        '/Assets/Images/CenterLeft.svg',
        '/Assets/Images/Center.svg',
        '/Assets/Images/CenterRight.svg',
        '/Assets/Images/RightCorner.svg',
        '/Assets/Icons/ToolkitArrow.svg',
        
        // ProductCycle Section - Critical GIFs
        '/Assets/Images/Toolkit/Create_Event.gif',
        '/Assets/Images/Toolkit/Issue_Ticket.gif',
        '/Assets/Images/Toolkit/Purchase.gif',
        '/Assets/Images/Toolkit/Data_Insights.gif',
        '/Assets/Images/Toolkit/Email_Marketing.gif',
      ];

      // Secondary assets to preload with normal priority
      const secondaryAssets = [
        // Growth Cycle Section
        '/Assets/Images/group23.svg',
        '/Assets/Icons/Distribute.svg',
        '/Assets/Icons/Insight.svg',
        '/Assets/Icons/Space.svg',
        
        // ProductCycle Section - Remaining assets
        '/Assets/Images/Toolkit/Distribute_PurchaseTicket1.svg',
        '/Assets/Images/Toolkit/Distribute_PurchaseTicket2.svg',
        '/Assets/Images/Toolkit/Retarget_Promotions.svg',
        '/Assets/Images/Toolkit/Temp/marketing_analytics.png',
        '/Assets/Images/Toolkit/Temp/profile.png',
        '/Assets/Images/Toolkit/Temp/home pic.png',
        
        // Collaborator Section - First few slides
        '/Assets/Images/Slider/Slide1.svg',
        '/Assets/Images/Slider/Slide2.svg',
        '/Assets/Images/Slider/Slide3.svg',
        '/Assets/Images/Slider/Slide4.svg',
        '/Assets/Images/Slider/Slide5.svg',
      ];

      // All collaborator slides
      const collaboratorSlides = Array.from({ length: 19 }, (_, i) => 
        `/Assets/Images/Slider/Slide${i + 1}.svg`
      );

      // Preload critical assets with high priority
      criticalAssets.forEach((src) => {
        if (src.endsWith('.mp4')) {
          // Preload video
          const video = document.createElement('video');
          video.preload = 'auto';
          video.src = src;
        } else {
          // Preload image
          const link = document.createElement('link');
          link.rel = 'preload';
          link.as = 'image';
          link.href = src;
          link.fetchPriority = 'high';
          document.head.appendChild(link);
        }
      });

      // Preload secondary assets with normal priority
      setTimeout(() => {
        secondaryAssets.forEach((src) => {
          const img = new Image();
          img.src = src;
        });
      }, 100);

      // Preload remaining collaborator slides with low priority
      setTimeout(() => {
        collaboratorSlides.forEach((src) => {
          const img = new Image();
          img.src = src;
        });
      }, 500);
    };

    preloadAssets();
  }, []);

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
          // Kill all ScrollTriggers temporarily to avoid conflicts with pinned sections
          const triggers = ScrollTrigger.getAll();
          triggers.forEach(trigger => trigger.disable());
          
          // Use ScrollSmoother's scrollTo method for smooth scrolling
          smootherRef.current.scrollTo(contactSection, true, "top top");
          
          // Re-enable ScrollTriggers after scroll completes
          setTimeout(() => {
            triggers.forEach(trigger => trigger.enable());
            ScrollTrigger.refresh();
          }, 1000);
        }
      }
    };

    // Add click listeners to all anchor links after a delay to ensure DOM is ready
    const setupAnchorLinks = () => {
      document.querySelectorAll('a[href="#contact"]').forEach(link => {
        link.addEventListener('click', handleAnchorClick);
      });
    };
    
    // Setup immediately and after a delay to catch dynamically rendered links
    setupAnchorLinks();
    setTimeout(setupAnchorLinks, 500);

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

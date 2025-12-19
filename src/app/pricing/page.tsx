"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import mixpanel from "@/lib/mixpanelClient";
import FooterSection from "../components/footerSection";
import FAQSection from "../components/FAQSection";

// Shared comparison table data - used by both web and mobile
const comparisonTableData = [
  {
    category: "Organiser Fees",
    rows: [
      { label: "Zero listing fees", free: true, smart: true, pro: true },
      { label: "Pre-Event Payout", free: false, smart: false, pro: true },
    ],
  },
  {
    category: "Ticketing Features",
    rows: [
      {
        label: "Private Ticket Listings",
        free: "1",
        smart: "1",
        pro: "Unlimited",
      },
      {
        label: "Ticket Types (RSVP, Paid, PWYW)",
        free: true,
        smart: true,
        pro: true,
      },
      {
        label: "Custom Registration Forms",
        free: "1",
        smart: "1",
        pro: "Unlimited",
      },
      {
        label: "Event Banner Promotion",
        free: false,
        smart: false,
        pro: true,
      },
    ],
  },
  {
    category: "Smart Profile",
    rows: [
      { label: "Zero-Listing Fees", free: true, smart: true, pro: true },
      { label: "Curated Gallery", free: true, smart: true, pro: true },
      { label: "Product / Collection links", free: true, smart: true, pro: true },
      { label: "Social Embeds", free: true, smart: true, pro: true },
      { label: "Custom Public URL", free: true, smart: true, pro: true },
      {
        label: "3rd Party Event Links",
        free: false,
        smart: true,
        pro: true,
      },
      // {
      //   label: "Subscribers Data Insights",
      //   free: false,
      //   smart: true,
      //   pro: true,
      // },
    ],
  },
  {
    category: "Marketing & Growth",
    rows: [
      {
        label: "Email",
        info: "Get 100 Credits in Free and 500 Credits in Pro to send the mentioned number of Emails or SMS.",
        free: "200",
        smart: "500",
        pro: "1000",
      },
      {
        label: "SMS",
        info: "Get 100 Credits in Free and 500 Credits in Pro to send the mentioned number of Emails or SMS.",
        free: "50",
        smart: "150",
        pro: "250",
      },
      { label: "Discount Codes", free: true, smart: true, pro: true },
      {
        label: "Promoter Links (Affiliate Mgmt.)",
        free: true,
        smart: true,
        pro: true,
      },
      {
        label: "Specific Campaign Insights",
        free: false,
        smart: false,
        pro: true,
      },
      {
        label: "Contacts Import",
        free: false,
        smart: false,
        pro: true,
      },
    ],
  },
  {
    category: "Attendees Data",
    rows: [
      { label: "Traffic by Source", free: true, smart: true, pro: true },
      {
        label: "Approve / Reject Attendees",
        free: true,
        smart: true,
        pro: true,
      },
      {
        label: "Demography Insights",
        free: true,
        smart: true,
        pro: true,
      },
      {
        label: "Sales Trend Analysis",
        free: false,
        smart: false,
        pro: true,
      },
      {
        label: "Conversion Rate Tracking",
        free: false,
        smart: false,
        pro: true,
      },
      {
        label: "Location Heat-Map",
        free: false,
        smart: false,
        pro: true,
      },
      {
        label: "Top Engaged Audience",
        free: false,
        smart: false,
        pro: true,
      },
      {
        label: "Contacts Tab",
        free: false,
        smart: false,
        pro: true,
      },
    ],
  },
  {
    category: "Ticketing Redemptions",
    rows: [
      { label: "QR scanner Web App", free: true, smart: true, pro: true },
      // {
      //   label: "Redemption insights",
      //   free: false,
      //   smart: false,
      //   pro: true,
      // },
    ],
  },
];

// Plan header data
const planHeaders = [
  {
    id: "free",
    name: "Free",
    price: "₹0",
    description: "Limited access to basic features.",
    ctaLabel: "GET STARTED",
    href: "https://app.astrix.live/login",
    external: true,
  },
  {
    id: "smart",
    name: "Smart Profile",
    price: "₹2499",
    description: "Only access to Smart Profile.",
    ctaLabel: "BOOK A DEMO",
    href: "https://app.astrix.live/login",
    external: true,
  },
  {
    id: "pro",
    name: "Pro",
    price: "Custom",
    description: "Full access to the entire toolkit.",
    ctaLabel: "BOOK A DEMO",
    href: "/",
    external: false,
  },
];

// Pricing data structure - easily customizable
const pricingData = {
  hero: {
    title: "Start Your Journey: 1-Month Free Trial",
    subtitle: "Spend nothing for first month",
    features: [
      "Access to all pro features",
      "Zero Listing Fees",
      "Unlimited Private Listings",
      "Market to Subscribers for Free",
      "Astrix Sub-domain",
    ],
    cta: {
      label: "BOOK A DEMO",
      href: "#contact",
    },
  },
  plans: [
    {
      id: "free",
      name: "Free",
      price: "₹0",
      period: "/month",
      cta: {
        label: "GET STARTED",
        href: "https://app.astrix.live/login",
        target: "_blank",
      },
      features: {
        "Organiser Fees": ["Zero Listing Fees"],
        "Ticketing Features": [
          "1 Private Ticket Listing",
          "Ticket Types (RSVP, Paid, PWYW)",
          "1 Custom Registration Form",
        ],
        "Ticketing Redemption": ["QR Scanner Web App"],
        "Marketing & Growth": [
          "300 Email Marketing",
          "150 SMS Marketing",
          "Discount Codes",
          "Promoter Links (Affiliate Mgmt)",
          "Overall Campaign Insights",
        ],
        "Attendees Data": [
          "Contacts Overview",
          "Approve / Reject Attendees",
          "Conversion Rate Tracking",
          "Sales Trend Analysis",
          "Demography Insights",
          "Traffic by Source",
        ],
        "Landing Page": [
          "Event Calendar",
          "Curated Gallery",
          "Product / Collection links",
          "Social Embeds",
          "Astrix Sub Domain",
        ],
      },
    },
    {
      id: "pro",
      name: "Pro",
      price: "₹2499",
      period: "/month",
      cta: {
        label: "BOOK A DEMO",
        href: "#contact",
      },
      features: {
        "Organiser Fees": ["Zero Listing Fees", "Pre-Event Payout"],
        "Ticketing Features": [
          "Unlimited Private Ticket Listing",
          "Ticket Types (RSVP, Paid, PWYW)",
          "Unlimited Custom Registration Form",
          "Event Banner Promotion",
        ],
        "Ticketing Redemption": ["QR Scanner Web App", "Redemption Insights"],
        "Marketing & Growth": [
          "1000 Email Marketing",
          "500 SMS Marketing",
          "Discount Codes",
          "Promoter Links (Affiliate Mgmt)",
          "Specific Campaign Insights",
          "Contacts Import",
          "Top Engaged Audience",
        ],
        "Attendees Data": [
          "Contacts Overview",
          "Approve / Reject Attendees",
          "Conversion Rate Tracking",
          "Sales Trend Analysis",
          "Demography Insights",
          "Traffic by Source",
          "Location Heat-map",
        ],
        "Landing Page": [
          "Event Calendar",
          "Curated Gallery",
          "Product / Collection links",
          "Social Embeds",
          "Astrix Sub Domain",
          "Subscribers Data Insights",
          "Third Party Events Links",
        ],
      },
    },
  ],
};


interface GlassButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

function GlassButton({ children, onClick, className = "" }: GlassButtonProps) {
  return (
    <div className="relative">
      {/* Glow effect */}
      <div className="absolute bg-[rgba(255,243,176,0.04)] blur-[35.3px] filter h-[177px] left-1/2 rounded-[20px] top-0 translate-x-[-50%] w-[393px]" />
      
      {/* Button */}
      <button
        onClick={onClick}
        className={`relative bg-[rgba(31,31,31,0.6)] box-border flex gap-[10px] h-[110px] md:h-[139px] items-center justify-center px-6 md:px-[60px] py-[14px] md:py-[21px] rounded-[16px] md:rounded-[20px] max-w-full ${className}`}
      >
        {/* Border overlay */}
        <div aria-hidden="true" className="absolute border-[2px] border-[rgba(49,55,63,0.4)] border-solid inset-0 pointer-events-none rounded-[16px] md:rounded-[20px] shadow-[8px_8px_4px_0px_rgba(0,0,0,0.25)]" />
        
        {/* Content */}
        <div className="font-['Switzer:Medium',sans-serif] leading-[1.2] not-italic relative shrink-0 text-[44px] md:text-[80px] text-nowrap text-white tracking-[-1.6px] whitespace-pre">
          {children}
        </div>
        
        {/* Inner shadow */}
        <div className="absolute inset-0 pointer-events-none rounded-[20px] shadow-[6px_6px_4px_0px_inset_rgba(0,0,0,0.25)]" />
      </button>
    </div>
  );
}

export default function PricingPage() {
  const router = useRouter();
  const [credits, setCredits] = useState(1000);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<"free" | "smart" | "pro">("free");
  const [activeInfoLabel, setActiveInfoLabel] = useState<string | null>(null);
  const sliderAreaRef = useRef<HTMLDivElement | null>(null);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesDropdownOpenMobile, setIsServicesDropdownOpenMobile] = useState(false);
  
  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // Close dropdown when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (isServicesDropdownOpen) {
        const target = event.target as Element;
        if (!target.closest('[data-services-dropdown]')) {
          setIsServicesDropdownOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isServicesDropdownOpen]);
  
  // Calculate price: 1 credit = ₹0.5
  const calculatePrice = (creditValue: number) => {
    return Math.round(creditValue * 0.5);
  };

  const price = calculatePrice(credits);
  
  // Touch handler for credit slider (improves drag on iOS)
  const handleSliderTouch = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!sliderAreaRef.current) return;
    const touch = e.touches[0];
    const rect = sliderAreaRef.current.getBoundingClientRect();
    if (rect.width === 0) return;
    const minCredits = 1000;
    const maxCredits = 10000;
    const creditRange = maxCredits - minCredits;
    let ratio = (touch.clientX - rect.left) / rect.width;
    ratio = Math.min(1, Math.max(0, ratio));
    const rawCredits = minCredits + ratio * creditRange;
    const snapped = Math.round(rawCredits / 100) * 100;
    setCredits(snapped);
  };
  
  const scrollToProductSection = (targetId: string) => {
    setIsServicesDropdownOpen(false);
    // First navigate to home page
    router.push("/");
    
    // Wait for navigation to complete, then apply the same logic as heroSection
    let attempts = 0;
    const maxAttempts = 50;
    
    const checkAndNavigate = () => {
      attempts++;
      const productCycleRoot = document.getElementById("product-cycle-root");
      
      if (!productCycleRoot) {
        if (attempts < maxAttempts) {
          setTimeout(checkAndNavigate, 100);
        }
        return;
      }
      
      // Mobile: simple scroll to element
      const isDesktop = window.innerWidth >= 768;
      if (!isDesktop) {
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
        return;
      }
      
      // Desktop: Navigate to ProductCycleSection with specific slide
      // Map section IDs to their timeline progress (0 to 1)
      const idToProgress: Record<string, number> = {
        "pc-create-event": 0.05,        // ~5% - Just after toolkit slides out
        "pc-issue-tickets": 0.15,        // ~15%
        "pc-purchase-rsvp": 0.25,        // ~25%
        "pc-data-insights": 0.35,        // ~35%
        "pc-email-marketing": 0.50,      // ~50%
        "pc-promotions": 0.60,           // ~60%
        "pc-marketing-insights": 0.70,   // ~70%
        "pc-mini-portfolio": 0.85,       // ~85%
        "pc-discovery-channel": 0.95,    // ~95%
      };
      
      const targetProgress = idToProgress[targetId];
      if (targetProgress === undefined) {
        console.warn(`Unknown target ID: ${targetId}`);
        return;
      }
      
      console.log("[PricingPage] Navigating to:", targetId, "progress:", targetProgress);
      
      // Get the element's position relative to the document
      const rect = productCycleRoot.getBoundingClientRect();
      const sectionTop = rect.top + window.scrollY;
      
      // Try to get ScrollTrigger from window or fallback to estimation
      let retryCount = 0;
      const maxRetries = 30; // Try for 3 seconds max
      
      const getScrollTriggerAndNavigate = () => {
        retryCount++;
        
        // First, try to get cached ScrollTrigger reference (instant)
        let productCycleTrigger: unknown = null;
        const cachedTrigger = (window as unknown as { __productCycleScrollTrigger?: unknown }).__productCycleScrollTrigger;
        
        if (cachedTrigger) {
          console.log("[PricingPage] Using cached ScrollTrigger reference (instant navigation)");
          productCycleTrigger = cachedTrigger;
        } else {
          // Fallback: Search for ScrollTrigger if not cached yet
          console.log(`[PricingPage] Cached reference not found, searching... (attempt ${retryCount}/${maxRetries})`);
          
          let ScrollTrigger: { getAll?: () => unknown[] } | null = null;
          
          // Method 1: From window.ScrollTrigger
          if (typeof window !== 'undefined' && (window as unknown as { ScrollTrigger?: unknown }).ScrollTrigger) {
            ScrollTrigger = (window as unknown as { ScrollTrigger: { getAll?: () => unknown[] } }).ScrollTrigger;
          }
          
          // Method 2: Try to import dynamically
          if (!ScrollTrigger && typeof window !== 'undefined' && (window as unknown as { gsap?: { plugins?: { ScrollTrigger?: unknown } } }).gsap?.plugins?.ScrollTrigger) {
            ScrollTrigger = (window as unknown as { gsap: { plugins: { ScrollTrigger: { getAll?: () => unknown[] } } } }).gsap.plugins.ScrollTrigger;
          }
          
          if (ScrollTrigger) {
            const allTriggers = ScrollTrigger.getAll?.();
            productCycleTrigger = allTriggers?.find((st: unknown) => 
              (st as { trigger?: unknown; vars?: { id?: string } }).trigger === productCycleRoot || (st as { trigger?: unknown; vars?: { id?: string } }).vars?.id === "product-cycle-root"
            );
          }
        }
        
        // If we found the ScrollTrigger, use it
        if (productCycleTrigger) {
          console.log("[PricingPage] ScrollTrigger found!", productCycleTrigger);
          
          // Calculate scroll position based on ScrollTrigger bounds and target progress
          const trigger = productCycleTrigger as { start?: number | (() => number); end?: number | (() => number); isActive?: boolean };
          const start = typeof trigger.start === 'number' 
            ? trigger.start 
            : (typeof trigger.start === 'function' 
                ? trigger.start() 
                : sectionTop);
          const end = typeof trigger.end === 'number'
            ? trigger.end
            : (typeof trigger.end === 'function'
                ? trigger.end()
                : start + 12000);
          
          const currentScrollY = window.scrollY;
          const isInSection = currentScrollY >= start && currentScrollY <= end;
          
          console.log("[PricingPage] Navigation context:", {
            currentScroll: currentScrollY.toFixed(0),
            sectionStart: start.toFixed(0),
            sectionEnd: end.toFixed(0),
            isInSection: isInSection,
            targetId: targetId
          });
          
          // If already in the section, just dispatch the event without scrolling
          if (isInSection) {
            console.log("[PricingPage] Already in ProductCycleSection, navigating directly to:", targetId);
            const event = new CustomEvent("gotoProductCycle", {
              detail: { id: targetId }
            });
            window.dispatchEvent(event);
            return;
          }
          
          // Not in section yet - scroll to START of section first to ensure it's pinned
          // Then navigate to the specific slide
          const sectionStartScroll = start + 50; // Scroll just past the start to ensure pinning
          
          console.log("[PricingPage] Scrolling to section start first to pin it:", {
            sectionStart: sectionStartScroll.toFixed(0),
            targetId: targetId,
            targetProgress: (targetProgress * 100).toFixed(1) + '%'
          });
          
          // Scroll to section start to ensure it's pinned
          window.scrollTo({
            top: sectionStartScroll,
            behavior: "auto",
          });

          // Wait for section to pin, then dispatch navigation event to specific slide
          setTimeout(() => {
            console.log("[PricingPage] Section pinned, dispatching navigation event for:", targetId);
            const event = new CustomEvent("gotoProductCycle", {
              detail: { id: targetId }
            });
            window.dispatchEvent(event);
          }, 200);
          
          return;
        }
        
        // If ScrollTrigger not ready and we haven't exceeded retries, try again
        // Only retry if we didn't use the cached reference
        if (retryCount < maxRetries && !cachedTrigger) {
          console.log(`[PricingPage] ScrollTrigger not ready (attempt ${retryCount}/${maxRetries}), waiting...`);
          setTimeout(getScrollTriggerAndNavigate, 100);
          return;
        }
        
        // Fallback: estimate scroll position without ScrollTrigger
        console.warn("[PricingPage] ScrollTrigger not found after retries, using estimation");
        
        // Estimate: ProductCycleSection starts at sectionTop
        const estimatedStart = sectionTop;
        const sectionStartScroll = estimatedStart + 50; // Scroll just past the start to ensure pinning
        
        console.log("[PricingPage] Using estimated scroll position - scrolling to section start:", {
          estimatedStart: estimatedStart.toFixed(0),
          sectionStartScroll: sectionStartScroll.toFixed(0),
          targetId: targetId,
          targetProgress: (targetProgress * 100).toFixed(1) + '%'
        });
        
        // Scroll to section start to ensure it's pinned
        window.scrollTo({
          top: sectionStartScroll,
          behavior: "auto",
        });

        // Wait for section to pin, then dispatch navigation event
        setTimeout(() => {
          console.log("[PricingPage] Section pinned (estimation), dispatching navigation event for:", targetId);
          const event = new CustomEvent("gotoProductCycle", {
            detail: { id: targetId }
          });
          window.dispatchEvent(event);
        }, 200);
      };
      
      // Start the process
      getScrollTriggerAndNavigate();
    };
    
    // Start checking after navigation
    setTimeout(checkAndNavigate, 300);
  };

  // Handle contact navigation - navigate to home then scroll to contact section
  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log("[PricingPage] Contact navigation requested");
    
    // Navigate to home page first with hash
    router.push("/");
    
    // Wait for navigation to complete, then dispatch custom event for home page to handle
    setTimeout(() => {
      console.log("[PricingPage] Dispatching scrollToSection event for contact");
      const event = new CustomEvent("scrollToSection", {
        detail: { targetId: "contact" }
      });
      window.dispatchEvent(event);
    }, 500);
  };

  const handleMobileNavClick = (targetId: string) => {
    setIsServicesDropdownOpenMobile(false);
    setIsMenuOpen(false);
    
    console.log(`[PricingPage Mobile] Navigation requested to: ${targetId}`);
    
    // Navigate to home page first
    router.push("/");
    
    // Poll for the element to exist after navigation
    let attempts = 0;
    const maxAttempts = 50;
    const checkAndScroll = () => {
      attempts++;
      const el = document.getElementById(targetId);
      if (el) {
        console.log(`[PricingPage Mobile] Found element ${targetId} at attempt ${attempts}`);
        
        // Immediately scroll without waiting - use instant behavior
        setTimeout(() => {
          const element = document.getElementById(targetId);
          if (element) {
            console.log(`[PricingPage Mobile] Instant scrolling to ${targetId}`);
            
            // Use instant scrollIntoView to bypass all ScrollTrigger animations
            element.scrollIntoView({ 
              behavior: "instant" as ScrollBehavior, 
              block: "start" 
            });
            
            console.log(`[PricingPage Mobile] Scrolled to ${targetId}`);
          }
        }, 200); // Reduced wait time
      } else if (attempts < maxAttempts) {
        setTimeout(checkAndScroll, 100);
      } else {
        console.warn(`[PricingPage Mobile] Element ${targetId} not found after ${maxAttempts} attempts`);
      }
    };
    
    // Start checking after navigation
    setTimeout(checkAndScroll, 300);
  };
  
  // Generate bar heights for bell curve effect
  const generateBarHeights = (selectedIndex: number, totalBars: number) => {
    const bars = [];
    for (let i = 0; i < totalBars; i++) {
      const distance = Math.abs(i - selectedIndex);
      // Bell curve: taller bars near selected index, shorter bars further away
      // Reduced heights: max ~20px, min ~4px
      const height = Math.max(10, 20 - distance * 1.5);
      bars.push(height);
    }
    return bars;
  };
  
  return (
    <main className="min-h-screen bg-[#0F0F0F] text-white">
      {/* Top bar (mirrors HeroSection navbar) */}
      <header data-page-header="true" className={`relative ${isServicesDropdownOpen ? 'z-[60]' : 'z-10'} flex items-center justify-between px-4 sm:px-6 md:px-8 py-6 w-full`}>
        <div
          className={`flex items-center gap-2 w-[100%] max-w-[114px] h-[30px] relative transition-all duration-300 ${
            isServicesDropdownOpen ? 'blur-sm' : ''
          }`}
          onClick={() => {
            router.push("/");
          }}
        >
          <Image
            src="/Assets/Icons/LogoIcon.png"
            alt="Astrix Logo"
            fill
            priority
            className="object-contain"
          />
        </div>
        <div className="hidden md:flex md:flex-1 items-center justify-end gap-3 lg:gap-5 px-4 lg:px-10">
          <Link
            href="/about"
            className={`w-fit px-4 py-2 flex items-center justify-center rounded-3xl border border-[#4e4e4e87] bg-[#1f1f1f9e] shadow-[inset_0_2.39px_2.29px_rgba(0,0,0,0.25),0_2.29px_2.29px_rgba(0,0,0,0.25)] cursor-pointer hover:contrast-125 transition-all hover:-translate-y-0.5 text-xs leading-none ${
              isServicesDropdownOpen ? 'blur-sm' : ''
            }`}
          >
            <p className="leading-none mt-0.5 text-xs font-nohemi font-[400] text-shadow-md">
              ABOUT
            </p>
          </Link>
          
          {/* Services Dropdown */}
          <div className="relative" data-services-dropdown>
            <button 
              onClick={() => setIsServicesDropdownOpen(!isServicesDropdownOpen)}
              className="w-fit px-4 py-2 flex items-center justify-center rounded-3xl border border-[#4e4e4e87] bg-[#1f1f1f9e] shadow-[inset_0_2.39px_2.29px_rgba(0,0,0,0.25),0_2.29px_2.29px_rgba(0,0,0,0.25)] cursor-pointer hover:contrast-125 transition-all hover:-translate-y-0.5 text-[10px] leading-none"
            >
              <p className="leading-none mt-0.5 text-xs font-nohemi font-[400]">
                SERVICES
              </p>
              <svg 
                className={`w-3 h-3 ml-1 transition-transform duration-200 ${isServicesDropdownOpen ? 'rotate-180' : ''}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {/* Services Dropdown Menu */}
            {isServicesDropdownOpen && (
              <div className="absolute top-full -left-60 mt-2 w-[650px] bg-[#141414] rounded-lg border border-[#4e4e4e87] shadow-[inset_0_2.39px_2.29px_rgba(0,0,0,0.25),0_2.29px_2.29px_rgba(0,0,0,0.25)] z-[70]">
                <div className="p-6 grid grid-cols-3 gap-8">
                  {/* Distribute Column */}
                  <div>
                    <h3 className="text-[#E8EAED] text-sm font-instrument-serif font-[400] mb-2">Distribute</h3>
                    <ul className="space-y-1 ml-2">
                      <li><button onClick={() => scrollToProductSection('pc-create-event')} className="text-left w-full text-[#E8EAED] text-sm font-nohemi font-[400] hover:text-[#CCD0D7] transition-colors cursor-pointer">Create Event</button></li>
                      <li><button onClick={() => scrollToProductSection('pc-issue-tickets')} className="text-left w-full text-[#E8EAED] text-sm font-nohemi font-[400] hover:text-[#CCD0D7] transition-colors cursor-pointer">Issue Ticket</button></li>
                      <li><button onClick={() => scrollToProductSection('pc-purchase-rsvp')} className="text-left w-full text-[#E8EAED] text-sm font-nohemi font-[400] hover:text-[#CCD0D7] transition-colors cursor-pointer">Purchase/RSVP</button></li>
                    </ul>
                  </div>
                  
                  {/* Retarget Column */}
                  <div>
                    <h3 className="text-white text-sm font-instrument-serif font-[400] mb-2">Retarget</h3>
                    <ul className="space-y-1 ml-2">
                      <li><button onClick={() => scrollToProductSection('pc-data-insights')} className="text-left w-full text-white text-sm font-nohemi font-[400] hover:text-[#CCD0D7] transition-colors cursor-pointer">Data Insights</button></li>
                      <li><button onClick={() => scrollToProductSection('pc-email-marketing')} className="text-left w-full text-white text-sm font-nohemi font-[400] hover:text-[#CCD0D7] transition-colors cursor-pointer">Email Marketing</button></li>
                      <li><button onClick={() => scrollToProductSection('pc-promotions')} className="text-left w-full text-white text-sm font-nohemi font-[400] hover:text-[#CCD0D7] transition-colors cursor-pointer">Promotions / Discounts</button></li>
                      <li><button onClick={() => scrollToProductSection('pc-marketing-insights')} className="text-left w-full text-white text-sm font-nohemi font-[400] hover:text-[#CCD0D7] transition-colors cursor-pointer">Marketing Insights</button></li>
                    </ul>
                  </div>
                  
                  {/* Discover Column */}
                  <div>
                    <h3 className="text-white text-sm font-instrument-serif font-[400] mb-2">Discover</h3>
                    <ul className="space-y-1 ml-2">
                      <li><button onClick={() => scrollToProductSection('pc-mini-portfolio')} className="text-left w-full text-white text-sm font-nohemi font-[400] hover:text-[#CCD0D7] transition-colors cursor-pointer">Smart Profile</button></li>
                      <li><button onClick={() => scrollToProductSection('pc-discovery-channel')} className="text-left w-full text-white text-sm font-nohemi font-[400] hover:text-[#CCD0D7] transition-colors cursor-pointer">Discovery Channel</button></li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <span className={`w-fit px-4 py-2 flex items-center justify-center rounded-3xl border border-[#4e4e4e87] bg-[#FFFFFF] shadow-[inset_0_2.39px_2.29px_rgba(0,0,0,0.25),0_2.29px_2.29px_rgba(0,0,0,0.25)] cursor-pointer hover:contrast-125 transition-all hover:-translate-y-0.5 text-[#0F0F0F] leading-none ${
            isServicesDropdownOpen ? 'blur-sm' : ''
          }`}>
            <p className="leading-none mt-0.5 text-xs font-nohemi font-[400] text-shadow-md">
              PRICING
            </p>
          </span>
          
          <Link
            href="/#contact"
            onClick={handleContactClick}
            className={`w-fit transition-all duration-300 hover:bg-[#fff] hover:text-[#0F0F0F] cursor-pointer px-4 py-2 flex items-center justify-center rounded-3xl border border-[#4e4e4e87] bg-[#1f1f1f9e] text-xs md:text-[10px] leading-none hover:contrast-125 hover:-translate-y-0.5 shadow-[inset_0_2.39px_2.29px_rgba(0,0,0,0.25),0_2.29px_2.29px_rgba(0,0,0,0.25)] ${
              isServicesDropdownOpen ? 'blur-sm' : ''
            }`}
          >
            <p className="leading-none mt-0.5 text-xs font-nohemi font-[400] text-shadow-md">
              CONTACT US
            </p>
          </Link>
        </div>
        <Link
          href="https://app.astrix.live"
          target="_blank"
          rel="noopener noreferrer"
          className={`hidden md:inline-flex w-fit px-4 py-2 items-center justify-center rounded-3xl border border-[#4e4e4e87] bg-[#3c3c3cbf] text-xs md:text-[10px] leading-none hover:contrast-125 transition-all hover:-translate-y-0.5 ${
            isServicesDropdownOpen ? 'blur-sm' : ''
          }`}
        >
          <p className="leading-none mt-0.5 text-xs font-nohemi font-[400]">
            GET STARTED
          </p>
        </Link>

        <button
          className="md:hidden text-white z-50"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </header>

      {/* Desktop overlay shown only when Services dropdown is open */}
      {isServicesDropdownOpen && (
        <div 
          className="hidden md:block fixed inset-0 z-40 bg-[#1F1F1F]/60 transition-all duration-300"
          onClick={() => setIsServicesDropdownOpen(false)}
        ></div>
      )}

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 md:px-10 lg:px-16">
        <div className="w-fit mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-instrument-serif font-[400] text-[#F0E9B2] text-left mb-4">
            {pricingData.hero.title}
          </h1>
          <p className="text-[#E4E4E4] text-left text-lg md:text-md font-switzer font-[400] mb-12">
            {pricingData.hero.subtitle}
          </p>

          {/* Hero Features */}
          <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto mb-12">
            {pricingData.hero.features.map((feature, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <svg
                  className="w-4 h-4 text-[#E4E4E4] flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-[#E4E4E4] font-switzer font-[400] text-lg">
                  {feature}
                </span>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="flex justify-left">
          <Link
              href="/"
              onClick={(e) => {
                handleContactClick(e);
                mixpanel.track("Pricing Hero - Book a Demo Clicked", {
                  location: "Hero Section",
                });
              }}
              className="w-fit px-3 md:px-8 py-2 md:py-1 h-[30px] md:h-[35px] flex items-center justify-center rounded-3xl border border-[#4e4e4e87] bg-[#FFFFFF] shadow-[inset_0_2.39px_2.29px_rgba(0,0,0,0.25),0_2.29px_2.29px_rgba(0,0,0,0.25)] cursor-pointer hover:contrast-125 transition-all hover:-translate-y-0.5 text-[#0F0F0F] text-[10px] md:text-[10px] leading-none"
            >
              <p className="leading-none flex flex-row gap-2 items-center mt-0.5 text-xs md:text-xs font-nohemi font-[400] text-shadow-md">
                {pricingData.hero.cta.label}
                <svg
                  className="w-5 h-5 -mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M17 7l5 5-5 5" />
                </svg>
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing Plans Section */}
      <section className="py-16 px-6 md:px-10 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-2xl font-instrument-serif font-[400] text-center mb-3 text-gray-300 opacity-90">
            Pricing Plans
          </h2>
          <p className="text-md md:text-sm text-center text-[#BEC5D0] max-w-2xl mx-auto mb-2">
            Our team would be happy to answer all your queries. Please feel free to contact us.
          </p>

          {/* Desktop comparison table */}
          <div className="hidden md:block">
            <div className="bg-[#050505] border border-[#E8EAED]/40 overflow-hidden">
              {/* Plan headers */}
              <div className="grid grid-cols-4 border-b border-[#252525] bg-[#0E0E0E]">
                <div className="py-6 px-6"></div>
                {planHeaders.map((plan) => (
              <div
                key={plan.id}
                    className="py-6 px-6 border-l border-[#E8EAED]/40 flex flex-col gap-3"
              >
                    <div className="flex flex-col gap-1">
                      <p className="text-2xl font-switzer font-[500] text-[#F0E9B2] mb-2">
                    {plan.name}
                      </p>
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl lg:text-4xl font-switzer font-[400] text-white">
                      {plan.price}
                    </span>
                        {plan.id !== "pro" && (
                          <span className="text-xs text-[#9CA3AF] font-switzer font-[400]">
                            / month
                    </span>
                        )}
                  </div>
                      <p className="text-xs text-[#9CA3AF] font-switzer font-[400]">
                        {plan.description}
                      </p>
                  </div>

                  <div>
                  <Link
                    href={plan.href}
                    target={plan.external ? "_blank" : undefined}
                    rel={plan.external ? "noopener noreferrer" : undefined}
                    onClick={(e) => {
                          if (plan.id === "free" || plan.id === "smart") {
                        if (typeof window !== "undefined" && window.localStorage) {
                          window.localStorage.setItem("landingPageListEvent", "true");
                        }
                      }

                          // If CTA is "BOOK A DEMO", always redirect to contact section
                          if (plan.ctaLabel === "BOOK A DEMO") {
                        handleContactClick(e);
                      } else if (!plan.external) {
                        handleContactClick(e);
                      }
                      
                          mixpanel.track(`Pricing - ${plan.ctaLabel} Clicked`, {
                        plan: plan.id,
                            context: "table-header",
                      });
                    }}
                        className="inline-flex items-center justify-center rounded-3xl border border-[#4e4e4e87] bg-white px-8 py-1 text-[11px] font-nohemi font-[400] text-[#0F0F0F] shadow-[inset_0_2.39px_2.29px_rgba(0,0,0,0.25),0_2.29px_2.29px_rgba(0,0,0,0.25)] hover:contrast-125 hover:-translate-y-0.5 transition-all"
                  >
                        <span className="mt-1">{plan.ctaLabel}</span>
                        {plan.id !== "free" && (
                      <svg
                            className="ml-1.5 h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14M17 7l5 5-5 5" />
                    </svg>
                    )}
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              {/* Comparison rows */}
              {comparisonTableData.map((section) => (
                <div key={section.category}>
                  <div className="grid grid-cols-4 bg-[#0E0E0E] border-y border-[#E8EAED]/40">
                    <div className="px-6 py-3"></div>
                    <div className="px-6 py-3"></div>
                    <div className="px-6 py-3">
                      <div className="text-md font-switzer font-[500] text-center text-white">
                        {section.category}
                      </div>
                    </div>
                    <div className="px-6 py-3"></div>
                  </div>
                  {section.rows.map((row, rowIndex) => (
                    <div
                      key={row.label}
                      className={`grid grid-cols-4 text-sm ${
                        rowIndex % 2 === 0 ? "bg-[#1F1F1F]/60" : "bg-[#0E0E0E]"
                      }`}
                    >
                      <div className="px-6 py-3 text-[#E4E4E4] font-switzer font-[400] border-r border-[#E8EAED]/40">
                        <div className="flex items-center justify-between gap-2">
                          <span>{row.label}</span>
                          {("info" in row && row.info) && (
                            <div className="relative group cursor-default">
                              <span className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-[#E8EAED]/60 text-[9px] text-[#E8EAED]/80">
                                i
                              </span>
                              <div className="pointer-events-none absolute left-5 top-full z-20 mt-1 w-56 rounded-md bg-[#202020] px-4 py-2 text-xs text-[#E8EAED] opacity-0 group-hover:opacity-100 transition-opacity">
                                {row.info as string}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      {(["free", "smart", "pro"] as const).map((planId: string) => {
                        const value = (row as Record<string, boolean | string | undefined>)[planId];
                        return (
                          <div
                            key={planId}
                            className={`flex items-center justify-center ${planId !== "pro" && "border-r border-[#E8EAED]/40"}`}
                          >
                            {typeof value === "boolean" ? (
                              value ? (
                                <svg
                                  className="h-4 w-4 text-white"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                              ) : (
                                <span className="text-xs text-[#4B5563]">—</span>
                              )
                            ) : value ? (
                              <span className="text-xs text-[#E4E4E4] font-switzer font-[400]">
                                {value}
                              </span>
                            ) : (
                              <span className="text-xs text-[#4B5563]">—</span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Mobile pricing section with tabs and card */}
          <div className="md:hidden space-y-6">
            {/* Tabs */}
            <div className="">
            <div className="flex">
              {planHeaders.map((plan) => (
                <button
                  key={plan.id}
                  onClick={() => {
                    setSelectedPlan(plan.id as "free" | "smart" | "pro");
                    mixpanel.track("Pricing - Mobile Tab Clicked", {
                      plan: plan.id,
                    });
                  }}
                  className={`flex-1 py-3 border border-[#E8EAED]/40 text-center text-[#F0E9B2] text-sm font-switzer font-[500] transition-colors cursor-pointer ${
                    selectedPlan === plan.id
                      ? "bg-[#1A1A1A]"
                      : ""
                  }`}
                >
                  {plan.name}
                </button>
              ))}
            </div>

            {/* Selected Plan Card */}
            <div className="border border-[#E8EAED]/40">
            {(() => {
              const selectedPlanData = planHeaders.find((p) => p.id === selectedPlan);
              if (!selectedPlanData) return null;
              return (
                <div
                className="bg-[#1A1A1A] rounded-md p-6 my-7 max-w-[350px] mx-auto border border-[#E8EAED]/40">
                  <div className="flex flex-col gap-2">
                    <div>
                      <h3 className="text-sm font-switzer font-[500] text-[#F0E9B2] mb-2">
                        {selectedPlanData.name}
                      </h3>
                      <div className="flex items-baseline gap-2 mb-2">
                        <span className="text-3xl font-switzer font-[400] text-white">
                          {selectedPlanData.price}
                        </span>
                        {selectedPlan === "smart" && (
                          <span className="text-sm text-[#9CA3AF] font-switzer font-[400]">
                            / month
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-[#9CA3AF] font-switzer font-[400]">
                        {selectedPlanData.description}
                      </p>
                    </div>
                    <Link
                      href={selectedPlanData.href}
                      target={selectedPlanData.external ? "_blank" : undefined}
                      rel={selectedPlanData.external ? "noopener noreferrer" : undefined}
                      onClick={(e) => {
                        if (selectedPlan === "free" || selectedPlan === "smart") {
                          if (typeof window !== "undefined" && window.localStorage) {
                            window.localStorage.setItem("landingPageListEvent", "true");
                          }
                        }
                        // If CTA is "BOOK A DEMO", always redirect to contact section
                        if (selectedPlanData.ctaLabel === "BOOK A DEMO") {
                          handleContactClick(e);
                        } else if (!selectedPlanData.external) {
                          handleContactClick(e);
                        }
                        mixpanel.track(`Pricing - Mobile ${selectedPlanData.ctaLabel} Clicked`, {
                          plan: selectedPlan,
                        });
                      }}
                      className="w-full inline-flex items-center justify-center rounded-3xl border border-[#4e4e4e87] bg-white px-6 py-2 text-xs font-nohemi font-[400] text-[#0F0F0F] shadow-[inset_0_2.39px_2.29px_rgba(0,0,0,0.25),0_2.29px_2.29px_rgba(0,0,0,0.25)] hover:contrast-125 hover:-translate-y-0.5 transition-all"
                    >
                      <span className="mt-0.5">{selectedPlanData.ctaLabel}</span>
                      {selectedPlan !== "free" && (
                        <svg
                          className="ml-2 h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M5 12h14M17 7l5 5-5 5" />
                        </svg>
                      )}
                  </Link>
                </div>
                </div>
              );
            })()}
            </div>
            </div>

            {/* Comparison Table */}
            <div
              className="bg-[#050505] overflow-hidden"
              onClick={() => setActiveInfoLabel(null)}
            >
              {comparisonTableData.map((section) => (
                <div key={section.category}>
                  {/* Category Header - Left aligned, full width */}
                  <div className="bg-[#0E0E0E]">
                    <div className="py-3">
                      <div className="text-sm font-switzer font-[500] text-left text-white whitespace-nowrap">
                        {section.category}
                      </div>
                    </div>
                  </div>
                  
                  {/* Table Rows with Excel-like borders */}
                  {section.rows.map((row, rowIndex) => (
                    <div
                      key={row.label}
                      className={`grid grid-cols-5 ${
                        rowIndex % 2 === 0 ? "bg-[#1F1F1F]/60" : "bg-[#0E0E0E]"
                      }`}
                    >
                      {/* First column - Feature name (small text) */}
                      <div className="px-3 py-2.5 border col-span-2 border-[#E8EAED]/40 border-r-0">
                        <div className="flex items-center justify-between">
                          <div className="text-xs text-[#E4E4E4] font-switzer font-[400] leading-tight">
                            {row.label}
                          </div>
                          {("info" in row && row.info) && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveInfoLabel(
                                  activeInfoLabel === row.label ? null : row.label
                                );
                              }}
                              className="relative flex items-center justify-center h-3.5 w-3.5 rounded-full border border-[#E8EAED]/60 text-[8px] text-[#E8EAED]/80 bg-transparent"
                            >
                              i
                              {activeInfoLabel === row.label && (
                                <div className="absolute left-0 top-full z-20 mt-1 w-48 rounded-md bg-[#202020] px-4 py-2 text-xs text-[#E8EAED] shadow-lg">
                                  {row.info as string}
                                </div>
                              )}
                            </button>
                          )}
                        </div>
                      </div>
                      
                      {/* Plan columns */}
                      {(["free", "smart", "pro"] as const).map((planId, colIndex) => {
                        const value = (row as Record<string, boolean | string | undefined>)[planId];
                        const isLastColumn = colIndex === 2;
                        return (
                          <div
                            key={planId}
                            className={`flex items-center justify-center px-2 py-2.5 border border-[#E8EAED]/40 ${
                              !isLastColumn ? "border-r-0" : ""
                            }`}
                          >
                            {typeof value === "boolean" ? (
                              value ? (
                                <svg
                                  className="h-3.5 w-3.5 text-white"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                              ) : (
                                <span className="text-[10px] text-[#FFFFFF]">—</span>
                              )
                            ) : value ? (
                              <span className="text-[10px] text-[#E4E4E4] font-switzer font-[400] text-center">
                                {value}
                              </span>
                            ) : (
                              <span className="text-[10px] text-[#4B5563]">—</span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Credit Plans Section */}
      <section className="py-16 px-6 md:px-10 lg:px-16">
        <div className="max-w-5xl mx-auto space-y-8">
          <h2 className="text-sm md:text-2xl font-instrument-serif font-[400] text-center mb-12 text-gray-300 opacity-90">
            Credit Plans
          </h2>
          {/* Marketing Credits Section */}
          <div className="bg-[#1A1A1A] rounded-2xl p-8 md:p-12 border border-[#2A2A2A]">
            <div className="flex flex-col items-center gap-2">
              <h2 className="text-3xl md:text-3xl font-switzer font-[500] text-[#F0E9B2] text-center">
                Marketing Credits
              </h2>
              <p className="text-[#E4E4E4] text-center text-sm md:text-sm font-switzer font-[300] mb-8">
                Start with flat rate that includes 1000 credits
              </p>
            </div>

            {/* Price Display */}
            <div className="flex justify-center mb-8">
              <GlassButton>
                ₹{price.toLocaleString()}
              </GlassButton>
            </div>

            {/* Usage Description */}
            <div className="text-center mb-8 space-y-2">
              <p className="text-[#E4E4E4] text-sm md:text-sm font-switzer font-[300]">
                Pricing scales are you usage do. No surprises, just usage
              </p>
              <p className="text-gray-300 text-sm md:text-sm font-switzer font-[300]">
                Use the slider to preview your monthly cost.
              </p>
            </div>

            {/* Credit Slider - Bar Chart Style */}
            <div className="w-full max-w-4xl mx-auto mb-8 mt-10 px-2 md:px-0">
              {/* Wrapper allows horizontal dragging on touch devices */}
              <div
                ref={sliderAreaRef}
                className="relative"
                onTouchStart={handleSliderTouch}
                onTouchMove={handleSliderTouch}
              >
                {/* Calculate selected bar index */}
                {(() => {
                  const totalBars = isMobile ? 60 : 100; // 60 bars on mobile, 100 on desktop
                  const minCredits = 1000;
                  const maxCredits = 10000;
                  const creditRange = maxCredits - minCredits;
                  const selectedIndex = Math.round(
                    ((credits - minCredits) / creditRange) * (totalBars - 1)
                  );
                  const barHeights = generateBarHeights(selectedIndex, totalBars);
                  
                  // Calculate tooltip position (percentage from left)
                  const tooltipPosition = (selectedIndex / (totalBars - 1)) * 100;
                  // Show tooltip only when not at min or max credits
                  const showTooltip = credits > minCredits && credits < maxCredits;
                  
                  return (
                    <>
                      {/* Credit Value Tooltip */}
                      {showTooltip && (
                        <div 
                          className="absolute -top-8 md:-top-6 left-0 transform -translate-x-1/2 transition-all duration-200 pointer-events-none z-20"
                          style={{
                            left: `${tooltipPosition}%`,
                            maxWidth: 'calc(100% - 1rem)',
                          }}
                        >
                            <p className="text-[#E4E4E4] text-xs md:text-sm lg:text-md font-switzer font-[600] whitespace-nowrap">
                              {credits.toLocaleString()} credits
                            </p>
                          {/* Tooltip arrow */}
                          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-[#1A1A1A]"></div>
                        </div>
                      )}
                      
                      {/* Vertical Bars */}
                      <div className="flex items-end justify-between gap-[1px] md:gap-0.5 lg:gap-1 h-6 md:h-8 mb-4 relative overflow-hidden">
                        {barHeights.map((height, index) => {
                          const isHighlighted = Math.abs(index - selectedIndex) <= 4; // Highlight bars within 6 positions
                          return (
                            <div
                              key={index}
                              className={`transition-all duration-200 ${
                                isHighlighted
                                  ? "bg-[#F0E9B2]"
                                  : "bg-[#E4E4E4] opacity-40"
                              }`}
                              style={{
                                height: `${height}px`,
                                width: "2px",
                                minWidth: "2px",
                              }}
                            />
                          );
                        })}
                      </div>
                      
                      {/* Dots Below Bars - Limited dots with spacing */}
                      {(() => {
                        const totalDots = 10; // Limited number of dots
                        const minCredits = 1000;
                        const maxCredits = 10000;
                        const creditRange = maxCredits - minCredits;
                        // Calculate which dot should be highlighted based on current credits
                        const selectedDotIndex = Math.round(
                          ((credits - minCredits) / creditRange) * (totalDots - 1)
                        );
                        
                        return (
                          <div className="flex items-center justify-between mb-4 w-full px-0">
                            {Array.from({ length: totalDots }).map((_, index) => {
                              const isSelected = index === selectedDotIndex;
                              return (
                                <div
                                  key={index}
                                  className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full transition-all duration-200 ${
                                    isSelected
                                      ? "bg-[#F0E9B2]"
                                      : "bg-[#E4E4E4] opacity-40"
                                  }`}
                                />
                              );
                            })}
                          </div>
                        );
                      })()}
                      
                      {/* Slider Input (overlaid, handles drag on all devices including iOS) */}
                      <input
                        type="range"
                        min="1000"
                        max="10000"
                        step="100"
                        value={credits}
                        onChange={(e) => setCredits(Number(e.target.value))}
                        onInput={(e) => {
                          // iOS Safari requires onInput for smooth dragging
                          const target = e.target as HTMLInputElement;
                          setCredits(Number(target.value));
                        }}
                        className="absolute inset-0 w-full h-12 opacity-0 cursor-pointer z-10"
                        style={{
                          WebkitTapHighlightColor: 'transparent',
                        }}
                      />
                      
                      {/* Slider Labels */}
                      <div className="flex justify-between mt-2 px-1">
                        <span className="text-[#E4E4E4] text-xs md:text-sm font-switzer font-[400]">
                          1000 credits
                        </span>
                        <span className="text-[#E4E4E4] text-xs md:text-sm font-switzer font-[400]">
                          10k credits
                        </span>
                      </div>
                    </>
                  );
                })()}
              </div>
            </div>

            {/* Credit Conversion Rates */}
            <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8 opacity-60">
              <div className="flex items-center gap-2">
                <span className="text-gray-300 text-sm md:text-base font-switzer font-[400]">
                  1 Email =
                </span>
                <span className="text-gray-300 text-sm md:text-sm font-switzer font-[600] bg-[#1F1F1F] px-3 py-1 rounded">
                  1 Credit
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-300 text-sm md:text-base font-switzer font-[400]">
                  1 SMS =
                </span>
                <span className="text-gray-300 text-sm md:text-sm font-switzer font-[600] bg-[#1F1F1F] px-3 py-1 rounded">
                  2 Credit
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Custom Plan Section */}
      <section className="py-16 px-6 md:px-10 lg:px-16">
        <div className="max-w-5xl mx-auto space-y-8">
          <h2 className="text-sm md:text-2xl font-instrument-serif font-[400] text-center mb-12 text-gray-300 opacity-90">
          Want your own branded platform?
          </h2>
          <div className="bg-[#1A1A1A] rounded-2xl p-8 md:p-12 border border-[#2A2A2A]">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-start gap-6">
              <div className="flex-1">
                <h2 className="text-3xl md:text-4xl font-switzer font-[400] text-[#F0E9B2] mb-2">
                  Custom Plan
                </h2>
                <p className="text-[#E4E4E4] text-sm md:text-lg font-switzer font-[400]">
                 Get in touch for whitelabel services, custom solutions made just for you.
                </p>
              </div>
              <Link
                href="/"
                className="w-fit px-6 md:px-8 py-3 md:py-2 h-[35px] md:h-[40px] flex items-center justify-center rounded-3xl border border-[#4e4e4e87] bg-[#E5E5E5] shadow-[inset_0_2.39px_2.29px_rgba(0,0,0,0.25),0_2.29px_2.29px_rgba(0,0,0,0.25)] cursor-pointer hover:contrast-125 transition-all hover:-translate-y-0.5 text-[#0F0F0F] leading-none"
                onClick={(e) => {
                  handleContactClick(e);
                  mixpanel.track("Pricing - Custom Plan Contact Us Clicked", {
                    location: "Credit Plans Section",
                  });
                }}
              >
                <p className="leading-none flex flex-row gap-2 items-center mt-0.5 text-xs md:text-sm font-nohemi font-[400] text-shadow-md">
                  CONTACT US
                  <svg
                    className="w-5 h-5 -mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={1.8}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14M17 7l5 5-5 5" />
                  </svg>
                </p>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection />

      {/* Footer */}
      <FooterSection />

      {/* Mobile Menu - Slides in from right */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-[#0F0F0F] z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full relative">
          {/* Menu Header */}
          <div className="flex items-center justify-between px-6 pt-6">
            <div className="flex items-center gap-2 w-[80px] h-[30px] relative">
              <Image
                src="/Assets/Icons/LogoIcon.png"
                alt="Astrix Logo"
                fill
                className="object-contain"
              />
            </div>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="text-white hover:text-gray-300 transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Menu Items */}
          <div className="flex-1 flex flex-col justify-start px-3 pt-8 space-y-4">
            <Link href="/" rel="noopener noreferrer" onClick={() => setIsMenuOpen(false)} className="text-white text-xs font-nohemi font-[400] py-2 px-4 hover:text-[#CCD0D7] hover:bg-[#1F1F1F] transition-colors text-shadow-sm text-left">
              
              HOME
            </Link>

            <Link href="/about" rel="noopener noreferrer" onClick={() => setIsMenuOpen(false)} className="text-white text-xs font-nohemi font-[400] py-2 px-4 hover:text-[#CCD0D7] hover:bg-[#1F1F1F] transition-colors text-shadow-sm text-left">
              
              ABOUT
            </Link>

            <span className="text-white text-xs font-nohemi font-[400] py-2 px-4 bg-[#1F1F1F] text-shadow-sm text-left">
              PRICING
            </span>

            {/* Services Dropdown for Mobile */}
            <div className="space-y-3">
              <button
                onClick={() => setIsServicesDropdownOpenMobile(!isServicesDropdownOpenMobile)}
                className={`flex py-2 px-4 hover:bg-[#1F1F1F] items-center justify-between w-full text-white text-xs font-nohemi font-[400] hover:text-[#CCD0D7] transition-colors text-shadow-sm ${
                  isServicesDropdownOpenMobile && "bg-[#1F1F1F]"
                }`}
              >
                <span>SERVICES</span>
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${
                    isServicesDropdownOpenMobile ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {isServicesDropdownOpenMobile && (
                <div className="pl-4 space-y-4">
                  <div>
                    <h4 className="text-white text-xs font-instrument-serif font-[400] mb-2">
                      Distribute
                    </h4>
                    <ul className="space-y-1 pl-2">
                      <li>
                        <button
                          onClick={() => handleMobileNavClick("pc-create-event")}
                          className="text-left w-full text-white text-xs font-nohemi font-[400] hover:text-[#CCD0D7] transition-colors"
                        >
                          Create Event
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => handleMobileNavClick("pc-issue-tickets")}
                          className="text-left w-full text-white text-xs font-nohemi font-[400] hover:text-[#CCD0D7] transition-colors"
                        >
                          Issue Tickets
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => handleMobileNavClick("pc-purchase-rsvp")}
                          className="text-left w-full text-white text-xs font-nohemi font-[400] hover:text-[#CCD0D7] transition-colors"
                        >
                          Purchase/RSVP
                        </button>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-white text-xs font-instrument-serif font-[400] mb-2">
                      Retarget
                    </h4>
                    <ul className="space-y-1 pl-2">
                      <li>
                        <button
                          onClick={() => handleMobileNavClick("pc-data-insights")}
                          className="text-left w-full text-white text-xs font-nohemi font-[400] hover:text-[#CCD0D7] transition-colors"
                        >
                          Data Insights
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => handleMobileNavClick("pc-email-marketing")}
                          className="text-left w-full text-white text-xs font-nohemi font-[400] hover:text-[#CCD0D7] transition-colors"
                        >
                          Email Marketing
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => handleMobileNavClick("pc-promotions")}
                          className="text-left w-full text-white text-xs font-nohemi font-[400] hover:text-[#CCD0D7] transition-colors"
                        >
                          Promotions / Discounts
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => handleMobileNavClick("pc-marketing-insights")}
                          className="text-left w-full text-white text-xs font-nohemi font-[400] hover:text-[#CCD0D7] transition-colors"
                        >
                          Marketing Insights
                        </button>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-white text-xs font-instrument-serif font-[400] mb-2">
                      Discover
                    </h4>
                    <ul className="space-y-1 pl-2">
                      <li>
                        <button
                          onClick={() => handleMobileNavClick("pc-mini-portfolio")}
                          className="text-left w-full text-white text-xs font-nohemi font-[400] hover:text-[#CCD0D7] transition-colors"
                        >
                          Smart Profile
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => handleMobileNavClick("pc-discovery-channel")}
                          className="text-left w-full text-white text-xs font-nohemi font-[400] hover:text-[#CCD0D7] transition-colors"
                        >
                          Discovery Channel
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="#"
              className="text-white text-xs font-nohemi font-[400] hover:text-[#CCD0D7] transition-colors text-shadow-sm py-2 px-4 hover:bg-[#1F1F1F]"
              onClick={() => setIsMenuOpen(false)}
            >
              RESOURCES
            </Link>

            <button
              onClick={() => {
                setIsMenuOpen(false);
                handleMobileNavClick("contact");
              }}
              className="text-white text-xs font-nohemi font-[400] hover:text-[#CCD0D7] transition-colors text-shadow-sm py-2 px-4 hover:bg-[#1F1F1F] text-left"
            >
              CONTACT US
            </button>
            <div className="absolute bottom-0 right-0 w-full p-5 flex flex-row gap-4">
              <Link
                href="https://app.astrix.live"
                target="_blank"
                rel="noopener noreferrer"
                className="w-fit px-3 py-1 flex items-center justify-center rounded-3xl border border-[#4e4e4e87] bg-[#FFFFFF] shadow-[inset_0_2.39px_2.29px_rgba(0,0,0,0.25),0_2.29px_2.29px_rgba(0,0,0,0.25)] cursor-pointer hover:contrast-125 transition-all hover:-translate-y-0.5 text-[#0F0F0F] text-[10px] leading-none text-shadow-sm"
              >
                <p className="leading-none">GET STARTED</p>
              </Link>
              <button
                onClick={() => {
                  handleContactClick({ preventDefault: () => {} } as React.MouseEvent);
                  setIsMenuOpen(false);
                }}
                className="w-fit px-3 py-1 flex items-center font-nohemi font-[400] justify-center rounded-3xl border border-[#4e4e4e87] bg-[#3c3c3cbf] shadow-[inset_0_2.39px_2.29px_rgba(0,0,0,0.25),0_2.29px_2.29px_rgba(0,0,0,0.25)] cursor-pointer hover:opacity-90 transition-all hover:-translate-y-0.5 text-white text-[10px] leading-none text-shadow-sm"
              >
                <p className="leading-none mt-0.5">BOOK A DEMO</p>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay for mobile menu */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </main>
  );
}




"use client";

import Image from "next/image";
import Link from "next/link";
import FooterSection from "@/app/components/footerSection";
import FAQSection from "../components/FAQSection";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function FAQPage() {
  const router = useRouter();
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesDropdownOpenMobile, setIsServicesDropdownOpenMobile] = useState(false);

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
      
      console.log("[FAQPage] Navigating to:", targetId, "progress:", targetProgress);
      
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
          console.log("[FAQPage] Using cached ScrollTrigger reference (instant navigation)");
          productCycleTrigger = cachedTrigger;
        } else {
          // Fallback: Search for ScrollTrigger if not cached yet
          console.log(`[FAQPage] Cached reference not found, searching... (attempt ${retryCount}/${maxRetries})`);
          
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
          console.log("[FAQPage] ScrollTrigger found!", productCycleTrigger);
          
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
          
          console.log("[FAQPage] Navigation context:", {
            currentScroll: currentScrollY.toFixed(0),
            sectionStart: start.toFixed(0),
            sectionEnd: end.toFixed(0),
            isInSection: isInSection,
            targetId: targetId
          });
          
          // If already in the section, just dispatch the event without scrolling
          if (isInSection) {
            console.log("[FAQPage] Already in ProductCycleSection, navigating directly to:", targetId);
            const event = new CustomEvent("gotoProductCycle", {
              detail: { id: targetId }
            });
            window.dispatchEvent(event);
            return;
          }
          
          // Not in section yet - scroll to START of section first to ensure it's pinned
          // Then navigate to the specific slide
          const sectionStartScroll = start + 50; // Scroll just past the start to ensure pinning
          
          console.log("[FAQPage] Scrolling to section start first to pin it:", {
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
            console.log("[FAQPage] Section pinned, dispatching navigation event for:", targetId);
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
          console.log(`[FAQPage] ScrollTrigger not ready (attempt ${retryCount}/${maxRetries}), waiting...`);
          setTimeout(getScrollTriggerAndNavigate, 100);
          return;
        }
        
        // Fallback: estimate scroll position without ScrollTrigger
        console.warn("[FAQPage] ScrollTrigger not found after retries, using estimation");
        
        // Estimate: ProductCycleSection starts at sectionTop
        const estimatedStart = sectionTop;
        const sectionStartScroll = estimatedStart + 50; // Scroll just past the start to ensure pinning
        
        console.log("[FAQPage] Using estimated scroll position - scrolling to section start:", {
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
          console.log("[FAQPage] Section pinned (estimation), dispatching navigation event for:", targetId);
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

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log("[FAQPage] Contact navigation requested");
    
    // Navigate to home page first with hash
    router.push("/");
    
    // Wait for navigation to complete, then dispatch custom event for home page to handle
    setTimeout(() => {
      console.log("[FAQPage] Dispatching scrollToSection event for contact");
      const event = new CustomEvent("scrollToSection", {
        detail: { targetId: "contact" }
      });
      window.dispatchEvent(event);
    }, 500);
  };

  const handleMobileNavClick = (targetId: string) => {
    setIsServicesDropdownOpenMobile(false);
    setIsMenuOpen(false);
    
    console.log(`[FAQPage Mobile] Navigation requested to: ${targetId}`);
    
    // Navigate to home page first
    router.push("/");
    
    // Poll for the element to exist after navigation
    let attempts = 0;
    const maxAttempts = 50;
    const checkAndScroll = () => {
      attempts++;
      const el = document.getElementById(targetId);
      if (el) {
        console.log(`[FAQPage Mobile] Found element ${targetId} at attempt ${attempts}`);
        
        // Immediately scroll without waiting - use instant behavior
        setTimeout(() => {
          const element = document.getElementById(targetId);
          if (element) {
            console.log(`[FAQPage Mobile] Instant scrolling to ${targetId}`);
            
            // Use instant scrollIntoView to bypass all ScrollTrigger animations
            element.scrollIntoView({ 
              behavior: "instant" as ScrollBehavior, 
              block: "start" 
            });
            
            console.log(`[FAQPage Mobile] Scrolled to ${targetId}`);
          }
        }, 200); // Reduced wait time
      } else if (attempts < maxAttempts) {
        setTimeout(checkAndScroll, 100);
      } else {
        console.warn(`[FAQPage Mobile] Element ${targetId} not found after ${maxAttempts} attempts`);
      }
    };
    
    // Start checking after navigation
    setTimeout(checkAndScroll, 300);
  };

  return (
    <main className="min-h-screen w-full bg-[#0F0F0F] text-white relative">
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
          
          <Link
            href="/pricing"
            className={`w-fit px-4 py-2 flex items-center justify-center rounded-3xl border border-[#4e4e4e87] bg-[#1f1f1f9e] shadow-[inset_0_2.39px_2.29px_rgba(0,0,0,0.25),0_2.29px_2.29px_rgba(0,0,0,0.25)] cursor-pointer hover:contrast-125 transition-all hover:-translate-y-0.5 text-xs leading-none ${
              isServicesDropdownOpen ? 'blur-sm' : ''
            }`}
          >
            <p className="leading-none mt-0.5 text-xs font-nohemi font-[400] text-shadow-md">
              PRICING
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

      <section className="relative z-10 w-full">
        <FAQSection />
      </section>

      {/* Footer */}
      <div className="relative z-10">
        <FooterSection />
      </div>

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

            <Link href="/pricing" rel="noopener noreferrer" onClick={() => setIsMenuOpen(false)} className="text-white text-xs font-nohemi font-[400] py-2 px-4 hover:text-[#CCD0D7] hover:bg-[#1F1F1F] transition-colors text-shadow-sm text-left">
              
              PRICING
            </Link>

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
              href="/faq"
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

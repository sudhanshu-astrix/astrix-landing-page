"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import mixpanel from "@/lib/mixpanelClient";

export default function GlobalMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [showIcon, setShowIcon] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";
  

  useEffect(() => {
    // Reset icon state when pathname changes
    setShowIcon(false);
    
    const hero = document.querySelector('[data-hero-section="true"]') as HTMLElement | null;
    if (!hero) {
      setShowIcon(false);
      return;
    }

    const update = () => {
      const rect = hero.getBoundingClientRect();
      // Show icon only when hero section has completely scrolled past (is above viewport)
      const hasScrolledPastHero = rect.bottom <= 0;
      setShowIcon(hasScrolledPastHero);
    };

    // Initial check
    update();
    
    // Add scroll and resize listeners
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [pathname]);

  const scrollToProductSection = (targetId: string) => {
    setIsOpen(false);
    
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
    
    // Use requestAnimationFrame to ensure DOM is ready
    requestAnimationFrame(() => {
      const productCycleRoot = document.getElementById("product-cycle-root");
  
      if (productCycleRoot) {
        console.log("[GlobalMenu] Navigating to:", targetId, "progress:", targetProgress);
        
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
            console.log("[GlobalMenu] Using cached ScrollTrigger reference (instant navigation)");
            productCycleTrigger = cachedTrigger;
          } else {
            // Fallback: Search for ScrollTrigger if not cached yet
            console.log(`[GlobalMenu] Cached reference not found, searching... (attempt ${retryCount}/${maxRetries})`);
            
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
            console.log("[GlobalMenu] ScrollTrigger found!", productCycleTrigger);
            
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
            
            console.log("[GlobalMenu] Navigation context:", {
              currentScroll: currentScrollY.toFixed(0),
              sectionStart: start.toFixed(0),
              sectionEnd: end.toFixed(0),
              isInSection: isInSection,
              targetId: targetId
            });
            
            // If already in the section, just dispatch the event without scrolling
            if (isInSection) {
              console.log("[GlobalMenu] Already in ProductCycleSection, navigating directly to:", targetId);
              const event = new CustomEvent("gotoProductCycle", {
                detail: { id: targetId }
              });
              window.dispatchEvent(event);
              return;
            }
            
            // Not in section yet - scroll to START of section first to ensure it's pinned
            // Then navigate to the specific slide
            const sectionStartScroll = start + 50; // Scroll just past the start to ensure pinning
            
            console.log("[GlobalMenu] Scrolling to section start first to pin it:", {
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
              console.log("[GlobalMenu] Section pinned, dispatching navigation event for:", targetId);
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
            console.log(`[GlobalMenu] ScrollTrigger not ready (attempt ${retryCount}/${maxRetries}), waiting...`);
            setTimeout(getScrollTriggerAndNavigate, 100);
            return;
          }
          
          // Fallback: estimate scroll position without ScrollTrigger
          console.warn("[GlobalMenu] ScrollTrigger not found after retries, using estimation");
          
          // Estimate: ProductCycleSection starts at sectionTop
          const estimatedStart = sectionTop;
          const sectionStartScroll = estimatedStart + 50; // Scroll just past the start to ensure pinning
          
          console.log("[GlobalMenu] Using estimated scroll position - scrolling to section start:", {
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
            console.log("[GlobalMenu] Section pinned (estimation), dispatching navigation event for:", targetId);
            const event = new CustomEvent("gotoProductCycle", {
              detail: { id: targetId }
            });
            window.dispatchEvent(event);
          }, 200);
        };
        
        // Start the process
        getScrollTriggerAndNavigate();
      } else {
        console.warn("[GlobalMenu] product-cycle-root element not found");
      }
    });
  };

  if (!isHome) return null;

  return (
    <>
      {showIcon && (
        <button
          aria-label="Open menu"
          onClick={() => {
            setIsOpen(true);
            mixpanel.track("Opened Global Menu");
          }}
          className="fixed top-6 right-6 z-[1000] w-12 h-12 md:w-12 md:h-12"
        >
          <Image
            src="/Assets/Icons/menuicon.png"
            alt="menu"
            fill
            className="object-contain opacity-90"
            priority={false}
          />
        </button>
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-[#0F0F0F] z-[1100] transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full relative">
          {/* Header */}
          <div className="flex items-center justify-between px-6 pt-6">
            <button
              onClick={() => {
                setIsOpen(false);
                window.scrollTo({ top: 0, behavior: "smooth" });
                mixpanel.track("Global Menu - Logo Clicked", { location: "Global Menu" });
              }}
              className="flex items-center gap-2 w-[80px] h-[30px] relative cursor-pointer hover:opacity-80 transition-opacity"
              aria-label="Go to home"
            >
              <Image src="/Assets/Icons/LogoIcon.png" alt="Astrix Logo" fill className="object-contain" />
            </button>
            <button
              onClick={() => {
                setIsOpen(false)
                mixpanel.track("Closed Global Menu");
              }}
              className="text-white hover:text-gray-300 transition-colors"
              aria-label="Close menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 flex flex-col justify-start px-3 pt-8 space-y-4">
            {pathname !== "/" && (
              <Link
                href="/"
                className="text-white text-xs font-nohemi font-[400] py-2 px-4 hover:text-[#CCD0D7] hover:bg-[#1F1F1F] transition-colors text-shadow-sm"
                onClick={() => setIsOpen(false)}
              >
                HOME
              </Link>
            )}
            <Link
              href="/about"
              className="text-white text-xs font-nohemi font-[400] py-2 px-4 hover:text-[#CCD0D7] hover:bg-[#1F1F1F] transition-colors text-shadow-sm"
              onClick={() => {
                setIsOpen(false)
                  mixpanel.track(
                              "Global Menu - About Clicked",
                              { location: "Global Menu" }
                            );
              }}
            >
              ABOUT
            </Link>

            {/* Services */}
            <div className="space-y-3">
              <button
                onClick={() =>
                  { setIsServicesOpen(!isServicesOpen)
                       mixpanel.track(
                              "Global Menu - Services Toggled",
                              { location: "Global Menu" }
                            );
                  }

                }
                className={`flex py-2 px-4 hover:bg-[#1F1F1F] items-center justify-between w-full text-white text-xs font-nohemi font-[400] hover:text-[#CCD0D7] transition-colors text-shadow-sm ${
                  isServicesOpen && "bg-[#1F1F1F]"
                }`}
              >
                <span>SERVICES</span>
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${isServicesOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isServicesOpen && (
                <div className="pl-4 space-y-4">
                  <div>
                    <h4 className="text-white text-xs font-instrument-serif font-[400] mb-2">Distribute</h4>
                    <ul className="space-y-1 pl-2">
                      <li><button onClick={() => {scrollToProductSection('pc-create-event')
                      mixpanel.track("Global Menu - Create Event Clicked", { location: "Global Menu" });
                      }} className="text-left w-full text-white text-xs font-nohemi font-[400] hover:text-[#CCD0D7] transition-colors">Create Event</button></li>
                      <li><button onClick={() => {scrollToProductSection('pc-issue-tickets')
                      mixpanel.track("Global Menu - Issue Tickets Clicked", { location: "Global Menu" });
                      }} className="text-left w-full text-white text-xs font-nohemi font-[400] hover:text-[#CCD0D7] transition-colors">Issue Tickets</button></li>
                      <li><button onClick={() => {scrollToProductSection('pc-purchase-rsvp')
                      mixpanel.track("Global Menu - Purchase/RSVP Clicked", { location: "Global Menu" });
                      }} className="text-left w-full text-white text-xs font-nohemi font-[400] hover:text-[#CCD0D7] transition-colors">Purchase/RSVP</button></li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-white text-xs font-instrument-serif font-[400] mb-2">Retarget</h4>
                    <ul className="space-y-1 pl-2">
                      <li><button onClick={() => {scrollToProductSection('pc-data-insights')
                      mixpanel.track("Global Menu - Data Insights Clicked", { location: "Global Menu" });
                      }} className="text-left w-full text-white text-xs font-nohemi font-[400] hover:text-[#CCD0D7] transition-colors">Data Insights</button></li>
                      <li><button onClick={() => {scrollToProductSection('pc-email-marketing')
                      mixpanel.track("Global Menu - Email Marketing Clicked", { location: "Global Menu" });
                      }} className="text-left w-full text-white text-xs font-nohemi font-[400] hover:text-[#CCD0D7] transition-colors">Email Marketing</button></li>
                      <li><button onClick={() => {scrollToProductSection('pc-promotions')
                      mixpanel.track("Global Menu - Promotions/Discounts Clicked", { location: "Global Menu" });
                      }} className="text-left w-full text-white text-xs font-nohemi font-[400] hover:text-[#CCD0D7] transition-colors">Promotions / Discounts</button></li>
                      <li><button onClick={() => {scrollToProductSection('pc-marketing-insights')
                      mixpanel.track("Global Menu - Marketing Insights Clicked", { location: "Global Menu" });
                      }} className="text-left w-full text-white text-xs font-nohemi font-[400] hover:text-[#CCD0D7] transition-colors">Marketing Insights</button></li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-white text-xs font-instrument-serif font-[400] mb-2">Discover</h4>
                    <ul className="space-y-1 pl-2">
                      <li><button onClick={() => {scrollToProductSection('pc-mini-portfolio')
                      mixpanel.track("Global Menu - Mini Portfolio Clicked", { location: "Global Menu" });
                      }} className="text-left w-full text-white text-xs font-nohemi font-[400] hover:text-[#CCD0D7] transition-colors">Mini Portfolio</button></li>
                      <li><button onClick={() => {scrollToProductSection('pc-discovery-channel')
                      mixpanel.track("Global Menu - Discovery Channel Clicked", { location: "Global Menu" });
                      }} className="text-left w-full text-white text-xs font-nohemi font-[400] hover:text-[#CCD0D7] transition-colors">Discovery Channel</button></li>
                    </ul>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="#"
              className="text-white text-xs font-nohemi font-[400] hover:text-[#CCD0D7] transition-colors text-shadow-sm py-2 px-4 hover:bg-[#1F1F1F]"
              onClick={() => {setIsOpen(false)
                  mixpanel.track(
                              "Global Menu - Resources Clicked",
                              { location: "Global Menu" }
                            );
              }}
            >
              RESOURCES
            </Link>

            <Link
              href="#contact"
              onClick={() => {setIsOpen(false)
                  mixpanel.track(
                              "Global Menu - Contact Us Clicked",
                              { location: "Global Menu" }
                            );
              }}
              className="text-white text-xs font-nohemi font-[400] hover:text-[#CCD0D7] transition-colors text-shadow-sm py-2 px-4 hover:bg-[#1F1F1F]"
            >
              CONTACT US
            </Link>

            <div className="absolute bottom-0 right-0 w-full p-5 flex flex-row gap-4">
              <Link
                href="https://app.astrix.live"
                target="_blank"
                rel="noopener noreferrer"
                className="w-fit px-3 py-1 flex items-center justify-center rounded-3xl border border-[#4e4e4e87] bg-[#FFFFFF] shadow-[inset_0_2.39px_2.29px_rgba(0,0,0,0.25),0_2.29px_2.29px_rgba(0,0,0,0.25)] cursor-pointer hover:contrast-125 transition-all hover:-translate-y-0.5 text-[#0F0F0F] text-[10px] leading-none text-shadow-sm"
                onClick={() => {
                  mixpanel.track("Global Menu - Get Started Clicked", { location: "Global Menu" });
                 
                }}
              >
                <p className="leading-none">GET STARTED</p>
              </Link>
              <Link
                href="#contact"
                className="w-fit px-3 py-1 flex items-center font-nohemi font-[400] justify-center rounded-3xl border border-[#4e4e4e87] bg-[#3c3c3cbf] shadow-[inset_0_2.39px_2.29px_rgba(0,0,0,0.25),0_2.29px_2.29px_rgba(0,0,0,0.25)] cursor-pointer hover:opacity-90 transition-all hover:-translate-y-0.5 text-white text-[10px] leading-none text-shadow-sm"
                onClick={() => {setIsOpen(false)
                  mixpanel.track("Global Menu - Book A Demo Clicked", { location: "Global Menu" });
                }}
              >
                <p className="leading-none mt-0.5">BOOK A DEMO</p>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-[1050]" onClick={() => setIsOpen(false)} />
      )}
    </>
  );
}



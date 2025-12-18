"use client";

import Image from "next/image";
import Link from "next/link";
import FooterSection from "@/app/components/footerSection";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function AboutUsPage() {
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
      
      console.log("[AboutPage] Navigating to:", targetId, "progress:", targetProgress);
      
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
          console.log("[AboutPage] Using cached ScrollTrigger reference (instant navigation)");
          productCycleTrigger = cachedTrigger;
        } else {
          // Fallback: Search for ScrollTrigger if not cached yet
          console.log(`[AboutPage] Cached reference not found, searching... (attempt ${retryCount}/${maxRetries})`);
          
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
          console.log("[AboutPage] ScrollTrigger found!", productCycleTrigger);
          
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
          
          console.log("[AboutPage] Navigation context:", {
            currentScroll: currentScrollY.toFixed(0),
            sectionStart: start.toFixed(0),
            sectionEnd: end.toFixed(0),
            isInSection: isInSection,
            targetId: targetId
          });
          
          // If already in the section, just dispatch the event without scrolling
          if (isInSection) {
            console.log("[AboutPage] Already in ProductCycleSection, navigating directly to:", targetId);
            const event = new CustomEvent("gotoProductCycle", {
              detail: { id: targetId }
            });
            window.dispatchEvent(event);
            return;
          }
          
          // Not in section yet - scroll to START of section first to ensure it's pinned
          // Then navigate to the specific slide
          const sectionStartScroll = start + 50; // Scroll just past the start to ensure pinning
          
          console.log("[AboutPage] Scrolling to section start first to pin it:", {
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
            console.log("[AboutPage] Section pinned, dispatching navigation event for:", targetId);
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
          console.log(`[AboutPage] ScrollTrigger not ready (attempt ${retryCount}/${maxRetries}), waiting...`);
          setTimeout(getScrollTriggerAndNavigate, 100);
          return;
        }
        
        // Fallback: estimate scroll position without ScrollTrigger
        console.warn("[AboutPage] ScrollTrigger not found after retries, using estimation");
        
        // Estimate: ProductCycleSection starts at sectionTop
        const estimatedStart = sectionTop;
        const sectionStartScroll = estimatedStart + 50; // Scroll just past the start to ensure pinning
        
        console.log("[AboutPage] Using estimated scroll position - scrolling to section start:", {
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
          console.log("[AboutPage] Section pinned (estimation), dispatching navigation event for:", targetId);
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
    console.log("[AboutPage] Contact navigation requested");
    
    // Navigate to home page first with hash
    router.push("/");
    
    // Wait for navigation to complete, then dispatch custom event for home page to handle
    setTimeout(() => {
      console.log("[AboutPage] Dispatching scrollToSection event for contact");
      const event = new CustomEvent("scrollToSection", {
        detail: { targetId: "contact" }
      });
      window.dispatchEvent(event);
    }, 500);
  };

  const handleMobileNavClick = (targetId: string) => {
    setIsServicesDropdownOpenMobile(false);
    setIsMenuOpen(false);
    
    console.log(`[AboutPage Mobile] Navigation requested to: ${targetId}`);
    
    // Navigate to home page first
    router.push("/");
    
    // Poll for the element to exist after navigation
    let attempts = 0;
    const maxAttempts = 50;
    const checkAndScroll = () => {
      attempts++;
      const el = document.getElementById(targetId);
      if (el) {
        console.log(`[AboutPage Mobile] Found element ${targetId} at attempt ${attempts}`);
        
        // Immediately scroll without waiting - use instant behavior
        setTimeout(() => {
          const element = document.getElementById(targetId);
          if (element) {
            console.log(`[AboutPage Mobile] Instant scrolling to ${targetId}`);
            
            // Use instant scrollIntoView to bypass all ScrollTrigger animations
            element.scrollIntoView({ 
              behavior: "instant" as ScrollBehavior, 
              block: "start" 
            });
            
            console.log(`[AboutPage Mobile] Scrolled to ${targetId}`);
          }
        }, 200); // Reduced wait time
      } else if (attempts < maxAttempts) {
        setTimeout(checkAndScroll, 100);
      } else {
        console.warn(`[AboutPage Mobile] Element ${targetId} not found after ${maxAttempts} attempts`);
      }
    };
    
    // Start checking after navigation
    setTimeout(checkAndScroll, 300);
  };

  return (
    <main className="min-h-screen w-full bg-[#0F0F0F] text-white relative">
      {/* Background Image */}
      <div className="absolute top-5 left-0 w-[100vw] h-[90vh] md:h-[200vh] pointer-events-none z-0">
        <Image 
          src="/AboutBg1.svg" 
          alt="About Background" 
          fill
          className="w-full h-auto object-cover" 
          priority
        />
      </div>
      {/* Top bar (mirrors HeroSection navbar) */}
      <header className={`relative ${isServicesDropdownOpen ? 'z-[60]' : 'z-10'} flex items-center justify-between px-4 sm:px-6 md:px-8 py-6 w-full`}>
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
          <span className={`w-fit px-4 py-2 flex items-center justify-center rounded-3xl border border-[#4e4e4e87] bg-[#FFFFFF] shadow-[inset_0_2.39px_2.29px_rgba(0,0,0,0.25),0_2.29px_2.29px_rgba(0,0,0,0.25)] cursor-pointer hover:contrast-125 transition-all hover:-translate-y-0.5 text-[#0F0F0F] leading-none ${
            isServicesDropdownOpen ? 'blur-sm' : ''
          }`}>
            <p className="leading-none mt-0.5 text-xs font-nohemi font-[400] text-shadow-md">
              ABOUT
            </p>
          </span>

          {/* <Link
            href="/pricing"
            className={`w-fit px-4 py-2 flex items-center justify-center rounded-3xl border border-[#4e4e4e87] bg-[#1f1f1f9e] shadow-[inset_0_2.39px_2.29px_rgba(0,0,0,0.25),0_2.29px_2.29px_rgba(0,0,0,0.25)] cursor-pointer hover:contrast-125 transition-all hover:-translate-y-0.5 text-xs leading-none ${
              isServicesDropdownOpen ? 'blur-sm' : ''
            }`}
          >
            <p className="leading-none mt-0.5 text-xs font-nohemi font-[400] text-shadow-md">
              PRICING
            </p>
          </Link> */}
          
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

      <section className="relative z-10 w-full h-full flex items-center justify-center px-4">
        <div className="w-full  h-full xl:max-w-[80%] xl:mx-auto ">
          <div className="flex items-center flex-col justify-center pb-[40px] sm:pb-[50px] md:pb-[180px]">
            {/* upper div */}
            <div className="w-full flex flex-col md:flex-row justify-start items-start gap-[40px] md:gap-[200px] pb-[80px] md:pb-[160px] pt-[120px]">
              <p className="text-[2.2rem] md:text-[4rem] text-[#FFF3B0] font-instrument-serif leading-none text-nowrap">
                About Us
              </p>

              <p className=" w-full max-w-[200px] self-end md:self-auto md:max-w-[800px] font-switzer font-[400] text-[#E4E4E4] text-xs sm:text-lg  md:text-[1.3rem] leading-[120%]">
                Let&apos;s be honest. The endless scroll is getting old and the
                feeds are feeling stale. We&apos;ve built a world to share
                everything, but find it harder than ever to feel like we belong.
                That&apos;s where we come in.
              </p>
            </div>

            {/* middle div */}
            <div className="w-full relative flex pt-[80px]  md:pt-[160px] pb-[80px] md:pb-[200px] ">
              {/* yellow arrow + text */}
              <div className="absolute top-0 -right-6 sm:-top-[20px] sm:right-[10%] md:right-[0%] md:top-[5%] flex flex-row-reverse items-start gap-4 text-[#FFF3B0] text-sm font-switzer">
                <span className="italic text-[10px] md:text-base relative mt-4 -ml-2 md:-mt-4">
                  ( of the fans, by the fans, <br /> and for the fans )
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-[75px] mt-6 md:mt-0 h-auto md:w-[173px] md:h-[97px]"
                  viewBox="0 0 173 97"
                  fill="none"
                >
                  <g filter="url(#filter0_g_1528_5737)">
                    <path
                      d="M2.70276 94.9L7.25283 91.3461L1.90002 89.1826L2.70276 94.9ZM4.39 90.7255L4.84939 90.923C17.5059 61.4705 43.2148 39.4637 73.6639 24.8153C104.111 10.1678 139.255 2.9 170.703 2.89999V2.39999V1.89999C139.115 1.9 103.821 9.19756 73.2304 23.9141C42.6414 38.6298 16.7117 60.7857 3.93062 90.5281L4.39 90.7255Z"
                      fill="#FFF3B0"
                    />
                  </g>
                  <defs>
                    <filter
                      id="filter0_g_1528_5737"
                      x="2.44379e-05"
                      y="-6.07967e-06"
                      width="172.603"
                      height="96.8"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="BackgroundImageFix"
                        result="shape"
                      />
                      <feTurbulence
                        type="fractalNoise"
                        baseFrequency="10 10"
                        numOctaves="3"
                        seed="1410"
                      />
                      <feDisplacementMap
                        in="shape"
                        scale="3.7999999523162842"
                        xChannelSelector="R"
                        yChannelSelector="G"
                        result="displacedImage"
                        width="100%"
                        height="100%"
                      />
                      <feMerge result="effect1_texture_1528_5737">
                        <feMergeNode in="displacedImage" />
                      </feMerge>
                    </filter>
                  </defs>
                </svg>
              </div>

              {/* main paragraph */}
              <p className=" text-[1.3rem] md:text-[4rem] font-switzer font-[500] text-[#E4E4E4] leading-[120%] ident-20 md:indent-100 md:w-[85%] md:max-w-[1000px] w-[80%]">
                <span className="hidden md:inline">
                we started Astrix <br/>
                </span>
                <span className="md:hidden block text-right pr-14 w-full">
                we started Astrix <br/>
                </span>
                 because we believe the real magic isn&apos;t
                in the first click or the fleeting view; it&apos;s in the bonds
                <span className="hidden md:inline">
                 <br/> you build long after someone discovers you.
                </span>
                <span className="md:hidden inline">
                  &nbsp;you build long after someone discovers you.
                </span>
              </p>
            </div>

            {/* third div */}
            <div className="w-full flex justify-between gap-14 md:gap-[200px] items-start">
              <p className="texyt-base md:text-[2rem] text-[#E4E4E4] font-switzer font-[400] text-nowrap">
                We believe
              </p>
              <div className="w-full flex flex-col md:flex-row gap-4 md:gap-[200px] ">
                <p className="text-[#E4E4E4] font-switzer font-[400] text-xs sm:text-base md:text-[1.3rem] max-w-[390px] leading-[120%]">
                  an audience is something you gather, but a community is
                  something you grow. It&apos;s the difference between people
                  just showing up and people feeling truly seen.
                </p>
                <p className="text-[#E4E4E4] font-switzer font-[400] text-xs sm:text-base md:text-[1.3rem] max-w-[390px] leading-[120%]">
                  in &quot;third spaces&quot;, those rare places, online or off, that
                  aren&apos;t work and aren&apos;t home, but are where you find
                  your people and build real, authentic relationships.
                </p>
              </div>
            </div>
          </div>

          {/* fourth div */}
          <div className="w-full py-[60px] md:py-[160px] pb-[80px] md:pb-[180px] flex flex-col justify-center items-center gap-4 ">
            <div className="h-[2px] mb-4 w-[120px] md:w-[260px] bg-[#FFF3B0] "></div>
            <p className="text-[#E4E4E4] font-switzer font-[400] text-[24px] md:text-[48px] text-center leading-[120%]">
              our{" "}
              <span className="font-instrument-serif text-[#FFF3B0] text-[24px] md:text-[48px] leading-[120%]">
                mission
              </span>{" "}
              is to empower experience curators to nurture close-knit
              communities by offering third spaces and fanbase management.
            </p>
          </div>
          {/* fifth div */}
          <div className="w-full pb-[220px] flex flex-col justify-center items-center gap-4">
            <div className="h-[2px] mb-4 w-[120px] md:w-[260px] bg-[#FFF3B0] "></div>
            <p className="text-[#E4E4E4] font-switzer font-[400] text-[24px] md:text-[48px] text-center leading-[120%]">
              we en
              <span className="font-instrument-serif text-[#FFF3B0] text-[24px] md:text-[48px] leading-[120%]">
                vision
              </span>{" "}
              an inclusive space for anyone and everyone where discovery sparks
              connection and shared purpose drives growth.
            </p>
          </div>
          {/* sixth div */}
          {/* <div className="w-full pt-[50px] pb-[160px]  max-w-[530px] ml-[200px] ">
            <p className="text-[#FFF3B0] font-instrument-serif font-[400] text-[1.5rem] leading-[120%]">
              It&apos;s about earning presence, not just chasing <br />{" "}
              attention. So, what will you build?
            </p>
          </div> */}
        </div>
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
              href="#"
              className="text-white text-xs font-nohemi font-[400] hover:text-[#CCD0D7] transition-colors text-shadow-sm py-2 px-4 hover:bg-[#1F1F1F]"
              onClick={() => setIsMenuOpen(false)}
            >
              RESOURCES
            </Link>

            <button
              onClick={() => {
                // handleContactClick({ preventDefault: () => {} } as React.MouseEvent);
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

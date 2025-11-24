"use client";
import { disableScrollPinning, enableScrollPinning } from "@/utils";
import Image from "next/image";
import Link from "next/link";

import { useState, useEffect, useRef } from "react";
import mixpanel from "@/lib/mixpanelClient";

export default function HeroSection({ className}: { className?: string }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const [isServicesDropdownOpenMobile, setIsServicesDropdownOpenMobile] =
    useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const mobileVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Scroll to top on page reload/load for all devices
    window.scrollTo(0, 0);

    // Close dropdown when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (isServicesDropdownOpen) {
        const target = event.target as Element;
        if (!target.closest("[data-services-dropdown]")) {
          setIsServicesDropdownOpen(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isServicesDropdownOpen]);

  // Separate useEffect for handling cross-page navigation events
  useEffect(() => {
    const handleScrollToSection = (event: Event) => {
      const customEvent = event as CustomEvent<{ targetId: string }>;
      const targetId = customEvent.detail?.targetId;
      if (targetId) {
        console.log("[HeroSection] Received scrollToSection event for:", targetId);
        // Directly implement scroll logic with pinning disabled
        disableScrollPinning();
        setIsServicesDropdownOpenMobile(false);
        setIsMenuOpen(false);

        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({
            behavior: "smooth",
            block: isMobile ? "center" : "end",
          });
        }

        setTimeout(() => enableScrollPinning(), 3000);
      }
    };

    window.addEventListener("scrollToSection", handleScrollToSection);
    
    return () => {
      window.removeEventListener("scrollToSection", handleScrollToSection);
    };
  }, [isMobile]);

  useEffect(() => {
    // Detect iOS and mobile
    const checkIOS = () => {
      return (
        /iPad|iPhone|iPod/.test(navigator.userAgent) ||
        (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)
      );
    };
    const checkMobile = window.innerWidth < 768;

    setIsIOS(checkIOS());
    setIsMobile(checkMobile);

    const isMobileDevice = checkMobile;
    const isIOSDevice = checkIOS();
    const isOldIOS = /OS [1-9]_|OS 10_|OS 11_/.test(navigator.userAgent);

    if (isMobileDevice && videoRef.current && mobileVideoRef.current) {
      // Mobile: iOS Safari optimized video playback
      const backgroundVideo = videoRef.current;
      const mobileVideo = mobileVideoRef.current;

      // Set playback rate
      backgroundVideo.playbackRate = 1.0;
      mobileVideo.playbackRate = 1.0;

      // iOS Safari optimizations
      if (isIOSDevice) {
        // For old iOS, stagger video loading to prevent crashes
        if (isOldIOS) {
          setTimeout(() => {
            backgroundVideo.load();
          }, 100);
          setTimeout(() => {
            mobileVideo.load();
          }, 200);
        } else {
          // Modern iOS can handle simultaneous loading
          backgroundVideo.load();
          mobileVideo.load();
        }
      } else {
        // Non-iOS devices load normally
        backgroundVideo.load();
        mobileVideo.load();
      }

      let hasStarted = false;
      let retryCount = 0;
      const maxRetries = isOldIOS ? 3 : 5; // Fewer retries for old iOS

      const attemptPlay = () => {
        if (hasStarted) return;

        // Set video time
        backgroundVideo.currentTime = 0;
        mobileVideo.currentTime = 0;

        // For old iOS, play videos sequentially to prevent crashes
        if (isOldIOS) {
          const playBackgroundFirst = () => {
            const bgPlayPromise = backgroundVideo.play();
            if (bgPlayPromise !== undefined) {
              bgPlayPromise
                .then(() => {
                  console.log("Background video playing");
                  // Wait before playing mobile video
                  setTimeout(() => {
                    const mobilePlayPromise = mobileVideo.play();
                    if (mobilePlayPromise !== undefined) {
                      mobilePlayPromise
                        .then(() => {
                          console.log("Mobile video playing");
                          hasStarted = true;
                        })
                        .catch((error) => {
                          console.log("Mobile video autoplay blocked:", error);
                        });
                    }
                  }, 300);
                })
                .catch((error) => {
                  console.log("Background video autoplay blocked:", error);
                  if (retryCount < maxRetries) {
                    retryCount++;
                    setTimeout(attemptPlay, 1000); // Longer delay for old iOS
                  }
                });
            }
          };
          playBackgroundFirst();
        } else {
          // Modern devices can play simultaneously
          const bgPlayPromise = backgroundVideo.play();
          const mobilePlayPromise = mobileVideo.play();

          if (bgPlayPromise !== undefined) {
            bgPlayPromise
              .then(() => {
                console.log("Background video playing");
                hasStarted = true;
              })
              .catch((error) => {
                console.log("Background video autoplay blocked:", error);
                if (retryCount < maxRetries) {
                  retryCount++;
                  setTimeout(attemptPlay, 500);
                }
              });
          }

          if (mobilePlayPromise !== undefined) {
            mobilePlayPromise
              .then(() => {
                console.log("Mobile video playing");
                hasStarted = true;
              })
              .catch((error) => {
                console.log("Mobile video autoplay blocked:", error);
                if (retryCount < maxRetries) {
                  retryCount++;
                  setTimeout(attemptPlay, 500);
                }
              });
          }
        }
      };

      // Try multiple events for maximum compatibility
      const tryPlayOnEvent = () => {
        if (!hasStarted) {
          attemptPlay();
        }
      };

      // Attempt play with delay for old iOS
      if (isOldIOS) {
        setTimeout(() => {
          if (backgroundVideo.readyState >= 2 || mobileVideo.readyState >= 2) {
            attemptPlay();
          }
        }, 500);
      } else {
        // Modern devices can play immediately
        if (backgroundVideo.readyState >= 2 || mobileVideo.readyState >= 2) {
          attemptPlay();
        }
      }

      // Add multiple event listeners for better compatibility
      backgroundVideo.addEventListener("loadedmetadata", tryPlayOnEvent);
      backgroundVideo.addEventListener("canplay", tryPlayOnEvent);
      backgroundVideo.addEventListener("canplaythrough", tryPlayOnEvent);

      mobileVideo.addEventListener("loadedmetadata", tryPlayOnEvent);
      mobileVideo.addEventListener("canplay", tryPlayOnEvent);
      mobileVideo.addEventListener("canplaythrough", tryPlayOnEvent);

      // User interaction fallback for autoplay restrictions
      const handleUserInteraction = () => {
        if (!hasStarted) {
          attemptPlay();
        }
      };

      document.addEventListener("touchstart", handleUserInteraction, {
        once: true,
      });
      document.addEventListener("click", handleUserInteraction, { once: true });

      return () => {
        backgroundVideo.removeEventListener("loadedmetadata", tryPlayOnEvent);
        backgroundVideo.removeEventListener("canplay", tryPlayOnEvent);
        backgroundVideo.removeEventListener("canplaythrough", tryPlayOnEvent);
        mobileVideo.removeEventListener("loadedmetadata", tryPlayOnEvent);
        mobileVideo.removeEventListener("canplay", tryPlayOnEvent);
        mobileVideo.removeEventListener("canplaythrough", tryPlayOnEvent);
        document.removeEventListener("touchstart", handleUserInteraction);
        document.removeEventListener("click", handleUserInteraction);
      };
    } else if (!isMobileDevice && videoRef.current) {
      // Desktop: play the background video
      const backgroundVideo = videoRef.current;

      const playDesktopVideo = () => {
        backgroundVideo.currentTime = 0;
        backgroundVideo.play().catch((error) => {
          console.log("Video autoplay failed:", error);
        });
      };

      const handleCanPlay = () => {
        playDesktopVideo();
      };

      backgroundVideo.addEventListener("canplay", handleCanPlay, {
        once: true,
      });

      if (backgroundVideo.readyState >= 2) {
        playDesktopVideo();
      }

      return () => {
        backgroundVideo.removeEventListener("canplay", handleCanPlay);
      };
    }
  }, [isMobile, isIOS]);

  const handleNavClick = (targetId: string) => {
    disableScrollPinning(); // temporarily unpin
    setIsServicesDropdownOpenMobile(false);
    setIsMenuOpen(false);

    console.log({targetId});
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({
        behavior: "smooth",
        block: isMobile ? "center" : "end",
      });
    }

    // Re-enable pinning after a short delay (once scroll completes)
    setTimeout(() => enableScrollPinning(), 3000);
  };

  // const scrollToProductCycleSection = (targetId: string) => {
  //   setIsServicesDropdownOpen(false);
  //   disableScrollPinning();
    
  //   // Use requestAnimationFrame to ensure DOM is ready
  //   requestAnimationFrame(() => {
  //     const productCycleRoot = document.getElementById("product-cycle-root");
  
  //     if (productCycleRoot) {
  //       console.log("productCycleRoot", productCycleRoot);
        
  //       // Get the element's position relative to the document
  //       const rect = productCycleRoot.getBoundingClientRect();
  //       const elementTop = rect.top + window.scrollY;
        
  //       // Calculate maximum scrollable position
  //       const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        
  //       // Calculate target scroll position to START of ProductCycleSection
  //       // This ensures ScrollTrigger is active when we try to navigate
  //       const targetScroll = Math.max(0, Math.min(elementTop, maxScroll));
        
  //       console.log("Scrolling to ProductCycleSection start:", targetScroll, "Element top:", elementTop, "Max scroll:", maxScroll);
        
  //       // First, scroll to the ProductCycleSection
  //       window.scrollTo({
  //         top: targetScroll,
  //         behavior: "smooth",
  //       });
  
  //       // Wait for scroll to complete, THEN dispatch navigation event
  //       let lastScrollY = window.scrollY;
  //       let scrollStableCount = 0;
  //       const requiredStableFrames = 3; // Need 3 consecutive stable frames
        
  //       const checkScrollComplete = () => {
  //         const currentScroll = window.scrollY;
  //         const scrollDiff = Math.abs(currentScroll - targetScroll);
          
  //         // Check if scroll position is stable (not changing)
  //         if (Math.abs(currentScroll - lastScrollY) < 1) {
  //           scrollStableCount++;
  //         } else {
  //           scrollStableCount = 0;
  //         }
          
  //         lastScrollY = currentScroll;
          
  //         // Scroll is complete when we're at target AND position is stable
  //         if (scrollDiff < 10 && scrollStableCount >= requiredStableFrames) {
  //           console.log("Scroll complete and stable, navigating to slide:", targetId);
            
  //           // Small delay to ensure ScrollTrigger is fully active
  //           setTimeout(() => {
  //             const event = new CustomEvent("gotoProductCycle", {
  //               detail: { id: targetId }
  //             });
  //             window.dispatchEvent(event);
  //           }, 100);
  //         } else {
  //           // Still scrolling or stabilizing, check again
  //           requestAnimationFrame(checkScrollComplete);
  //         }
  //       };
  
  //       // Start checking after initial delay to allow smooth scroll to begin
  //       setTimeout(() => {
  //         checkScrollComplete();
  //       }, 100);
  //     } else {
  //       console.warn("product-cycle-root element not found");
  //     }
  //   });
    
  //   // Re-enable pinning after navigation completes
  //   setTimeout(() => enableScrollPinning(), 4000);
  // };

  const scrollToProductCycleSection = (targetId: string) => {
    setIsServicesDropdownOpen(false);
    
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
        console.log("[HeroSection] Navigating to:", targetId, "progress:", targetProgress);
        
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
            console.log("[HeroSection] Using cached ScrollTrigger reference (instant navigation)");
            productCycleTrigger = cachedTrigger;
          } else {
            // Fallback: Search for ScrollTrigger if not cached yet
            console.log(`[HeroSection] Cached reference not found, searching... (attempt ${retryCount}/${maxRetries})`);
            
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
            console.log("[HeroSection] ScrollTrigger found!", productCycleTrigger);
            
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
            
            console.log("[HeroSection] Navigation context:", {
              currentScroll: currentScrollY.toFixed(0),
              sectionStart: start.toFixed(0),
              sectionEnd: end.toFixed(0),
              isInSection: isInSection,
              targetId: targetId
            });
            
            // If already in the section, just dispatch the event without scrolling
            if (isInSection) {
              console.log("[HeroSection] Already in ProductCycleSection, navigating directly to:", targetId);
              const event = new CustomEvent("gotoProductCycle", {
                detail: { id: targetId }
              });
              window.dispatchEvent(event);
              return;
            }
            
            // Not in section yet - scroll to START of section first to ensure it's pinned
            // Then navigate to the specific slide
            const sectionStartScroll = start + 50; // Scroll just past the start to ensure pinning
            
            console.log("[HeroSection] Scrolling to section start first to pin it:", {
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
              console.log("[HeroSection] Section pinned, dispatching navigation event for:", targetId);
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
            console.log(`[HeroSection] ScrollTrigger not ready (attempt ${retryCount}/${maxRetries}), waiting...`);
            setTimeout(getScrollTriggerAndNavigate, 100);
            return;
          }
          
          // Fallback: estimate scroll position without ScrollTrigger
          console.warn("[HeroSection] ScrollTrigger not found after retries, using estimation");
          
          // Estimate: ProductCycleSection starts at sectionTop
          const estimatedStart = sectionTop;
          const sectionStartScroll = estimatedStart + 50; // Scroll just past the start to ensure pinning
          
          console.log("[HeroSection] Using estimated scroll position - scrolling to section start:", {
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
            console.log("[HeroSection] Section pinned (estimation), dispatching navigation event for:", targetId);
            const event = new CustomEvent("gotoProductCycle", {
              detail: { id: targetId }
            });
            window.dispatchEvent(event);
          }, 200);
        };
        
        // Start the process
        getScrollTriggerAndNavigate();
      } else {
        console.warn("[HeroSection] product-cycle-root element not found");
      }
    });
  };
  

  return (
    <section
      data-hero-section="true"
      id="hero"
      className={`${
        className || ""
      } relative min-h-screen h-[100vh] md:h-fit w-full flex flex-col justify-between overflow-hidden`}
    >
      <div className="absolute inset-0 z-0 w-full h-full">
        {/* Hero Background Video - Optimized for all devices */}
        <video
          ref={videoRef}
          loop
          muted
          playsInline
          webkit-playsinline="true"
          preload="auto"
          className={`hero-video absolute inset-0 w-full h-full object-cover transition-all duration-300 ${
            isServicesDropdownOpen && !isMobile ? "blur-sm" : ""
          }`}
          style={{
            objectFit: "cover",
            WebkitTransform: "translate3d(0, 0, 0)",
            transform: "translate3d(0, 0, 0)",
            backfaceVisibility: "hidden" as const,
            WebkitBackfaceVisibility: "hidden" as const,
          }}
          disablePictureInPicture
          disableRemotePlayback
          x-webkit-airplay="deny"
          autoPlay={false}
        >
          {/* Mobile iOS uses mp4, Mobile Android and Desktop use webm */}
          {isMobile && isIOS ? (
            <source
              src="/Assets/Images/HeroSectionMobile.mp4"
              type="video/mp4"
            />
          ) : (
            <source
              src="/Assets/Images/HeroSectionMobile.webm"
              type="video/webm"
            />
          )}
          Your browser does not support the video tag.
        </video>
        <div 
          className="absolute inset-0 z-40 bg-[black/20] backdrop-blur-sm"
          style={{
            pointerEvents: "none",
          }}
        >
        </div>

        {/* Noise effect background */}
        <Image
          src="/Assets/Images/NoiseEffectBg.svg"
          alt="noise texture"
          fill
          priority
          className={`absolute z-10 object-cover transition-all duration-300 ${
            isServicesDropdownOpen && !isMobile ? "blur-sm" : ""
          }`}
          style={{ mixBlendMode: "multiply" }}
        />

        {/* Desktop overlay shown only when Services dropdown is open */}
        {isServicesDropdownOpen && !isMobile && (
          <div className="hidden md:block fixed inset-0 z-40 bg-[#1F1F1F]/60 transition-all duration-300"></div>
        )}
      </div>

      <nav
        className={`relative ${
          isServicesDropdownOpen ? "z-[100]" : "z-10"
        } flex items-center justify-between px-4 sm:px-6 md:px-8 py-6 w-full`}
      >
        <div
          className={`flex items-center gap-2 w-[100%] max-w-[114px] h-[30px] relative ${
            isServicesDropdownOpen && !isMobile ? "blur-sm" : ""
          }`}
        >
          <Image
            src="/Assets/Icons/LogoIcon.png"
            alt="Astrix Logo"
            fill
            priority
            objectFit="contain"
          />
        </div>

        <div className="hidden md:flex md:flex-1 items-center justify-end gap-3 lg:gap-5 px-4 lg:px-10">
          <Link
            href="/about"
            className={`w-fit px-4 py-2 flex items-center justify-center rounded-3xl border border-[#4e4e4e87] bg-[#1f1f1f9e] shadow-[inset_0_2.39px_2.29px_rgba(0,0,0,0.25),0_2.29px_2.29px_rgba(0,0,0,0.25)] cursor-pointer hover:contrast-125 transition-all hover:-translate-y-0.5 text-xs md:text-[10px] leading-none ${
              isServicesDropdownOpen ? "blur-sm" : ""
            }`}
            onClick={() =>
              mixpanel.track("Web Navbar - About Clicked", {
                location: "Web Navbar",
              })
            }
          >
            <p className="leading-none mt-0.5 text-xs font-nohemi font-[400]">
              ABOUT
            </p>
          </Link>

          {/* Services Dropdown */}
          <div className="relative" data-services-dropdown>
            <button
              onClick={() => {
                setIsServicesDropdownOpen(!isServicesDropdownOpen);
                mixpanel.track("Web Navbar - Services Opened", {
                  location: "Web Navbar",
                });
              }}
              className="w-fit px-4 py-2 flex items-center justify-center rounded-3xl border border-[#4e4e4e87] bg-[#1f1f1f9e] shadow-[inset_0_2.39px_2.29px_rgba(0,0,0,0.25),0_2.29px_2.29px_rgba(0,0,0,0.25)] cursor-pointer hover:contrast-125 transition-all hover:-translate-y-0.5 text-xs md:text-[10px] leading-none"
            >
              <p className="leading-none mt-0.5 text-xs font-nohemi font-[400]">
                SERVICES
              </p>
              <svg
                className={`w-3 h-3 ml-1 transition-transform duration-200 ${
                  isServicesDropdownOpen ? "rotate-180" : ""
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

            {/* Services Dropdown Menu */}
            {isServicesDropdownOpen && (
              <div className="absolute top-full -left-56 mt-2 w-[650px] bg-[#141414] rounded-lg border border-[#4e4e4e87] shadow-[inset_0_2.39px_2.29px_rgba(0,0,0,0.25),0_2.29px_2.29px_rgba(0,0,0,0.25)] z-50">
                <div className="p-6 grid grid-cols-3 gap-8">
                  {/* Distribute Column */}
                  <div>
                    <h3 className="text-[#E8EAED] text-sm font-instrument-serif font-[400] mb-2">
                      Distribute
                    </h3>
                    <ul className="space-y-1 ml-2">
                      <li>
                        <button
                          onClick={() => {
                            scrollToProductCycleSection("pc-create-event");
                            mixpanel.track(
                              "Web Navbar Services - Create Event Clicked",
                              { location: "Web Navbar Services" }
                            );
                          }}
                          className="text-left w-full text-[#E8EAED] text-sm font-nohemi font-[400] hover:text-[#CCD0D7] transition-colors cursor-pointer"
                        >
                          Create Event
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => {
                            scrollToProductCycleSection("pc-issue-tickets");
                            mixpanel.track(
                              "Web Navbar Services - Issue Tickets Clicked",
                              { location: "Web Navbar Services" }
                            );
                          }}
                          className="text-left w-full text-[#E8EAED] text-sm font-nohemi font-[400] hover:text-[#CCD0D7] transition-colors cursor-pointer"
                        >
                          Issue Ticket
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => {
                            scrollToProductCycleSection("pc-purchase-rsvp");
                            mixpanel.track(
                              "Web Navbar Services - Purchase RSVP Clicked",
                              { location: "Web Navbar Services" }
                            );
                          }}
                          className="text-left w-full text-[#E8EAED] text-sm font-nohemi font-[400] hover:text-[#CCD0D7] transition-colors cursor-pointer"
                        >
                          Purchase/RSVP
                        </button>
                      </li>
                    </ul>
                  </div>

                  {/* Retarget Column */}
                  <div>
                    <h3 className="text-white text-sm font-instrument-serif font-[400] mb-2">
                      Retarget
                    </h3>
                    <ul className="space-y-1 ml-2">
                      <li>
                        <button
                          onClick={() => {
                            scrollToProductCycleSection("pc-data-insights");
                            mixpanel.track(
                              "Web Navbar Services - Data Insights Clicked",
                              { location: "Web Navbar Services" }
                            );
                          }}
                          className="text-left w-full text-white text-sm font-nohemi font-[400] hover:text-[#CCD0D7] transition-colors cursor-pointer"
                        >
                          Data Insights
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => {
                            scrollToProductCycleSection("pc-email-marketing");
                            mixpanel.track(
                              "Web Navbar Services - Email Marketing Clicked",
                              { location: "Web Navbar Services" }
                            );
                          }}
                          className="text-left w-full text-white text-sm font-nohemi font-[400] hover:text-[#CCD0D7] transition-colors cursor-pointer"
                        >
                          Email Marketing
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => {
                            scrollToProductCycleSection("pc-promotions");
                            mixpanel.track(
                              "Web Navbar Services - Promotions/Discounts Clicked",
                              { location: "Web Navbar Services" }
                            );
                          }}
                          className="text-left w-full text-white text-sm font-nohemi font-[400] hover:text-[#CCD0D7] transition-colors cursor-pointer"
                        >
                          Promotions / Discounts
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => {
                            scrollToProductCycleSection("pc-marketing-insights");
                            mixpanel.track(
                              "Web Navbar Services - Marketing Insights Clicked",
                              { location: "Web Navbar Services" }
                            );
                          }}
                          className="text-left w-full text-white text-sm font-nohemi font-[400] hover:text-[#CCD0D7] transition-colors cursor-pointer"
                        >
                          Marketing Insights
                        </button>
                      </li>
                    </ul>
                  </div>

                  {/* Discover Column */}
                  <div>
                    <h3 className="text-white text-sm font-instrument-serif font-[400] mb-2">
                      Discover
                    </h3>
                    <ul className="space-y-1 ml-2">
                      <li>
                        <button
                          onClick={() => {
                            scrollToProductCycleSection("pc-mini-portfolio");
                            mixpanel.track(
                              "Web Navbar Services - Mini Portfolio Clicked",
                              { location: "Web Navbar Services" }
                            );
                          }}
                          className="text-left w-full text-white text-sm font-nohemi font-[400] hover:text-[#CCD0D7] transition-colors cursor-pointer"
                        >
                          Mini Portfolio
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => {
                            scrollToProductCycleSection("pc-discovery-channel");
                            mixpanel.track(
                              "Web Navbar Services - Discovery Channel Clicked",
                              { location: "Web Navbar Services" }
                            );
                          }}
                          className="text-left w-full text-white text-sm font-nohemi font-[400] hover:text-[#CCD0D7] transition-colors cursor-pointer"
                        >
                          Discovery Channel
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>

          <Link
            href="/pricing"
            className={`w-fit px-4 py-2 flex items-center justify-center rounded-3xl border border-[#4e4e4e87] bg-[#1f1f1f9e] shadow-[inset_0_2.39px_2.29px_rgba(0,0,0,0.25),0_2.29px_2.29px_rgba(0,0,0,0.25)] cursor-pointer hover:contrast-125 transition-all hover:-translate-y-0.5 text-xs md:text-[10px] leading-none ${
              isServicesDropdownOpen ? "blur-sm" : ""
            }`}
            onClick={() => {
              mixpanel.track("Web Navbar - Pricing Clicked", {
                location: "Web Navbar",
              });
            }}
          >
            <p className="leading-none mt-0.5 text-xs font-nohemi font-[400]">
              PRICING
            </p>
          </Link>

          <Link
            href="#contact"
            onClick={() => {
              handleNavClick("contact");
              mixpanel.track("Web Navbar - Contact Us Clicked", {
                location: "Web Navbar",
              });
            }}
            className={`w-fit px-4 py-2 flex items-center justify-center rounded-3xl border border-[#4e4e4e87] bg-[#1f1f1f9e] shadow-[inset_0_2.39px_2.29px_rgba(0,0,0,0.25),0_2.29px_2.29px_rgba(0,0,0,0.25)] cursor-pointer hover:contrast-125 transition-all hover:-translate-y-0.5 text-xs md:text-[10px] leading-none ${
              isServicesDropdownOpen ? "blur-sm" : ""
            }`}
          >
            <p className="leading-none mt-0.5 text-xs font-nohemi font-[400]">
              CONTACT US
            </p>
          </Link>
        </div>
        <Link
          href="https://app.astrix.live"
          target="_blank"
          rel="noopener noreferrer"
          className={`hidden md:inline-flex w-fit px-4 py-2 items-center justify-center rounded-3xl border border-[#4e4e4e87] bg-[#3c3c3cbf] cursor-pointer hover:contrast-125 transition-all hover:-translate-y-0.5 text-xs md:text-[10px] leading-none ${
            isServicesDropdownOpen ? "blur-sm" : ""
          }`}
          onClick={() => {
            mixpanel.track("Web Navbar - Get Started Clicked", {
              location: "Web Navbar",
            });
          }}
        >
          <p className="leading-none mt-0.5 text-xs font-nohemi font-[400]">
            GET STARTED
          </p>
        </Link>

        <button
          className="md:hidden text-white z-50"
          onClick={() => {
            setIsMenuOpen(!isMenuOpen);
            mixpanel.track("Mobile Navbar - Mobile Menu Opened", {
              location: "Mobile Navbar",
            });
          }}
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
      </nav>

      <div
        className={`relative z-10 bottom-40 flex h-fit md:h-[45vh] flex-col items-center justify-between px-4 md:px-8 gap-10 md:gap-0 ${
          isServicesDropdownOpen && !isMobile ? "blur-sm" : ""
        }`}
      >
        <div className="text-center w-full h-fit max-w-full md:max-w-[80%] flex flex-col justify-around gap-10 md:gap-14">
          <h1 className="text-2xl md:text-[70px] text-center font-nohemi font-[400] text-white leading-[100%]">
            A platform built for curators to distribute, retarget and identify their audience with data
            {/* An omnichannel platform */}
            {/* <br />
            <span className="ml-10 md:ml-28">to distribute, retarget and identify</span>
            <br />
            <span className="ml-8 md:ml-0">their audience with data</span> */}
          </h1>

          <div className="flex flex-row gap-3 sm:gap-4 justify-center items-center">
            <Link
              href="https://app.astrix.live"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                mixpanel.track("Hero Section - Get Started Button Clicked", {
                  location: "Hero Section",
                })
              }
              className="w-fit px-3 md:px-5 py-[10px] md:py-[14px] h-[30px] md:h-[40px] flex items-center justify-center rounded-3xl border border-[#4e4e4e87] bg-[#FFFFFF] shadow-[inset_0_2.39px_2.29px_rgba(0,0,0,0.25),0_2.29px_2.29px_rgba(0,0,0,0.25)] cursor-pointer hover:contrast-125 transition-all hover:-translate-y-0.5 text-[#0F0F0F] text-[10px] md:text-[10px] leading-none"
            >
              <p className="leading-none mt-0.5 text-xs md:text-sm font-nohemi font-[400] text-shadow-md">
                GET STARTED
              </p>
            </Link>
            <Link
              href="#contact"
              onClick={() => {
                handleNavClick("contact");
                mixpanel.track("Hero Section - Book A Demo Button Clicked", {
                  location: "Hero Section",
                });
              }}
              className="w-fit flex items-center justify-center px-3 md:px-5 py-[10px] md:py-[14px]  h-[30px] md:h-[40px]   rounded-3xl border border-[#4e4e4e87] bg-[#3c3c3c7b] shadow-[inset_0_2.39px_2.29px_rgba(0,0,0,0.25),0_2.29px_2.29px_rgba(0,0,0,0.25)] cursor-pointer hover:contrast-125 transition-all hover:-translate-y-0.5 text-[10px] md:text-[10px] leading-none"
            >
              <p className="leading-none mt-0.5 text-xs md:text-sm font-nohemi font-[400] text-shadow-md">
                BOOK A DEMO
              </p>
            </Link>
          </div>
        </div>
        <div className="relative w-full h-[30vh] md:hidden z-30">
          <video
            ref={mobileVideoRef}
            className="hero-video object-cover w-full h-full"
            loop
            muted
            playsInline
            webkit-playsinline="true"
            preload="auto"
            disablePictureInPicture
            disableRemotePlayback
            x-webkit-airplay="deny"
            autoPlay={false}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              zIndex: 30,
              WebkitTransform: "translate3d(0, 0, 0)",
              transform: "translate3d(0, 0, 0)",
              backfaceVisibility: "hidden" as const,
              WebkitBackfaceVisibility: "hidden" as const,
            }}
          >
            {/* iOS mobile uses mp4, Android mobile uses webm */}
            {isIOS ? (
              <source
                src="/Assets/Images/HeroSectionMobile.mp4"
                type="video/mp4"
              />
            ) : (
              <source
                src="/Assets/Images/HeroSectionMobile.webm"
                type="video/webm"
              />
            )}
            Your browser does not support the video tag.
          </video>
        </div>
      </div>

      <div
        className="absolute bottom-2 left-1/2 transform -translate-x-1/2 z-10 cursor-pointer"
        onClick={() => {
          window.scrollBy({
            top: window.innerHeight * 0.9,
            behavior: "smooth",
          });
          mixpanel.track("Hero Section - Scroll to Down Arrow Clicked", {
            location: "Hero Section",
          });
        }}
      >
        <div className="flex flex-col items-center text-white">
          <div className="animate-bounce relative w-4 h-4">
            {/* Double down arrow using the DownArrow.svg image, stacked */}
            <Image
              src="/Assets/Icons/DownArrow.svg"
              alt="Down Arrow"
              fill
              draggable={false}
            />
            <Image
              src="/Assets/Icons/DownArrow.svg"
              alt="Down Arrow"
              fill
              className="-mt-1.5"
              draggable={false}
            />
          </div>
          <span className="text-xs mt-2 font-nohemi font-[300] text-[#9C9C9C]">
            Scroll To Explore
          </span>
        </div>
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
                objectFit="contain"
              />
            </div>
            <button
              onClick={() => {
                setIsMenuOpen(false);
                mixpanel.track("Mobile Navbar - Mobile Menu Closed", {
                  location: "Mobile Navbar",
                });
              }}
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
            <Link
              href="/about"
              rel="noopener noreferrer"
              className="text-white text-xs font-nohemi font-[400] py-2 px-4 hover:text-[#CCD0D7] hover:bg-[#1F1F1F] transition-colors text-shadow-sm"
              onClick={() => {
                setIsMenuOpen(false);
                mixpanel.track("Mobile Navbar - About Clicked", {
                  location: "Mobile Navbar",
                });
              }}
            >
              ABOUT
            </Link>

            <Link
              href="/pricing"
              rel="noopener noreferrer"
              className="text-white text-xs font-nohemi font-[400] py-2 px-4 hover:text-[#CCD0D7] hover:bg-[#1F1F1F] transition-colors text-shadow-sm"
              onClick={() => {
                setIsMenuOpen(false);
                mixpanel.track("Mobile Navbar - Pricing Clicked", {
                  location: "Mobile Navbar",
                });
              }}
            >
              ABOUT
            </Link>

            {/* Services Dropdown for Mobile */}
            <div className="space-y-3">
              <button
                onClick={() => {
                  setIsServicesDropdownOpenMobile(
                    !isServicesDropdownOpenMobile
                  );
                  mixpanel.track("Mobile Navbar - Services Toggled", {
                    location: "Mobile Navbar",
                  });
                }}
                className={`flex py-2 px-4 hover:bg-[#1F1F1F] items-center justify-between w-full text-white text-xs font-nohemi font-[400] hover:text-[#CCD0D7] transition-colors text-shadow-sm ${
                  isServicesDropdownOpenMobile && "bg-[#1F1F1F]"
                }`}
              >
                <span>{`SERVICES`}</span>
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
                          onClick={() => {
                            handleNavClick("pc-create-event");
                            mixpanel.track(
                              "Mobile Navbar Services - Create Event Clicked",
                              {
                                location: "Mobile Navbar Services",
                              }
                            );
                          }}
                          className="text-left w-full text-white text-xs font-nohemi font-[400] hover:text-[#CCD0D7] transition-colors"
                        >
                          Create Event
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => {
                            handleNavClick("pc-issue-tickets");
                            mixpanel.track(
                              "Mobile Navbar Services - Issue Tickets Clicked",
                              {
                                location: "Mobile Navbar Services",
                              }
                            );
                          }}
                          className="text-left w-full text-white text-xs font-nohemi font-[400] hover:text-[#CCD0D7] transition-colors"
                        >
                          Issue Tickets
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => {
                            handleNavClick("pc-purchase-rsvp");
                            mixpanel.track(
                              "Mobile Navbar Services - Purchase/RSVP Clicked",
                              {
                                location: "Mobile Navbar Services",
                              }
                            );
                          }}
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
                          onClick={() => {
                            handleNavClick("pc-data-insights");
                            mixpanel.track(
                              "Mobile Navbar Services - Data Insights Clicked",
                              {
                                location: "Mobile Navbar Services",
                              }
                            );
                          }}
                          className="text-left w-full text-white text-xs font-nohemi font-[400] hover:text-[#CCD0D7] transition-colors"
                        >
                          Data Insights
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => {
                            handleNavClick("pc-email-marketing");
                            mixpanel.track(
                              "Mobile Navbar Services - Email Marketing Clicked",
                              {
                                location: "Mobile Navbar Services",
                              }
                            );
                          }}
                          className="text-left w-full text-white text-xs font-nohemi font-[400] hover:text-[#CCD0D7] transition-colors"
                        >
                          Email Marketing
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => {
                            handleNavClick("pc-promotions");
                            mixpanel.track(
                              "Mobile Navbar Services - Promotions/Discounts Clicked",
                              {
                                location: "Mobile Navbar Services",
                              }
                            );
                          }}
                          className="text-left w-full text-white text-xs font-nohemi font-[400] hover:text-[#CCD0D7] transition-colors"
                        >
                          Promotions / Discounts
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => {
                            handleNavClick("pc-marketing-insights");
                            mixpanel.track(
                              "Mobile Navbar Services - Marketing Insights Clicked",
                              {
                                location: "Mobile Navbar Services",
                              }
                            );
                          }}
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
                          onClick={() => {
                            handleNavClick("pc-mini-portfolio");
                            mixpanel.track(
                              "Mobile Navbar Services - Mini Portfolio Clicked",
                              {
                                location: "Mobile Navbar Services",
                              }
                            );
                          }}
                          className="text-left w-full text-white text-xs font-nohemi font-[400] hover:text-[#CCD0D7] transition-colors"
                        >
                          Mini Portfolio
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => {
                            handleNavClick("pc-discovery-channel");
                            mixpanel.track(
                              "Mobile Navbar Services - Discovery Channel Clicked",
                              {
                                location: "Mobile Navbar Services",
                              }
                            );
                          }}
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
              onClick={() => {
                setIsMenuOpen(false);
                mixpanel.track("Mobile Navbar - Resources Clicked", {
                  location: "Mobile Navbar",
                });
              }}
            >
              RESOURCES
            </Link>

            <Link
              href="#contact"
              onClick={() => {
                setIsMenuOpen(false);
                handleNavClick("contact");
                mixpanel.track("Mobile Navbar - Contact Us Clicked", {
                  location: "Mobile Navbar",
                });
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
                  mixpanel.track("Mobile Navbar - Get Started Clicked", {
                    location: "Mobile Navbar",
                  });
                }}
              >
                <p className="leading-none">GET STARTED</p>
              </Link>
              <Link
                href="https://app.astrix.live"
                target="_blank"
                rel="noopener noreferrer"
                className="w-fit px-3 py-1 flex items-center font-nohemi font-[400] justify-center rounded-3xl border border-[#4e4e4e87] bg-[#3c3c3cbf] shadow-[inset_0_2.39px_2.29px_rgba(0,0,0,0.25),0_2.29px_2.29px_rgba(0,0,0,0.25)] cursor-pointer hover:opacity-90 transition-all hover:-translate-y-0.5 text-white text-[10px] leading-none text-shadow-sm"
                onClick={() => {
                  setIsMenuOpen(false);
                  handleNavClick("contact");
                  mixpanel.track("Mobile Navbar - Book A Demo Clicked", {
                    location: "Mobile Navbar",
                  });
                }}
              >
                <p className="leading-none mt-0.5">BOOK A DEMO</p>
            </Link>
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
    </section>
  );
}

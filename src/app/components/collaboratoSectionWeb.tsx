"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { collaborators } from "@/utils/Data";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface CollaboratorSectionProps {
  className?: string;
}

export default function CollaboratorSectionWeb({
  className,
}: CollaboratorSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = cardsRef.current;
    const section = sectionRef.current;
    if (!cards || !section) return;

    // Detect Safari for optimization
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    const isMobile = window.innerWidth < 768;

    if (isMobile) {
      // Mobile: iOS-optimized auto-scroll with proper manual scroll detection
      let autoScrollInterval: NodeJS.Timeout | null = null;
      let userScrollTimeout: NodeJS.Timeout | null = null;
      let lastScrollLeft = 0;
      let lastScrollTime = Date.now();
      let isUserInteracting = false;

      const scrollContainer = section.querySelector(
        ".scroll-container"
      ) as HTMLElement;
      if (!scrollContainer) return;

      // Detect iOS for special handling
      const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);

      // Auto-scroll function
      const startAutoScroll = () => {
        if (autoScrollInterval) {
          clearInterval(autoScrollInterval);
        }

        autoScrollInterval = setInterval(() => {
          // Don't auto-scroll if user is interacting
          if (isUserInteracting) return;

          const maxScroll =
            scrollContainer.scrollWidth - scrollContainer.clientWidth;
          const currentScroll = scrollContainer.scrollLeft;

          // Auto-scroll or loop back
          if (currentScroll >= maxScroll - 5) {
            scrollContainer.scrollLeft = 0;
            lastScrollLeft = 0;
          } else {
            scrollContainer.scrollLeft = currentScroll + 2;
            lastScrollLeft = currentScroll + 2;
          }

          lastScrollTime = Date.now();
        }, 16); // ~60fps
      };

      // Stop auto-scroll
      const stopAutoScroll = () => {
        if (autoScrollInterval) {
          clearInterval(autoScrollInterval);
          autoScrollInterval = null;
        }
      };

      // iOS-specific: Use pointer events for better compatibility
      const handlePointerDown = (e: PointerEvent) => {
        // Only handle touch pointers, not mouse
        if (e.pointerType === "touch" || e.pointerType === "pen") {
          isUserInteracting = true;
          stopAutoScroll();
        }
      };

      const handlePointerUp = (e: PointerEvent) => {
        if (e.pointerType === "touch" || e.pointerType === "pen") {
          isUserInteracting = false;

          // Resume auto-scroll after delay
          if (userScrollTimeout) {
            clearTimeout(userScrollTimeout);
          }
          userScrollTimeout = setTimeout(() => {
            startAutoScroll();
          }, 1500); // Longer delay for iOS momentum scrolling
        }
      };

      // Scroll event to detect manual scrolling (works on both iOS and Android)
      const handleScroll = () => {
        const currentScroll = scrollContainer.scrollLeft;
        const scrollDelta = Math.abs(currentScroll - lastScrollLeft);
        const timeDelta = Date.now() - lastScrollTime;

        // Detect fast scrolling (user-initiated) vs slow scrolling (auto-scroll)
        // Auto-scroll: 2px every 16ms = ~125px/s
        // User scroll: Usually much faster, especially on iOS with momentum
        const scrollSpeed = (scrollDelta / (timeDelta || 1)) * 1000; // px/s

        // If scrolling faster than auto-scroll or scrolling backwards
        if (scrollSpeed > 150 || currentScroll < lastScrollLeft) {
          isUserInteracting = true;
          stopAutoScroll();

          // Clear existing timeout
          if (userScrollTimeout) {
            clearTimeout(userScrollTimeout);
          }

          // Resume auto-scroll after user stops scrolling
          userScrollTimeout = setTimeout(() => {
            isUserInteracting = false;
            startAutoScroll();
          }, 1500); // Longer delay for iOS momentum scrolling
        }

        lastScrollLeft = currentScroll;
        lastScrollTime = Date.now();
      };

      // Android: Use touch events
      const handleTouchStart = () => {
        isUserInteracting = true;
        stopAutoScroll();
      };

      const handleTouchEnd = () => {
        isUserInteracting = false;
        if (userScrollTimeout) {
          clearTimeout(userScrollTimeout);
        }
        userScrollTimeout = setTimeout(() => {
          startAutoScroll();
        }, 1000);
      };

      // Use both pointer events (modern, iOS-friendly) and touch events (fallback)
      if (isIOS) {
        // iOS: Prefer pointer events
        scrollContainer.addEventListener(
          "pointerdown",
          handlePointerDown as EventListener,
          { passive: true }
        );
        scrollContainer.addEventListener(
          "pointerup",
          handlePointerUp as EventListener,
          { passive: true }
        );
        scrollContainer.addEventListener(
          "pointercancel",
          handlePointerUp as EventListener,
          { passive: true }
        );
      } else {
        // Android: Use touch events
        scrollContainer.addEventListener("touchstart", handleTouchStart, {
          passive: true,
        });
        scrollContainer.addEventListener("touchend", handleTouchEnd, {
          passive: true,
        });
        scrollContainer.addEventListener("touchcancel", handleTouchEnd, {
          passive: true,
        });
      }

      // Scroll event works on both platforms
      scrollContainer.addEventListener("scroll", handleScroll, {
        passive: true,
      });

      // Start auto-scroll immediately
      lastScrollLeft = scrollContainer.scrollLeft;
      startAutoScroll();

      // Cleanup
      return () => {
        stopAutoScroll();
        if (userScrollTimeout) {
          clearTimeout(userScrollTimeout);
        }

        if (isIOS) {
          scrollContainer.removeEventListener(
            "pointerdown",
            handlePointerDown as EventListener
          );
          scrollContainer.removeEventListener(
            "pointerup",
            handlePointerUp as EventListener
          );
          scrollContainer.removeEventListener(
            "pointercancel",
            handlePointerUp as EventListener
          );
        } else {
          scrollContainer.removeEventListener("touchstart", handleTouchStart);
          scrollContainer.removeEventListener("touchend", handleTouchEnd);
          scrollContainer.removeEventListener("touchcancel", handleTouchEnd);
        }
        scrollContainer.removeEventListener("scroll", handleScroll);
      };
    } else {
      // Desktop: ScrollTrigger animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=500%", // 4x the viewport height for horizontal scroll
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          fastScrollEnd: isSafari, // Safari-specific optimization
        },
      });

      // Animate cards sliding from right to left
      tl.to(cards, {
        x: () => -(cards.scrollWidth + 200 - window.innerWidth + 200), // Add extra padding to reach last card
        ease: "none",
      });

      // Also respond to horizontal wheel gestures (trackpads) by translating
      // horizontal delta into vertical scroll so the pinned timeline scrubs.
      const handleWheel = (e: WheelEvent) => {
        // Only react when horizontal intent is stronger than vertical
        if (!section.contains(e.target as Node)) return;
        const absX = Math.abs(e.deltaX);
        const absY = Math.abs(e.deltaY);
        if (absX > absY && absX > 0) {
          e.preventDefault();
          // Map horizontal movement to vertical scroll to drive ScrollTrigger
          // Boost factor to roughly match the feel of vertical wheel speed
          const speedFactor = 3; // tune for parity with deltaY feel
          window.scrollBy({ top: e.deltaX * speedFactor, behavior: "auto" });
        }
      };
      window.addEventListener("wheel", handleWheel, { passive: false });

      // Safari-specific delayed refresh to prevent rendering issues
      if (isSafari) {
        gsap.delayedCall(1.5, () => {
          ScrollTrigger.refresh();
        });
      }

      return () => {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        window.removeEventListener("wheel", handleWheel as EventListener);
      };
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`h-screen bg-[#0A0A0A] flex flex-col md:flex-row items-start md:items-center overflow-hidden ${
        className || ""
      }`}
    >
      <div className="w-full mx-auto px-8 flex gap-[152px] items-start md:items-center h-full">
        {/* Section Title - Top on mobile, Left on desktop */}
        <div className="flex-shrink-0 md:w-fit pt-8 md:pt-0 w-full">
          <h2 className="text-[32px] font-instrument-serif font-[400] md:text-3xl lg:text-7xl text-[#F0E9B2] leading-tight">
            Collaborators
          </h2>
          <p className="text-[20px]  text-[#949494] md:text-[#E4E4E4] font-nohemi font-[300]  mt-2 text-right">
            2024-25
          </p>
        </div>

        {/* Horizontal Scrolling Cards - Below title on mobile, Right side on desktop */}
        <div
          className="flex-1 relative h-[60vh] md:h-[80vh] w-full scroll-container overflow-x-scroll md:overflow-hidden scrollbar-hide"
          style={{
            WebkitOverflowScrolling: "touch",
            overscrollBehaviorX: "none",
            touchAction: "pan-x pan-y", 
          }}
        >
          <div
            ref={cardsRef}
            className={`flex gap-[200px] justify-start px-12 h-full bg-[#0A0A0A]`}
            style={{
              width: "max-content",
            }}
          >
            {collaborators.map((collaborator, index) => (
              <div
                key={index}
                className={`flex-shrink-0 cursor-pointer bg-transparent flex ${
                  collaborator?.random % 2 === 0
                    ? "items-center"
                    : "items-start"
                 
                }`}
                style={{ width: "fit-content" }}
              >
                <div className="relative group">
                  {/* Image - Maintain original aspect ratio */}
                  <div className="relative overflow-hidden">
                    {collaborator?.image ? (
                      <Image
                        src={collaborator?.image}
                        alt={collaborator?.title}
                        width={350}
                        height={400}
                        loading={index < 2 ? "eager" : "lazy"}
                        className="w-auto h-auto max-w-none transition-transform group-hover:scale-105"
                        style={{
                          width: "auto",
                          height: "auto",
                          maxHeight: "400px",
                          maxWidth: "350px",
                        }}
                      />
                    ) : (
                      <div
                        className="w-[350px] h-[400px] animate-pulse bg-[#232323] rounded"
                        style={{ width: "350px", height: "400px" }}
                      />
                    )}
                  </div>

                  {/* Content */}
                  <div className="space-y-3 pl-4 border-l-[0.5px] border-[#E4E4E4] pt-6">
                    <h3 className="text-lg md:text-3xl font-nohemi font-[300] text-[#E4E4E4] leading-tight">
                      {collaborator.title}
                    </h3>
                    <p className="text-xs md:text-[10px] text-[#9C9C9C] font-switzer font-[400] break-words leading-relaxed max-w-[350px]">
                      {collaborator.description}
                    </p>
                    <div className="text-[12px] md:text-[8px] text-[#E4E4E4] font-nohemi font-[400] tracking-wider">
                      {collaborator.category}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom-right skip control */}
      <button
        onClick={() => {
          const next = document.getElementById('growth-cycle-root');
          if (next) {
            next.scrollIntoView({ behavior: 'smooth', block: 'start' });
          } else {
            window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
          }
        }}
        className="absolute bottom-6 cursor-pointer transition-all duration-300 right-6 z-50 flex items-center gap-2"
        aria-label="Skip to next section"
      >
        <div className="flex flex-row items-center gap-3 text-white">
          <span className="text-xs font-nohemi font-[300] text-[#9C9C9C] hover:text-white transition-colors">
            Skip To Next Section
          </span>
          <div className="relative -rotate-90 w-3 h-3">
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
              className="-mt-[6px]"
              draggable={false}
            />
          </div>
        </div>
      </button>
    </section>
  );
}

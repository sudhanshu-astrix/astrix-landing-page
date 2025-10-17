"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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

      // Safari-specific delayed refresh to prevent rendering issues
      if (isSafari) {
        gsap.delayedCall(1.5, () => {
          ScrollTrigger.refresh();
        });
      }

      return () => {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    }
  }, []);

  // Collaborator data matching the design
  const collaborators = [
    {
      title: "Ranj x Clifr",
      description:
        "PLAY ME! tour with Meba Ofilia - EP launch shows across Shillong, Mumbai, and Bangalore, powered by Jameson Connects Jam Pad.",
      category: "Artists",
      image: "/Assets/Images/Slider/Slide1.svg",
      random: 0,
    },
    {
      title: "Flipside Vol.1",
      description:
        "Ticketing partner for Flipside Vol.1 — packed out Nehru Place Social with 600+ people for a lineup featuring Collesttye, Ghildiyal, ZerøKaata, The Seige and Dhanji.",
      category: "Event Organisers",
      image: "/Assets/Images/Slider/Slide2.svg",
      random: 1,
    },
    {
      title: "Muzzle",
      description:
        "Collaborated for Muzzle’s debut EP, October Baby launch party at Depot48, Delhi – his first ever India pop-out.",
      category: "Artists",
      image: "/Assets/Images/Slider/Slide3.svg",
      random: 2,
    },
    {
      title: "Extra Butter New York",
      description:
        "Partnered with Extra Butter for the India preview party of BAPE’s launch.",
      category: "Venue",
      image: "/Assets/Images/Slider/Slide4.svg",
      random: 3,
    },
    {
      title: "Dohnraj",
      description:
        "Ticketing partner for a show featuring Dee En, Dohnraj & The Peculiars and Fringe Mechanics at the multidisciplinary space – Mool, New Delhi.",
      category: "Artists",
      image: "/Assets/Images/Slider/Slide5.svg",
      random: 4,
    },
    {
      title: "The House Guest",
      description:
        "Ticketed a secret-location show (address revealed only to buyers) with Shwe G and Acharya on decks.",
      category: "Event Organisers",
      image: "/Assets/Images/Slider/Slide6.svg",
      random: 5,
    },
    {
      title: "This ?",
      description:
        "Partnered with This? and Sony Music for an intimate Dhruv Singh listening session, hosted at Rolling Stone India.",
      category: "Creative Consultancy",
      image: "/Assets/Images/Slider/Slide7.svg",
      random: 6,
    },
    {
      title: "karun nanku, lnf",
      description:
        "Karun Nanku Live in Ahmedabad at Niro’s, hosted by LeaveNoFingerprints.",
      category: "Event Organisers",
      image: "/Assets/Images/Slider/Slide8.svg",
      random: 7,
    },
    {
      title: "Frappe ash",
      description: "Delhi leg of his Junkie Tour, hosted by Hot Sauce.",
      category: "Artists",
      image: "/Assets/Images/Slider/Slide9.svg",
      random: 8,
    },
    {
      title: "Pursue Hard Seltzer",
      description: "Brand partner for the BAPE launch at Extra Butter, Mumbai.",
      category: "Brands",
      image: "/Assets/Images/Slider/Slide10.svg",
      random: 9,
    },
    {
      title: "BAPE Preview Launch",
      description:
        "Curated BAPE’s first India outing with Pursue and Jägermeister. Prithvi and Gandhar on the decks. ",
      category: "Brands",
      image: "/Assets/Images/Slider/Slide11.svg",
      random: 10,
    },
    {
      title: "Jagermeister",
      description: "Brand partner for the BAPE launch at Extra Butter, Mumbai.",
      category: "Brands",
      image: "/Assets/Images/Slider/Slide12.svg",
      random: 11,
    },
    {
      title: "Darzi",
      description:
        "We partnered with Darzi to ticket his 3rd Year Album Anniversary at One8 Commune, Gurgaon.",
      category: "Event Organisers",
      image: "/Assets/Images/Slider/Slide13.svg",
      random: 12,
    },
    {
      title: "Blood Diamond",
      description:
        "SUBVERSE at Odella Green Park was an underground takeover – with Maurya, Blood Diamond Collective, and Rasa.",
      category: "Event Organisers",
      image: "/Assets/Images/Slider/Slide14.svg",
      random: 13,
    },
    {
      title: "For the fans",
      description:
        "When NH7 Weekender got cancelled, artists like Chaar Diwari, Yung Sammy, Bharg, AB!, Oliver Cronin, and Shreyas! rallied together. Their free gig at FC Road Social, Pune, was for the community and by the community. We were proud ticketing partners on a night that embodied our ethos.",
      category: "Event",
      image: "/Assets/Images/Slider/Slide15.svg",
      random: 14,
    },
    {
      title: "Compass Box Studio",
      description:
        "One of our first collabs – ticketing for The Blues Experience at Blockheads Vinyl Café, Ahmedabad. ",
      category: "Event Organisers",
      image: "/Assets/Images/Slider/Slide16.svg",
      random: 15,
    },
    {
      title: "&Friends",
      description:
        "Curated by Prithvi, &Friends Vol.4 landed on Friendship Day at Khar Social. Karaoke, cyphers, tattoos, and collabs with Superkicks + Extra Butter made it a full-circle celebration.",
      category: "Event Organisers",
      image: "/Assets/Images/Slider/Slide17.svg",
      random: 16,
    },
    {
      title: "Frostbite",
      description:
        "Frostbite brought fashion and music together at their launch event at Slink & Bardot, Mumbai. ",
      category: "Brands",
      image: "/Assets/Images/Slider/Slide18.svg",
      random: 17,
    },
    {
      title: "LeaveNoFingerprints",
      description:
        "Ahmedabad’s underground tastemakers. From Karun Nanku’s explosive set to Yashraj’s showcase, we partnered with LNF to ticket their events. ",
      category: "Event Organisers",
      image: "/Assets/Images/Slider/Slide19.svg",
      random: 18,
    },
  ];

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
                    <img
                      src={collaborator?.image}
                      alt={collaborator?.title}
                      className="w-auto h-auto max-w-none transition-transform group-hover:scale-105"
                      style={{
                        width: "auto",
                        height: "auto",
                        maxHeight: "400px",
                        maxWidth: "350px",
                      }}
                    />
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
    </section>
  );
}

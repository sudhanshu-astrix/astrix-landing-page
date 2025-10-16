"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function GrowthCycleSection({ className }: { className?: string }) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const circles = gsap.utils.toArray<HTMLDivElement>(".circle");
      const texts = gsap.utils.toArray<HTMLElement>(".circle-text");
      const cards = gsap.utils.toArray<HTMLElement>(".card");

      if (circles.length < 5) return;

      // Detect Safari for optimization
      const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

      // Get circle radius dynamically (from first circle)
      const circleSize = circles[0].offsetWidth;
      const r = circleSize / 2;
      
      // Adjust move distance based on screen size
      const isMobile = window.innerWidth < 768; // detect mobile
      const isSmallMobile = window.innerWidth < 480; // detect very small screens
      
      let move;
      if (isSmallMobile) {
        move = Math.sqrt(2) * r - r / 2.45; // smaller move for very small screens
      } else if (isMobile) {
        move = Math.sqrt(2) * r - r / 3; // slightly smaller move for mobile
      } else {
        move = Math.sqrt(2) * r - r / 2.4; // original move for desktop
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "center center",
          end: isMobile ? "+=6000" : "+=3000", // Reduced from 8000 to 6000 for better control
          scrub: isSafari && isMobile ? 0.5 : true, // Less smooth but faster on Safari mobile
          pin: true,
          anticipatePin: 1,
          fastScrollEnd: isSafari, // Safari-specific optimization
          onLeave: () => {
            // Ensure smooth transition when leaving section
            ScrollTrigger.refresh();
          },
        },
      });

      // Step 1: Expand circles outward diagonally
      tl.to(circles[1], { x: -move, y: -move }, 0)
        .to(circles[2], { x: move, y: -move }, 0)
        .to(circles[3], { x: move, y: move }, 0)
        .to(circles[4], { x: -move, y: move }, 0);

      // Step 2: Reveal texts clockwise (white text)
      tl.to(texts[0], { opacity: 1 }, ">")
        .to(texts[1], { opacity: 1 }, ">")
        .to(texts[2], { opacity: 1 }, ">")
        .to(texts[3], { opacity: 1 }, ">");

      // Step 3: Fade circles and texts to 50% opacity
      tl.to(circles, { opacity: 0.7 }, ">")
        .to(texts, { opacity: 0.8 }, "<");

      // Step 4: Cards animation
      if (isMobile) {
        // Mobile: True vertical carousel - only one card visible at a time
        const viewportHeight = window.innerHeight;
        
        // Set initial positions - all cards start hidden below viewport
        cards.forEach((card, i) => {
          gsap.set(card, {
            y: `${(i + 1) * viewportHeight}px`, // All cards start below viewport
            opacity: 0, // All cards hidden initially
            position: "absolute",
            left: "50%",
            top: "50%",
            xPercent: -50,
            yPercent: -50,
            force3D: true, // GPU acceleration for smoother mobile animations
          });
        });
      
        // Create sequential card reveal animation - all cards follow same pattern
        // Adjusted timing for smoother, controlled transitions (6000 scroll distance)
        cards.forEach((card, i) => {
          const cardHeight = viewportHeight;
          
          // All cards: slide in from below, hold, slide out to top
          tl.to(card, { 
            opacity: 1,
            y: "0px", 
            duration: 2.0, // Balanced slide in timing
            ease: "power2.out",
            force3D: true // GPU acceleration
          }, ">") // Start after previous card
          .to(card, { 
            duration: 2.5 // Hold card visible (balanced timing)
          })
          .to(card, { 
            opacity: 0,
            y: `-${cardHeight}px`, // Slide out to top
            duration: 1.5, // Smooth slide out
            ease: "power2.in",
            force3D: true // GPU acceleration
          }); // Slide out to make room for next card
        });
      } else {
        // Desktop: show all 3 together
        tl.fromTo(
          cards,
          { x: 400, y: -180, opacity: 0 },
          { x: 0, opacity: 1, stagger: 0.3 },
          ">" // after fade effect
        );
      }
    }, sectionRef);

    // Safari-specific delayed refresh to prevent rendering issues
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    if (isSafari) {
      gsap.delayedCall(1.5, () => {
        ScrollTrigger.refresh();
      });
    }

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* Growth Cycle Section */}
      <section
        ref={sectionRef}
        className={`${className || ''} h-fit min-h-screen bg-[#0A0A0A] flex flex-col justify-between py-10 gap-10 relative`}
      >
        <div className="w-full max-w-6xl mx-auto px-6 md:px-10 text-center">
          <h2 className="text-[48px] sm:text-[56px] md:text-[64px] leading-none text-[#F0E9B2] instrument-serif-regular">
            Growth Cycle
          </h2>
        </div>

        {/* Circular animation section */}
        <div className="w-full flex flex-1 md:h-[200vh] h-[80vh] relative overflow-hidden">
          {/* Background image */}
          <Image
            src="/Assets/Images/group23.svg"
            alt="texture background"
            fill
            className="absolute z-10 object-cover bg-[#0A0A0A]"
          />

          {/* Gradient overlays */}
          <div className="absolute inset-0 z-20 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-[#0A0A0A]"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-transparent to-[#0A0A0A]"></div>
            <div className="absolute inset-0 bg-gradient-to-l from-[#0A0A0A] via-transparent to-[#0A0A0A]"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-transparent to-[#0A0A0A]"></div>
          </div>

          {/* Noise effect background - above circles, below cards */}
          <Image
            src="/Assets/Images/NoiseEffectBg.svg"
            alt="noise texture"
            fill
            className="absolute z-25 object-cover"
            style={{ mixBlendMode: "multiply" }}
          />

          {/* Animation container */}
          <div className="w-full md:h-[200vh] h-[70vh] z-30 relative flex items-center justify-center px-4 sm:px-6 md:px-0">
            {/* Circles */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="circle w-[25%] sm:w-[28%] md:w-[40%] min-w-[200px] md:min-w-[360px] center border border-[#343434]"></div>
              <div className="circle w-[25%] sm:w-[28%] md:w-[40%] min-w-[200px] md:min-w-[360px] border border-[#343434]">
                <span className="circle-text text-[#ffffff5a] uppercase">Discover</span>
              </div>
              <div className="circle w-[25%] sm:w-[28%] md:w-[40%] min-w-[200px] md:min-w-[360px] border border-[#343434]">
                <span className="circle-text text-[#ffffff5a] uppercase">Connect</span>
              </div>
              <div className="circle w-[25%] sm:w-[28%] md:w-[40%] min-w-[200px] md:min-w-[360px] border border-[#343434]">
                <span className="circle-text text-[#ffffff5a] uppercase">Belong</span>
              </div>
              <div className="circle w-[25%] sm:w-[28%] md:w-[40%] min-w-[200px] md:min-w-[360px] border border-[#343434]">
                <span className="circle-text text-[#ffffff5a] uppercase">Cultivate</span>
              </div>
            </div>

            {/* Feature Cards */}
            <div className="w-full flex flex-col md:flex-row gap-6 md:gap-10 absolute top-[40%] md:top-[51%] left-1/2 transform -translate-x-1/2 md:translate-x-0 md:left-auto md:right-auto justify-around">
              {/* Distribution Tools Card */}
              <div className="card p-6 sm:p-8 md:p-6 w-full md:w-72 md:max-w-sm rounded-xl shadow-lg">
                <div className="flex flex-col items-center text-center space-y-4 md:space-y-2">
                  <div className="relative w-24 h-24 border-red-500 shadow-lg sm:w-24 sm:h-24 md:w-18 md:h-18 rounded-full flex items-center justify-center">
                    <Image
                      src={"/Assets/Icons/Distribute.svg"}
                      alt="distribute"
                      fill
                    />
                  </div>
                  <h3 className="text-4xl sm:text-3xl md:text-3xl font-nohemi500 text-[#E4E4E4] instrument-serif-regular">
                    Distribution <br /> Tools
                  </h3>
                  <p className="text-sm sm:text-base md:text-sm text-[#949494] font-switzer400 leading-relaxed">
                    Unified tools for distribution (e.g. tickets, marketing, rewards from a single dashboard)
                  </p>
                </div>
              </div>

              {/* Data Insights Card */}
              <div className="card p-6 sm:p-8 md:p-6 w-full md:w-72 md:max-w-sm rounded-xl shadow-lg">
                <div className="flex flex-col items-center text-center space-y-4 md:space-y-2">
                  <div className="relative w-24 h-24 sm:w-24 sm:h-24 md:w-18 md:h-18 rounded-full flex items-center justify-center">
                    <Image
                      src={"/Assets/Icons/Insight.svg"}
                      alt="insight"
                      fill
                    />
                  </div>
                  <h3 className="text-4xl sm:text-3xl md:text-3xl font-nohemi500 text-[#E4E4E4] instrument-serif-regular">
                    Data <br /> Insights
                  </h3>
                  <p className="text-sm sm:text-base md:text-sm text-[#949494] font-switzer400 leading-relaxed">
                    Target your fans with data- <br /> backed insights.
                  </p>
                </div>
              </div>

              {/* Third Spaces Card */}
              <div className="card p-6 sm:p-8 md:p-6 w-full md:w-72 md:max-w-sm rounded-xl shadow-lg">
                <div className="flex flex-col items-center text-center space-y-4 md:space-y-2">
                  <div className="relative w-24 h-24 sm:w-24 sm:h-24 md:w-18 md:h-18 rounded-full flex items-center justify-center">
                    <Image
                      src={"/Assets/Icons/Space.svg"}
                      alt="space"
                      fill
                    />
                  </div>
                  <h3 className="text-4xl sm:text-3xl md:text-3xl font-nohemi500 text-[#E4E4E4] instrument-serif-regular">
                    Third <br /> Spaces
                  </h3>
                  <p className="text-sm sm:text-base md:text-sm text-[#949494] font-switzer400 leading-relaxed">
                    Give your fans a dedicated portal leading to loyalty and authentic relationships
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          .circle {
            position: absolute;
            aspect-ratio: 1/1;
            border-radius: 50%;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
          .center {
            z-index: 10;
          }
          .circle-text {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-weight: thin;
            opacity: 0;
          }
          .card {
            position: relative;
            z-index: 40;
          }
          @media (max-width: 767px) {
            .card {
              position: absolute !important;
              left: 50% !important;
              top: 50% !important;
              width: 90vw !important;
              max-width: 90vw !important;
              height: 80vh !important;
              display: flex !important;
              align-items: center !important;
              justify-content: center !important;
              z-index: 50 !important;
            }
          }
        `}</style>
      </section>
    </>
  );
}

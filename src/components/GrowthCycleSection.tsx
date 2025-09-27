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

      // Get circle radius dynamically (from first circle)
      const circleSize = circles[0].offsetWidth;
      const r = circleSize / 2;
      
      // Adjust move distance based on screen size
      const isMobile = window.innerWidth < 768; // detect mobile
      const isSmallMobile = window.innerWidth < 480; // detect very small screens
      
      let move;
      if (isSmallMobile) {
        move = Math.sqrt(2) * r - r / 2.6; // smaller move for very small screens
      } else if (isMobile) {
        move = Math.sqrt(2) * r - r / 2.8; // slightly smaller move for mobile
      } else {
        move = Math.sqrt(2) * r - r / 2.5; // original move for desktop
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=3000",
          scrub: true,
          pin: true,
        },
      });

      // Step 1: Expand circles outward
      tl.to(circles[1], { x: -move, y: -move }, 0)
        .to(circles[2], { x: move, y: -move }, 0)
        .to(circles[3], { x: move, y: move }, 0)
        .to(circles[4], { x: -move, y: move }, 0);

      // Step 2: Reveal texts clockwise
      tl.to(texts[0], { opacity: 1 }, ">")
        .to(texts[1], { opacity: 1 }, ">")
        .to(texts[2], { opacity: 1 }, ">")
        .to(texts[3], { opacity: 1 }, ">");

      // Step 3: Cards animation
      if (isMobile) {
        // Ensure all cards start off-screen bottom and are properly positioned
        gsap.set(cards, { 
          y: "100vh", 
          opacity: 0,
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)"
        });
      
        cards.forEach((card, i) => {
          tl.to(card, { 
              y: "0vh", 
              opacity: 1, 
              duration: 0.8, 
              ease: "power2.out" 
            }, ">+0.5") // slide in from bottom
            .to(card, { 
              duration: 0.5 // hold in center 
            })
            .to(card, { 
              y: "-100vh", 
              opacity: 0, 
              duration: 0.8, 
              ease: "power2.in" 
            }); // slide out to top
        });
      } else {
        // Desktop: show all 3 together
        tl.fromTo(
          cards,
          { x: 400, y: -180, opacity: 0 },
          { x: 0, opacity: 1, stagger: 0.3 },
          ">+0.5"
        );
      }
    }, sectionRef);

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
        <div className="w-full flex flex-1 md:h-[100vh] h-[80vh] relative overflow-hidden">
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
          <div className="w-full md:h-[100vh] h-[80vh] z-30 relative flex items-center justify-center px-4 sm:px-6 md:px-0">
            {/* Circles */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="circle w-[15%] sm:w-[18%] md:w-[23%] min-w-[250px] md:min-w-[250px] center border border-[#343434]"></div>
              <div className="circle w-[15%] sm:w-[18%] md:w-[23%] min-w-[250px] md:min-w-[250px] border border-[#343434]">
                <span className="circle-text text-[#ffffff5a]">Discover</span>
              </div>
              <div className="circle w-[15%] sm:w-[18%] md:w-[23%] min-w-[250px] md:min-w-[250px] border border-[#343434]">
                <span className="circle-text text-[#ffffff5a]">Connect</span>
              </div>
              <div className="circle w-[15%] sm:w-[18%] md:w-[23%] min-w-[250px] md:min-w-[250px] border border-[#343434]">
                <span className="circle-text text-[#ffffff5a]">Belong</span>
              </div>
              <div className="circle w-[15%] sm:w-[18%] md:w-[23%] min-w-[250px] md:min-w-[250px] border border-[#343434]">
                <span className="circle-text text-[#ffffff5a]">Cultivate</span>
              </div>
            </div>

            {/* Feature Cards */}
            <div className="flex flex-col md:flex-row gap-6 md:gap-10 absolute top-[40%] md:top-[51%] left-1/2 transform -translate-x-1/2 md:translate-x-0 md:left-auto md:right-auto">
              {/* Distribution Tools Card */}
              <div className="card p-4 sm:p-6 w-72 sm:w-80 max-w-sm rounded-xl shadow-lg">
                <div className="flex flex-col items-center text-center space-y-2">
                  <div className="relative w-14 h-14 sm:w-20 sm:h-20 md:w-18 md:h-18 rounded-full flex items-center justify-center">
                    <Image
                      src={"/Assets/Icons/Distribute.svg"}
                      alt="distribute"
                      fill
                    />
                  </div>
                  <h3 className="text-xl sm:text-2xl md:text-2xl font-nohemi500 text-[#E4E4E4] instrument-serif-regular">
                    Distribution <br /> Tools
                  </h3>
                  <p className="text-[10px] sm:text-xs md:text-xs text-[#949494] font-nohemi400 leading-relaxed">
                    Unified tools for distribution (e.g. tickets, <br /> marketing, rewards from a single dashboard)
                  </p>
                </div>
              </div>

              {/* Data Insights Card */}
              <div className="card p-4 sm:p-6 w-72 sm:w-80 max-w-sm rounded-xl shadow-lg">
                <div className="flex flex-col items-center text-center space-y-2">
                  <div className="relative w-14 h-14 sm:w-20 sm:h-20 md:w-18 md:h-18 rounded-full flex items-center justify-center">
                    <Image
                      src={"/Assets/Icons/Insight.svg"}
                      alt="insight"
                      fill
                    />
                  </div>
                  <h3 className="text-xl sm:text-2xl md:text-2xl font-nohemi500 text-[#E4E4E4] instrument-serif-regular">
                    Data <br /> Insights
                  </h3>
                  <p className="text-[10px] sm:text-xs md:text-xs text-[#949494] font-nohemi400 leading-relaxed">
                    Target your fans with data- <br /> backed insights.
                  </p>
                </div>
              </div>

              {/* Third Spaces Card */}
              <div className="card p-4 sm:p-6 w-72 sm:w-80 max-w-sm rounded-xl shadow-lg">
                <div className="flex flex-col items-center text-center space-y-2">
                  <div className="relative w-14 h-14 sm:w-20 sm:h-20 md:w-18 md:h-18 rounded-full flex items-center justify-center">
                    <Image
                      src={"/Assets/Icons/Space.svg"}
                      alt="space"
                      fill
                    />
                  </div>
                  <h3 className="text-xl sm:text-2xl md:text-2xl font-nohemi500 text-[#E4E4E4] instrument-serif-regular">
                    Third <br /> Spaces
                  </h3>
                  <p className="text-[10px] sm:text-xs md:text-xs text-[#949494] font-nohemi400 leading-relaxed">
                    Give your fans a dedicated portal leading to <br /> loyalty and authentic relationships
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
              transform: translate(-50%, -50%) !important;
              width: 288px !important;
              max-width: 85vw !important;
            }
          }
        `}</style>
      </section>
    </>
  );
}

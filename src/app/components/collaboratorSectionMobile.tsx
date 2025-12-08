"use client";
import React, { useRef } from "react";
import { useSwipeable } from "react-swipeable";
import Image from "next/image";
import { collaborators } from "@/utils/Data";

interface CollaboratorSectionProps {
  className?: string;
}

export default function CollaboratorSectionMobile({
  className,
}: CollaboratorSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll logic
  // const startAutoScroll = () => {
  //   console.log("autoooo scrollll")
  //   if (autoScrollInterval) clearInterval(autoScrollInterval);

  //   const interval = setInterval(() => {
  //     const container = cardsRef.current;
  //     console.log(container, "container autoooo scrollll")
  //     if (!container) return;

  //     container.scrollBy({ left: 2, behavior: "auto" });

  //     // Check if we've reached the end (with some tolerance)
  //     if (
  //       container.scrollLeft + container.clientWidth >=
  //       container.scrollWidth - 10
  //     ) {
  //       // Reset to start
  //       container.scrollTo({ left: 0, behavior: "auto" });
  //     }
  //   }, 30);

  //   setAutoScrollInterval(interval);
  // };

  // const stopAutoScroll = () => {
  //   if (autoScrollInterval) {
  //     clearInterval(autoScrollInterval);
  //     setAutoScrollInterval(null);
  //   }
  // };

  // const restartAutoScroll = () => {
  //   if (inactivityTimeout) clearTimeout(inactivityTimeout);
  //   const timeout = setTimeout(() => startAutoScroll(), 3000);
  //   setInactivityTimeout(timeout);
  // };

  // useEffect(() => {
  //   const timer = setTimeout(startAutoScroll, 500); 
  //   return () => {
  //     clearTimeout(timer);
  //     stopAutoScroll();
  //     if (inactivityTimeout) clearTimeout(inactivityTimeout);
  //   };
  // }, []);


  // Swipe gesture integration
  const handlers = useSwipeable({
    onSwipedLeft: () => {
      const container = cardsRef.current;
      if (container) {
        container.scrollBy({ left: 300, behavior: "smooth" });
      }
      // stopAutoScroll();
      // restartAutoScroll();
    },
    onSwipedRight: () => {
      const container = cardsRef.current;
      if (container) {
        container.scrollBy({ left: -300, behavior: "smooth" });
      }
      // stopAutoScroll();
      // restartAutoScroll();
    },
    onSwipeStart: () => {
      // stopAutoScroll();
    },
    preventScrollOnSwipe: false,
    trackMouse: false,
    trackTouch: true,
    delta: 10,
  });

   const setRefs = (node: HTMLDivElement | null) => {
    (cardsRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
    handlers.ref(node);
  };

  return (
    <section
      ref={sectionRef}
      className={`h-screen bg-[#0A0A0A] flex flex-col md:flex-row items-start md:items-center pt-[140px] overflow-hidden ${
        className || ""
      }`}
      id="collaborators-mobile"
    >
      <div className="w-full mx-auto px-4 flex flex-col gap-8  items-start  h-full">
        {/* Section Title - Top on mobile, Left on desktop */}
        <div className="flex-shrink-0 md:w-fit pt-1  w-full">
          <h2 className="text-4xl font-instrument-serif font-[400]  text-[#F0E9B2] leading-[100%]">
            Collaborators
          </h2>
          <p className="text-xs  text-[#949494] md:text-[#E4E4E4] font-nohemi font-[300]  mt-2 text-right">
            2024-25
          </p>
        </div>

        {/* Horizontal Scrolling Cards - Below title on mobile, Right side on desktop */}
        <div className="flex-1 relative h-[40vh] w-full max-w-full overflow-y-hidden overflow-x-auto scrollbar-hide">
          <div
            ref={setRefs}
            // {...handlers}
            style={{
              // width: "max-content",
              WebkitOverflowScrolling: "touch",
              overscrollBehaviorX: "none",
            }}
            className={`flex justify-start gap-[52px] h-full bg-[#0A0A0A]   `}
          >
            {collaborators.map((collaborator, index) => (
              <div
                key={index}
                className={`flex-shrink-0 cursor-pointer bg-transparent  flex ${
                  collaborator?.random % 2 === 0
                    ? "items-start"
                    : "items-center"
                }`}
                // style={{ width: "fit-content" }}
                style={{
                  // width: "fit-content",
                  WebkitOverflowScrolling: "touch",
                  overscrollBehaviorX: "none",
                  touchAction: "pan-x pan-y",
                  width: "260px",
                }}
              >
                <div className="relative w-full max-w-[260] overflow-hidden h-fit ">
                  {/* Image - Maintain original aspect ratio */}
                  <div className="w-full h-full">
                    {collaborator?.image ? (
                      <Image
                        src={collaborator?.image}
                        alt={collaborator?.title}
                        width={260}
                        height={300}
                        loading={index < 2 ? "eager" : "lazy"}
                        className="w-full h-full"
                        onLoadingComplete={(img) => {
                          img.style.opacity = "1";
                        }}
                        style={{ transition: "opacity 0.3s", opacity: 1 }}
                      />
                    ) : (
                      <div
                        className="w-full h-full animate-pulse bg-[#232323] rounded"
                        style={{ width: "260px", height: "300px" }}
                      />
                    )}
                  </div>

                  {/* Content */}
                  <div className="space-y-3 pl-5 border-l-[0.5px] border-[#E4E4E4] pt-8">
                    <h3 className="text-base md:text-3xl font-nohemi font-[400] text-[#E4E4E4] leading-tight">
                      {collaborator.title}
                    </h3>
                    <p className="text-xs text-[#9C9C9C] font-switzer font-[400] break-words leading-relaxed max-w-[350px]">
                      {collaborator.description}
                    </p>
                    <div className="text-xs  text-[#E4E4E4] font-nohemi font-[400] tracking-wider">
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

"use client";
import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ProductCycleSectionProps {
  className?: string;
}

const ProductCycleSection = ({ className }: ProductCycleSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const firstTextRef = useRef<HTMLDivElement>(null);
  const secondTextRef = useRef<HTMLDivElement>(null);
  const actionTextRef = useRef<HTMLDivElement>(null);
  const nextSectionRef = useRef<HTMLDivElement>(null);
  const nextTextRef = useRef<HTMLDivElement>(null);
  const thirdSectionRef = useRef<HTMLDivElement>(null);
  const thirdTextRef = useRef<HTMLDivElement>(null);
  const dataInsightsRef = useRef<HTMLDivElement>(null);
  const distributeLabelRef = useRef<HTMLSpanElement>(null);
  const retargetLabelRef = useRef<HTMLSpanElement>(null);
  const fourthSectionRef = useRef<HTMLDivElement>(null);
  const fourthTextRef = useRef<HTMLDivElement>(null);
  const emailMarketingRef = useRef<HTMLDivElement>(null);
  const fifthSectionRef = useRef<HTMLDivElement>(null);
  const fifthTextRef = useRef<HTMLDivElement>(null);
  const promotionsRef = useRef<HTMLDivElement>(null);
  const sixthSectionRef = useRef<HTMLDivElement>(null);
  const sixthTextRef = useRef<HTMLDivElement>(null);
  const marketingInsightsRef = useRef<HTMLDivElement>(null);
  const seventhSectionRef = useRef<HTMLDivElement>(null);
  const seventhTextRef = useRef<HTMLDivElement>(null);
  const miniPortfolioRef = useRef<HTMLDivElement>(null);
  const eighthSectionRef = useRef<HTMLDivElement>(null);
  const eighthTextRef = useRef<HTMLDivElement>(null);
  const discoveryChannelRef = useRef<HTMLDivElement>(null);
  const discoverLabelRef = useRef<HTMLSpanElement>(null);
  const toolkitSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const firstText = firstTextRef.current;
    const secondText = secondTextRef.current;
    const actionText = actionTextRef.current;
    const nextSection = nextSectionRef.current;
    const nextText = nextTextRef.current;
    const thirdSection = thirdSectionRef.current;
    const thirdText = thirdTextRef.current;
    const dataInsights = dataInsightsRef.current;
    const distributeLabel = distributeLabelRef.current;
    const retargetLabel = retargetLabelRef.current;
    const fourthSection = fourthSectionRef.current;
    const fourthText = fourthTextRef.current;
    const emailMarketing = emailMarketingRef.current;
    const fifthSection = fifthSectionRef.current;
    const fifthText = fifthTextRef.current;
    const promotions = promotionsRef.current;
    const sixthSection = sixthSectionRef.current;
    const sixthText = sixthTextRef.current;
    const marketingInsights = marketingInsightsRef.current;
    const seventhSection = seventhSectionRef.current;
    const seventhText = seventhTextRef.current;
    const miniPortfolio = miniPortfolioRef.current;
    const eighthSection = eighthSectionRef.current;
    const eighthText = eighthTextRef.current;
    const discoveryChannel = discoveryChannelRef.current;
    const discoverLabel = discoverLabelRef.current;
    const toolkitSection = toolkitSectionRef.current;
    
    // Early return if any required elements are missing
    if (!section || !firstText || !secondText || !actionText || !nextSection || !nextText || !thirdSection || !thirdText || !dataInsights || !distributeLabel || !retargetLabel || !fourthSection || !fourthText || !emailMarketing || !fifthSection || !fifthText || !promotions || !sixthSection || !sixthText || !marketingInsights || !seventhSection || !seventhText || !miniPortfolio || !eighthSection || !eighthText || !discoveryChannel || !discoverLabel || !toolkitSection) {
      console.warn('ProductCycleSection: Some required elements are missing, skipping animation setup');
      return;
    }

    // Add a small delay to ensure DOM is fully ready, especially on mobile
    const setupAnimation = () => {
      try {

        const ctx = gsap.context(() => {
          // Set initial state - both texts hidden
          gsap.set(firstText, { opacity: 0 });
          gsap.set(secondText, { opacity: 0 });
          
          // Safely query selectors with null checks
          const createEventEl = actionText?.querySelector('.create-event');
          const issueTicketsEl = actionText?.querySelector('.issue-tickets');
          
          if (createEventEl) gsap.set(createEventEl, { fontWeight: 400 });
          if (issueTicketsEl) gsap.set(issueTicketsEl, { fontWeight: 400 });
          
          gsap.set(nextSection, { x: "100%" });
          gsap.set(nextText, { opacity: 0 });
          gsap.set(thirdSection, { x: "100%" });
          gsap.set(thirdText, { opacity: 0 });
          gsap.set(dataInsights, { opacity: 0, y: "1.2em" });
          gsap.set(retargetLabel, { opacity: 0 });
          gsap.set(fourthSection, { x: "100%" });
          gsap.set(fourthText, { opacity: 0 });
          gsap.set(emailMarketing, { opacity: 0, y: "1.2em" });
          gsap.set(fifthSection, { x: "100%" });
          gsap.set(fifthText, { opacity: 0 });
          gsap.set(promotions, { opacity: 0, y: "1.2em" });
          gsap.set(sixthSection, { x: "100%" });
          gsap.set(sixthText, { opacity: 0 });
          gsap.set(marketingInsights, { opacity: 0, y: "1.2em" });
          gsap.set(seventhSection, { x: "100%" });
          gsap.set(seventhText, { opacity: 0 });
          gsap.set(miniPortfolio, { opacity: 0, y: "1.2em" });
          gsap.set(eighthSection, { x: "100%" });
          gsap.set(eighthText, { opacity: 0 });
          gsap.set(discoveryChannel, { opacity: 0, y: "1.2em" });
          gsap.set(discoverLabel, { opacity: 0 });
          gsap.set(toolkitSection, { x: "0%" });
          
          // Set initial position based on screen size
          const isMobile = window.innerWidth < 768; // md breakpoint
          const productCycleContainer = section.querySelector('.product-cycle-container');
          
          if (productCycleContainer) {
            if (isMobile) {
              gsap.set(productCycleContainer, { y: "100%" });
            } else {
              gsap.set(productCycleContainer, { x: "100%" });
            }
          }

      // Split first text into words for word-by-word animation
      const splitTextIntoWords = (element: Element) => {
        const textElements = element.querySelectorAll('.word-by-word');
        textElements.forEach(textEl => {
          const text = textEl.textContent || '';
          const words = text.split(' ');
          textEl.innerHTML = words.map(word => `<span class="word" style="opacity: 0; transform: translateY(1.2em); display: inline-block;">${word}</span>`).join(' ');
        });
      };

      // Split all texts into words
      splitTextIntoWords(firstText);
      splitTextIntoWords(secondText);
      splitTextIntoWords(nextText);
      splitTextIntoWords(thirdText);
      splitTextIntoWords(fourthText);
      splitTextIntoWords(fifthText);
      splitTextIntoWords(sixthText);
      splitTextIntoWords(seventhText);
      splitTextIntoWords(eighthText);

      // Create timeline with ScrollTrigger
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=10000", // 10x viewport height for smooth scrolling including toolkit section
          scrub: true,
          pin: true,
        },
      });

      // Phase 0: Toolkit section slides out, ProductCycle section slides in
      tl.to(toolkitSection, {
        x: "-100%",
        duration: 1,
        ease: "power2.inOut"
      });
      
      // Animate ProductCycle container based on screen size
      if (isMobile) {
        tl.to(section.querySelector('.product-cycle-container'), {
          y: "0%",
          duration: 1,
          ease: "power2.inOut"
        }, "<");
      } else {
        tl.to(section.querySelector('.product-cycle-container'), {
          x: "0%",
          duration: 1,
          ease: "power2.inOut"
        }, "<");
      }

      // Phase 1: Initial state (0% scroll) - both texts hidden
      tl.set(firstText, { opacity: 0 })
        .set(secondText, { opacity: 0 });
      
      if (createEventEl) tl.set(createEventEl, { fontWeight: 400 });
      if (issueTicketsEl) tl.set(issueTicketsEl, { fontWeight: 400 });

      // Phase 2: First text reveal (0-25% scroll)
      if (createEventEl) {
        tl.to(createEventEl, { 
            fontWeight: 600, 
            duration: 0.25 
          });
      }
      tl.to(firstText, { 
          opacity: 1, 
          duration: 0.1 
        }, ">");
      
      const firstTextWords = firstText.querySelectorAll('.word');
      if (firstTextWords.length > 0) {
        tl.to(firstTextWords, {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.08,
          ease: "power2.out"
        }, ">");
      }

      // Phase 3: Font weight transition (25-50% scroll)
      if (createEventEl) {
        tl.to(createEventEl, { 
            fontWeight: 400, 
            duration: 0.25 
          });
      }
      if (issueTicketsEl) {
        tl.to(issueTicketsEl, { 
            fontWeight: 600, 
            duration: 0.25 
          }, "<");
      }

      // Phase 4: Text switch (50-75% scroll)
      tl.to(firstText, { 
          opacity: 0, 
          duration: 0.25 
        })
        .to(secondText, { 
          opacity: 1, 
          duration: 0.1 
        }, ">");
      
      const secondTextWords = secondText.querySelectorAll('.word');
      if (secondTextWords.length > 0) {
        tl.to(secondTextWords, {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.08,
          ease: "power2.out"
        }, ">");
      }

      // Phase 5: Second state (75-100% scroll) - second text remains visible
      tl.set(secondText, { opacity: 1 });

      // Phase 6: Slide to next section (100%+ scroll)
      tl.to(nextSection, {
        x: "0%",
        duration: 1,
        ease: "power2.inOut"
      })
      .to(nextText, { 
        opacity: 1, 
        duration: 0.1 
      }, ">")
      const nextTextWords = nextText.querySelectorAll('.word');
      if (nextTextWords.length > 0) {
        tl.to(nextTextWords, {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.08,
          ease: "power2.out"
        }, ">");
      }

      // Phase 7: Slide to third section & label change (120%+ scroll)
      tl.to(nextSection, {
        x: "-100%",
        duration: 1,
        ease: "power2.inOut"
      })
      .to(thirdSection, {
        x: "0%",
        duration: 1,
        ease: "power2.inOut"
      }, "<")
      .to(distributeLabel, { 
        opacity: 0, 
        duration: 0.25 
      }, "labelChange")
      .to(retargetLabel, { 
        opacity: 1, 
        duration: 0.25 
      }, "labelChange");

      // Phase 8: Third section text reveal (140%+ scroll)
      tl.to(dataInsights, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: "power2.out"
      }, ">")
      .to(thirdText, { 
        opacity: 1, 
        duration: 0.1 
      }, ">")
      const thirdTextWords = thirdText.querySelectorAll('.word');
      if (thirdTextWords.length > 0) {
        tl.to(thirdTextWords, {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.08,
          ease: "power2.out"
        }, ">");
      }

      // Phase 9: Slide to fourth section (160%+ scroll)
      tl.to(thirdSection, {
        x: "-100%",
        duration: 1,
        ease: "power2.inOut"
      })
      .to(fourthSection, {
        x: "0%",
        duration: 1,
        ease: "power2.inOut"
      }, "<");

      // Phase 10: Fourth section text reveal (180%+ scroll)
      tl.to(emailMarketing, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: "power2.out"
      }, ">")
      .to(fourthText, { 
        opacity: 1, 
        duration: 0.1 
      }, ">")
      const fourthTextWords = fourthText.querySelectorAll('.word');
      if (fourthTextWords.length > 0) {
        tl.to(fourthTextWords, {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.08,
          ease: "power2.out"
        }, ">");
      }

      // Phase 11: Slide to fifth section (200%+ scroll)
      tl.to(fourthSection, {
        x: "-100%",
        duration: 1,
        ease: "power2.inOut"
      })
      .to(fifthSection, {
        x: "0%",
        duration: 1,
        ease: "power2.inOut"
      }, "<");

      // Phase 12: Fifth section text reveal (220%+ scroll)
      tl.to(promotions, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: "power2.out"
      }, ">")
      .to(fifthText, { 
        opacity: 1, 
        duration: 0.1 
      }, ">")
      const fifthTextWords = fifthText.querySelectorAll('.word');
      if (fifthTextWords.length > 0) {
        tl.to(fifthTextWords, {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.08,
          ease: "power2.out"
        }, ">");
      }

      // Phase 13: Slide to sixth section (240%+ scroll)
      tl.to(fifthSection, {
        x: "-100%",
        duration: 1,
        ease: "power2.inOut"
      })
      .to(sixthSection, {
        x: "0%",
        duration: 1,
        ease: "power2.inOut"
      }, "<");

      // Phase 14: Sixth section text reveal (260%+ scroll)
      tl.to(marketingInsights, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: "power2.out"
      }, ">")
      .to(sixthText, { 
        opacity: 1, 
        duration: 0.1 
      }, ">")
      const sixthTextWords = sixthText.querySelectorAll('.word');
      if (sixthTextWords.length > 0) {
        tl.to(sixthTextWords, {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.08,
          ease: "power2.out"
        }, ">");
      }

      // Phase 15: Slide to seventh section & label change (280%+ scroll)
      tl.to(sixthSection, {
        x: "-100%",
        duration: 1,
        ease: "power2.inOut"
      })
      .to(seventhSection, {
        x: "0%",
        duration: 1,
        ease: "power2.inOut"
      }, "<")
      .to(retargetLabel, { 
        opacity: 0, 
        duration: 0.25 
      }, "labelChange2")
      .to(discoverLabel, { 
        opacity: 1, 
        duration: 0.25 
      }, "labelChange2");

      // Phase 16: Seventh section text reveal (300%+ scroll)
      tl.to(miniPortfolio, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: "power2.out"
      }, ">")
      .to(seventhText, { 
        opacity: 1, 
        duration: 0.1 
      }, ">")
      const seventhTextWords = seventhText.querySelectorAll('.word');
      if (seventhTextWords.length > 0) {
        tl.to(seventhTextWords, {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.08,
          ease: "power2.out"
        }, ">");
      }

      // Phase 17: Slide to eighth section (320%+ scroll)
      tl.to(seventhSection, {
        x: "-100%",
        duration: 1,
        ease: "power2.inOut"
      })
      .to(eighthSection, {
        x: "0%",
        duration: 1,
        ease: "power2.inOut"
      }, "<");

      // Phase 18: Eighth section text reveal (340%+ scroll)
      tl.to(discoveryChannel, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: "power2.out"
      }, ">")
      .to(eighthText, { 
        opacity: 1, 
        duration: 0.1 
      }, ">")
      const eighthTextWords = eighthText.querySelectorAll('.word');
      if (eighthTextWords.length > 0) {
        tl.to(eighthTextWords, {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.08,
          ease: "power2.out"
        }, ">");
      }

        }, section);

        // Handle resize events to update animation direction
        const handleResize = () => {
          try {
            const newIsMobile = window.innerWidth < 768;
            const productCycleContainer = section?.querySelector('.product-cycle-container') as HTMLElement;
            
            if (productCycleContainer) {
              if (newIsMobile) {
                gsap.set(productCycleContainer, { x: "0%", y: "100%" });
              } else {
                gsap.set(productCycleContainer, { x: "100%", y: "0%" });
              }
            }
          } catch (error) {
            console.warn('ProductCycleSection: Error in resize handler:', error);
          }
        };

        window.addEventListener('resize', handleResize);

        return () => {
          try {
            ctx.revert();
            window.removeEventListener('resize', handleResize);
          } catch (error) {
            console.warn('ProductCycleSection: Error during cleanup:', error);
          }
        };
      } catch (error) {
        console.error('ProductCycleSection: Animation setup failed:', error);
        // Fallback: ensure elements are visible even if animation fails
        gsap.set([firstText, secondText, nextText, thirdText, fourthText, fifthText, sixthText, seventhText, eighthText], { opacity: 1 });
        gsap.set([nextSection, thirdSection, fourthSection, fifthSection, sixthSection, seventhSection, eighthSection], { x: "0%" });
        gsap.set([dataInsights, emailMarketing, promotions, marketingInsights, miniPortfolio, discoveryChannel], { opacity: 1, y: 0 });
        gsap.set([retargetLabel, discoverLabel], { opacity: 1 });
        gsap.set(toolkitSection, { x: "0%" });
        
        const productCycleContainer = section?.querySelector('.product-cycle-container');
        if (productCycleContainer) {
          gsap.set(productCycleContainer, { x: "0%", y: "0%" });
        }
      }
    };

    // Add a small delay to ensure DOM is fully ready, especially on mobile
    const timeoutId = setTimeout(setupAnimation, 100);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <section ref={sectionRef} className={`${className || ''} w-full h-screen flex relative overflow-hidden`}>
      {/* Toolkit Section - Slides in from right first */}
      <div ref={toolkitSectionRef} className="absolute top-0 right-0 w-full h-full bg-[#0B0B0B] flex flex-col justify-between overflow-hidden" style={{ zIndex: 10 }}>
        <div className="w-full flex flex-col justify-between relative">
          {/* Top Content */}
          <div className="flex flex-col md:flex-row w-full h-fit mt-10">
            <h2 className="text-white text-3xl sm:text-4xl md:text-5xl ml-10 lg:text-[44px] max-w-[500px] md:max-w-[58%] w-[80%] md:w-[58%] font-nohemi500 leading-tight">
              If your community had an HQ,
              it'd probably be here. Discover,
              distribute, and nudge fans
              back when it counts.
            </h2>
            <div className="w-full h-fit relative">
              <div className="w-fit h-[55vh] md:h-[65vh] absolute right-0">
                <div className="relative w-full h-[100%] aspect-square -right-16">
                  <Image
                    src={"/Assets/Images/Star.svg"}
                    alt="toolkit star"
                    fill
                    className="object-contain"
                  />
                  <h3 className="absolute top-[40%] md:top-[38%] lg:top-[38%] left-[18%] sm:text-[32px] md:text-[46px] lg:text-[48px] leading-none text-[#F0E9B2] instrument-serif-regular">
                    Your Toolkit
                  </h3>
                  <div className="absolute animate-pulse rotate-[90deg] md:rotate-0 w-[75px] md:w-[100px] h-[75px] md:h-[100px] top-[34.5%] right-[25.5%] md:right-[25%]">
                    <Image
                      src={"/Assets/Icons/ToolkitArrow.svg"}
                      alt="arrow"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full absolute bottom-20 md:bottom-0 flex justify-center items-end">
          <div className="w-full max-w-[1600px] relative transition-all">
            <div className="absolute -bottom-40 md:w-[40%] translate-x-[-35%] aspect-[4/3] transition-all hover:translate-y-[-10%] duration-300">
              <Image src="/Assets/Images/LeftCorner.svg" alt="left corner" fill className="object-contain" />
            </div>
            <div className="absolute -bottom-36 md:-bottom-30 translate-x-[-20%] md:translate-x-[15%] w-[70%] md:w-[40%] aspect-[4/3] transition-all hover:translate-y-[-10%] duration-300">
              <Image src="/Assets/Images/CenterLeft.svg" alt="center left" fill className="object-contain" />
            </div>
            <div className="absolute -bottom-36 md:-bottom-30 translate-x-[25%] md:translate-x-[80%] z-5 w-[70%] md:w-[40%] aspect-[4/3] transition-all hover:translate-y-[-10%] duration-300">
              <Image src="/Assets/Images/Center.svg" alt="center" fill className="object-contain" />
            </div>
            <div className="absolute -bottom-40 md:-bottom-35 translate-x-[70%] md:translate-x-[130%] z-2 w-[70%] md:w-[40%] aspect-[4/3] transition-all hover:translate-y-[-10%] duration-300">
              <Image src="/Assets/Images/CenterRight.svg" alt="center right" fill className="object-contain" />
            </div>
            <div className="absolute -bottom-50 translate-x-[185%] md:w-[40%] aspect-[4/3] transition-all hover:translate-y-[-10%] duration-300">
              <Image src="/Assets/Images/RightCorner.svg" alt="right corner" fill className="object-contain" />
            </div>
          </div>
        </div>
      </div>

      {/* Product Cycle Container - Slides in from right */}
      <div className="product-cycle-container absolute top-0 right-0 w-full h-full flex flex-col md:flex-row">
        {/* Left Panel - Text Content */}
        <div className="w-full h-1/2 md:h-full md:w-1/2 bg-[#EBE4D4] relative flex items-center justify-center overflow-hidden">
        {/* Noise effect overlay */}
        <Image
          src="/Assets/Images/NoiseEffectBg.svg"
          alt="noise texture"
          fill
          className="pointer-events-none select-none object-cover z-0"
          style={{ mixBlendMode: "multiply" }}
        />
        {/* Vertical line and label - Fixed in place */}
        <div className="absolute left-25 top-0 w-[0.5px] h-full bg-black z-50 hidden md:block"></div>
        <div className="absolute md:hidden left-0 top-20 w-full h-[0.5px] bg-black z-50 block"></div>
        {/* 
          The horizontal line should extend/contract based on cursor X position.
          We'll use React state to track the width, and an effect to listen to mousemove.
          We'll clamp the width between 250px and window.innerWidth.
          We'll also ensure a high z-index so it stays above all images/sections.
        */}
        {/* Interactive horizontal line - Desktop only */}
        <div className="hidden md:block">
          {(() => {
            const [lineWidth, setLineWidth] = React.useState(250);
            const lineRef = React.useRef<HTMLDivElement>(null);

            React.useEffect(() => {
              function handleMouseMove(e: MouseEvent) {
                const minWidth = 250;
                const maxWidth = window.innerWidth;
                let newWidth = Math.max(minWidth, Math.min(e.clientX, maxWidth));
                setLineWidth(newWidth);
              }
              window.addEventListener('mousemove', handleMouseMove);
              return () => window.removeEventListener('mousemove', handleMouseMove);
            }, []);

            return (
              <div
                ref={lineRef}
                className="absolute left-0 bottom-20 h-[1px] bg-black"
                style={{
                  width: `${lineWidth}px`,
                  transition: 'width 0.2s cubic-bezier(0.4,0,0.2,1)',
                  zIndex: 9999 // Ensure the line is always on top
                }}
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-gray-900 rotate-45" style={{zIndex: 10000}}></div>
              </div>
            );
          })()}
        </div>
        {/* Labels - Desktop: rotated, Mobile: horizontal at top */}
        <div className="absolute left-0 bottom-40 -rotate-90 text-[#363636] instrument-serif-regular text-4xl tracking-wider z-50 hidden md:block">
          <span ref={distributeLabelRef} className="absolute top-10 -left-14">Distribute</span>
          <span ref={retargetLabelRef} className="absolute top-10 -left-14 opacity-0">Retarget</span>
          <span ref={discoverLabelRef} className="absolute top-10 -left-14 opacity-0">Discover</span>
        </div>
        
        {/* Mobile Labels - Horizontal at top */}
        <div className="absolute top-6 left-8 text-[#363636] instrument-serif-regular text-4xl tracking-wider z-50 md:hidden">
          <span ref={distributeLabelRef} className="block absolute top-0 left-0">Distribute</span>
          <span ref={retargetLabelRef} className="block opacity-0 absolute top-0 left-0">Retarget</span>
          <span ref={discoverLabelRef} className="block opacity-0 absolute top-0 left-0">Discover</span>
        </div>
        
        {/* Main content */}
        <div className="h-full w-full mx-4 md:mx-25 px-4 md:px-10 py-8 md:py-20 flex flex-col justify-between">
          {/* Text Content */}
          <div className='w-full h-full flex flex-col items-start relative pt-16 md:pt-20'>
            {/* First Text */}
            <div ref={firstTextRef} className="w-full md:w-[80%] h-full flex flex-col pb-6 md:pb-10 items-end justify-between">
              <h2 className="text-xl sm:text-2xl md:text-5xl font-switzer400 text-[#363636] leading-tight mb-3 md:mb-6 w-full">
                <span className="word-by-word">Host anything from standard events to multi-day festivals and tours.</span>
              </h2>
              <p className="text-xs sm:text-sm md:text-xl w-full md:w-1/2 text-right font-switzer600 text-gray-600 italic mb-4 md:mb-8">
                <span className="word-by-word">Add multiple time slots, customise ticket formats, and launch instantly.</span>
              </p>
            </div>

            {/* Second Text */}
            <div ref={secondTextRef} className="absolute w-full md:w-[80%] h-[70%] flex flex-col items-end justify-between">
              <h2 className="text-xl sm:text-2xl md:text-5xl font-switzer400 text-[#363636] leading-tight mb-3 md:mb-6 w-full">
                <span className="word-by-word">Issue paid tickets or RSVPs, limit quantities to prevent scalping, and add surveys to collect additional information.</span>
              </h2>
              <p className="text-xs sm:text-sm md:text-xl w-full md:w-1/2 text-right font-switzer600 text-gray-600 italic mb-4 md:mb-8">
                <span className="word-by-word">tickets are issued and stored on blockchain, making it impossible to forge or duplicate.</span>
              </p>
            </div>
          </div>

          {/* Action Texts  */}
          <div ref={actionTextRef} className='w-full flex flex-col items-end md:items-start gap-0 py-2 md:py-5'>
            <p className='text-base md:text-lg lg:text-2xl font-nohemi400 text-gray-600 create-event'>
              Create Event
            </p>
            <p className='text-base md:text-lg lg:text-2xl font-nohemi400 text-gray-600 issue-tickets'>
              Issue Tickets
            </p>
          </div>
        </div>
      </div>

      {/* Right Panel - Visual Content */}
      <div className="w-full md:w-1/2 bg-[#EBE4D4] relative flex items-center justify-center h-1/2 md:h-full">
        <div className='w-full h-full'>
          <Image src="/Assets/Images/Toolkit/Distribute_CreateEvent.svg" alt="product cycle" fill className="object-cover" />
        </div>
      </div>

      {/* Next Section - Slides in from right */}
      <div ref={nextSectionRef} className="absolute top-0 right-0 w-full h-full bg-[#EBE4D4] flex items-center justify-center overflow-hidden">
        {/* Noise effect overlay */}
        <Image
          src="/Assets/Images/NoiseEffectBg.svg"
          alt="noise texture"
          fill
          className="pointer-events-none select-none object-cover z-0"
          style={{ mixBlendMode: "multiply" }}
        />
        
        {/* Next Section Content */}
        <div className="h-full w-full flex flex-col md:flex-row">
          {/* Left Half - Visual Content (Smartphone Image) */}
          <div className="w-full md:w-1/2 relative flex items-center justify-center h-1/2 md:h-full">
            <div className="relative w-full h-full -bottom-10 md:-bottom-10 -left-18 md:-left-0">
              <Image 
                src="/Assets/Images/Toolkit/Distribute_PurchaseTicket2.svg" 
                alt="smartphone with event booking app" 
                fill 
                className="object-contain z-10" 
              />
              <div className="absolute md:left-[45%] md:top-[40%] left-[35%] top-[30%] w-80 h-80 md:w-120 md:h-120">
                <Image
                  src="/Assets/Images/Toolkit/Distribute_PurchaseTicket1.svg"
                  alt="smartphone with event booking app"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>

          {/* Right Half - Text Content */}
          <div className="w-full md:w-1/2 flex items-center justify-center h-1/2 md:h-full">
              <div className="h-full w-full mx-4 md:mx-20 px-4 md:px-10 py-8 md:py-20 flex flex-col justify-between">
               {/* Text Content */}
               <div ref={nextTextRef} className='w-full flex flex-col items-end relative h-full pt-10 md:pt-0'>
                 <div className="w-full flex flex-col items-end h-full md:h-[50%] justify-around">
                   <h2 className="text-2xl md:text-5xl font-switzer400 text-[#363636] leading-tight mb-4 md:mb-6 w-full">
                     <span className="word-by-word">Give your fans a seamless way to book their tickets – apply discounts, confirm instantly.</span>
                   </h2>
                   <p className="text-sm md:text-xl w-2/3 md:w-1/2 text-left font-switzer600 text-gray-600 italic mb-6 md:mb-8">
                     <span className="word-by-word">Flexible phases, codes, and RSVPs designed for every event format.</span>
                   </p>
                 </div>
               </div>

              {/* Action Texts  */}
              <div className='w-full flex flex-col items-end md:items-start gap-0 py-3 md:py-5'>
                <p className='text-lg md:text-2xl font-nohemi400 text-[#363636] create-event'>
                  Purchase/RSVP
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Third Section - Slides in from right */}
      <div ref={thirdSectionRef} className="absolute top-0 right-0 w-full h-full bg-[#EBE4D4] flex items-center justify-center overflow-hidden">
        {/* Noise effect overlay */}
        <Image
          src="/Assets/Images/NoiseEffectBg.svg"
          alt="noise texture"
          fill
          className="pointer-events-none select-none object-cover z-0"
          style={{ mixBlendMode: "multiply" }}
        />
        
        {/* Third Section Content */}
        <div className="h-full w-full flex flex-col md:flex-row">
          {/* Left Half - Text Content */}
          <div className="w-full md:w-1/2 flex items-center justify-center h-1/2 md:h-full">
            <div className="h-full w-full mx-4 md:mx-25 px-4 md:px-10 py-8 md:py-20 flex flex-col justify-between">
              {/* Text Content */}
              <div ref={thirdTextRef} className='w-full flex flex-col items-end relative h-full pt-16 md:pt-0'>
                <div className="w-full flex flex-col py-6 md:py-10 items-end h-full md:h-[60%] md:justify-between justify-around">
                  <h2 className="text-xl sm:text-2xl md:text-5xl font-switzer400 text-[#363636] leading-tight mb-3 md:mb-6 w-full">
                    <span className="word-by-word">Own your data and make data-driven decisions.</span>
                  </h2>
                  <p className="text-xs sm:text-sm md:text-xl w-full md:w-[80%] text-left font-switzer600 text-gray-600 italic mb-4 md:mb-8">
                    <span className="word-by-word">Unlock actionable insights on every event - from ticket sales to demographics and traffic sources.</span>
                  </p>
                </div>
              </div>
              {/* Action Texts  */}
              <div className='w-full flex flex-col items-end md:items-start gap-0 py-2 md:py-5'>
                <p ref={dataInsightsRef} className='text-base md:text-lg lg:text-2xl font-nohemi400 text-[#363636] create-event'>
                  DATA INSIGHTS
                </p>
              </div>
            </div>
          </div>

          {/* Right Half - Visual Content (Laptop Image) */}
          <div className="w-full md:w-1/2 bg-gray-800 relative flex items-center justify-center h-1/2 md:h-full">
            <div className='w-full h-full'>
              <Image src="/Assets/Images/Toolkit/Retarget_DataInsights.svg" alt="product cycle dashboard" fill className="object-cover" />
            </div>
          </div>
        </div>
      </div>

      {/* Fourth Section - Email Marketing */}
      <div ref={fourthSectionRef} className="absolute top-0 right-0 w-full h-full bg-[#EBE4D4] flex items-center justify-center overflow-hidden">
        {/* Noise effect overlay */}
        <Image
          src="/Assets/Images/NoiseEffectBg.svg"
          alt="noise texture"
          fill
          className="pointer-events-none select-none object-cover z-0"
          style={{ mixBlendMode: "multiply" }}
        />
        
        {/* Fourth Section Content */}
        <div className="h-full w-full flex flex-col md:flex-row">
          {/* Left Half - Text Content */}
          <div className="w-full md:w-1/2 flex items-center justify-center h-1/2 md:h-full">
            <div className="h-full w-full mx-4 md:mx-25 px-4 md:px-10 py-8 md:py-20 flex flex-col justify-between">
              {/* Text Content */}
              <div ref={fourthTextRef} className='w-full flex flex-col items-end relative h-full pt-16 md:pt-0'>
                <div className="w-full flex flex-col py-6 md:py-10 items-end h-full md:h-[60%] md:justify-between justify-around">
                  <h2 className="text-xl sm:text-2xl md:text-5xl font-switzer400 text-[#363636] leading-tight mb-3 md:mb-6 w-full">
                    <span className="word-by-word">Send targeted email and SMS campaigns directly to attendees, or import contacts from your dashboard.</span>
                  </h2>
                  <p className="text-xs sm:text-sm md:text-xl w-full md:w-1/2 text-left font-switzer600 text-gray-600 italic mb-4 md:mb-8">
                    <span className="word-by-word">Reach fans where they are with data-backed precision.</span>
                  </p>
                </div>
              </div>

              {/* Action Texts  */}
              <div className='w-full flex flex-col items-end md:items-start gap-0 py-2 md:py-5'>
                <p ref={emailMarketingRef} className='text-base md:text-lg lg:text-2xl font-nohemi400 text-[#363636] create-event'>
                  EMAIL MARKETING
                </p>
              </div>
            </div>
          </div>

          {/* Right Half - Visual Content (Laptop Image) */}
          <div className="w-full md:w-1/2 bg-[#EBE4D4] relative flex items-center justify-center h-1/2 md:h-full">
            {/* Noise effect overlay */}
            <Image
              src="/Assets/Images/NoiseEffectBg.svg"
              alt="noise texture"
              fill
              className="pointer-events-none select-none object-cover z-0"
              style={{ mixBlendMode: "multiply" }}
            />
            <div className='w-full h-full md:h-[80%] z-10 relative md:-bottom-25 md:left-20 -bottom-14 left-0'>
              <Image src="/Assets/Images/Toolkit/Retarget_EmailMarketing.svg" alt="email marketing dashboard" fill className="object-cover" />
            </div>
          </div>
        </div>
      </div>

      {/* Fifth Section - Promotions and Discount Codes */}
      <div ref={fifthSectionRef} className="absolute top-0 right-0 w-full h-full bg-[#EBE4D4] flex items-center justify-center overflow-hidden">
        {/* Noise effect overlay - Applied to entire section */}
        <Image
          src="/Assets/Images/NoiseEffectBg.svg"
          alt="noise texture"
          fill
          className="pointer-events-none select-none object-cover z-0"
          style={{ mixBlendMode: "multiply" }}
        />
        
        {/* Fifth Section Content */}
        <div className="h-full w-full flex flex-col md:flex-row">
          {/* Left Half - Visual Content (Laptop Image) */}
          <div className="w-full md:w-1/2 relative flex items-center justify-center h-1/2 md:h-full md:order-1">
            <div className='mx-4 md:mx-25 w-full h-full overflow-hidden relative md:left-20 left-4 -bottom-10'>
              <Image src="/Assets/Images/Toolkit/Retarget_Promotions.svg" alt="promotions dashboard" fill className="object-contain" />
            </div>
          </div>
          {/* Right Half - Text Content */}
          <div className="w-full md:w-1/2 flex items-center justify-center h-1/2 md:h-full md:order-2">
            <div className="h-full w-full mx-4 md:mx-25 px-4 md:px-10 py-8 md:py-20 flex flex-col justify-between">
              {/* Text Content */}
              <div ref={fifthTextRef} className='w-full flex flex-col items-end relative h-full pt-16 md:pt-0'>
                <div className="w-full flex flex-col py-6 md:py-10 items-end h-[60%] justify-between">
                  <h2 className="text-xl sm:text-2xl md:text-5xl font-switzer400 text-[#363636] leading-tight mb-3 md:mb-6 w-full">
                    <span className="word-by-word">Set up exclusive promoter codes and custom discounts in seconds.</span>
                  </h2>
                  <p className="text-xs sm:text-sm md:text-xl w-full md:w-1/2 text-right font-switzer600 text-gray-600 italic mb-4 md:mb-8">
                    <span className="word-by-word">Boost sales, empower superfans, and simplify campaign tracking.</span>
                  </p>
                </div>
              </div>

              {/* Action Texts  */}
              <div className='text-left md:w-full flex flex-col items-end md:items-start gap-0 py-2 md:py-5'>
                <p ref={promotionsRef} className='text-base md:text-lg lg:text-2xl font-nohemi400 text-[#363636] create-event w-full md:w-full'>
                  PROMOTIONS AND DISCOUNT CODES
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sixth Section - Marketing Insights */}
      <div ref={sixthSectionRef} className="absolute top-0 right-0 w-full h-full bg-[#EBE4D4] flex items-center justify-center overflow-hidden">
        {/* Noise effect overlay */}
        <Image
          src="/Assets/Images/NoiseEffectBg.svg"
          alt="noise texture"
          fill
          className="pointer-events-none select-none object-cover z-0"
          style={{ mixBlendMode: "multiply" }}
        />
        
        {/* Sixth Section Content */}
        <div className="h-full w-full flex flex-col md:flex-row">
          {/* Left Half - Text Content */}
          <div className="w-full md:w-1/2 flex items-center justify-center h-1/2 md:h-full">
            <div className="h-full w-full mx-4 md:mx-25 px-4 md:px-10 py-8 md:py-20 flex flex-col justify-between">
              {/* Text Content */}
              <div ref={sixthTextRef} className='w-full flex flex-col items-end relative h-full pt-16 md:pt-0'>
                <div className="w-full flex flex-col items-end h-[50%] gap-6 md:gap-10 justify-between">
                  <h2 className="text-xl sm:text-2xl md:text-5xl font-switzer400 text-[#363636] leading-tight mb-3 md:mb-6 w-full">
                    <span className="word-by-word">See the full story with live analytics - track revenue, reach, contacts and performance.</span>
                  </h2>
                  <p className="text-xs sm:text-sm md:text-xl w-full md:w-[40%] text-left font-switzer600 text-gray-600 italic mb-4 md:mb-8">
                    <span className="word-by-word">Know what's working, fix what's not, and maximise every campaign.</span>
                  </p>
                </div>
              </div>

              {/* Action Texts  */}
              <div className='w-full flex flex-col items-end md:items-start gap-0 py-2 md:py-5'>
                <p ref={marketingInsightsRef} className='text-base md:text-lg lg:text-2xl font-nohemi400 text-[#363636] create-event'>
                  MARKETING INSIGHTS
                </p>
              </div>
            </div>
          </div>

          {/* Right Half - Visual Content (Monitor Image) */}
          <div className="w-full md:w-1/2 bg-[#EBE4D4] relative flex items-center justify-center h-1/2 md:h-full">
            {/* Noise effect overlay */}
            <Image
              src="/Assets/Images/NoiseEffectBg.svg"
              alt="noise texture"
              fill
              className="pointer-events-none select-none object-cover z-0"
              style={{ mixBlendMode: "multiply" }}
            />
            <div className='w-full h-full -bottom-5 z-10 relative'>
              <Image src="/Assets/Images/Toolkit/Retarget_MarketingInsights.svg" alt="marketing insights dashboard" fill className="object-contain md:object-cover" />
            </div>
          </div>
        </div>
      </div>

      {/* Seventh Section - Mini Portfolio */}
      <div ref={seventhSectionRef} className="absolute top-0 right-0 w-full h-full bg-[#EBE4D4] flex items-center justify-center overflow-hidden">
        {/* Noise effect overlay */}
        <Image
          src="/Assets/Images/NoiseEffectBg.svg"
          alt="noise texture"
          fill
          className="pointer-events-none select-none object-cover z-0"
          style={{ mixBlendMode: "multiply" }}
        />
        
        {/* Seventh Section Content */}
        <div className="h-full w-full flex flex-col md:flex-row">
          {/* Left Half - Text Content */}
          <div className="w-full md:w-1/2 flex items-center justify-center h-1/2 md:h-full">
            <div className="h-full w-full mx-4 md:mx-25 px-4 md:px-10 py-8 md:py-20 flex flex-col justify-between">
              {/* Text Content */}
              <div ref={seventhTextRef} className='w-full flex flex-col items-end relative h-full pt-16 md:pt-0'>
                <div className="w-full flex flex-col items-start md:items-end h-[50%] gap-6 md:gap-10 justify-between">
                  <h2 className="text-xl sm:text-2xl md:text-5xl font-switzer400 text-[#363636] leading-tight mb-3 md:mb-6 w-full">
                    <span className="word-by-word">First step to build your community, keep your fans updated on what's next with a gallery, collections, upcoming events and embedded playlists.</span>
                  </h2>
                  <p className="text-xs sm:text-sm md:text-xl w-full md:w-[40%] text-left font-switzer600 text-gray-600 italic mb-4 md:mb-8">
                    <span className="word-by-word">Share your page and ask fans to subscribe, so you get direct access to their emails for future updates.</span>
                  </p>
                </div>
              </div>

              {/* Action Texts  */}
              <div className='w-full flex flex-col items-end md:items-start gap-0 py-2 md:py-5'>
                <p ref={miniPortfolioRef} className='text-base md:text-lg lg:text-2xl font-nohemi400 text-[#363636] create-event'>
                  MINI PORTFOLIO
                </p>
              </div>
            </div>
          </div>

          {/* Right Half - Visual Content (iPhone Image) */}
          <div className="w-full md:w-1/2 bg-[#EBE4D4] relative flex items-center justify-center h-1/2 md:h-full">
            {/* Noise effect overlay */}
            <Image
              src="/Assets/Images/NoiseEffectBg.svg"
              alt="noise texture"
              fill
              className="pointer-events-none select-none object-cover z-0"
              style={{ mixBlendMode: "multiply" }}
            />
            <div className='w-full h-full z-10 relative'>
              <Image src="/Assets/Images/Toolkit/Discover_Portfolio.svg" alt="mini portfolio mobile app" fill className="object-cover" />
            </div>
          </div>
        </div>
      </div>

      {/* Eighth Section - Discovery Channel */}
      <div ref={eighthSectionRef} className="absolute top-0 right-0 w-full h-full bg-[#EBE4D4] flex items-center justify-center overflow-hidden">
        {/* Noise effect overlay */}
        <Image
          src="/Assets/Images/NoiseEffectBg.svg"
          alt="noise texture"
          fill
          className="pointer-events-none select-none object-cover z-0"
          style={{ mixBlendMode: "multiply" }}
        />
        
        {/* Eighth Section Content */}
        <div className="h-full w-full flex flex-col md:flex-row">
          {/* Left Half - Visual Content (iPhone Image) */}
          <div className="w-full md:w-1/2 bg-[#EBE4D4] relative flex items-center justify-center h-1/2 md:h-full order-2 md:order-1">
            {/* Noise effect overlay */}
            <Image
              src="/Assets/Images/NoiseEffectBg.svg"
              alt="noise texture"
              fill
              className="pointer-events-none select-none object-cover z-0"
              style={{ mixBlendMode: "multiply" }}
            />
            <div className='w-full h-full z-10 relative '>
              <Image src="/Assets/Images/Toolkit/Discover_DiscoveryChannel.svg" alt="discovery channel mobile app" fill className="object-cover" />
            </div>
          </div>

          {/* Right Half - Text Content */}
          <div className="w-full md:w-1/2 flex items-center justify-center h-1/2 md:h-full order-1 md:order-2">
            <div className="h-full w-full mx-4 md:mx-25 px-4 md:px-10 py-8 md:py-20 flex flex-col justify-between">
              {/* Text Content */}
              <div ref={eighthTextRef} className='w-full flex flex-col items-end relative h-full pt-16 md:pt-0'>
                <div className="w-full flex flex-col items-end h-[50%] gap-6 md:gap-10 justify-between">
                  <h2 className="text-xl sm:text-2xl md:text-5xl font-switzer400 text-[#363636] leading-tight mb-3 md:mb-6 w-full">
                    <span className="word-by-word">Let your audience explore nearby experiences on the map, RSVP with a tap, view an interactive calendar</span>
                  </h2>
                  <p className="text-xs sm:text-sm md:text-xl w-full md:w-[40%] text-left font-switzer600 text-gray-600 italic mb-4 md:mb-8">
                    <span className="word-by-word">Empower superfans, boost ticket sales, with frictionless campaign tools.</span>
                  </p>
                </div>
              </div>

              {/* Action Texts  */}
              <div className='w-full flex flex-col items-end md:items-start gap-0 py-2 md:py-5'>
                <p ref={discoveryChannelRef} className='text-base md:text-lg lg:text-2xl font-nohemi400 text-[#363636] create-event'>
                  DISCOVERY CHANNEL
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
};

export default ProductCycleSection;
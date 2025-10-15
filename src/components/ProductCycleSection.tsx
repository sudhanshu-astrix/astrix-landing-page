"use client";
import React, { useRef, useEffect, useState } from 'react';
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
  const firstSectionRef = useRef<HTMLDivElement>(null);
  const secondSectionRef = useRef<HTMLDivElement>(null);
  const thirdSectionRef = useRef<HTMLDivElement>(null);
  const thirdTextRef = useRef<HTMLDivElement>(null);
  const fourthSectionRef = useRef<HTMLDivElement>(null);
  const fourthTextRef = useRef<HTMLDivElement>(null);
  const dataInsightsRef = useRef<HTMLDivElement>(null);
  const distributeLabelRef = useRef<HTMLSpanElement>(null);
  const retargetLabelRef = useRef<HTMLSpanElement>(null);
  const fifthSectionRef = useRef<HTMLDivElement>(null);
  const fifthTextRef = useRef<HTMLDivElement>(null);
  const emailMarketingRef = useRef<HTMLDivElement>(null);
  const sixthSectionRef = useRef<HTMLDivElement>(null);
  const sixthTextRef = useRef<HTMLDivElement>(null);
  const promotionsRef = useRef<HTMLDivElement>(null);
  const seventhSectionRef = useRef<HTMLDivElement>(null);
  const seventhTextRef = useRef<HTMLDivElement>(null);
  const marketingInsightsRef = useRef<HTMLDivElement>(null);
  const eighthSectionRef = useRef<HTMLDivElement>(null);
  const eighthTextRef = useRef<HTMLDivElement>(null);
  const miniPortfolioRef = useRef<HTMLDivElement>(null);
  const ninthSectionRef = useRef<HTMLDivElement>(null);
  const ninthTextRef = useRef<HTMLDivElement>(null);
  const discoveryChannelRef = useRef<HTMLDivElement>(null);
  const discoverLabelRef = useRef<HTMLSpanElement>(null);
  const toolkitSectionRef = useRef<HTMLDivElement>(null);

  // Preload critical images for better performance
  useEffect(() => {
    const imagesToPreload = [
      '/Assets/Images/Toolkit/Creation.gif',
      '/Assets/Images/Toolkit/Ticket.gif',
      '/Assets/Images/Toolkit/Data.gif',
      '/Assets/Images/Star.svg',
      '/Assets/Images/NoiseEffectBg.svg',
    ];

    imagesToPreload.forEach((src) => {
      const img = document.createElement('img');
      img.src = src;
    });
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const firstText = firstTextRef.current;
    const secondText = secondTextRef.current;
    const firstSection = firstSectionRef.current;
    const secondSection = secondSectionRef.current;
    const thirdSection = thirdSectionRef.current;
    const thirdText = thirdTextRef.current;
    const fourthSection = fourthSectionRef.current;
    const fourthText = fourthTextRef.current;
    const dataInsights = dataInsightsRef.current;
    const distributeLabel = distributeLabelRef.current;
    const retargetLabel = retargetLabelRef.current;
    const fifthSection = fifthSectionRef.current;
    const fifthText = fifthTextRef.current;
    const emailMarketing = emailMarketingRef.current;
    const sixthSection = sixthSectionRef.current;
    const sixthText = sixthTextRef.current;
    const promotions = promotionsRef.current;
    const seventhSection = seventhSectionRef.current;
    const seventhText = seventhTextRef.current;
    const marketingInsights = marketingInsightsRef.current;
    const eighthSection = eighthSectionRef.current;
    const eighthText = eighthTextRef.current;
    const miniPortfolio = miniPortfolioRef.current;
    const ninthSection = ninthSectionRef.current;
    const ninthText = ninthTextRef.current;
    const discoveryChannel = discoveryChannelRef.current;
    const discoverLabel = discoverLabelRef.current;
    const toolkitSection = toolkitSectionRef.current;
    
    // Early return if any required elements are missing
    if (!section || !firstText || !secondText || !firstSection || !secondSection || !thirdSection || !thirdText || !fourthSection || !fourthText || !dataInsights || !distributeLabel || !retargetLabel || !fifthSection || !fifthText || !emailMarketing || !sixthSection || !sixthText || !promotions || !seventhSection || !seventhText || !marketingInsights || !eighthSection || !eighthText || !miniPortfolio || !ninthSection || !ninthText || !discoveryChannel || !discoverLabel || !toolkitSection) {
      console.warn('ProductCycleSection: Some required elements are missing, skipping animation setup');
      return;
    }

    // Detect Safari for optimization
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

    // Add a small delay to ensure DOM is fully ready, especially on mobile
    const setupAnimation = () => {
      try {

        const ctx = gsap.context(() => {
          // Set initial state - both texts hidden
          gsap.set(firstText, { opacity: 0 });
          gsap.set(secondText, { opacity: 0 });
          
          // Set initial positions based on screen size
          const isMobile = window.innerWidth < 768; // md breakpoint
          if (isMobile) {
            // Mobile: All sections start from bottom (100%) - they'll slide in one by one
            gsap.set(firstSection, { y: "100%" });
            gsap.set(secondSection, { y: "100%" });
            gsap.set(thirdSection, { y: "100%" });
            gsap.set(fourthSection, { y: "100%" });
            gsap.set(fifthSection, { y: "100%" });
            gsap.set(sixthSection, { y: "100%" });
            gsap.set(seventhSection, { y: "100%" });
            gsap.set(eighthSection, { y: "100%" });
            gsap.set(ninthSection, { y: "100%" });
            gsap.set(toolkitSection, { y: "0%" });
          } else {
            gsap.set(firstSection, { x: "100%" });
            gsap.set(secondSection, { x: "100%" });
            gsap.set(thirdSection, { x: "100%" });
            gsap.set(fourthSection, { x: "100%" });
            gsap.set(fifthSection, { x: "100%" });
            gsap.set(sixthSection, { x: "100%" });
            gsap.set(seventhSection, { x: "100%" });
            gsap.set(eighthSection, { x: "100%" });
            gsap.set(ninthSection, { x: "100%" });
            gsap.set(toolkitSection, { x: "0%" });
          }
          
          gsap.set(thirdText, { opacity: 0 });
          gsap.set(fourthText, { opacity: 0 });
          gsap.set(dataInsights, { opacity: 0, y: "1.2em" });
          gsap.set(retargetLabel, { opacity: 0 });
          gsap.set(fifthText, { opacity: 0 });
          gsap.set(emailMarketing, { opacity: 0, y: "1.2em" });
          gsap.set(sixthText, { opacity: 0 });
          gsap.set(promotions, { opacity: 0, y: "1.2em" });
          gsap.set(seventhText, { opacity: 0 });
          gsap.set(marketingInsights, { opacity: 0, y: "1.2em" });
          gsap.set(eighthText, { opacity: 0 });
          gsap.set(miniPortfolio, { opacity: 0, y: "1.2em" });
          gsap.set(ninthText, { opacity: 0 });
          gsap.set(discoveryChannel, { opacity: 0, y: "1.2em" });
          gsap.set(discoverLabel, { opacity: 0 });

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
      splitTextIntoWords(thirdText);
      splitTextIntoWords(fourthText);
      splitTextIntoWords(fifthText);
      splitTextIntoWords(sixthText);
      splitTextIntoWords(seventhText);
      splitTextIntoWords(eighthText);
      splitTextIntoWords(ninthText);

      // Helper function to animate text with word-by-word reveal
      const animateTextReveal = (textElement: HTMLElement, labelElement?: HTMLElement, delay: number = 0.1) => {
        const textWords = textElement.querySelectorAll('.word');
        const animTl = gsap.timeline({ delay });
        
        animTl.to(textElement, { 
          opacity: 1, 
          duration: 0.2,
          ease: "power2.out"
        });
        
        if (textWords.length > 0) {
          // Faster animations for better user experience
          const animationDuration = isMobile ? 0.4 : 0.6;
          const staggerAmount = isMobile ? 0.02 : 0.04;
          
          animTl.to(textWords, {
            opacity: 1,
            y: 0,
            duration: animationDuration,
            stagger: staggerAmount,
            ease: "power2.out"
          }, "-=0.1");
        }
        
        if (labelElement) {
          animTl.to(labelElement, {
            opacity: 1,
            y: 0,
            duration: isMobile ? 0.3 : 0.4,
            ease: "power2.out"
          }, "-=0.5");
        }
        
        return animTl;
      };

      // Create timeline with ScrollTrigger
      // We have 10 major sections
      // Optimize for mobile performance - removed snap for smoother, more natural scrolling
      // Extra optimization for Safari to prevent lag
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => {
            // Safari mobile gets even shorter distance for better performance
            if (isSafari && isMobile) return "+=6000";
            if (isMobile) return "+=8000";
            return "+=12000";
          },
          scrub: isSafari && isMobile ? 0.3 : (isMobile ? 0.5 : 1.5), // Extra fast on Safari mobile
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true, // Recalculate on resize
          pinSpacing: true, // Ensure proper spacing
          fastScrollEnd: isSafari, // Safari-specific optimization
        },
      });

      // Phase 0: Toolkit section slides out, First Section (CreateEvent) slides in
      if (isMobile) {
        tl.to(toolkitSection, {
          y: "-100%",
          duration: 0.8,
          ease: "power2.inOut"
        });
      } else {
        tl.to(toolkitSection, {
          x: "-100%",
          duration: 0.8,
          ease: "power2.inOut"
        });
      }
      
      // Animate First Section based on screen size
      if (isMobile) {
        tl.to(firstSection, {
          y: "0%",
          duration: 0.8,
          ease: "power2.inOut"
        }, "<");
      } else {
        tl.to(firstSection, {
          x: "0%",
          duration: 0.8,
          ease: "power2.inOut"
        }, "<");
      }

      // Phase 1: Auto-trigger first section text animation (CreateEvent)
      tl.call(() => {
        animateTextReveal(firstText);
      }, [], 0);

      // Phase 2: Slide to second section (Issue Tickets)
      tl.add("secondSection", "+=0.8");
      if (isMobile) {
        tl.to(firstSection, {
          y: "-100%",
          duration: 0.8,
          ease: "power2.inOut"
        }, "secondSection")
        .to(secondSection, {
          y: "0%",
          duration: 0.8,
          ease: "power2.inOut"
        }, "secondSection");
      } else {
        tl.to(firstSection, {
          x: "-100%",
          duration: 0.8,
          ease: "power2.inOut"
        }, "secondSection")
        .to(secondSection, {
          x: "0%",
          duration: 0.8,
          ease: "power2.inOut"
        }, "secondSection");
      }
      
      // Auto-trigger text animation when section is 90% visible
      tl.call(() => {
        animateTextReveal(secondText);
      }, [], "secondSection+=0.72");

      // Phase 3: Slide to third section (Purchase/RSVP)
      tl.add("thirdSection", "+=0.8");
      if (isMobile) {
        tl.to(secondSection, {
          y: "-100%",
          duration: 0.8,
          ease: "power2.inOut"
        }, "thirdSection")
        .to(thirdSection, {
          y: "0%",
          duration: 0.8,
          ease: "power2.inOut"
        }, "thirdSection");
      } else {
        tl.to(secondSection, {
          x: "-100%",
          duration: 0.8,
          ease: "power2.inOut"
        }, "thirdSection")
        .to(thirdSection, {
          x: "0%",
          duration: 0.8,
          ease: "power2.inOut"
        }, "thirdSection");
      }
      
      // Auto-trigger text animation when section is 90% visible
      tl.call(() => {
        animateTextReveal(thirdText);
      }, [], "thirdSection+=0.72");

      // Phase 4: Slide to fourth section (Data Insights) & label change
      tl.add("fourthSection", "+=0.8");
      if (isMobile) {
        tl.to(thirdSection, {
          y: "-100%",
          duration: 0.8,
          ease: "power2.inOut"
        }, "fourthSection")
        .to(fourthSection, {
          y: "0%",
          duration: 0.8,
          ease: "power2.inOut"
        }, "fourthSection");
      } else {
        tl.to(thirdSection, {
          x: "-100%",
          duration: 0.8,
          ease: "power2.inOut"
        }, "fourthSection")
        .to(fourthSection, {
          x: "0%",
          duration: 0.8,
          ease: "power2.inOut"
        }, "fourthSection");
      }
      
      // Label change animation (faster)
      tl.to(distributeLabel, { 
        opacity: 0, 
        duration: 0.3 
      }, "fourthSection")
      .to(retargetLabel, { 
        opacity: 1, 
        duration: 0.3 
      }, "fourthSection+=0.3")
      .to(".distribute-mobile", { 
        opacity: 0, 
        duration: 0.3 
      }, "fourthSection")
      .to(".retarget-mobile", { 
        opacity: 1, 
        duration: 0.3 
      }, "fourthSection+=0.3");

      // Auto-trigger text animation when section is 90% visible
      tl.call(() => {
        animateTextReveal(fourthText, dataInsights);
      }, [], "fourthSection+=0.72");

      // Phase 5: Slide to fifth section (Email Marketing)
      tl.add("fifthSection", "+=0.8");
      if (isMobile) {
        tl.to(fourthSection, {
          y: "-100%",
          duration: 0.8,
          ease: "power2.inOut"
        }, "fifthSection")
        .to(fifthSection, {
          y: "0%",
          duration: 0.8,
          ease: "power2.inOut"
        }, "fifthSection");
      } else {
        tl.to(fourthSection, {
          x: "-100%",
          duration: 0.8,
          ease: "power2.inOut"
        }, "fifthSection")
        .to(fifthSection, {
          x: "0%",
          duration: 0.8,
          ease: "power2.inOut"
        }, "fifthSection");
      }

      // Auto-trigger text animation when section is 90% visible
      tl.call(() => {
        animateTextReveal(fifthText, emailMarketing);
      }, [], "fifthSection+=0.72");

      // Phase 6: Slide to sixth section (Promotions)
      tl.add("sixthSection", "+=0.8");
      if (isMobile) {
        tl.to(fifthSection, {
          y: "-100%",
          duration: 0.8,
          ease: "power2.inOut"
        }, "sixthSection")
        .to(sixthSection, {
          y: "0%",
          duration: 0.8,
          ease: "power2.inOut"
        }, "sixthSection");
      } else {
        tl.to(fifthSection, {
          x: "-100%",
          duration: 0.8,
          ease: "power2.inOut"
        }, "sixthSection")
        .to(sixthSection, {
          x: "0%",
          duration: 0.8,
          ease: "power2.inOut"
        }, "sixthSection");
      }

      // Auto-trigger text animation when section is 90% visible
      tl.call(() => {
        animateTextReveal(sixthText, promotions);
      }, [], "sixthSection+=0.72");

      // Phase 7: Slide to seventh section (Marketing Insights)
      tl.add("seventhSection", "+=0.8");
      if (isMobile) {
        tl.to(sixthSection, {
          y: "-100%",
          duration: 0.8,
          ease: "power2.inOut"
        }, "seventhSection")
        .to(seventhSection, {
          y: "0%",
          duration: 0.8,
          ease: "power2.inOut"
        }, "seventhSection");
      } else {
        tl.to(sixthSection, {
          x: "-100%",
          duration: 0.8,
          ease: "power2.inOut"
        }, "seventhSection")
        .to(seventhSection, {
          x: "0%",
          duration: 0.8,
          ease: "power2.inOut"
        }, "seventhSection");
      }

      // Auto-trigger text animation when section is 90% visible
      tl.call(() => {
        animateTextReveal(seventhText, marketingInsights);
      }, [], "seventhSection+=0.72");

      // Phase 8: Slide to eighth section (Mini Portfolio) & label change
      tl.add("eighthSection", "+=0.8");
      if (isMobile) {
        tl.to(seventhSection, {
          y: "-100%",
          duration: 0.8,
          ease: "power2.inOut"
        }, "eighthSection")
        .to(eighthSection, {
          y: "0%",
          duration: 0.8,
          ease: "power2.inOut"
        }, "eighthSection");
      } else {
        tl.to(seventhSection, {
          x: "-100%",
          duration: 0.8,
          ease: "power2.inOut"
        }, "eighthSection")
        .to(eighthSection, {
          x: "0%",
          duration: 0.8,
          ease: "power2.inOut"
        }, "eighthSection");
      }
      
      // Label change animation (faster)
      tl.to(retargetLabel, { 
        opacity: 0, 
        duration: 0.3 
      }, "eighthSection")
      .to(discoverLabel, { 
        opacity: 1, 
        duration: 0.3 
      }, "eighthSection+=0.3")
      .to(".retarget-mobile", { 
        opacity: 0, 
        duration: 0.3 
      }, "eighthSection")
      .to(".discover-mobile", { 
        opacity: 1, 
        duration: 0.3 
      }, "eighthSection+=0.3");

      // Auto-trigger text animation when section is 90% visible
      tl.call(() => {
        animateTextReveal(eighthText, miniPortfolio);
      }, [], "eighthSection+=0.72");

      // Phase 9: Slide to ninth section (Discovery Channel)
      tl.add("ninthSection", "+=0.8");
      if (isMobile) {
        tl.to(eighthSection, {
          y: "-100%",
          duration: 0.8,
          ease: "power2.inOut"
        }, "ninthSection")
        .to(ninthSection, {
          y: "0%",
          duration: 0.8,
          ease: "power2.inOut"
        }, "ninthSection");
      } else {
        tl.to(eighthSection, {
          x: "-100%",
          duration: 0.8,
          ease: "power2.inOut"
        }, "ninthSection")
        .to(ninthSection, {
          x: "0%",
          duration: 0.8,
          ease: "power2.inOut"
        }, "ninthSection");
      }

      // Auto-trigger text animation when section is 90% visible
      tl.call(() => {
        animateTextReveal(ninthText, discoveryChannel);
      }, [], "ninthSection+=0.72");

        }, section);

        // Handle resize events to update animation direction
        const handleResize = () => {
          try {
            const newIsMobile = window.innerWidth < 768;
            
            if (newIsMobile) {
              gsap.set(toolkitSection, { x: "0%", y: "0%" });
              gsap.set(firstSection, { x: "0%", y: "100%" });
              gsap.set(secondSection, { x: "0%", y: "100%" });
              gsap.set(thirdSection, { x: "0%", y: "100%" });
              gsap.set(fourthSection, { x: "0%", y: "100%" });
              gsap.set(fifthSection, { x: "0%", y: "100%" });
              gsap.set(sixthSection, { x: "0%", y: "100%" });
              gsap.set(seventhSection, { x: "0%", y: "100%" });
              gsap.set(eighthSection, { x: "0%", y: "100%" });
              gsap.set(ninthSection, { x: "0%", y: "100%" });
            } else {
              gsap.set(toolkitSection, { x: "0%", y: "0%" });
              gsap.set(firstSection, { x: "100%", y: "0%" });
              gsap.set(secondSection, { x: "100%", y: "0%" });
              gsap.set(thirdSection, { x: "100%", y: "0%" });
              gsap.set(fourthSection, { x: "100%", y: "0%" });
              gsap.set(fifthSection, { x: "100%", y: "0%" });
              gsap.set(sixthSection, { x: "100%", y: "0%" });
              gsap.set(seventhSection, { x: "100%", y: "0%" });
              gsap.set(eighthSection, { x: "100%", y: "0%" });
              gsap.set(ninthSection, { x: "100%", y: "0%" });
            }
          } catch (error) {
            console.warn('ProductCycleSection: Error in resize handler:', error);
          }
        };

        window.addEventListener('resize', handleResize);

        // Force ScrollTrigger refresh after animations are set up
        ScrollTrigger.refresh();
        
        // Safari-specific delayed refresh to prevent rendering issues
        if (isSafari) {
          gsap.delayedCall(1.5, () => {
            ScrollTrigger.refresh();
          });
        }

        return () => {
          try {
            ctx.revert();
            window.removeEventListener('resize', handleResize);
            // Clean up all ScrollTriggers for this section
            ScrollTrigger.getAll().forEach(st => {
              if (st.trigger === section) {
                st.kill();
              }
            });
          } catch (error) {
            console.warn('ProductCycleSection: Error during cleanup:', error);
          }
        };
      } catch (error) {
        console.error('ProductCycleSection: Animation setup failed:', error);
        // Fallback: ensure elements are visible even if animation fails
        gsap.set([firstText, secondText, thirdText, fourthText, fifthText, sixthText, seventhText, eighthText, ninthText], { opacity: 1 });
        
        // Set sections based on screen size
        const isMobile = window.innerWidth < 768;
        if (isMobile) {
          gsap.set([firstSection, secondSection, thirdSection, fourthSection, fifthSection, sixthSection, seventhSection, eighthSection, ninthSection], { x: "0%", y: "0%" });
          gsap.set(toolkitSection, { x: "0%", y: "0%" });
        } else {
          gsap.set([firstSection, secondSection, thirdSection, fourthSection, fifthSection, sixthSection, seventhSection, eighthSection, ninthSection], { x: "0%" });
          gsap.set(toolkitSection, { x: "0%" });
        }
        
        gsap.set([dataInsights, emailMarketing, promotions, marketingInsights, miniPortfolio, discoveryChannel], { opacity: 1, y: 0 });
        gsap.set([retargetLabel, discoverLabel], { opacity: 1 });
      }
    };

    // Add a small delay to ensure DOM is fully ready, especially on mobile
    const timeoutId = setTimeout(setupAnimation, 100);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className={`${className || ''} w-full h-screen flex relative overflow-hidden`}
      style={{
        transform: 'translateZ(0)', // Force GPU acceleration
        backfaceVisibility: 'hidden',
        perspective: 1000,
      }}
    >
      {/* Toolkit Section - Slides in from right first */}
      <div ref={toolkitSectionRef} className="absolute top-0 right-0 w-full h-full bg-[#0B0B0B] flex flex-col justify-between overflow-hidden" style={{ zIndex: 10, willChange: 'transform' }}>
        <div className="w-full flex flex-col justify-between relative">
          {/* Top Content */}
          <div className="flex flex-col md:flex-row w-full h-fit mt-5 md:mt-10">
            <h2 className="text-white text-2xl sm:text-4xl md:text-4xl ml-5 md:ml-10 lg:text-[44px] w-[70%] md:w-[100%] font-switzer400 leading-tight md:leading-tight">
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
                  <h3 className="absolute top-[38%] md:top-[38%] lg:top-[38%] left-[10%] md:left-[18%] text-[40px] md:text-[40px] leading-none text-[#F0E9B2] instrument-serif-regular">
                    Your Toolkit
                  </h3>
                  <div className="absolute animate-pulse rotate-[90deg] md:rotate-0 w-[60px] md:w-[80px] h-[60px] md:h-[80px] top-[34.5%] md:top-[34.5%] right-[24%] md:right-[25%] transition-all duration-300 hover:scale-[1.1]">
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
            <div className="absolute -bottom-40 translate-x-[185%] md:w-[40%] aspect-[4/3] z-0 transition-all hover:translate-y-[-10%] duration-300">
              <Image src="/Assets/Images/RightCorner.svg" alt="right corner" fill className="object-contain" />
            </div>
          </div>
        </div>
      </div>

      {/* Persistent Labels and Lines Container - Visible across all sections */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none" style={{ zIndex: 100 }}>
        {/* Vertical line - Fixed in place */}
        <div className="absolute left-24 top-0 w-[0.5px] h-full bg-black z-50 hidden md:block"></div>
        <div className="absolute md:hidden left-0 top-20 w-full h-[0.5px] bg-black z-50 block"></div>
        
        {/* Interactive horizontal line - Desktop only */}
        <div className="hidden md:block pointer-events-auto">
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
                  zIndex: 9999
                }}
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-gray-900 rotate-45" style={{zIndex: 10000}}></div>
              </div>
            );
          })()}
        </div>
        
        {/* Labels - Desktop: rotated, Mobile: horizontal at top */}
        <div className="absolute left-0 bottom-40 -rotate-90 text-[#363636] instrument-serif-regular text-4xl tracking-wider z-50 hidden md:block">
          <span ref={distributeLabelRef} className="absolute top-10 -left-16">Distribute</span>
          <span ref={retargetLabelRef} className="absolute top-10 -left-16 opacity-0">Retarget</span>
          <span ref={discoverLabelRef} className="absolute top-10 -left-16 opacity-0">Discover</span>
        </div>
        
        {/* Mobile Labels - Horizontal at top */}
        <div className="absolute top-6 left-8 text-[#363636] instrument-serif-regular text-4xl tracking-wider z-50 md:hidden">
          <span className="block absolute top-0 left-0 distribute-mobile">Distribute</span>
          <span className="block opacity-0 absolute top-0 left-0 retarget-mobile">Retarget</span>
          <span className="block opacity-0 absolute top-0 left-0 discover-mobile">Discover</span>
        </div>
      </div>

      {/* First Section - Create Event - Slides in from right */}
      <div ref={firstSectionRef} className="absolute top-0 right-0 w-full h-full bg-[#EBE4D4] flex items-center justify-center overflow-hidden" style={{ willChange: 'transform' }}>
        {/* Noise effect overlay */}
        <Image
          src="/Assets/Images/NoiseEffectBg.svg"
          alt="noise texture"
          fill
          className="pointer-events-none select-none object-cover z-0"
          style={{ mixBlendMode: "multiply" }}
        />
        
        {/* Content */}
        <div className="w-full h-full flex flex-col md:flex-row">
          <div className="md:w-1/2 md:h-full h-1/2 w-full md:ml-24 px-8 md:pl-10 py-8 md:py-20 flex flex-col justify-between">
            <div ref={firstTextRef} className='w-full h-full flex flex-col items-start relative pt-16 md:pt-0'>
              <div className="w-full md:w-full h-fit flex flex-col pb-6 md:pb-0 items-end md:gap-20 justify-between">
                <h2 className="text-xl sm:text-2xl md:text-4xl font-switzer400 text-[#363636] leading-tight mb-3 md:mb-6 w-full">
                  <span className="word-by-word">Host anything from standard events to multi-day festivals and tours.</span>
                </h2>
                <p className="text-xs sm:text-sm md:text-xl w-full md:w-2/3 text-right font-switzer300 text-gray-600 italic mb-4 md:mb-8">
                  <span className="word-by-word">Add multiple time slots, customise ticket formats, and launch instantly.</span>
                </p>
              </div>
            </div>
            <div className='w-full flex flex-col items-end md:items-start gap-0 py-2 md:py-5'>
              <p className='text-base md:text-lg lg:text-2xl font-nohemi400 text-[#363636]'>
                Create Event
              </p>
            </div>
          </div>
          <div className="w-full md:w-1/2 z-100 bg-[#EBE4D4] relative flex items-center justify-center h-1/2 md:h-full">
            <div className='w-full h-full relative'>
              <Image 
                src="/Assets/Images/Toolkit/Creation.gif"
                alt="Create Event Background" 
                fill 
                className="object-cover" 
              />
            </div>
          </div>
        </div>
      </div>

      {/* Second Section - Issue Tickets - Slides in from right */}
      <div ref={secondSectionRef} className="absolute top-0 right-0 w-full h-full bg-[#EBE4D4] flex items-center justify-center overflow-hidden" style={{ willChange: 'transform' }}>
        {/* Noise effect overlay */}
        <Image
          src="/Assets/Images/NoiseEffectBg.svg"
          alt="noise texture"
          fill
          className="pointer-events-none select-none object-cover z-0"
          style={{ mixBlendMode: "multiply" }}
        />
        
        {/* Content */}
        <div className="w-full h-full flex flex-col md:flex-row">
          <div className="md:w-1/2 md:h-full h-1/2 w-full md:ml-24 px-8 md:pl-10 py-8 md:py-20 flex flex-col justify-between">
            <div ref={secondTextRef} className='w-full h-full flex flex-col items-start relative pt-16 md:pt-0'>
              <div className="w-full md:w-full h-[70%] md:h-fit md:gap-10 flex flex-col items-end justify-between">
                <h2 className="text-xl sm:text-2xl md:text-4xl font-switzer400 text-[#363636] leading-tight mb-3 md:mb-6 w-full">
                  <span className="word-by-word">Issue paid tickets or RSVPs, limit quantities to prevent scalping, and add surveys to collect additional information.</span>
                </h2>
                <p className="text-xs sm:text-sm md:text-xl w-full md:w-2/3 text-right font-switzer300 text-gray-600 italic mb-4 md:mb-8">
                  <span className="word-by-word">tickets are issued and stored on blockchain, making it impossible to forge or duplicate.</span>
                </p>
              </div>
            </div>
            <div className='w-full flex flex-col items-end md:items-start gap-0 py-2 md:py-5'>
              <p className='text-base md:text-lg lg:text-2xl font-nohemi400 text-[#363636]'>
                Issue Tickets
              </p>
            </div>
          </div>
          <div className="w-full md:w-1/2 z-100 bg-[#EBE4D4] relative flex items-center justify-center h-1/2 md:h-full">
            <div className='w-full h-full relative'>
              <Image 
                src="/Assets/Images/Toolkit/Ticket.gif"
                alt="Issue Tickets Background" 
                fill 
                className="object-cover" 
              />
            </div>
          </div>
        </div>
      </div>

      {/* Third Section - Purchase/RSVP - Slides in from right */}
      <div ref={thirdSectionRef} className="absolute top-0 right-0 w-full h-full bg-[#EBE4D4] flex items-center justify-center overflow-hidden" style={{ willChange: 'transform' }}>
        {/* Noise effect overlay */}
        <Image
          src="/Assets/Images/NoiseEffectBg.svg"
          alt="noise texture"
          fill
          className="pointer-events-none select-none object-cover z-0"
          style={{ mixBlendMode: "multiply" }}
        />
        
        {/* Section Content */}
        <div className="h-full w-full flex flex-col md:flex-row">
          {/* Left Half - Visual Content (Smartphone Image) */}
          <div className="w-full md:w-1/2 relative flex items-center justify-center h-1/2 md:h-full">
            <div className="relative w-full h-full top-0 left-0">
              <Image 
                src="/Assets/Images/Toolkit/Purchase.gif" 
                alt="smartphone with event booking app" 
                fill 
                className="object-cover z-10" 
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
               <div ref={thirdTextRef} className='w-full flex flex-col items-end relative h-full pt-10 md:pt-0'>
                 <div className="w-full flex flex-col items-end h-full md:h-[50%] justify-around">
                   <h2 className="text-2xl md:text-4xl font-switzer400 text-[#363636] leading-tight mb-4 md:mb-6 w-full">
                     <span className="word-by-word">Give your fans a seamless way to book their tickets – apply discounts, confirm instantly.</span>
                   </h2>
                   <p className="text-sm md:text-xl w-2/3 md:w-1/2 text-left font-switzer300 text-gray-600 italic mb-6 md:mb-8">
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

      {/* Fourth Section - Data Insights - Slides in from right */}
      <div ref={fourthSectionRef} className="absolute top-0 right-0 w-full h-full bg-[#EBE4D4] flex items-center justify-center overflow-hidden" style={{ willChange: 'transform' }}>
        {/* Noise effect overlay */}
        <Image
          src="/Assets/Images/NoiseEffectBg.svg"
          alt="noise texture"
          fill
          className="pointer-events-none select-none object-cover z-0"
          style={{ mixBlendMode: "multiply" }}
        />
        
        {/* Section Content */}
        <div className="h-full w-full flex flex-col md:flex-row">
          {/* Left Half - Text Content */}
          <div className="w-full md:w-1/2 flex items-center justify-center h-1/2 md:h-full">
            <div className="h-full w-full mx-4 md:ml-24 md:mr-18 px-4 md:pl-10 py-8 md:py-20 flex flex-col justify-between">
              {/* Text Content */}
              <div ref={fourthTextRef} className='w-full flex flex-col items-end relative h-full pt-16 md:pt-0'>
                <div className="w-full flex flex-col py-6 md:pt-10 items-end h-full md:h-[60%] md:justify-between justify-around">
                  <h2 className="text-xl sm:text-2xl md:text-4xl font-switzer400 text-[#363636] leading-tight mb-3 md:mb-6 w-full">
                    <span className="word-by-word">Own your data and make data-driven decisions.</span>
                  </h2>
                  <p className="text-xs sm:text-sm md:text-xl w-full md:w-[80%] text-left font-switzer300 text-gray-600 italic mb-4 md:mb-0">
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
          <div className="w-full md:w-1/2 bg-[#EBE4D4] relative flex items-center justify-center h-1/2 md:h-full">
            {/* Noise effect overlay */}
            <Image
              src="/Assets/Images/NoiseEffectBg.svg"
              alt="noise texture"
              fill
              className="pointer-events-none select-none object-cover z-0"
              style={{ mixBlendMode: "multiply" }}
            />
            <div className='w-full h-full relative z-10'>
              <Image src="/Assets/Images/Toolkit/Data_Insights.gif" alt="product cycle dashboard" fill className="object-cover" />
            </div>
          </div>
        </div>
      </div>

      {/* Fifth Section - Email Marketing */}
      <div ref={fifthSectionRef} className="absolute top-0 right-0 w-full h-full bg-[#EBE4D4] flex items-center justify-center overflow-hidden" style={{ willChange: 'transform' }}>
        {/* Noise effect overlay */}
        <Image
          src="/Assets/Images/NoiseEffectBg.svg"
          alt="noise texture"
          fill
          className="pointer-events-none select-none object-cover z-0"
          style={{ mixBlendMode: "multiply" }}
        />
        
        {/* Section Content */}
        <div className="h-full w-full flex flex-col md:flex-row">
          {/* Left Half - Text Content */}
          <div className="w-full md:w-1/2 flex items-center justify-center h-1/2 md:h-full">
            <div className="h-full w-full mx-4 md:ml-24 px-4 md:pl-10 py-8 md:py-20 flex flex-col justify-between">
              {/* Text Content */}
              <div ref={fifthTextRef} className='w-full flex flex-col items-end relative h-fit pt-16 md:pt-0'>
                <div className="w-full flex flex-col py-6 md:py-0 items-end h-full md:h-fit md:gap-10 md:justify-between justify-around">
                  <h2 className="text-xl sm:text-2xl md:text-4xl font-switzer400 text-[#363636] leading-tight mb-3 md:mb-6 w-full">
                    <span className="word-by-word">Send targeted email and SMS campaigns directly to attendees, or import contacts from your dashboard.</span>
                  </h2>
                  <p className="text-xs sm:text-sm md:text-xl w-full md:w-1/2 text-left font-switzer300 text-gray-600 italic mb-4 md:mb-8">
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
            <div className='w-full h-full md:h-[80%] z-10 relative top-0 left-0'>
              <Image src="/Assets/Images/Toolkit/Email_Marketing.gif" alt="email marketing dashboard" fill className="object-cover" />
            </div>
          </div>
        </div>
      </div>

      {/* Sixth Section - Promotions and Discount Codes */}
      <div ref={sixthSectionRef} className="absolute top-0 right-0 w-full h-full bg-[#EBE4D4] flex items-center justify-center overflow-hidden" style={{ willChange: 'transform' }}>
        {/* Noise effect overlay - Applied to entire section */}
        <Image
          src="/Assets/Images/NoiseEffectBg.svg"
          alt="noise texture"
          fill
          className="pointer-events-none select-none object-cover z-0"
          style={{ mixBlendMode: "multiply" }}
        />
        
        {/* Section Content */}
        <div className="h-full w-full flex flex-col md:flex-row">
          {/* Left Half - Visual Content (Laptop Image) */}
          <div className="w-full md:w-1/2 relative flex items-center justify-center h-1/2 md:h-full md:order-1">
            <div className='mx-4 md:mx-24 w-full h-full overflow-hidden relative md:left-20 left-4 -bottom-10'>
              <Image src="/Assets/Images/Toolkit/Retarget_Promotions.svg" alt="promotions dashboard" fill className="object-contain" />
            </div>
          </div>
          {/* Right Half - Text Content */}
          <div className="w-full md:w-1/2 flex items-center justify-center h-1/2 md:h-full md:order-2">
            <div className="h-full w-full mx-4 md:mr-24 px-4 md:px-10 py-8 md:py-20 flex flex-col justify-between">
              {/* Text Content */}
              <div ref={sixthTextRef} className='w-full flex flex-col items-end relative h-full pt-16 md:pt-0'>
                <div className="w-full flex flex-col py-6 md:py-10 items-end h-[60%] md:h-fit md:gap-10 justify-between">
                  <h2 className="text-xl sm:text-2xl md:text-4xl font-switzer400 text-[#363636] leading-tight mb-3 md:mb-6 w-full">
                    <span className="word-by-word">Set up exclusive promoter codes and custom discounts in seconds.</span>
                  </h2>
                  <p className="text-xs sm:text-sm md:text-xl w-full md:w-1/2 text-right font-switzer300 text-gray-600 italic mb-4 md:mb-8">
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

      {/* Seventh Section - Marketing Insights */}
      <div ref={seventhSectionRef} className="absolute top-0 right-0 w-full h-full bg-[#EBE4D4] flex items-center justify-center overflow-hidden" style={{ willChange: 'transform' }}>
        {/* Noise effect overlay */}
        <Image
          src="/Assets/Images/NoiseEffectBg.svg"
          alt="noise texture"
          fill
          className="pointer-events-none select-none object-cover z-0"
          style={{ mixBlendMode: "multiply" }}
        />
        
        {/* Section Content */}
        <div className="h-full w-full flex flex-col md:flex-row">
          {/* Left Half - Text Content */}
          <div className="w-full md:w-1/2 flex items-center justify-center h-1/2 md:h-full">
            <div className="h-full w-full mx-4 md:ml-24 px-4 md:px-10 py-8 md:py-20 flex flex-col justify-between">
              {/* Text Content */}
              <div ref={seventhTextRef} className='w-full flex flex-col items-end relative h-full pt-16 md:pt-0'>
                <div className="w-full flex flex-col items-end h-[50%] gap-6 md:gap-10 justify-between">
                  <h2 className="text-xl sm:text-2xl md:text-4xl font-switzer400 text-[#363636] leading-tight mb-3 md:mb-6 w-full">
                    <span className="word-by-word">See the full story with live analytics - track revenue, reach, contacts and performance.</span>
                  </h2>
                  <p className="text-xs sm:text-sm md:text-xl w-full md:w-2/3 text-left font-switzer300 text-gray-600 italic mb-4 md:mb-8">
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
              <Image src="/Assets/Images/Toolkit/Temp/marketing_analytics.png" alt="marketing insights dashboard" fill className="object-contain md:object-cover" />
            </div>
          </div>
        </div>
      </div>

      {/* Eighth Section - Mini Portfolio */}
      <div ref={eighthSectionRef} className="absolute top-0 right-0 w-full h-full bg-[#EBE4D4] flex items-center justify-center overflow-hidden" style={{ willChange: 'transform' }}>
        {/* Noise effect overlay */}
        <Image
          src="/Assets/Images/NoiseEffectBg.svg"
          alt="noise texture"
          fill
          className="pointer-events-none select-none object-cover z-0"
          style={{ mixBlendMode: "multiply" }}
        />
        
        {/* Section Content */}
        <div className="h-full w-full flex flex-col md:flex-row">
          {/* Left Half - Text Content */}
          <div className="w-full md:w-1/2 flex items-center justify-center h-1/2 md:h-full">
            <div className="h-full w-full mx-4 md:ml-24 px-4 md:px-10 py-8 md:py-20 flex flex-col justify-between">
              {/* Text Content */}
              <div ref={eighthTextRef} className='w-full flex flex-col items-end relative h-full pt-16 md:pt-0'>
                <div className="w-full flex flex-col items-start md:items-end h-[50%] gap-6 md:gap-10 justify-between">
                  <h2 className="text-xl sm:text-2xl md:text-4xl font-switzer400 text-[#363636] leading-tight mb-3 md:mb-6 w-full">
                    <span className="word-by-word">First step to build your community, keep your fans updated on what's next with a gallery, collections, upcoming events and embedded playlists.</span>
                  </h2>
                  <p className="text-xs sm:text-sm md:text-xl w-full md:w-2/3 text-left font-switzer300 text-gray-600 italic mb-4 md:mb-8">
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
              <Image src="/Assets/Images/Toolkit/Temp/profile.png" alt="mini portfolio mobile app" fill className="object-cover" />
            </div>
          </div>
        </div>
      </div>

      {/* Ninth Section - Discovery Channel */}
      <div ref={ninthSectionRef} className="absolute top-0 right-0 w-full h-full bg-[#EBE4D4] flex items-center justify-center overflow-hidden" style={{ willChange: 'transform' }}>
        {/* Noise effect overlay */}
        <Image
          src="/Assets/Images/NoiseEffectBg.svg"
          alt="noise texture"
          fill
          className="pointer-events-none select-none object-cover z-0"
          style={{ mixBlendMode: "multiply" }}
        />
        
        {/* Section Content */}
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
              <Image src="/Assets/Images/Toolkit/Temp/home pic.png" alt="discovery channel mobile app" fill className="object-cover" />
            </div>
          </div>

          {/* Right Half - Text Content */}
          <div className="w-full md:w-1/2 flex items-center justify-center h-1/2 md:h-full order-1 md:order-2">
            <div className="h-full w-full mx-4 md:mr-24 px-4 md:pl-14 py-8 md:py-20 flex flex-col justify-between">
              {/* Text Content */}
              <div ref={ninthTextRef} className='w-full flex flex-col items-end relative h-full pt-16 md:pt-0'>
                <div className="w-full flex flex-col items-end h-[50%] gap-6 md:gap-10 justify-between">
                  <h2 className="text-xl sm:text-2xl md:text-4xl font-switzer400 text-[#363636] leading-tight mb-3 md:mb-6 w-full">
                    <span className="word-by-word">Let your audience explore nearby experiences on the map, RSVP with a tap, view an interactive calendar</span>
                  </h2>
                  <p className="text-xs sm:text-sm md:text-xl w-full md:w-1/2 text-left font-switzer300 text-gray-600 italic mb-4 md:mb-8">
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
    </section>
  );
};

export default ProductCycleSection;
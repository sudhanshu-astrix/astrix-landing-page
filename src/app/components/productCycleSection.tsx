"use client";
import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ProductCycleSectionProps {
  className?: string;
}

// Animated Text Component for Mobile - Word by Word Animation with CSS
const AnimatedText = ({
  text,
  className = "",
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) => {
  const ref = useRef<HTMLHeadingElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.9, rootMargin: "0px" }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [isVisible]);

  const words = text.split(" ");

  return (
    <h2 ref={ref} className={className}>
      {words.map((word, index) => (
        <span
          key={index}
          className="animated-word"
          style={{
            display: "inline-block",
            marginRight: "0.25em",
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(1.5em)",
            transition: `opacity 0.6s cubic-bezier(0.25, 0.1, 0.25, 1) ${delay + index * 0.05}s, transform 0.6s cubic-bezier(0.25, 0.1, 0.25, 1) ${delay + index * 0.05}s`,
            willChange: "opacity, transform",
          }}
        >
          {word}
        </span>
      ))}
    </h2>
  );
};

// Animated Paragraph Component for Mobile with CSS
const AnimatedParagraph = ({
  text,
  className = "",
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) => {
  const ref = useRef<HTMLParagraphElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.9, rootMargin: "0px" }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [isVisible]);

  const words = text.split(" ");

  return (
    <p ref={ref} className={className}>
      {words.map((word, index) => (
        <span
          key={index}
          className="animated-word"
          style={{
            display: "inline-block",
            marginRight: "0.25em",
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(1.5em)",
            transition: `opacity 0.6s cubic-bezier(0.25, 0.1, 0.25, 1) ${delay + index * 0.05}s, transform 0.6s cubic-bezier(0.25, 0.1, 0.25, 1) ${delay + index * 0.05}s`,
            willChange: "opacity, transform",
          }}
        >
          {word}
        </span>
      ))}
    </p>
  );
};

// Animated Action Text Component for Mobile with CSS
const AnimatedAction = ({
  text,
  className = "",
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) => {
  const ref = useRef<HTMLParagraphElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.9, rootMargin: "0px" }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [isVisible]);

  return (
    <p
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(1.5em)",
        transition: `opacity 0.8s cubic-bezier(0.25, 0.1, 0.25, 1) ${delay}s, transform 0.8s cubic-bezier(0.25, 0.1, 0.25, 1) ${delay}s`,
        willChange: "opacity, transform",
      }}
    >
      {text}
    </p>
  );
};

const ProductCycleSection = ({ className }: ProductCycleSectionProps) => {
  const [isMobile, setIsMobile] = useState(false);
  const [stickyLabel, setStickyLabel] = useState("Distribute");

  const sectionRef = useRef<HTMLDivElement>(null);
  const toolkitSectionRef = useRef<HTMLDivElement>(null);
  const firstSectionRef = useRef<HTMLDivElement>(null);
  const secondSectionRef = useRef<HTMLDivElement>(null);
  const thirdSectionRef = useRef<HTMLDivElement>(null);
  const fourthSectionRef = useRef<HTMLDivElement>(null);
  const fifthSectionRef = useRef<HTMLDivElement>(null);
  const sixthSectionRef = useRef<HTMLDivElement>(null);
  const seventhSectionRef = useRef<HTMLDivElement>(null);
  const eighthSectionRef = useRef<HTMLDivElement>(null);
  const ninthSectionRef = useRef<HTMLDivElement>(null);

  // Desktop-only refs
  const firstTextRef = useRef<HTMLDivElement>(null);
  const secondTextRef = useRef<HTMLDivElement>(null);
  const thirdTextRef = useRef<HTMLDivElement>(null);
  const fourthTextRef = useRef<HTMLDivElement>(null);
  const fifthTextRef = useRef<HTMLDivElement>(null);
  const sixthTextRef = useRef<HTMLDivElement>(null);
  const seventhTextRef = useRef<HTMLDivElement>(null);
  const eighthTextRef = useRef<HTMLDivElement>(null);
  const ninthTextRef = useRef<HTMLDivElement>(null);
  const dataInsightsRef = useRef<HTMLDivElement>(null);
  const emailMarketingRef = useRef<HTMLDivElement>(null);
  const promotionsRef = useRef<HTMLDivElement>(null);
  const marketingInsightsRef = useRef<HTMLDivElement>(null);
  const miniPortfolioRef = useRef<HTMLDivElement>(null);
  const discoveryChannelRef = useRef<HTMLDivElement>(null);
  const distributeLabelRef = useRef<HTMLSpanElement>(null);
  const retargetLabelRef = useRef<HTMLSpanElement>(null);
  const discoverLabelRef = useRef<HTMLSpanElement>(null);

  // Desktop interactive line hooks (always declared to maintain consistent hook order)
  const [lineWidth, setLineWidth] = useState(250);
  const lineRef = useRef<HTMLDivElement>(null);

  // Detect mobile on mount
  useEffect(() => {
    const checkMobile = () => window.innerWidth < 768;
    setIsMobile(checkMobile());

    const handleResize = () => setIsMobile(checkMobile());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Mobile: Track visible section to update sticky label
  useEffect(() => {
    if (!isMobile) return;

    const sections = [
      { ref: firstSectionRef, label: "Distribute" },
      { ref: secondSectionRef, label: "Distribute" },
      { ref: thirdSectionRef, label: "Distribute" },
      { ref: fourthSectionRef, label: "Retarget" },
      { ref: fifthSectionRef, label: "Retarget" },
      { ref: sixthSectionRef, label: "Retarget" },
      { ref: seventhSectionRef, label: "Retarget" },
      { ref: eighthSectionRef, label: "Discover" },
      { ref: ninthSectionRef, label: "Discover" },
    ];

    const observerOptions = {
      threshold: 0.5, // Trigger when 50% of section is visible
      rootMargin: "-20% 0px -20% 0px", // Account for sticky header
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const section = sections.find((s) => s.ref.current === entry.target);
          if (section) {
            setStickyLabel(section.label);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((section) => {
      if (section.ref.current) {
        observer.observe(section.ref.current);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [isMobile]);

  // Desktop interactive line mouse move handler
  useEffect(() => {
    if (isMobile) return;

    function handleMouseMove(e: MouseEvent) {
      const minWidth = 250;
      const maxWidth = window.innerWidth;
      const newWidth = Math.max(minWidth, Math.min(e.clientX, maxWidth));
      setLineWidth(newWidth);
    }

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isMobile]);

  // Mobile: Text animations are now handled by framer-motion components
  // No need for IntersectionObserver anymore

  // Desktop: GSAP ScrollTrigger animation
  useEffect(() => {
    if (isMobile) return;

    let cleanup: (() => void) | null = null;
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
    if (
      !section ||
      !firstText ||
      !secondText ||
      !firstSection ||
      !secondSection ||
      !thirdSection ||
      !thirdText ||
      !fourthSection ||
      !fourthText ||
      !dataInsights ||
      !distributeLabel ||
      !retargetLabel ||
      !fifthSection ||
      !fifthText ||
      !emailMarketing ||
      !sixthSection ||
      !sixthText ||
      !promotions ||
      !seventhSection ||
      !seventhText ||
      !marketingInsights ||
      !eighthSection ||
      !eighthText ||
      !miniPortfolio ||
      !ninthSection ||
      !ninthText ||
      !discoveryChannel ||
      !discoverLabel ||
      !toolkitSection
    ) {
      console.warn(
        "ProductCycleSection: Some required elements are missing, skipping animation setup"
      );
      return;
    }

    // Detect Safari for optimization
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

    // Detect Opera Mini and low-performance browsers
    const isOperaMini = /Opera Mini/i.test(navigator.userAgent);
    const isLowPerformance =
      isOperaMini || /Android.*Chrome\/[1-5][0-9]\./i.test(navigator.userAgent);

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
          gsap.set(distributeLabel, { opacity: 0 }); // Hide initially, show when first section appears
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

          // Hide mobile labels initially
          gsap.set(".distribute-mobile", { opacity: 0 });
          gsap.set(".retarget-mobile", { opacity: 0 });
          gsap.set(".discover-mobile", { opacity: 0 });

          // Split first text into words for word-by-word animation
          const splitTextIntoWords = (element: Element) => {
            const textElements = element.querySelectorAll(".word-by-word");
            textElements.forEach((textEl) => {
              const text = textEl.textContent || "";
              const words = text.split(" ");
              textEl.innerHTML = words
                .map(
                  (word) =>
                    `<span class="word" style="opacity: 0; transform: translateY(1.2em); display: inline-block;">${word}</span>`
                )
                .join(" ");
            });
          };

          // Split all texts into words (only on desktop for performance)
          if (!isMobile) {
            splitTextIntoWords(firstText);
            splitTextIntoWords(secondText);
            splitTextIntoWords(thirdText);
            splitTextIntoWords(fourthText);
            splitTextIntoWords(fifthText);
            splitTextIntoWords(sixthText);
            splitTextIntoWords(seventhText);
            splitTextIntoWords(eighthText);
            splitTextIntoWords(ninthText);
          }

          // Helper function to animate text with word-by-word reveal
          const animateTextReveal = (
            textElement: HTMLElement,
            labelElement?: HTMLElement,
            delay: number = 0.1
          ) => {
            const animTl = gsap.timeline({ delay });

            if (isMobile || isLowPerformance) {
              // Mobile/Low-performance: Simple fade-in, no transforms for maximum performance
              // Even more optimized for Opera Mini and low-performance browsers
              if (isLowPerformance) {
                // Instant fade-in for low-performance browsers
                gsap.set(textElement, { opacity: 0 });
                animTl.to(textElement, {
                  opacity: 1,
                  duration: 0.2,
                  ease: "none",
                });

                if (labelElement) {
                  gsap.set(labelElement, { opacity: 0 });
                  animTl.to(
                    labelElement,
                    {
                      opacity: 1,
                      duration: 0.1,
                      ease: "none",
                    },
                    "<"
                  );
                }
              } else {
                // Mobile: Simple slide-up fade-in
                gsap.set(textElement, {
                  y: 20,
                  opacity: 0,
                  force3D: true,
                });

                animTl.to(textElement, {
                  y: 0,
                  opacity: 1,
                  duration: 0.4,
                  ease: "power1.out",
                  force3D: true,
                  clearProps: "transform",
                });

                if (labelElement) {
                  gsap.set(labelElement, {
                    y: 15,
                    opacity: 0,
                    force3D: true,
                  });
                  animTl.to(
                    labelElement,
                    {
                      opacity: 1,
                      y: 0,
                      duration: 0.3,
                      ease: "power1.out",
                      force3D: true,
                      clearProps: "transform",
                    },
                    "<0.1"
                  );
                }
              }
            } else {
              // Desktop: Full word-by-word animation
              const textWords = textElement.querySelectorAll(".word");

              animTl.to(textElement, {
                opacity: 1,
                duration: 0.2,
                ease: "power2.out",
              });

              if (textWords.length > 0) {
                animTl.to(
                  textWords,
                  {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    stagger: 0.04,
                    ease: "power2.out",
                  },
                  "-=0.1"
                );
              }

              if (labelElement) {
                animTl.to(
                  labelElement,
                  {
                    opacity: 1,
                    y: 0,
                    duration: 0.4,
                    ease: "power2.out",
                  },
                  "-=0.5"
                );
              }
            }

            return animTl;
          };

          // Create timeline with ScrollTrigger
          // We have 10 major sections
          // Optimize for mobile performance - removed snap for smoother, more natural scrolling
          // Extra optimization for Safari and low-performance browsers to prevent lag
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: () => {
                // Much shorter distance on mobile/low-performance for better performance
                if (isLowPerformance) return "+=3000"; // Even shorter for Opera Mini
                if (isMobile) return "+=4000"; // Shorter scroll distance for mobile
                return "+=12000";
              },
              scrub: isLowPerformance ? 0.05 : isMobile ? 0.1 : 1.5, // Near-instant for low-performance browsers
              pin: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              pinSpacing: true,
              fastScrollEnd: isSafari || isLowPerformance,
              // Prevent layout shifts
              pinReparent: false,
              // Mobile-specific optimizations
              ...(isMobile && {
                refreshPriority: -1, // Lower priority for mobile
              }),
              // Low-performance browser optimizations
              ...(isLowPerformance && {
                markers: false,
                toggleActions: "play none none none",
              }),
            },
          });

          // Phase 0: Toolkit section slides out, First Section (CreateEvent) slides in
          // Simplified animations for mobile and low-performance browsers
          const slideDuration = isLowPerformance ? 0.3 : isMobile ? 0.5 : 0.8; // Even faster for low-performance
          const slideEase =
            isLowPerformance || isMobile ? "none" : "power2.inOut"; // Simpler easing on mobile/low-performance

          if (isMobile) {
            tl.to(toolkitSection, {
              y: "-100%",
              duration: slideDuration,
              ease: slideEase,
              force3D: true, // GPU acceleration
            });
          } else {
            tl.to(toolkitSection, {
              x: "-100%",
              duration: slideDuration,
              ease: slideEase,
            });
          }

          // Animate First Section based on screen size
          if (isMobile) {
            tl.to(
              firstSection,
              {
                y: "0%",
                duration: slideDuration,
                ease: slideEase,
                force3D: true, // GPU acceleration
              },
              "<"
            );
          } else {
            tl.to(
              firstSection,
              {
                x: "0%",
                duration: slideDuration,
                ease: slideEase,
              },
              "<"
            );
          }

          // Show Distribute label when first section appears
          const labelDuration = isLowPerformance ? 0.1 : isMobile ? 0.2 : 0.3;
          tl.to(
            distributeLabel,
            {
              opacity: 1,
              duration: labelDuration,
              ease: "none",
            },
            "<"
          ).to(
            ".distribute-mobile",
            {
              opacity: 1,
              duration: labelDuration,
              ease: "none",
            },
            "<"
          );

          // Phase 1: Auto-trigger first section text animation (CreateEvent)
          tl.call(
            () => {
              animateTextReveal(firstText);
            },
            [],
            0
          );

          // Phase 2: Slide to second section (Issue Tickets)
          const sectionDelay = isMobile ? "+=0.5" : "+=0.8";
          tl.add("secondSection", sectionDelay);
          if (isMobile) {
            tl.to(
              firstSection,
              {
                y: "-100%",
                duration: slideDuration,
                ease: slideEase,
                force3D: true,
              },
              "secondSection"
            ).to(
              secondSection,
              {
                y: "0%",
                duration: slideDuration,
                ease: slideEase,
                force3D: true,
              },
              "secondSection"
            );
          } else {
            tl.to(
              firstSection,
              {
                x: "-100%",
                duration: slideDuration,
                ease: slideEase,
              },
              "secondSection"
            ).to(
              secondSection,
              {
                x: "0%",
                duration: slideDuration,
                ease: slideEase,
              },
              "secondSection"
            );
          }

          // Auto-trigger text animation when section is visible
          const textTrigger = isMobile
            ? "secondSection+=0.4"
            : "secondSection+=0.72";
          tl.call(
            () => {
              animateTextReveal(secondText);
            },
            [],
            textTrigger
          );

          // Phase 3: Slide to third section (Purchase/RSVP)
          tl.add("thirdSection", sectionDelay);
          if (isMobile) {
            tl.to(
              secondSection,
              {
                y: "-100%",
                duration: slideDuration,
                ease: slideEase,
                force3D: true,
              },
              "thirdSection"
            ).to(
              thirdSection,
              {
                y: "0%",
                duration: slideDuration,
                ease: slideEase,
                force3D: true,
              },
              "thirdSection"
            );
          } else {
            tl.to(
              secondSection,
              {
                x: "-100%",
                duration: slideDuration,
                ease: slideEase,
              },
              "thirdSection"
            ).to(
              thirdSection,
              {
                x: "0%",
                duration: slideDuration,
                ease: slideEase,
              },
              "thirdSection"
            );
          }

          // Auto-trigger text animation when section is visible
          tl.call(
            () => {
              animateTextReveal(thirdText);
            },
            [],
            isMobile ? "thirdSection+=0.4" : "thirdSection+=0.72"
          );

          // Phase 4: Slide to fourth section (Data Insights) & label change
          tl.add("fourthSection", sectionDelay);
          if (isMobile) {
            tl.to(
              thirdSection,
              {
                y: "-100%",
                duration: slideDuration,
                ease: slideEase,
                force3D: true,
              },
              "fourthSection"
            ).to(
              fourthSection,
              {
                y: "0%",
                duration: slideDuration,
                ease: slideEase,
                force3D: true,
              },
              "fourthSection"
            );
          } else {
            tl.to(
              thirdSection,
              {
                x: "-100%",
                duration: slideDuration,
                ease: slideEase,
              },
              "fourthSection"
            ).to(
              fourthSection,
              {
                x: "0%",
                duration: slideDuration,
                ease: slideEase,
              },
              "fourthSection"
            );
          }

          // Label change animation
          tl.to(
            distributeLabel,
            {
              opacity: 0,
              duration: labelDuration,
              ease: "none",
            },
            "fourthSection"
          )
            .to(
              retargetLabel,
              {
                opacity: 1,
                duration: labelDuration,
                ease: "none",
              },
              isMobile ? "fourthSection+=0.2" : "fourthSection+=0.3"
            )
            .to(
              ".distribute-mobile",
              {
                opacity: 0,
                duration: labelDuration,
                ease: "none",
              },
              "fourthSection"
            )
            .to(
              ".retarget-mobile",
              {
                opacity: 1,
                duration: labelDuration,
                ease: "none",
              },
              isMobile ? "fourthSection+=0.2" : "fourthSection+=0.3"
            );

          // Auto-trigger text animation when section is visible
          tl.call(
            () => {
              animateTextReveal(fourthText, dataInsights);
            },
            [],
            isMobile ? "fourthSection+=0.4" : "fourthSection+=0.72"
          );

          // Phase 5: Slide to fifth section (Email Marketing)
          tl.add("fifthSection", sectionDelay);
          if (isMobile) {
            tl.to(
              fourthSection,
              {
                y: "-100%",
                duration: slideDuration,
                ease: slideEase,
                force3D: true,
              },
              "fifthSection"
            ).to(
              fifthSection,
              {
                y: "0%",
                duration: slideDuration,
                ease: slideEase,
                force3D: true,
              },
              "fifthSection"
            );
          } else {
            tl.to(
              fourthSection,
              {
                x: "-100%",
                duration: slideDuration,
                ease: slideEase,
                force3D: true,
              },
              "fifthSection"
            ).to(
              fifthSection,
              {
                x: "0%",
                duration: slideDuration,
                ease: slideEase,
                force3D: true,
              },
              "fifthSection"
            );
          }

          // Auto-trigger text animation when section is 90% visible
          tl.call(
            () => {
              animateTextReveal(fifthText, emailMarketing);
            },
            [],
            isMobile ? "fifthSection+=0.4" : "fifthSection+=0.72"
          );

          // Phase 6: Slide to sixth section (Promotions)
          tl.add("sixthSection", sectionDelay);
          if (isMobile) {
            tl.to(
              fifthSection,
              {
                y: "-100%",
                duration: slideDuration,
                ease: slideEase,
                force3D: true,
              },
              "sixthSection"
            ).to(
              sixthSection,
              {
                y: "0%",
                duration: slideDuration,
                ease: slideEase,
                force3D: true,
              },
              "sixthSection"
            );
          } else {
            tl.to(
              fifthSection,
              {
                x: "-100%",
                duration: slideDuration,
                ease: slideEase,
                force3D: true,
              },
              "sixthSection"
            ).to(
              sixthSection,
              {
                x: "0%",
                duration: slideDuration,
                ease: slideEase,
                force3D: true,
              },
              "sixthSection"
            );
          }

          // Auto-trigger text animation when section is 90% visible
          tl.call(
            () => {
              animateTextReveal(sixthText, promotions);
            },
            [],
            isMobile ? "sixthSection+=0.4" : "sixthSection+=0.72"
          );

          // Phase 7: Slide to seventh section (Marketing Insights)
          tl.add("seventhSection", sectionDelay);
          if (isMobile) {
            tl.to(
              sixthSection,
              {
                y: "-100%",
                duration: slideDuration,
                ease: slideEase,
                force3D: true,
              },
              "seventhSection"
            ).to(
              seventhSection,
              {
                y: "0%",
                duration: slideDuration,
                ease: slideEase,
                force3D: true,
              },
              "seventhSection"
            );
          } else {
            tl.to(
              sixthSection,
              {
                x: "-100%",
                duration: slideDuration,
                ease: slideEase,
                force3D: true,
              },
              "seventhSection"
            ).to(
              seventhSection,
              {
                x: "0%",
                duration: slideDuration,
                ease: slideEase,
                force3D: true,
              },
              "seventhSection"
            );
          }

          // Auto-trigger text animation when section is 90% visible
          tl.call(
            () => {
              animateTextReveal(seventhText, marketingInsights);
            },
            [],
            isMobile ? "seventhSection+=0.4" : "seventhSection+=0.72"
          );

          // Phase 8: Slide to eighth section (Mini Portfolio) & label change
          tl.add("eighthSection", sectionDelay);
          if (isMobile) {
            tl.to(
              seventhSection,
              {
                y: "-100%",
                duration: slideDuration,
                ease: slideEase,
                force3D: true,
              },
              "eighthSection"
            ).to(
              eighthSection,
              {
                y: "0%",
                duration: slideDuration,
                ease: slideEase,
                force3D: true,
              },
              "eighthSection"
            );
          } else {
            tl.to(
              seventhSection,
              {
                x: "-100%",
                duration: slideDuration,
                ease: slideEase,
                force3D: true,
              },
              "eighthSection"
            ).to(
              eighthSection,
              {
                x: "0%",
                duration: slideDuration,
                ease: slideEase,
                force3D: true,
              },
              "eighthSection"
            );
          }

          // Label change animation
          tl.to(
            retargetLabel,
            {
              opacity: 0,
              duration: labelDuration,
              ease: "none",
            },
            "eighthSection"
          )
            .to(
              discoverLabel,
              {
                opacity: 1,
                duration: labelDuration,
                ease: "none",
              },
              isMobile ? "eighthSection+=0.2" : "eighthSection+=0.3"
            )
            .to(
              ".retarget-mobile",
              {
                opacity: 0,
                duration: labelDuration,
                ease: "none",
              },
              "eighthSection"
            )
            .to(
              ".discover-mobile",
              {
                opacity: 1,
                duration: labelDuration,
                ease: "none",
              },
              isMobile ? "eighthSection+=0.2" : "eighthSection+=0.3"
            );

          // Auto-trigger text animation when section is 90% visible
          tl.call(
            () => {
              animateTextReveal(eighthText, miniPortfolio);
            },
            [],
            isMobile ? "eighthSection+=0.4" : "eighthSection+=0.72"
          );

          // Phase 9: Slide to ninth section (Discovery Channel)
          tl.add("ninthSection", sectionDelay);
          if (isMobile) {
            tl.to(
              eighthSection,
              {
                y: "-100%",
                duration: slideDuration,
                ease: slideEase,
                force3D: true,
              },
              "ninthSection"
            ).to(
              ninthSection,
              {
                y: "0%",
                duration: slideDuration,
                ease: slideEase,
                force3D: true,
              },
              "ninthSection"
            );
          } else {
            tl.to(
              eighthSection,
              {
                x: "-100%",
                duration: slideDuration,
                ease: slideEase,
                force3D: true,
              },
              "ninthSection"
            ).to(
              ninthSection,
              {
                x: "0%",
                duration: slideDuration,
                ease: slideEase,
                force3D: true,
              },
              "ninthSection"
            );
          }

          // Auto-trigger text animation when section is 90% visible
          tl.call(
            () => {
              animateTextReveal(ninthText, discoveryChannel);
            },
            [],
            isMobile ? "ninthSection+=0.4" : "ninthSection+=0.72"
          );
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
            console.warn(
              "ProductCycleSection: Error in resize handler:",
              error
            );
          }
        };

        window.addEventListener("resize", handleResize);

        // Force ScrollTrigger refresh after animations are set up
        ScrollTrigger.refresh();

        // Safari-specific delayed refresh to prevent rendering issues
        if (isSafari) {
          gsap.delayedCall(1.5, () => {
            ScrollTrigger.refresh();
          });
        }

        cleanup = () => {
          try {
            ctx.revert();
            window.removeEventListener("resize", handleResize);
            // Clean up all ScrollTriggers for this section
            ScrollTrigger.getAll().forEach((st) => {
              if (st.trigger === section) {
                st.kill();
              }
            });
          } catch (error) {
            console.warn("ProductCycleSection: Error during cleanup:", error);
          }
        };
      } catch (error) {
        console.error("ProductCycleSection: Animation setup failed:", error);
        // Fallback: ensure elements are visible even if animation fails
        gsap.set(
          [
            firstText,
            secondText,
            thirdText,
            fourthText,
            fifthText,
            sixthText,
            seventhText,
            eighthText,
            ninthText,
          ],
          { opacity: 1 }
        );

        // Set sections based on screen size
        const isMobile = window.innerWidth < 768;
        if (isMobile) {
          gsap.set(
            [
              firstSection,
              secondSection,
              thirdSection,
              fourthSection,
              fifthSection,
              sixthSection,
              seventhSection,
              eighthSection,
              ninthSection,
            ],
            { x: "0%", y: "0%" }
          );
          gsap.set(toolkitSection, { x: "0%", y: "0%" });
        } else {
          gsap.set(
            [
              firstSection,
              secondSection,
              thirdSection,
              fourthSection,
              fifthSection,
              sixthSection,
              seventhSection,
              eighthSection,
              ninthSection,
            ],
            { x: "0%" }
          );
          gsap.set(toolkitSection, { x: "0%" });
        }

        gsap.set(
          [
            dataInsights,
            emailMarketing,
            promotions,
            marketingInsights,
            miniPortfolio,
            discoveryChannel,
          ],
          { opacity: 1, y: 0 }
        );
        gsap.set([retargetLabel, discoverLabel], { opacity: 1 });
      }
    };

    // Add a small delay to ensure DOM is fully ready, especially on mobile
    const timeoutId = setTimeout(setupAnimation, 100);

    return () => {
      clearTimeout(timeoutId);

      // Call the cleanup function if it was set by setupAnimation
      if (cleanup) {
        cleanup();
      } else {
        // Fallback: Kill all ScrollTriggers for this section when unmounting or switching to mobile
        if (section) {
          ScrollTrigger.getAll().forEach((st) => {
            if (st.trigger === section) {
              st.kill();
            }
          });
        }
      }
    };
  }, [isMobile]);

  // Mobile Render: Simple vertical scroll with labels
  if (isMobile) {
    return (
      <>
        {/* Toolkit Section - No label */}
        <section className="h-screen w-full bg-[#0B0B0B] flex flex-col justify-between relative overflow-hidden">
          <div className="flex flex-col w-full h-fit mt-5">
            <h2 className="text-white text-2xl ml-5 w-[70%] font-switzer font-[400] leading-tight">
              If your community had an HQ, it&apos;d probably be here. Discover,
              distribute, and nudge fans back when it counts.
            </h2>
            <div className="w-full h-fit relative">
              <div className="w-fit h-[55vh] absolute right-0">
                <div className="relative w-full h-[100%] aspect-square -right-16">
                  <Image
                    src={"/Assets/Images/Star.svg"}
                    alt="toolkit star"
                    fill
                    className="object-contain"
                  />
                  <h3 className="absolute top-[38%] left-[10%] text-[40px] leading-none text-[#F0E9B2] font-instrument-serif font-[400]">
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

          {/* Bottom Images - Same as Desktop */}
          <div className="w-full absolute bottom-20 flex justify-center items-end">
            <div className="w-full max-w-[1600px] relative transition-all">
              <div className="absolute -bottom-40 md:w-[40%] translate-x-[-35%] aspect-[4/3] transition-all hover:translate-y-[-10%] duration-300">
                <Image
                  src="/Assets/Images/LeftCorner.svg"
                  alt="left corner"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="absolute -bottom-36 md:-bottom-30 translate-x-[-20%] md:translate-x-[15%] w-[70%] md:w-[40%] aspect-[4/3] transition-all hover:translate-y-[-10%] duration-300">
                <Image
                  src="/Assets/Images/CenterLeft.svg"
                  alt="center left"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="absolute -bottom-36 md:-bottom-30 translate-x-[25%] md:translate-x-[80%] z-5 w-[70%] md:w-[40%] aspect-[4/3] transition-all hover:translate-y-[-10%] duration-300">
                <Image
                  src="/Assets/Images/Center.svg"
                  alt="center"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="absolute -bottom-40 md:-bottom-35 translate-x-[70%] md:translate-x-[130%] z-2 w-[70%] md:w-[40%] aspect-[4/3] transition-all hover:translate-y-[-10%] duration-300">
                <Image
                  src="/Assets/Images/CenterRight.svg"
                  alt="center right"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="absolute -bottom-40 translate-x-[185%] md:w-[40%] aspect-[4/3] z-0 transition-all hover:translate-y-[-10%] duration-300">
                <Image
                  src="/Assets/Images/RightCorner.svg"
                  alt="right corner"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Sticky Label - Starts here and sticks to top on scroll */}
        <div className="sticky top-0 left-0 w-full z-50 bg-[#EBE4D4]">
          <Image
            src="/Assets/Images/NoiseEffectBg.svg"
            alt="noise"
            fill
            className="pointer-events-none object-cover absolute inset-0"
            style={{ mixBlendMode: "multiply" }}
          />
          <div className="pt-6 relative z-10">
            <h2 className="text-[#363636] font-instrument-serif font-[400] text-4xl tracking-wider px-8 transition-all duration-300">
              {stickyLabel}
            </h2>
            <div className="w-full h-[0.5px] bg-[#363636] mt-2"></div>
          </div>
        </div>

        {/* Section 1: Create Event */}
        <section
          ref={firstSectionRef}
          className="h-screen w-full bg-[#EBE4D4] flex flex-col relative gap-0"
        >
          <Image
            src="/Assets/Images/NoiseEffectBg.svg"
            alt="noise"
            fill
            className="pointer-events-none object-cover z-0"
            style={{ mixBlendMode: "multiply" }}
          />

          <div className="w-full h-full flex flex-col z-10 pt-8">
            <div className="w-full h-1/2 px-8 flex flex-col justify-between">
              <div className="w-full flex flex-col items-end justify-center gap-6">
                <AnimatedText
                  text="Host anything from standard events to multi-day festivals and tours."
                  className="text-2xl font-switzer font-[400] text-[#363636] leading-tight w-full"
                  delay={0}
                />
                <AnimatedParagraph
                  text="Add multiple time slots, customise ticket formats, and launch instantly."
                  className="text-md w-full text-right font-switzer font-[500] text-[#363636] italic"
                  delay={0.4}
                />
              </div>
              <AnimatedAction
                text="Create Event"
                className="text-xl font-nohemi font-[400] text-[#363636] text-right mb-4"
                delay={0.8}
              />
            </div>
            <div className="w-full h-1/2 relative">
              <video autoPlay muted playsInline loop className="w-full h-full object-cover">
                <source
                  src="/Assets/Images/Toolkit/webm/create-event.webm"
                  type="video/webm"
                />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </section>

        {/* Section 2: Issue Tickets */}
        <section
          ref={secondSectionRef}
          className="h-screen w-full bg-[#EBE4D4] flex flex-col relative"
        >
          <div className="absolute top-0 left-0 w-full h-[calc(100%+0.5rem)]">
            <Image
              src="/Assets/Images/NoiseEffectBg.svg"
              alt="noise"
              fill
              className="pointer-events-none object-cover"
              style={{ mixBlendMode: "multiply" }}
            />
          </div>

          <div className="w-full h-full flex flex-col z-10 pt-8">
            <div className="w-full h-1/2 px-8 flex flex-col justify-between">
              <div className="w-full flex flex-col items-end justify-center gap-8">
                <AnimatedText
                  text="Issue paid tickets or RSVPs, limit quantities to prevent scalping, and add surveys to collect additional information."
                  className="text-2xl font-switzer font-[400] text-[#363636] leading-tight w-full"
                  delay={0}
                />
                <AnimatedParagraph
                  text="tickets are issued and stored on blockchain, making it impossible to forge or duplicate."
                  className="text-md w-3/4 text-left font-switzer font-[500] text-[#363636] italic"
                  delay={0.5}
                />
              </div>
              <AnimatedAction
                text="Issue Tickets"
                className="text-xl font-nohemi font-[400] text-[#363636] text-right mb-4"
                delay={0.9}
              />
            </div>
            <div className="w-full h-1/2 relative bg-transparent">
              <video autoPlay muted playsInline loop className="w-full h-full object-contain">
                <source
                  src="/Assets/Images/Toolkit/webm/issue_ticket.webm"
                  type="video/webm"
                />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </section>

        {/* Section 3: Purchase/RSVP */}
        <section
          ref={thirdSectionRef}
          className="h-screen w-full bg-[#EBE4D4] flex flex-col relative"
        >
          <div className="absolute top-0 left-0 w-full h-[calc(100%+0.5rem)]">
            <Image
              src="/Assets/Images/NoiseEffectBg.svg"
              alt="noise"
              fill
              className="pointer-events-none object-cover"
              style={{ mixBlendMode: "multiply" }}
            />
          </div>

          <div className="h-full w-full flex flex-col z-10 pt-8">
            <div className="w-full h-1/2 relative order-2">
              <video autoPlay muted playsInline loop className="w-full h-full object-cover">
                <source
                  src="/Assets/Images/Toolkit/webm/Purchase.webm"
                  type="video/webm"
                />
                Your browser does not support the video tag.
              </video>
            </div>
            <div className="w-full h-1/2 order-1 px-8 flex flex-col justify-between">
              <div className="w-full flex flex-col items-end justify-center gap-4">
                <AnimatedText
                  text="Give your fans a seamless way to book their tickets – apply discounts, confirm instantly."
                  className="text-2xl font-switzer font-[400] text-[#363636] leading-tight w-full"
                  delay={0}
                />
                <AnimatedParagraph
                  text="Flexible phases, codes, and RSVPs designed for every event format."
                  className="text-md w-2/3 text-left font-switzer font-[500] text-[#363636] italic"
                  delay={0.4}
                />
              </div>
              <AnimatedAction
                text="Purchase/RSVP"
                className="text-xl font-nohemi font-[400] text-[#363636] text-right mb-4"
                delay={0.8}
              />
            </div>
          </div>
        </section>

        {/* Section 4: Data Insights */}
        <section
          ref={fourthSectionRef}
          className="h-screen w-full bg-[#EBE4D4] flex flex-col relative"
        >
          <div className="absolute top-0 left-0 w-full h-[calc(100%+0.5rem)]">
            <Image
              src="/Assets/Images/NoiseEffectBg.svg"
              alt="noise"
              fill
              className="pointer-events-none object-cover"
              style={{ mixBlendMode: "multiply" }}
            />
          </div>

          <div className="h-full w-full flex flex-col z-10 pt-8">
            <div className="w-full h-1/2 px-8 flex flex-col justify-between">
              <div className="w-full flex flex-col items-end justify-center gap-8 mt-4">
                <AnimatedText
                  text="Own your data and make data-driven decisions."
                  className="text-2xl font-switzer font-[400] text-[#363636] leading-tight w-full"
                  delay={0}
                />
                <AnimatedParagraph
                  text="Unlock actionable insights on every event - from ticket sales to demographics and traffic sources."
                  className="text-md w-3/4 text-left font-switzer font-[500] text-[#363636] italic"
                  delay={0.3}
                />
              </div>
              <AnimatedAction
                text="DATA INSIGHTS"
                className="text-xl font-nohemi font-[400] text-[#363636] text-right mb-4"
                delay={0.7}
              />
            </div>
            <div className="w-full h-1/2 relative">
              <video autoPlay muted playsInline loop className="w-full h-full object-cover">
                <source
                  src="/Assets/Images/Toolkit/webm/data_insights.webm"
                  type="video/webm"
                />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </section>

        {/* Section 5: Email Marketing */}
        <section
          ref={fifthSectionRef}
          className="h-screen w-full bg-[#EBE4D4] flex flex-col relative"
        >
          <div className="absolute top-0 left-0 w-full h-[calc(100%+0.5rem)]">
            <Image
              src="/Assets/Images/NoiseEffectBg.svg"
              alt="noise"
              fill
              className="pointer-events-none object-cover"
              style={{ mixBlendMode: "multiply" }}
            />
          </div>

          <div className="h-full w-full flex flex-col z-10 pt-8">
            <div className="w-full h-1/2 px-8 flex flex-col justify-between">
              <div className="w-full flex flex-col items-end justify-center gap-6 mt-4">
                <AnimatedText
                  text="Send targeted email and SMS campaigns directly to attendees, or import contacts from your dashboard."
                  className="text-2xl font-switzer font-[400] text-[#363636] leading-tight w-full"
                  delay={0}
                />
                <AnimatedParagraph
                  text="Reach fans where they are with data-backed precision."
                  className="text-md w-3/4 text-left font-switzer font-[500] text-[#363636] italic"
                  delay={0.5}
                />
              </div>
              <AnimatedAction
                text="EMAIL MARKETING"
                className="text-xl font-nohemi font-[400] text-[#363636] text-right mb-4"
                delay={0.9}
              />
            </div>
            <div className="w-full h-1/2 relative">
              <video autoPlay muted playsInline loop className="w-full h-full object-cover">
                <source
                  src="/Assets/Images/Toolkit/webm/email-mark.webm"
                  type="video/webm"
                />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </section>

        {/* Section 6: Promotions */}
        <section
          ref={sixthSectionRef}
          className="h-screen w-full bg-[#EBE4D4] flex flex-col relative"
        >
          <div className="absolute top-0 left-0 w-full h-[calc(100%+0.5rem)]">
            <Image
              src="/Assets/Images/NoiseEffectBg.svg"
              alt="noise"
              fill
              className="pointer-events-none object-cover"
              style={{ mixBlendMode: "multiply" }}
            />
          </div>

          <div className="h-full w-full flex flex-col z-10 pt-8">
            <div className="w-full h-1/2 relative order-2">
              <video autoPlay muted playsInline loop className="w-full h-full object-cover">
                <source
                  src="/Assets/Images/Toolkit/webm/promotions.webm"
                  type="video/webm"
                />
                Your browser does not support the video tag.
              </video>
            </div>
            <div className="w-full h-1/2 order-1 px-8 flex flex-col justify-between">
              <div className="w-full flex flex-col items-end justify-center gap-6 mt-4">
                <AnimatedText
                  text="Set up exclusive promoter codes and custom discounts in seconds."
                  className="text-2xl font-switzer font-[400] text-[#363636] leading-tight w-full"
                  delay={0}
                />
                <AnimatedParagraph
                  text="Boost sales, empower superfans, and simplify campaign tracking."
                  className="text-md w-4/5 text-right font-switzer font-[500] text-[#363636] italic"
                  delay={0.4}
                />
              </div>
              <AnimatedAction
                text="PROMOTIONS AND DISCOUNT CODES"
                className="text-xl font-nohemi font-[400] text-[#363636] text-right mb-4"
                delay={0.8}
              />
            </div>
          </div>
        </section>

        {/* Section 7: Marketing Insights */}
        <section
          ref={seventhSectionRef}
          className="h-screen w-full bg-[#EBE4D4] flex flex-col relative"
        >
          <div className="absolute top-0 left-0 w-full h-[calc(100%+0.5rem)]">
            <Image
              src="/Assets/Images/NoiseEffectBg.svg"
              alt="noise"
              fill
              className="pointer-events-none object-cover"
              style={{ mixBlendMode: "multiply" }}
            />
          </div>

          <div className="h-full w-full flex flex-col z-10 pt-8">
            <div className="w-full h-1/2 px-8 flex flex-col justify-between">
              <div className="w-full flex flex-col items-end justify-center gap-6 mt-4">
                <AnimatedText
                  text="See the full story with live analytics - track revenue, reach, contacts and performance."
                  className="text-2xl font-switzer font-[400] text-[#363636] leading-tight w-full"
                  delay={0}
                />
                <AnimatedParagraph
                  text="Know what's working, fix what's not, and maximise every campaign."
                  className="text-md w-3/4 text-left font-switzer font-[500] text-[#363636] italic"
                  delay={0.5}
                />
              </div>
              <AnimatedAction
                text="MARKETING INSIGHTS"
                className="text-xl font-nohemi font-[400] text-[#363636] text-right mb-4"
                delay={0.9}
              />
            </div>
            <div className="w-full h-1/2 relative">
              <video autoPlay muted playsInline loop className="w-full h-full object-cover">
                <source
                  src="/Assets/Images/Toolkit/webm/marketing-insights.webm"
                  type="video/webm"
                />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </section>

        {/* Section 8: Mini Portfolio */}
        <section
          ref={eighthSectionRef}
          className="h-screen w-full bg-[#EBE4D4] flex flex-col relative"
        >
          <div className="absolute top-0 left-0 w-full h-[calc(100%+0.5rem)]">
            <Image
              src="/Assets/Images/NoiseEffectBg.svg"
              alt="noise"
              fill
              className="pointer-events-none object-cover"
              style={{ mixBlendMode: "multiply" }}
            />
          </div>

          <div className="h-full w-full flex flex-col z-10 pt-8">
            <div className="w-full h-1/2 px-8 flex flex-col justify-between">
              <div className="w-full flex flex-col items-end justify-center gap-4 mt-2">
                <AnimatedText
                  text="First step to build your community, keep your fans updated on what's next with a gallery, collections, upcoming events and embedded playlists."
                  className="text-2xl font-switzer font-[400] text-[#363636] leading-tight w-full"
                  delay={0}
                />
                <AnimatedParagraph
                  text="Share your page and ask fans to subscribe, so you get direct access to their emails for future updates."
                  className="text-md w-full text-right font-switzer font-[500] text-[#363636] italic"
                  delay={0.5}
                />
              </div>
              <AnimatedAction
                text="MINI PORTFOLIO"
                className="text-xl font-nohemi font-[400] text-[#363636] text-right mb-4"
                delay={0.9}
              />
            </div>
            <div className="w-full h-1/2 relative">
              <video autoPlay muted playsInline loop className="w-full h-full object-contain">
                <source
                  src="/Assets/Images/Toolkit/webm/mini-portfolio.webm"
                  type="video/webm"
                />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </section>

        {/* Section 9: Discovery Channel */}
        <section
          ref={ninthSectionRef}
          className="h-screen w-full bg-[#EBE4D4] flex flex-col relative"
        >
          <div className="absolute top-0 left-0 w-full h-[calc(100%+0.5rem)]">
            <Image
              src="/Assets/Images/NoiseEffectBg.svg"
              alt="noise"
              fill
              className="pointer-events-none object-cover"
              style={{ mixBlendMode: "multiply" }}
            />
          </div>

          <div className="h-full w-full flex flex-col z-10 pt-8">
            <div className="w-full h-1/2 relative order-2">
              <video autoPlay muted playsInline loop className="w-full h-full object-cover">
                <source
                  src="/Assets/Images/Toolkit/webm/home.webm"
                  type="video/webm"
                />
                Your browser does not support the video tag.
              </video>
            </div>
            <div className="w-full h-1/2 order-1 px-8 flex flex-col justify-between">
              <div className="w-full flex flex-col items-end justify-center gap-8 mt-4">
                <AnimatedText
                  text="Let your audience explore nearby experiences on the map, RSVP with a tap, view an interactive calendar"
                  className="text-2xl font-switzer font-[400] text-[#363636] leading-tight w-full"
                  delay={0}
                />
                <AnimatedParagraph
                  text="Empower superfans, boost ticket sales, with frictionless campaign tools."
                  className="text-md w-3/4 text-left font-switzer font-[500] text-[#363636] italic"
                  delay={0.5}
                />
              </div>
              <AnimatedAction
                text="DISCOVERY CHANNEL"
                className="text-xl font-nohemi font-[400] text-[#363636] text-right mb-4"
                delay={0.9}
              />
            </div>
          </div>
        </section>
      </>
    );
  }

  // Desktop Render: GSAP horizontal scroll
  return (
    <section
      ref={sectionRef}
      className={`${
        className || ""
      } w-full h-screen flex relative overflow-hidden`}
      style={{
        transform: "translateZ(0)", // Force GPU acceleration
        backfaceVisibility: "hidden",
        perspective: 1000,
        position: "relative",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        minHeight: "100vh",
        maxHeight: "100vh",
        overflow: "hidden",
        willChange: "transform",
        WebkitBackfaceVisibility: "hidden",
        WebkitTransform: "translateZ(0)",
      }}
    >
      {/* Toolkit Section - Slides in from right first */}
      <div
        ref={toolkitSectionRef}
        className="absolute top-0 right-0 w-full h-full bg-[#0B0B0B] flex flex-col justify-between overflow-hidden"
        style={{
          zIndex: 10,
          willChange: "transform",
          transform: "translate3d(0, 0, 0)",
          WebkitTransform: "translate3d(0, 0, 0)",
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
        }}
      >
        <div className="w-full flex flex-col justify-between relative">
          {/* Top Content */}
          <div className="flex flex-col md:flex-row w-full h-fit mt-5 md:mt-10">
            <h2 className="text-white text-2xl sm:text-4xl md:text-4xl ml-5 md:ml-10 lg:text-[44px] w-[70%] md:w-[100%] font-switzer font-[400] leading-tight md:leading-tight">
              If your community had an HQ, it&apos;d probably be here. Discover,
              distribute, and nudge fans back when it counts.
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
                  <h3 className="absolute top-[38%] md:top-[38%] lg:top-[38%] left-[10%] md:left-[18%] text-[40px] md:text-[40px] leading-none text-[#F0E9B2] font-instrument-serif font-[400]">
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
              <Image
                src="/Assets/Images/LeftCorner.svg"
                alt="left corner"
                fill
                className="object-contain"
              />
            </div>
            <div className="absolute -bottom-36 md:-bottom-30 translate-x-[-20%] md:translate-x-[15%] w-[70%] md:w-[40%] aspect-[4/3] transition-all hover:translate-y-[-10%] duration-300">
              <Image
                src="/Assets/Images/CenterLeft.svg"
                alt="center left"
                fill
                className="object-contain"
              />
            </div>
            <div className="absolute -bottom-36 md:-bottom-30 translate-x-[25%] md:translate-x-[80%] z-5 w-[70%] md:w-[40%] aspect-[4/3] transition-all hover:translate-y-[-10%] duration-300">
              <Image
                src="/Assets/Images/Center.svg"
                alt="center"
                fill
                className="object-contain"
              />
            </div>
            <div className="absolute -bottom-40 md:-bottom-35 translate-x-[70%] md:translate-x-[130%] z-2 w-[70%] md:w-[40%] aspect-[4/3] transition-all hover:translate-y-[-10%] duration-300">
              <Image
                src="/Assets/Images/CenterRight.svg"
                alt="center right"
                fill
                className="object-contain"
              />
            </div>
            <div className="absolute -bottom-40 translate-x-[185%] md:w-[40%] aspect-[4/3] z-0 transition-all hover:translate-y-[-10%] duration-300">
              <Image
                src="/Assets/Images/RightCorner.svg"
                alt="right corner"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Persistent Labels and Lines Container - Visible across all sections */}
      <div
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        style={{ zIndex: 100 }}
      >
        {/* Vertical line - Fixed in place */}
        <div className="absolute left-24 top-0 w-[0.5px] h-full bg-black z-50 hidden md:block"></div>
        <div className="absolute md:hidden left-0 top-20 w-full h-[0.5px] bg-black z-50 block"></div>

        {/* Interactive horizontal line - Desktop only */}
        <div className="hidden md:block pointer-events-auto">
          <div
            ref={lineRef}
            className="absolute left-0 bottom-20 h-[1px] bg-black"
            style={{
              width: `${lineWidth}px`,
              transition: "width 0.2s cubic-bezier(0.4,0,0.2,1)",
              zIndex: 9999,
            }}
          >
            <div
              className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-gray-900 rotate-45"
              style={{ zIndex: 10000 }}
            ></div>
          </div>
        </div>

        {/* Labels - Desktop: rotated, Mobile: horizontal at top */}
        <div className="absolute left-0 bottom-40 -rotate-90 text-[#363636] font-instrument-serif font-[400] text-4xl tracking-wider z-50 hidden md:block">
          <span ref={distributeLabelRef} className="absolute top-10 -left-16">
            Distribute
          </span>
          <span
            ref={retargetLabelRef}
            className="absolute top-10 -left-16 opacity-0"
          >
            Retarget
          </span>
          <span
            ref={discoverLabelRef}
            className="absolute top-10 -left-16 opacity-0"
          >
            Discover
          </span>
        </div>

        {/* Mobile Labels - Horizontal at top */}
        <div className="absolute top-6 left-8 text-[#363636] font-instrument-serif font-[400] text-4xl tracking-wider z-50 md:hidden">
          <span className="block absolute top-0 left-0 distribute-mobile">
            Distribute
          </span>
          <span className="block opacity-0 absolute top-0 left-0 retarget-mobile">
            Retarget
          </span>
          <span className="block opacity-0 absolute top-0 left-0 discover-mobile">
            Discover
          </span>
        </div>
      </div>

      {/* First Section - Create Event - Slides in from right */}
      <div
        ref={firstSectionRef}
        className="absolute top-0 right-0 w-full h-full bg-[#EBE4D4] flex items-center justify-center overflow-hidden"
        style={{
          zIndex: 20,
          willChange: "transform",
          transform: "translate3d(0, 0, 0)",
          WebkitTransform: "translate3d(0, 0, 0)",
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
        }}
      >
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
            <div
              ref={firstTextRef}
              className="w-full h-full flex flex-col items-start relative pt-16 md:pt-0"
            >
              <div className="w-full md:w-full h-fit flex flex-col pb-6 md:pb-0 items-end md:gap-20 justify-between">
                <h2 className="text-xl sm:text-2xl md:text-4xl font-switzer font-[400] text-[#363636] leading-tight mb-3 md:mb-6 w-full">
                  <span className="word-by-word">
                    Host anything from standard events to multi-day festivals
                    and tours.
                  </span>
                </h2>
                <p className="text-xs sm:text-sm md:text-xl w-full md:w-2/3 text-right font-switzer font-[300] text-gray-600 italic mb-4 md:mb-8">
                  <span className="word-by-word">
                    Add multiple time slots, customise ticket formats, and
                    launch instantly.
                  </span>
                </p>
              </div>
            </div>
            <div className="w-full flex flex-col items-end md:items-start gap-0 py-2 md:py-5">
              <p className="text-base md:text-lg lg:text-2xl font-nohemi font-[400] text-[#363636]">
                Create Event
              </p>
            </div>
          </div>
          <div className="w-full md:w-1/2 z-100 bg-transparent relative flex items-center justify-center h-1/2 md:h-full">
            <div className="w-full h-full relative">
              <video autoPlay muted playsInline loop className="object-contain">
                <source
                  src="/Assets/Images/Toolkit/webm/create-event.webm"
                  type="video/webm"
                />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      </div>

      {/* Second Section - Issue Tickets - Slides in from right */}
      <div
        ref={secondSectionRef}
        className="absolute top-0 right-0 w-full h-full bg-[#EBE4D4] flex items-center justify-center overflow-hidden"
        style={{
          zIndex: 21,
          willChange: "transform",
          transform: "translate3d(0, 0, 0)",
          WebkitTransform: "translate3d(0, 0, 0)",
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
        }}
      >
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
            <div
              ref={secondTextRef}
              className="w-full h-full flex flex-col items-start relative pt-16 md:pt-0"
            >
              <div className="w-full md:w-full h-[70%] md:h-fit md:gap-10 flex flex-col items-end justify-between">
                <h2 className="text-xl sm:text-2xl md:text-4xl font-switzer font-[400] text-[#363636] leading-tight mb-3 md:mb-6 w-full">
                  <span className="word-by-word">
                    Issue paid tickets or RSVPs, limit quantities to prevent
                    scalping, and add surveys to collect additional information.
                  </span>
                </h2>
                <p className="text-xs sm:text-sm md:text-xl w-full md:w-2/3 text-right font-switzer font-[300] text-gray-600 italic mb-4 md:mb-8">
                  <span className="word-by-word">
                    tickets are issued and stored on blockchain, making it
                    impossible to forge or duplicate.
                  </span>
                </p>
              </div>
            </div>
            <div className="w-full flex flex-col items-end md:items-start gap-0 py-2 md:py-5">
              <p className="text-base md:text-lg lg:text-2xl font-nohemi font-[400] text-[#363636]">
                Issue Tickets
              </p>
            </div>
          </div>
          <div className="w-full md:w-1/2 z-100 bg-transparent relative flex items-center justify-center h-1/2 md:h-full">
            <div className="w-full h-full relative">
              <video autoPlay muted playsInline loop className="object-contain">
                <source
                  src="/Assets/Images/Toolkit/webm/issue_ticket.webm"
                  type="video/webm"
                />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      </div>

      {/* Third Section - Purchase/RSVP - Slides in from right */}
      <div
        ref={thirdSectionRef}
        className="absolute top-0 right-0 w-full h-full bg-[#EBE4D4] flex items-center justify-center overflow-hidden"
        style={{
          zIndex: 22,
          willChange: "transform",
          transform: "translate3d(0, 0, 0)",
          WebkitTransform: "translate3d(0, 0, 0)",
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
        }}
      >
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
              <video autoPlay muted playsInline loop className="object-contain">
                <source
                  src="/Assets/Images/Toolkit/webm/Purchase.webm"
                  type="video/webm"
                />
                Your browser does not support the video tag.
              </video>
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
              <div
                ref={thirdTextRef}
                className="w-full flex flex-col items-end relative h-full pt-10 md:pt-0"
              >
                <div className="w-full flex flex-col items-end h-full md:h-[50%] justify-around">
                  <h2 className="text-2xl md:text-4xl font-switzer font-[400] text-[#363636] leading-tight mb-4 md:mb-6 w-full">
                    <span className="word-by-word">
                      Give your fans a seamless way to book their tickets –
                      apply discounts, confirm instantly.
                    </span>
                  </h2>
                  <p className="text-sm md:text-xl w-2/3 md:w-1/2 text-left font-switzer font-[300] text-gray-600 italic mb-6 md:mb-8">
                    <span className="word-by-word">
                      Flexible phases, codes, and RSVPs designed for every event
                      format.
                    </span>
                  </p>
                </div>
              </div>

              {/* Action Texts  */}
              <div className="w-full flex flex-col items-end md:items-start gap-0 py-3 md:py-5">
                <p className="text-lg md:text-2xl font-nohemi font-[400] text-[#363636] create-event">
                  Purchase/RSVP
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fourth Section - Data Insights - Slides in from right */}
      <div
        ref={fourthSectionRef}
        className="absolute top-0 right-0 w-full h-full bg-[#EBE4D4] flex items-center justify-center overflow-hidden"
        style={{
          zIndex: 23,
          willChange: "transform",
          transform: "translate3d(0, 0, 0)",
          WebkitTransform: "translate3d(0, 0, 0)",
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
        }}
      >
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
              <div
                ref={fourthTextRef}
                className="w-full flex flex-col items-end relative h-full pt-16 md:pt-0"
              >
                <div className="w-full flex flex-col py-6 md:pt-10 items-end h-full md:h-[60%] md:justify-between justify-around">
                  <h2 className="text-xl sm:text-2xl md:text-4xl font-switzer font-[400] text-[#363636] leading-tight mb-3 md:mb-6 w-full">
                    <span className="word-by-word">
                      Own your data and make data-driven decisions.
                    </span>
                  </h2>
                  <p className="text-xs sm:text-sm md:text-xl w-full md:w-[80%] text-left font-switzer font-[300] text-gray-600 italic mb-4 md:mb-0">
                    <span className="word-by-word">
                      Unlock actionable insights on every event - from ticket
                      sales to demographics and traffic sources.
                    </span>
                  </p>
                </div>
              </div>
              {/* Action Texts  */}
              <div className="w-full flex flex-col items-end md:items-start gap-0 py-2 md:py-5">
                <p
                  ref={dataInsightsRef}
                  className="text-base md:text-lg lg:text-2xl font-nohemi font-[400] text-[#363636] create-event"
                >
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
            <div className="w-full h-full relative z-10">
              <video autoPlay muted playsInline loop className="object-contain">
                <source
                  src="/Assets/Images/Toolkit/webm/data_insights.webm"
                  type="video/webm"
                />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      </div>

      {/* Fifth Section - Email Marketing */}
      <div
        ref={fifthSectionRef}
        className="absolute top-0 right-0 w-full h-full bg-[#EBE4D4] flex items-center justify-center overflow-hidden"
        style={{
          zIndex: 24,
          willChange: "transform",
          transform: "translate3d(0, 0, 0)",
          WebkitTransform: "translate3d(0, 0, 0)",
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
        }}
      >
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
              <div
                ref={fifthTextRef}
                className="w-full flex flex-col items-end relative h-fit pt-16 md:pt-0"
              >
                <div className="w-full flex flex-col py-6 md:py-0 items-end h-full md:h-fit md:gap-10 md:justify-between justify-around">
                  <h2 className="text-xl sm:text-2xl md:text-4xl font-switzer font-[400] text-[#363636] leading-tight mb-3 md:mb-6 w-full">
                    <span className="word-by-word">
                      Send targeted email and SMS campaigns directly to
                      attendees, or import contacts from your dashboard.
                    </span>
                  </h2>
                  <p className="text-xs sm:text-sm md:text-xl w-full md:w-1/2 text-left font-switzer font-[300] text-gray-600 italic mb-4 md:mb-8">
                    <span className="word-by-word">
                      Reach fans where they are with data-backed precision.
                    </span>
                  </p>
                </div>
              </div>

              {/* Action Texts  */}
              <div className="w-full flex flex-col items-end md:items-start gap-0 py-2 md:py-5">
                <p
                  ref={emailMarketingRef}
                  className="text-base md:text-lg lg:text-2xl font-nohemi font-[400] text-[#363636] create-event"
                >
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
            <div className="w-full h-full md:h-[80%] z-10 relative top-0 left-0">
              <video autoPlay muted playsInline loop className="object-contain">
                <source
                  src="/Assets/Images/Toolkit/webm/email-mark.webm"
                  type="video/webm"
                />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      </div>

      {/* Sixth Section - Promotions and Discount Codes */}
      <div
        ref={sixthSectionRef}
        className="absolute top-0 right-0 w-full h-full bg-[#EBE4D4] flex items-center justify-center overflow-hidden"
        style={{
          zIndex: 25,
          willChange: "transform",
          transform: "translate3d(0, 0, 0)",
          WebkitTransform: "translate3d(0, 0, 0)",
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
        }}
      >
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
            <div className="mx-4 md:mx-24 w-full h-full overflow-hidden relative md:left-20 left-4 -bottom-10">
              <video autoPlay muted playsInline loop className="object-contain">
                <source
                  src="/Assets/Images/Toolkit/webm/promotions.webm"
                  type="video/webm"
                />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
          {/* Right Half - Text Content */}
          <div className="w-full md:w-1/2 flex items-center justify-center h-1/2 md:h-full md:order-2">
            <div className="h-full w-full mx-4 md:mr-24 px-4 md:px-10 py-8 md:py-20 flex flex-col justify-between">
              {/* Text Content */}
              <div
                ref={sixthTextRef}
                className="w-full flex flex-col items-end relative h-full pt-16 md:pt-0"
              >
                <div className="w-full flex flex-col py-6 md:py-10 items-end h-[60%] md:h-fit md:gap-10 justify-between">
                  <h2 className="text-xl sm:text-2xl md:text-4xl font-switzer font-[400] text-[#363636] leading-tight mb-3 md:mb-6 w-full">
                    <span className="word-by-word">
                      Set up exclusive promoter codes and custom discounts in
                      seconds.
                    </span>
                  </h2>
                  <p className="text-xs sm:text-sm md:text-xl w-full md:w-1/2 text-right font-switzer font-[300] text-gray-600 italic mb-4 md:mb-8">
                    <span className="word-by-word">
                      Boost sales, empower superfans, and simplify campaign
                      tracking.
                    </span>
                  </p>
                </div>
              </div>

              {/* Action Texts  */}
              <div className="text-left md:w-full flex flex-col items-end md:items-start gap-0 py-2 md:py-5">
                <p
                  ref={promotionsRef}
                  className="text-base md:text-lg lg:text-2xl font-nohemi font-[400] text-[#363636] create-event w-full md:w-full"
                >
                  PROMOTIONS AND DISCOUNT CODES
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Seventh Section - Marketing Insights */}
      <div
        ref={seventhSectionRef}
        className="absolute top-0 right-0 w-full h-full bg-[#EBE4D4] flex items-center justify-center overflow-hidden"
        style={{
          zIndex: 26,
          willChange: "transform",
          transform: "translate3d(0, 0, 0)",
          WebkitTransform: "translate3d(0, 0, 0)",
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
        }}
      >
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
              <div
                ref={seventhTextRef}
                className="w-full flex flex-col items-end relative h-full pt-16 md:pt-0"
              >
                <div className="w-full flex flex-col items-end h-[50%] gap-6 md:gap-10 justify-between">
                  <h2 className="text-xl sm:text-2xl md:text-4xl font-switzer font-[400] text-[#363636] leading-tight mb-3 md:mb-6 w-full">
                    <span className="word-by-word">
                      See the full story with live analytics - track revenue,
                      reach, contacts and performance.
                    </span>
                  </h2>
                  <p className="text-xs sm:text-sm md:text-xl w-full md:w-2/3 text-left font-switzer font-[300] text-gray-600 italic mb-4 md:mb-8">
                    <span className="word-by-word">
                      Know what&apos;s working, fix what&apos;s not, and
                      maximise every campaign.
                    </span>
                  </p>
                </div>
              </div>

              {/* Action Texts  */}
              <div className="w-full flex flex-col items-end md:items-start gap-0 py-2 md:py-5">
                <p
                  ref={marketingInsightsRef}
                  className="text-base md:text-lg lg:text-2xl font-nohemi font-[400] text-[#363636] create-event"
                >
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
            <div className="w-full h-full -bottom-5 z-10 relative">
              <video autoPlay muted playsInline loop className="object-contain">
                <source
                  src="/Assets/Images/Toolkit/Temp/webm/marketing-insights.webm"
                  type="video/webm"
                />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      </div>

      {/* Eighth Section - Mini Portfolio */}
      <div
        ref={eighthSectionRef}
        className="absolute top-0 right-0 w-full h-full bg-[#EBE4D4] flex items-center justify-center overflow-hidden"
        style={{
          zIndex: 27,
          willChange: "transform",
          transform: "translate3d(0, 0, 0)",
          WebkitTransform: "translate3d(0, 0, 0)",
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
        }}
      >
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
              <div
                ref={eighthTextRef}
                className="w-full flex flex-col items-end relative h-full pt-16 md:pt-0"
              >
                <div className="w-full flex flex-col items-start md:items-end h-[50%] gap-6 md:gap-10 justify-between">
                  <h2 className="text-xl sm:text-2xl md:text-4xl font-switzer font-[400] text-[#363636] leading-tight mb-3 md:mb-6 w-full">
                    <span className="word-by-word">
                      First step to build your community, keep your fans updated
                      on what&apos;s next with a gallery, collections, upcoming
                      events and embedded playlists.
                    </span>
                  </h2>
                  <p className="text-xs sm:text-sm md:text-xl w-full md:w-2/3 text-left font-switzer font-[300] text-gray-600 italic mb-4 md:mb-8">
                    <span className="word-by-word">
                      Share your page and ask fans to subscribe, so you get
                      direct access to their emails for future updates.
                    </span>
                  </p>
                </div>
              </div>

              {/* Action Texts  */}
              <div className="w-full flex flex-col items-end md:items-start gap-0 py-2 md:py-5">
                <p
                  ref={miniPortfolioRef}
                  className="text-base md:text-lg lg:text-2xl font-nohemi font-[400] text-[#363636] create-event"
                >
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
            <div className="w-full h-full z-10 relative">
              <Image
                src="/Assets/Images/Toolkit/Temp/profile.png"
                alt="mini portfolio mobile app"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Ninth Section - Discovery Channel */}
      <div
        ref={ninthSectionRef}
        className="absolute top-0 right-0 w-full h-full bg-[#EBE4D4] flex items-center justify-center overflow-hidden"
        style={{
          zIndex: 28,
          willChange: "transform",
          transform: "translate3d(0, 0, 0)",
          WebkitTransform: "translate3d(0, 0, 0)",
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
        }}
      >
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
            <div className="w-full h-full z-10 relative ">
              <Image
                src="/Assets/Images/Toolkit/Temp/home pic.png"
                alt="discovery channel mobile app"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Right Half - Text Content */}
          <div className="w-full md:w-1/2 flex items-center justify-center h-1/2 md:h-full order-1 md:order-2">
            <div className="h-full w-full mx-4 md:mr-24 px-4 md:pl-14 py-8 md:py-20 flex flex-col justify-between">
              {/* Text Content */}
              <div
                ref={ninthTextRef}
                className="w-full flex flex-col items-end relative h-full pt-16 md:pt-0"
              >
                <div className="w-full flex flex-col items-end h-[50%] gap-6 md:gap-10 justify-between">
                  <h2 className="text-xl sm:text-2xl md:text-4xl font-switzer font-[400] text-[#363636] leading-tight mb-3 md:mb-6 w-full">
                    <span className="word-by-word">
                      Let your audience explore nearby experiences on the map,
                      RSVP with a tap, view an interactive calendar
                    </span>
                  </h2>
                  <p className="text-xs sm:text-sm md:text-xl w-full md:w-1/2 text-left font-switzer font-[300] text-gray-600 italic mb-4 md:mb-8">
                    <span className="word-by-word">
                      Empower superfans, boost ticket sales, with frictionless
                      campaign tools.
                    </span>
                  </p>
                </div>
              </div>

              {/* Action Texts  */}
              <div className="w-full flex flex-col items-end md:items-start gap-0 py-2 md:py-5">
                <p
                  ref={discoveryChannelRef}
                  className="text-base md:text-lg lg:text-2xl font-nohemi font-[400] text-[#363636] create-event"
                >
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

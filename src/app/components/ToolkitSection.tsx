"use client";
import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";

// Animated Text Component
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
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1, rootMargin: "100px 0px" }
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
            transition: `opacity 0.4s cubic-bezier(0.25, 0.1, 0.25, 1) ${delay + index * 0.03}s, transform 0.4s cubic-bezier(0.25, 0.1, 0.25, 1) ${delay + index * 0.03}s`,
            willChange: isVisible ? "auto" : "opacity, transform",
          }}
        >
          {word}
        </span>
      ))}
    </h2>
  );
};

// Animated Paragraph Component
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
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1, rootMargin: "100px 0px" }
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
            transition: `opacity 0.4s cubic-bezier(0.25, 0.1, 0.25, 1) ${delay + index * 0.03}s, transform 0.4s cubic-bezier(0.25, 0.1, 0.25, 1) ${delay + index * 0.03}s`,
            willChange: isVisible ? "auto" : "opacity, transform",
          }}
        >
          {word}
        </span>
      ))}
    </p>
  );
};

// Animated Action Text Component
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
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1, rootMargin: "100px 0px" }
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
        transition: `opacity 0.5s cubic-bezier(0.25, 0.1, 0.25, 1) ${delay}s, transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1) ${delay}s`,
        willChange: isVisible ? "auto" : "opacity, transform",
      }}
    >
      {text}
    </p>
  );
};

// Media Component
const MediaComponent = ({
  objectFit,
  mp4Src,
  webmSrc,
  className = "",
}: {
  objectFit: "cover" | "contain" | "fill" | "none" | "scale-down";
  mp4Src: string;
  webmSrc: string;
  className?: string;
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    const userAgent = navigator.userAgent;
    const isIOSDevice = /iPad|iPhone|iPod/.test(userAgent);
    const isOldIOSVersion = /OS [1-9]_|OS 10_|OS 11_/.test(userAgent);
    setIsIOS(isIOSDevice);
    
    if (isIOSDevice) {
      const timeout = setTimeout(() => {
        setShouldLoad(true);
      }, isOldIOSVersion ? 1000 : 500);
      
      return () => clearTimeout(timeout);
    } else {
      setShouldLoad(true);
    }
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !shouldLoad) return;

    const handlePlay = () => {
      const allVideos = document.querySelectorAll('video');
      allVideos.forEach(v => {
        if (v !== video && !v.paused) {
          v.pause();
        }
      });
    };

    video.addEventListener('play', handlePlay);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!isIOS) {
              video.play().catch(() => {});
            }
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(video);

    return () => {
      video.removeEventListener('play', handlePlay);
      observer.disconnect();
    };
  }, [shouldLoad, isIOS]);

  if (!shouldLoad) {
    return (
      <div className={`${className} bg-gray-200 animate-pulse`} style={{ objectFit }} />
    );
  }

  return (
    <video
      ref={videoRef}
      className={className}
      style={{ objectFit }}
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
    >
      <source src={webmSrc} type="video/webm" />
      <source src={mp4Src} type="video/mp4" />
    </video>
  );
};

interface ToolkitSectionProps {
  title: string;
  subtitle: string;
  actionText: string;
  mp4Src: string;
  webmSrc: string;
  layout?: "default" | "reversed" | "text-left";
  objectFit?: "cover" | "contain";
  label?: "Distribute" | "Retarget" | "Discover";
}

export default function ToolkitSection({
  title,
  subtitle,
  actionText,
  mp4Src,
  webmSrc,
  layout = "default",
  objectFit = "cover",
  label,
}: ToolkitSectionProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [lineWidth, setLineWidth] = useState(250);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

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

  const isReversed = layout === "reversed";
  const isTextLeft = layout === "text-left";

  // Mobile layout
  if (isMobile) {
    return (
      <section className="h-screen w-full bg-[#EBE4D4] flex flex-col relative">
        <Image
          src="/Assets/Images/NoiseEffectBg.svg"
          alt="noise"
          fill
          className="pointer-events-none object-cover z-0 opacity-60"
          style={{ mixBlendMode: "multiply" }}
          loading="lazy"
        />

        {/* Mobile Label and Divider at Top */}
        {label && (
          <>
            {/* Horizontal divider line at top */}
            <div className="absolute left-0 top-20 w-full h-[0.5px] bg-black z-50 md:hidden"></div>
            {/* Label */}
            <div className="absolute top-6 left-8 z-50">
              <h2 className="text-[#363636] font-instrument-serif font-[400] text-4xl tracking-wider">
                {label}
              </h2>
              {/* <div className="w-full h-[0.5px] bg-black mt-2"></div> */}
            </div>
          </>
        )}

        <div className="w-full h-full flex flex-col z-10 pt-24">
          <div className={`w-full h-1/2 px-8 flex flex-col justify-between ${isReversed ? "order-2" : "order-1"}`}>
            <div className="w-full flex flex-col items-end justify-center gap-6">
              <AnimatedText
                text={title}
                className="text-xl font-switzer font-[400] text-[#363636] leading-tight w-full"
                delay={0}
              />
              <AnimatedParagraph
                text={subtitle}
                className={`text-md w-full ${isTextLeft ? "text-left" : "text-right"} font-switzer font-[500] text-[#363636] italic`}
                delay={0.4}
              />
            </div>
            <AnimatedAction
              text={actionText}
              className="text-xl font-nohemi font-[400] text-[#363636] text-right mb-4"
              delay={0.8}
            />
          </div>
          <div className={`w-full h-1/2 relative ${isReversed ? "order-1" : "order-2"}`}>
            <MediaComponent
              objectFit={objectFit}
              mp4Src={mp4Src}
              webmSrc={webmSrc}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>
    );
  }

  // Desktop layout
  return (
    <section className="h-screen w-full bg-[#EBE4D4] flex items-center justify-center overflow-hidden relative">
      <Image
        src="/Assets/Images/NoiseEffectBg.svg"
        alt="noise texture"
        fill
        className="pointer-events-none select-none object-cover z-0 opacity-60"
        style={{ mixBlendMode: "multiply" }}
      />

      {/* Desktop Label and Vertical Line on Left */}
      {label && (
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none" style={{ zIndex: 100 }}>
          {/* Vertical line */}
          <div className="absolute left-24 top-0 w-[0.5px] h-full bg-black z-50 hidden md:block"></div>
          
          {/* Rotated label */}
          <div className="absolute left-0 bottom-40 -rotate-90 text-[#363636] font-instrument-serif font-[400] text-4xl tracking-wider z-50 hidden md:block">
            <span className="absolute top-10 -left-16">
              {label}
            </span>
          </div>
        </div>
      )}

      {/* Interactive horizontal line - Desktop only */}
      <div className="hidden md:block pointer-events-auto" style={{ zIndex: 9999 }}>
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

      <div className="w-full h-full flex flex-col md:flex-row z-10">
        {isReversed ? (
          <>
            {/* Visual Content First */}
            <div className="w-full md:w-1/2 relative flex items-center justify-center h-1/2 md:h-full">
              <div className="w-full h-full relative">
                <MediaComponent
                  objectFit={objectFit}
                  mp4Src={mp4Src}
                  webmSrc={webmSrc}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            {/* Text Content Second */}
            <div className="w-full md:w-1/2 flex items-center justify-center h-1/2 md:h-full">
              <div className="h-full w-full mx-4 md:mr-20 px-4 md:px-10 py-8 md:pb-20 flex flex-col justify-between">
                <div className="w-full flex flex-col items-end relative h-[60%] pt-16 md:pt-0">
                  <div className="w-full flex flex-col py-6 md:py-10 items-end h-full md:h-fit md:gap-10 justify-between">
                    <h2 className="text-xl sm:text-2xl md:text-4xl font-switzer font-[400] text-[#363636] leading-tight mb-3 md:mb-6 w-full">
                      <span className="word-by-word">{title}</span>
                    </h2>
                    <p className={`text-xs sm:text-sm md:text-xl w-full md:w-1/2 ${isTextLeft ? "text-left" : "text-right"} font-switzer font-[300] text-gray-600 italic mb-4 md:mb-4`}>
                      <span className="word-by-word">{subtitle}</span>
                    </p>
                  </div>
                </div>
                <div className="text-left md:w-full flex flex-col items-end md:items-start gap-0 py-2 md:py-5">
                  <p className="text-base md:text-lg lg:text-2xl font-nohemi font-[400] text-[#363636]">
                    {actionText}
                  </p>
                </div>
              </div>
            </div>
          </>
        ) : isTextLeft ? (
          <>
            {/* Text Content First */}
            <div className="w-full md:w-1/2 flex items-center justify-center h-1/2 md:h-full">
              <div className="h-full w-full mx-4 md:ml-24 md:mr-18 px-4 md:pl-10 py-8 md:py-20 flex flex-col justify-between">
                <div className="w-full flex flex-col items-end relative h-full pt-16 md:pt-0">
                  <div className="w-full flex flex-col py-6 md:pt-10 items-end h-full md:h-[60%] md:justify-between justify-around">
                    <h2 className="text-xl sm:text-2xl md:text-4xl font-switzer font-[400] text-[#363636] leading-tight mb-3 md:mb-6 w-full">
                      <span className="word-by-word">{title}</span>
                    </h2>
                    <p className="text-xs sm:text-sm md:text-xl w-full md:w-[80%] text-left font-switzer font-[300] text-gray-600 italic mb-4 md:mb-0">
                      <span className="word-by-word">{subtitle}</span>
                    </p>
                  </div>
                </div>
                {/* Action Texts */}
                <div className="w-full flex flex-col items-end md:items-start gap-0 py-2 md:py-5">
                  <p className="text-base md:text-lg lg:text-2xl font-nohemi font-[400] text-[#363636]">
                    {actionText}
                  </p>
                </div>
              </div>
            </div>
            {/* Visual Content Second */}
            <div className="w-full md:w-1/2 bg-[#EBE4D4] relative flex items-center justify-center h-1/2 md:h-full">
              <Image
                src="/Assets/Images/NoiseEffectBg.svg"
                alt="noise texture"
                fill
                className="pointer-events-none select-none object-cover z-0"
                style={{ mixBlendMode: "multiply" }}
              />
              <div className="w-full h-full relative z-10">
                <MediaComponent
                  objectFit={objectFit}
                  mp4Src={mp4Src}
                  webmSrc={webmSrc}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Text Content First */}
            <div className="md:w-[45%] md:h-full h-1/2 w-full md:ml-24 px-8 md:pl-10 py-8 md:py-20 flex flex-col justify-between">
              <div className="w-full h-full flex flex-col items-start relative pt-16 md:pt-0">
                <div className="w-full md:w-full h-fit flex flex-col pb-6 md:pb-0 items-end md:gap-20 justify-between">
                  <h2 className="text-xl sm:text-2xl md:text-4xl font-switzer font-[400] text-[#363636] leading-tight mb-3 md:mb-6 w-full">
                    <span className="word-by-word">{title}</span>
                  </h2>
                  <p className="text-xs sm:text-sm md:text-xl w-full md:w-2/3 text-right font-switzer font-[300] text-gray-600 italic mb-4 md:mb-8">
                    <span className="word-by-word">{subtitle}</span>
                  </p>
                </div>
              </div>
              <div className="w-full flex flex-col items-end md:items-start gap-0 py-2 md:py-5">
                <p className="text-base md:text-lg lg:text-2xl font-nohemi font-[400] text-[#363636]">
                  {actionText}
                </p>
              </div>
            </div>
            {/* Visual Content Second */}
            <div className="w-full md:w-[55%] z-100 bg-transparent relative flex items-center justify-center h-1/2 md:h-full">
              <div className="w-full h-full relative">
                <MediaComponent
                  objectFit={objectFit}
                  mp4Src={mp4Src}
                  webmSrc={webmSrc}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}


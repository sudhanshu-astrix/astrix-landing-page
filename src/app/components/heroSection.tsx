"use client";
import { disableScrollPinning, enableScrollPinning } from "@/utils";
import Image from "next/image";
import Link from "next/link";

import { useState, useEffect, useRef } from "react";

export default function HeroSection({ className }: { className?: string }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const mobileVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Scroll to top on page reload/load for all devices
    window.scrollTo(0, 0);

    // Detect iOS and mobile
    const checkIOS = () => {
      return /iPad|iPhone|iPod/.test(navigator.userAgent) || 
             (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    };
    const checkMobile = window.innerWidth < 768;
    
    setIsIOS(checkIOS());
    setIsMobile(checkMobile);

    const isMobile = checkMobile;

    if (isMobile && videoRef.current && mobileVideoRef.current) {
      // Mobile: Aggressive video playback for all browsers including Safari/Opera Mini
      const backgroundVideo = videoRef.current;
      const mobileVideo = mobileVideoRef.current;

      // Set playback rate
      backgroundVideo.playbackRate = 1.0;
      mobileVideo.playbackRate = 1.0;

      // Force load videos
      backgroundVideo.load();
      mobileVideo.load();

      let hasStarted = false;
      let retryCount = 0;
      const maxRetries = 5;

      const attemptPlay = () => {
        if (hasStarted) return;

        // Set video time
        backgroundVideo.currentTime = 0;
        mobileVideo.currentTime = 0;

        // Attempt to play both videos
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
              // Retry or wait for user interaction
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
              // Retry or wait for user interaction
              if (retryCount < maxRetries) {
                retryCount++;
                setTimeout(attemptPlay, 500);
              }
            });
        }
      };

      // Try multiple events for maximum compatibility
      const tryPlayOnEvent = () => {
        if (!hasStarted) {
          attemptPlay();
        }
      };

      // Attempt play immediately
      if (backgroundVideo.readyState >= 2 || mobileVideo.readyState >= 2) {
        attemptPlay();
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
    } else if (!isMobile && videoRef.current) {
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
  }, []);

  const handleNavClick = (targetId: string) => {
    disableScrollPinning(); // temporarily unpin

    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }

    // Re-enable pinning after a short delay (once scroll completes)
    setTimeout(() => enableScrollPinning(), 1200);
  };

  return (
    <section
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
          className="absolute inset-0 w-full h-full object-cover"
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
            <source src="/Assets/Images/HeroSectionMobile.mp4" type="video/mp4" />
          ) : (
            <source src="/Assets/Images/HeroSectionMobile.webm" type="video/webm" />
          )}
          Your browser does not support the video tag.
        </video>

        {/* Noise effect background */}
        <Image
          src="/Assets/Images/NoiseEffectBg.svg"
          alt="noise texture"
          fill
          className="absolute z-10 object-cover"
          style={{ mixBlendMode: "multiply" }}
        />

        <div className="absolute inset-0 bg-black/40 z-20"></div>
      </div>

      <nav className="relative z-10 flex items-center justify-between px-4 sm:px-6 md:px-8 py-6 w-full">
        <div className="flex items-center gap-2 w-[100%] max-w-[114px] h-[30px] relative">
          <Image
            src="/Assets/Icons/LogoIcon.png"
            alt="Astrix Logo"
            fill
            objectFit="contain"
          />
        </div>

        <div className="hidden md:flex md:flex-1 items-center justify-end gap-3 lg:gap-5 px-4 lg:px-10">
          <button className="w-fit p-3 h-[35px] flex items-center justify-center rounded-3xl border border-[#4e4e4e87] bg-[#1f1f1f9e] shadow-[inset_0_2.39px_2.29px_rgba(0,0,0,0.25),0_2.29px_2.29px_rgba(0,0,0,0.25)] cursor-pointer hover:contrast-125 transition-all hover:-translate-y-0.5 text-xs md:text-[10px] leading-none">
            <p className="leading-none mt-0.5 text-base font-nohemi font-[400]">ABOUT</p>
          </button>
          <button className="w-fit p-3 h-[35px] flex items-center justify-center rounded-3xl border border-[#4e4e4e87] bg-[#1f1f1f9e] shadow-[inset_0_2.39px_2.29px_rgba(0,0,0,0.25),0_2.29px_2.29px_rgba(0,0,0,0.25)] cursor-pointer hover:contrast-125 transition-all hover:-translate-y-0.5 text-xs md:text-[10px] leading-none">
            <p className="leading-none mt-0.5 text-base font-nohemi font-[400]">PRICING</p>
          </button>
          <Link
            href="#contact"
            onClick={() => handleNavClick("contact")}
            className="w-fit p-3 h-[35px] flex items-center justify-center rounded-3xl border border-[#4e4e4e87] bg-[#1f1f1f9e] shadow-[inset_0_2.39px_2.29px_rgba(0,0,0,0.25),0_2.29px_2.29px_rgba(0,0,0,0.25)] cursor-pointer hover:contrast-125 transition-all hover:-translate-y-0.5 text-xs md:text-[10px] leading-none"
          >
            <p className="leading-none mt-0.5 text-base font-nohemi font-[400]">CONTACT</p>
          </Link>
        </div>
        <Link
          href="https://app.astrix.live"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden h-[35px] md:inline-flex w-fit px-5 py-[14px] items-center justify-center rounded-3xl border border-[#4e4e4e87] bg-[#3c3c3cbf] cursor-pointer hover:contrast-125 transition-all hover:-translate-y-0.5 text-xs md:text-[10px] leading-none"
        >
          <p className="leading-none mt-0.5 text-base font-nohemi font-[400]">GET STARTED</p>
        </Link>

        <button
          className="md:hidden text-white z-50"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
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

      <div className="relative z-10 bottom-40 flex h-fit md:h-[45vh] flex-col items-center justify-between px-4 md:px-8 gap-10 md:gap-0">
        <div className="text-center w-full h-fit max-w-full md:max-w-[80%] flex flex-col justify-around gap-10 md:gap-14">
          <h1 className="text-2xl md:text-[72px] font-nohemi font-[400] text-white leading-[100%]">
            An omnichannel platform
            <br />
            <span className="ml-10 md:ml-28">for optimizing community-</span>
            <br />
            <span className="ml-8 md:ml-0">building process</span>
          </h1>

          <div className="flex flex-row gap-3 sm:gap-4 justify-center items-center">
            <Link
              href="https://app.astrix.live"
              target="_blank"
              rel="noopener noreferrer"
              className="w-fit px-3 md:px-5 py-[10px] md:py-[14px] h-[30px] md:h-[40px] flex items-center justify-center rounded-3xl border border-[#4e4e4e87] bg-[#FFFFFF] shadow-[inset_0_2.39px_2.29px_rgba(0,0,0,0.25),0_2.29px_2.29px_rgba(0,0,0,0.25)] cursor-pointer hover:contrast-125 transition-all hover:-translate-y-0.5 text-[#0F0F0F] text-[10px] md:text-[10px] leading-none"
            >
              <p className="leading-none mt-0.5 text-xs md:text-base font-nohemi font-[400] text-shadow-md">GET STARTED</p>
            </Link>
            <Link
              href="#contact"
              onClick={() => handleNavClick("contact")}
              className="w-fit flex items-center justify-center px-3 md:px-5 py-[10px] md:py-[14px]  h-[30px] md:h-[40px]   rounded-3xl border border-[#4e4e4e87] bg-[#3c3c3c7b] shadow-[inset_0_2.39px_2.29px_rgba(0,0,0,0.25),0_2.29px_2.29px_rgba(0,0,0,0.25)] cursor-pointer hover:contrast-125 transition-all hover:-translate-y-0.5 text-[10px] md:text-[10px] leading-none"
            >
              <p className="leading-none mt-0.5 text-xs md:text-base font-nohemi font-[400] text-shadow-md">BOOK A DEMO</p>
            </Link>
          </div>
        </div>
        <div className="relative w-full h-[30vh] md:hidden z-30">
          <video
            ref={mobileVideoRef}
            className="object-cover w-full h-full"
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
              <source src="/Assets/Images/HeroSectionMobile.mp4" type="video/mp4" />
            ) : (
              <source src="/Assets/Images/HeroSectionMobile.webm" type="video/webm" />
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
        className={`fixed top-0 right-0 h-full w-80 bg-[#1f1f1f] z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Menu Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-700">
            <div className="flex items-center gap-2 w-[60px] h-[20px] relative">
              <Image
                src="/Assets/Icons/LogoIcon.png"
                alt="Astrix Logo"
                fill
                objectFit="contain"
              />
            </div>
            <button
              onClick={() => setIsMenuOpen(false)}
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
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Menu Items */}
          <div className="flex-1 flex flex-col justify-start px-6 pt-8 space-y-6">
            <Link
              href="#"
              className="text-white text-xs font-nohemi font-[400] hover:text-[#CCD0D7] transition-colors text-shadow-sm"
              onClick={() => setIsMenuOpen(false)}
            >
              ABOUT
            </Link>
            <Link
              href="#"
              className="text-white text-xs font-nohemi font-[400] hover:text-[#CCD0D7] transition-colors text-shadow-sm"
              onClick={() => setIsMenuOpen(false)}
            >
              PRICING
            </Link>
            <Link
              href="#contact"
              onClick={() => {
                setIsMenuOpen(false);
                handleNavClick("contact");
              }}
              className="text-white text-xs font-nohemi font-[400] hover:text-[#CCD0D7] transition-colors text-shadow-sm"
            >
              CONTACT US
            </Link>
            <Link
              href="https://app.astrix.live"
              target="_blank"
              rel="noopener noreferrer"
              className="w-fit px-5 py-2 flex items-center font-nohemi font-[400] justify-center rounded-3xl border border-[#4e4e4e87] bg-[#3c3c3cbf] shadow-[inset_0_2.39px_2.29px_rgba(0,0,0,0.25),0_2.29px_2.29px_rgba(0,0,0,0.25)] cursor-pointer hover:opacity-90 transition-all hover:-translate-y-0.5 text-white text-xs leading-none text-shadow-sm"
              onClick={() => setIsMenuOpen(false)}
            >
              <p className="leading-none mt-0.5">GET STARTED</p>
            </Link>
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

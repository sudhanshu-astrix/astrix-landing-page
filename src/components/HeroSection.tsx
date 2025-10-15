"use client";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { useState, useEffect, useRef } from "react";

export default function HeroSection({ className }: { className?: string }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const mobileVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    
    if (isMobile && videoRef.current && mobileVideoRef.current) {
      // Wait for both videos to load on mobile, then play simultaneously
      const backgroundVideo = videoRef.current;
      const mobileVideo = mobileVideoRef.current;
      
      const playBothVideos = () => {
        // Ensure both videos start at exactly 0
        backgroundVideo.currentTime = 0;
        mobileVideo.currentTime = 0;
        
        // Use requestAnimationFrame to sync the play() calls as closely as possible
        requestAnimationFrame(() => {
          backgroundVideo.play().catch((error) => {
            console.log("Background video autoplay failed:", error);
          });
          mobileVideo.play().catch((error) => {
            console.log("Mobile video autoplay failed:", error);
          });
        });

        // Sync videos periodically to ensure they stay in sync
        const syncInterval = setInterval(() => {
          if (Math.abs(backgroundVideo.currentTime - mobileVideo.currentTime) > 0.3) {
            // If videos drift apart by more than 0.3 seconds, resync
            mobileVideo.currentTime = backgroundVideo.currentTime;
          }
        }, 1000); // Check every second

        // Clean up interval
        return syncInterval;
      };

      // Check if both videos are ready
      let backgroundReady = backgroundVideo.readyState >= 2; // HAVE_CURRENT_DATA or higher
      let mobileReady = mobileVideo.readyState >= 2;
      let syncInterval: NodeJS.Timeout | null = null;

      const checkAndPlay = () => {
        if (backgroundReady && mobileReady && !syncInterval) {
          syncInterval = playBothVideos();
        }
      };

      // Listen for loadeddata events (more reliable than canplay)
      const handleBackgroundLoaded = () => {
        backgroundReady = true;
        checkAndPlay();
      };

      const handleMobileLoaded = () => {
        mobileReady = true;
        checkAndPlay();
      };

      backgroundVideo.addEventListener('loadeddata', handleBackgroundLoaded);
      mobileVideo.addEventListener('loadeddata', handleMobileLoaded);

      // If already loaded, play immediately
      checkAndPlay();

      // Cleanup
      return () => {
        backgroundVideo.removeEventListener('loadeddata', handleBackgroundLoaded);
        mobileVideo.removeEventListener('loadeddata', handleMobileLoaded);
        if (syncInterval) {
          clearInterval(syncInterval);
        }
      };
    } else if (!isMobile && videoRef.current) {
      // Desktop: just play the background video
      videoRef.current.play().catch((error) => {
        console.log("Video autoplay failed:", error);
      });
    }
  }, []);

  return (
    <section className={`${className || ''} relative min-h-screen h-[100vh] md:h-fit w-full flex flex-col justify-between overflow-hidden`}>
      <div className="absolute inset-0 z-0 w-full h-full">
        {/* Hero Background Video */}
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectFit: 'cover' }}
          disablePictureInPicture
          disableRemotePlayback
          x-webkit-airplay="deny"
        >
          <source src="/Assets/Images/HeroSection.mp4" type="video/mp4" />
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
        <div className="flex items-center gap-2 w-[100%] max-w-[80px] h-[30px] relative">
          <Image
            src="/Assets/Icons/LogoIcon.png"
            alt="Astrix Logo"
            fill
            objectFit="contain"
          />
        </div>

        <div className="hidden md:flex md:flex-1 items-center justify-end gap-3 lg:gap-5 px-4 lg:px-10">
          <button className="w-fit px-5 py-2 flex items-center justify-center rounded-3xl border border-[#4e4e4e87] bg-[#1f1f1f9e] shadow-[inset_0_2.39px_2.29px_rgba(0,0,0,0.25),0_2.29px_2.29px_rgba(0,0,0,0.25)] cursor-pointer hover:opacity-90 transition-all hover:-translate-y-0.5 text-xs md:text-[10px] leading-none"><p className="leading-none mt-0.5">ABOUT</p></button>
          <button className="w-fit px-5 py-2 flex items-center justify-center rounded-3xl border border-[#4e4e4e87] bg-[#1f1f1f9e] shadow-[inset_0_2.39px_2.29px_rgba(0,0,0,0.25),0_2.29px_2.29px_rgba(0,0,0,0.25)] cursor-pointer hover:opacity-90 transition-all hover:-translate-y-0.5 text-xs md:text-[10px] leading-none"><p className="leading-none mt-0.5">PRICING</p></button>
          <a href="#contact" className="w-fit px-5 py-2 flex items-center justify-center rounded-3xl border border-[#4e4e4e87] bg-[#1f1f1f9e] shadow-[inset_0_2.39px_2.29px_rgba(0,0,0,0.25),0_2.29px_2.29px_rgba(0,0,0,0.25)] cursor-pointer hover:opacity-90 transition-all hover:-translate-y-0.5 text-xs md:text-[10px] leading-none">
          <p className="leading-none mt-0.5">CONTACT</p>
          </a>
        </div>
        <a href="https://app.astrix.live" target="_blank" rel="noopener noreferrer" className="hidden md:inline-flex w-fit px-5 py-2 items-center justify-center rounded-3xl border border-[#4e4e4e87] bg-[#3c3c3cbf] cursor-pointer hover:opacity-90 transition-all hover:-translate-y-0.5 text-xs md:text-[10px] leading-none">
        <p className="leading-none mt-0.5">GET STARTED</p>
        </a>

        <button 
          className="md:hidden text-white z-50"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </nav>

      <div className="relative z-10 bottom-30 flex h-fit md:h-[45vh] flex-col items-center justify-between px-4 md:px-8 gap-10 md:gap-0">
        <div className="text-center w-full h-fit max-w-full md:max-w-[80%] flex flex-col justify-around gap-10 md:gap-14">
          <h1 className="text-2xl md:text-6xl lg:text-7xl font-nohemi400 text-white leading-tight">
            An omnichannel platform<br />
            <span className="ml-10 md:ml-28">for optimizing community-</span><br />
            <span className="ml-8 md:ml-0">building process</span>
          </h1>

          <div className="flex flex-row gap-3 sm:gap-4 justify-center items-center">
            <a href="https://app.astrix.live" target="_blank" rel="noopener noreferrer" className="w-fit px-5 h-[30px] flex items-center justify-center rounded-3xl border border-[#4e4e4e87] bg-[#FFFFFF] shadow-[inset_0_2.39px_2.29px_rgba(0,0,0,0.25),0_2.29px_2.29px_rgba(0,0,0,0.25)] cursor-pointer hover:opacity-90 transition-all hover:-translate-y-0.5 text-[#0F0F0F] text-[10px] md:text-[10px] leading-none">
              <p className="leading-none mt-0.5">GET STARTED</p>
            </a>
            <a href="#contact" className="w-fit flex items-center justify-center px-5 py-2 rounded-3xl border border-[#4e4e4e87] bg-[#3c3c3c7b] shadow-[inset_0_2.39px_2.29px_rgba(0,0,0,0.25),0_2.29px_2.29px_rgba(0,0,0,0.25)] cursor-pointer hover:opacity-90 transition-all hover:-translate-y-0.5 text-[10px] md:text-[10px] leading-none">
              <p className="leading-none mt-0.5">BOOK A DEMO</p>
            </a>
          </div>
        </div>
        <div className="relative w-full h-[30vh] md:hidden">
          <video
            ref={mobileVideoRef}
            src="/Assets/Images/HeroSection.mp4"
            className="object-cover w-full h-full"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            disablePictureInPicture
            disableRemotePlayback
            x-webkit-airplay="deny"
            style={{ position: "absolute", top: 0, left: 0 }}
            poster="/Assets/Images/HeroImage.png"
          />
        </div>
      </div>

      <div 
        className="absolute bottom-2 left-1/2 transform -translate-x-1/2 z-10 cursor-pointer"
        onClick={() => {
          window.scrollBy({
            top: window.innerHeight * 0.9,
            behavior: 'smooth'
          });
        }}
      >
        <div className="flex flex-col items-center text-white">
          <div className="animate-bounce">
            {/* Double down arrow using the DownArrow.svg image, stacked */}
            <img
              src="/Assets/Icons/DownArrow.svg"
              alt="Down Arrow"
              className="w-4 h-4"
              draggable={false}
            />
            <img
              src="/Assets/Icons/DownArrow.svg"
              alt="Down Arrow"
              className="w-4 h-4 -mt-1.5"
              draggable={false}
            />
          </div>
          <span className="text-xs mt-2 font-nohemi300 text-[#9C9C9C]">Scroll To Explore</span>
        </div>
      </div>

      {/* Mobile Menu - Slides in from right */}
      <div className={`fixed top-0 right-0 h-full w-80 bg-[#1f1f1f] z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
        isMenuOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
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
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Menu Items */}
          <div className="flex-1 flex flex-col justify-start px-6 pt-8 space-y-6">
            <a 
              href="#" 
              className="text-white text-xs font-nohemi400 hover:text-[#CCD0D7] transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              ABOUT
            </a>
            <a 
              href="#" 
              className="text-white text-xs font-nohemi400 hover:text-[#CCD0D7] transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              PRICING
            </a>
            <a 
              href="#contact" 
              className="text-white text-xs font-nohemi400 hover:text-[#CCD0D7] transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              CONTACT US
            </a>
            <a 
              href="https://app.astrix.live" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-fit px-5 py-2 flex items-center justify-center rounded-3xl border border-[#4e4e4e87] bg-[#3c3c3cbf] shadow-[inset_0_2.39px_2.29px_rgba(0,0,0,0.25),0_2.29px_2.29px_rgba(0,0,0,0.25)] cursor-pointer hover:opacity-90 transition-all hover:-translate-y-0.5 text-white text-xs leading-none"
              onClick={() => setIsMenuOpen(false)}
            >
              <p className="leading-none mt-0.5">GET STARTED</p>
            </a>
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



"use client";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { useState } from "react";

export default function HeroSection({ className }: { className?: string }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <section className={`${className || ''} relative min-h-screen h-fit w-full flex flex-col justify-between overflow-hidden`}>
      <div className="absolute inset-0 z-0 w-full h-full">
        <Image
          src="/Assets/Images/HeroImage.png"
          alt="Hero Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      <nav className="relative z-10 flex items-center justify-between px-4 sm:px-6 md:px-8 py-6 w-full">
        <div className="flex items-center gap-2 w-[100%] max-w-[120px] h-[30px] relative">
          <Image
            src="/Assets/Icons/LogoIcon.png"
            alt="Astrix Logo"
            fill
            objectFit="contain"
          />
        </div>

        <div className="hidden md:flex md:flex-1 items-center justify-end gap-3 lg:gap-5 px-4 lg:px-10">
          <button className="w-fit px-5 py-2 rounded-3xl border border-[#4e4e4e87] bg-[#1f1f1f9e] shadow-[inset_0_2.39px_2.29px_rgba(0,0,0,0.25),0_2.29px_2.29px_rgba(0,0,0,0.25)] cursor-pointer hover:opacity-90 transition-all hover:-translate-y-0.5">ABOUT</button>
          <button className="w-fit px-5 py-2 rounded-3xl border border-[#4e4e4e87] bg-[#1f1f1f9e] shadow-[inset_0_2.39px_2.29px_rgba(0,0,0,0.25),0_2.29px_2.29px_rgba(0,0,0,0.25)] cursor-pointer hover:opacity-90 transition-all hover:-translate-y-0.5">PRICING</button>
          <button className="w-fit px-5 py-2 rounded-3xl border border-[#4e4e4e87] bg-[#1f1f1f9e] shadow-[inset_0_2.39px_2.29px_rgba(0,0,0,0.25),0_2.29px_2.29px_rgba(0,0,0,0.25)] cursor-pointer hover:opacity-90 transition-all hover:-translate-y-0.5">CONTACT US</button>
          {/* <Button href="#about" variant="nav" size="sm">ABOUT</Button> */}
          {/* <Button href="#pricing" variant="nav" size="sm">PRICING</Button> */}
          {/* <Button href="#contact" variant="nav" size="sm">CONTACT US</Button> */}
        </div>
        <a href="https://app.astrix.live" target="_blank" rel="noopener noreferrer" className="hidden md:inline-flex w-fit px-6 py-2 rounded-3xl border border-[#4e4e4e87] bg-[#3c3c3cbf] shadow-[inset_0_2.39px_2.29px_rgba(0,0,0,0.25),0_2.29px_2.29px_rgba(0,0,0,0.25)] cursor-pointer hover:opacity-90 transition-all hover:-translate-y-0.5">GET STARTED</a>

        <button 
          className="md:hidden text-white z-50"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </nav>

      <div className="relative z-10 bottom-30 flex h-[45vh] flex-col items-center justify-between px-4 sm:px-6 md:px-8">
        <div className="text-center w-full h-full max-w-[90%] md:max-w-[80%] flex flex-col justify-between gap-6">
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-nohemi600 text-white leading-tight">
            An omnichannel platform<br />
            for optimizing community-<br />
            building process
          </h1>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
            <a href="https://app.astrix.live" target="_blank" rel="noopener noreferrer" className="w-fit px-5 py-2 rounded-3xl border border-[#4e4e4e87] bg-[#FFFFFF] shadow-[inset_0_2.39px_2.29px_rgba(0,0,0,0.25),0_2.29px_2.29px_rgba(0,0,0,0.25)] cursor-pointer hover:opacity-90 transition-all hover:-translate-y-0.5 text-[#0F0F0F]">GET STARTED</a>
            <button className="w-fit px-5 py-2 rounded-3xl border border-[#4e4e4e87] bg-[#3c3c3c7b] shadow-[inset_0_2.39px_2.29px_rgba(0,0,0,0.25),0_2.29px_2.29px_rgba(0,0,0,0.25)] cursor-pointer hover:opacity-90 transition-all hover:-translate-y-0.5">BOOK A DEMO</button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 z-10">
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
            <div className="flex items-center gap-2 w-[100px] h-[30px] relative">
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
          <div className="flex-1 flex flex-col justify-center px-6 space-y-8">
            <a 
              href="#" 
              className="text-white text-xl font-nohemi400 hover:text-[#CCD0D7] transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              ABOUT
            </a>
            <a 
              href="#" 
              className="text-white text-xl font-nohemi400 hover:text-[#CCD0D7] transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              PRICING
            </a>
            <a 
              href="#contact" 
              className="text-white text-xl font-nohemi400 hover:text-[#CCD0D7] transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              CONTACT US
            </a>
            <a 
              href="https://app.astrix.live" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-fit px-6 py-3 rounded-3xl border border-[#4e4e4e87] bg-[#3c3c3cbf] shadow-[inset_0_2.39px_2.29px_rgba(0,0,0,0.25),0_2.29px_2.29px_rgba(0,0,0,0.25)] cursor-pointer hover:opacity-90 transition-all hover:-translate-y-0.5 text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              GET STARTED
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



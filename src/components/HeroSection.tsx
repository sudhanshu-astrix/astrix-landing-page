import Image from "next/image";
import Button from "@/components/ui/Button";

export default function HeroSection({ className }: { className?: string }) {
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
        <button className="hidden md:inline-flex w-fit px-6 py-2 rounded-3xl border border-[#4e4e4e87] bg-[#3c3c3cbf] shadow-[inset_0_2.39px_2.29px_rgba(0,0,0,0.25),0_2.29px_2.29px_rgba(0,0,0,0.25)] cursor-pointer hover:opacity-90 transition-all hover:-translate-y-0.5">GET STARTED</button>

        <button className="md:hidden text-white">
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
            <button className="w-fit px-5 py-2 rounded-3xl border border-[#4e4e4e87] bg-[#FFFFFF] shadow-[inset_0_2.39px_2.29px_rgba(0,0,0,0.25),0_2.29px_2.29px_rgba(0,0,0,0.25)] cursor-pointer hover:opacity-90 transition-all hover:-translate-y-0.5 text-[#0F0F0F]">GET STARTED</button>
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
    </section>
  );
}



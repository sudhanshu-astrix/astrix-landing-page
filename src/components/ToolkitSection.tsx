import Image from "next/image";

export default function ToolkitSection({ className }: { className?: string }) {
  return (
    <section className={`${className || ''} relative w-full min-h-screen max-h-fit bg-[#0B0B0B] overflow-hidden`}>
      <div className="w-full flex flex-col justify-between relative">
        {/* Top Content */}
        <div className="flex flex-col md:flex-row w-full h-fit mt-10">
          <h2 className="text-white text-3xl sm:text-4xl md:text-5xl ml-10 lg:text-[44px] max-w-[500px] md:max-w-[58%] w-[80%] md:w-[58%] font-nohemi500 leading-tight">
            If your community had an HQ,
            it’d probably be here. Discover,
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
                <h3 className="absolute top-[38%] left-[18%] text-[42px] sm:text-[36px] md:text-[48px] leading-none text-[#F0E9B2] instrument-serif-regular">
                  Your Toolkit
                </h3>
                <div className="absolute animate-pulse rotate-[90deg] md:rotate-0 w-[80px] md:w-[100px] h-[80px] md:h-[100px] top-[34.5%] right-[25.5%] md:right-[25%]">
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
    </section>
  );
}

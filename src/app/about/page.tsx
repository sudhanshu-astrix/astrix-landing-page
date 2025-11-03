"use client";

import Image from "next/image";
import Link from "next/link";
import FooterSection from "@/app/components/footerSection";
import { useRouter } from "next/navigation";

export default function AboutUsPage() {
  const router = useRouter();
  return (
    <main className="min-h-screen w-full bg-[#0F0F0F] text-white">
      {/* Top bar (mirrors HeroSection navbar) */}
      <header className="relative z-10 flex items-center justify-between px-4 sm:px-6 md:px-8 py-6 w-full">
        <div
          className="flex items-center gap-2 w-[100%] max-w-[114px] h-[30px] relative"
          onClick={() => {
            router.push("/");
          }}
        >
          <Image
            src="/Assets/Icons/LogoIcon.png"
            alt="Astrix Logo"
            fill
            priority
            className="object-contain"
          />
        </div>
        <div className="hidden md:flex md:flex-1 items-center justify-end gap-3 lg:gap-5 px-4 lg:px-10">
          <span className="w-fit px-3 md:px-5 py-1 h-[30px] flex items-center justify-center rounded-3xl border border-[#4e4e4e87] bg-[#FFFFFF] shadow-[inset_0_2.39px_2.29px_rgba(0,0,0,0.25),0_2.29px_2.29px_rgba(0,0,0,0.25)] cursor-pointer hover:contrast-125 transition-all hover:-translate-y-0.5 text-[#0F0F0F] leading-none">
            <p className="leading-none mt-0.5 text-xs font-nohemi font-[400] text-shadow-md">
              ABOUT
            </p>
          </span>
          {/* <Link
            href="/"
            className="w-fit transition-all duration-300 hover:bg-[#fff] hover:text-[#1f1f1f9e] cursor-pointe p-3 h-[35px] flex items-center justify-center rounded-3xl border border-[#4e4e4e87] bg-[#1f1f1f9e] text-xs md:text-[10px] leading-none hover:contrast-125 hover:-translate-y-0.5"
          >
            <p className="leading-none mt-0.5 px-2 py-1 text-xs font-nohemi font-[400]">
              SERVICES
            </p>
          </Link> */}
          {/* <Link
            href="#"
            className="w-fit transition-all duration-300 hover:bg-[#fff] hover:text-[#1f1f1f9e] cursor-pointer p-3 h-[35px] flex items-center justify-center rounded-3xl border border-[#4e4e4e87] bg-[#1f1f1f9e] text-xs md:text-[10px] leading-none hover:contrast-125 hover:-translate-y-0.5"
          >
            <p className="leading-none mt-0.5 px-2 py-1 text-xs font-nohemi font-[400]">
              RESOURCES
            </p>
          </Link> */}
          <Link
            href="/#contact"
            className="w-fit transition-all duration-300 hover:bg-[#fff] hover:text-[#1f1f1f9e] cursor-pointer p-3 h-[35px] flex items-center justify-center rounded-3xl border border-[#4e4e4e87] bg-[#1f1f1f9e] text-xs md:text-[10px] leading-none hover:contrast-125 hover:-translate-y-0.5"
          >
            <p className="leading-none mt-0.5 px-2 py-1 text-xs font-nohemi font-[400]">
              CONTACT US
            </p>
          </Link>
        </div>
        <Link
          href="https://app.astrix.live"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden h-[35px] md:inline-flex w-fit px-5 py-1 items-center justify-center rounded-3xl border border-[#4e4e4e87] bg-[#3c3c3cbf] text-xs md:text-[10px] leading-none hover:contrast-125 transition-all hover:-translate-y-0.5"
        >
          <p className="leading-none mt-0.5 text-xs font-nohemi font-[400]">
            GET STARTED
          </p>
        </Link>
      </header>
      <section className="w-full h-full flex items-center justify-center px-4">
        <div className="w-full  h-full xl:max-w-[80%] xl:mx-auto ">
          <div className="bg-[url('/Assets/Images/aboutBg.png')] bg-cover bg-center flex items-center flex-col  justify-center pb-[40px] sm:pb-[50px] md:pb-[180px]  ">
            {/* upper div */}
            <div className="w-full  flex flex-col md:flex-row justify-start items-start gap-[40px] md:gap-[200px]  pb-[80px]  md:pb-[160px] pt-[40px]">
              <p className="text-[2.2rem] md:text-[4rem] text-[#FFF3B0] font-instrument-serif leading-none text-nowrap">
                About Us
              </p>

              <p className=" w-full max-w-[200px]  self-end md:self-auto md:max-w-[800px] font-switzer font-[400] text-[#E4E4E4] text-xs sm:text-lg  md:text-[1.5rem] leading-[120%]">
                Let&apos;s be honest. The endless scroll is getting old and the
                feeds are feeling stale. We&apos;ve built a world to share
                everything, but find it harder than ever to feel like we belong.
                That&apos;s where we come in.
              </p>
            </div>

            {/* middle div */}
            <div className="w-full relative flex  pt-[80px]  md:pt-[160px] pb-[80px] md:pb-[200px] ">
              {/* yellow arrow + text */}
              <div className="absolute top-0 right-0 sm:-top-[20px] sm:right-[10%] md:right-[16%] md:top-0 flex flex-col items-center text-[#FFF3B0] text-sm font-switzer">
                <span className="italic text-xs md:text-base">
                  ( of the fans, by the fans, and for the fans )
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="173"
                  height="97"
                  viewBox="0 0 173 97"
                  fill="none"
                >
                  <g filter="url(#filter0_g_1528_5737)">
                    <path
                      d="M2.70276 94.9L7.25283 91.3461L1.90002 89.1826L2.70276 94.9ZM4.39 90.7255L4.84939 90.923C17.5059 61.4705 43.2148 39.4637 73.6639 24.8153C104.111 10.1678 139.255 2.9 170.703 2.89999V2.39999V1.89999C139.115 1.9 103.821 9.19756 73.2304 23.9141C42.6414 38.6298 16.7117 60.7857 3.93062 90.5281L4.39 90.7255Z"
                      fill="#FFF3B0"
                    />
                  </g>
                  <defs>
                    <filter
                      id="filter0_g_1528_5737"
                      x="2.44379e-05"
                      y="-6.07967e-06"
                      width="172.603"
                      height="96.8"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="BackgroundImageFix"
                        result="shape"
                      />
                      <feTurbulence
                        type="fractalNoise"
                        baseFrequency="10 10"
                        numOctaves="3"
                        seed="1410"
                      />
                      <feDisplacementMap
                        in="shape"
                        scale="3.7999999523162842"
                        xChannelSelector="R"
                        yChannelSelector="G"
                        result="displacedImage"
                        width="100%"
                        height="100%"
                      />
                      <feMerge result="effect1_texture_1528_5737">
                        <feMergeNode in="displacedImage" />
                      </feMerge>
                    </filter>
                  </defs>
                </svg>
              </div>

              {/* main paragraph */}
              <p className=" text-[1.5rem] md:text-[4rem] font-switzer font-[500] text-[#E4E4E4] leading-[120%] ident-20 md:indent-100 md:max-w-[1000px]">
                we started Astrix because we believe the real magic isn&apos;t
                in the first click or the fleeting view; it&apos;s in the bonds
                you build long after someone discovers you.
              </p>
            </div>

            {/* third div */}
            <div className="w-full flex justify-start gap-[60px] md:gap-[200px] items-start">
              <p className="texyt-base md:text-[2rem] text-[#E4E4E4] font-switzer font-[400] text-nowrap">
                We believe
              </p>
              <div className="w-full flex flex-col md:flex-row gap-[60px] md:gap-[200px] ">
                <p className="text-[#E4E4E4] font-switzer font-[400] text-xs sm:text-base md:text-[1.5rem] max-w-[390px] leading-[120%]">
                  an audience is something you gather, but a community is
                  something you grow. It&apos;s the difference between people
                  just showing up and people feeling truly seen.
                </p>
                <p className="text-[#E4E4E4] font-switzer font-[400] text-xs sm:text-base md:ext-[1.5rem] max-w-[390px] leading-[120%]">
                  in &quot;third spaces&quot;, those rare places, online or off, that
                  aren&apos;t work and aren&apos;t home, but are where you find
                  your people and build real, authentic
                  <br /> relationships.
                </p>
              </div>
            </div>
          </div>

          {/* fourth div */}
          <div className="w-full py-[60px] md:py-[160px] pb-[80px] md:pb-[180px]  flex flex-col justify-center items-center gap-4 ">
            <div className="h-[2px] w-[120px] md:w-[260px] bg-[#FFF3B0] "></div>
            <p className="text-[#E4E4E4] font-switzer font-[400] text-[24px] md:text-[47px] text-center leading-[120%]">
              our{" "}
              <span className="font-instrument-serif text-[#FFF3B0] text-[24px] md:text-[58px] leading-[120%]">
                mission
              </span>{" "}
              is to empower experience curators to nurture close-knit
              communities by offering third spaces and fanbase management.
            </p>
          </div>
          {/* fifth div */}
          <div className="w-full pb-[220px]    flex flex-col justify-center items-center gap-4">
            <div className="h-[2px] w-[120px] md:w-[260px] bg-[#FFF3B0] "></div>
            <p className="text-[#E4E4E4] font-switzer font-[400] text-[24px] md:text-[47px] text-center leading-[120%]">
              we en
              <span className="font-instrument-serif text-[#FFF3B0] text-[24px] md:text-[58px] leading-[120%]">
                vision
              </span>{" "}
              an inclusive space for anyone and everyone where discovery sparks
              connection and shared purpose drives growth.
            </p>
          </div>
          {/* sixth div */}
          {/* <div className="w-full pt-[50px] pb-[160px]  max-w-[530px] ml-[200px] ">
            <p className="text-[#FFF3B0] font-instrument-serif font-[400] text-[1.5rem] leading-[120%]">
              It&apos;s about earning presence, not just chasing <br />{" "}
              attention. So, what will you build?
            </p>
          </div> */}
        </div>
      </section>

      {/* Footer */}
      <FooterSection />
    </main>
  );
}

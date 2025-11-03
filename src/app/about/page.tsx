"use client";

import Image from "next/image";
import Link from "next/link";
import FooterSection from "@/app/components/footerSection";
import { useRouter } from "next/navigation";

export default function AboutUsPage() {
  const router = useRouter();
  return (
    <main className="min-h-screen w-full bg-[#1E1E1E] text-white">
      {/* Top bar (mirrors HeroSection navbar) */}
      <header className="relative z-10 flex items-center justify-between px-4 sm:px-6 md:px-8 py-6 w-full">
        <div className="flex items-center gap-2 w-[100%] max-w-[114px] h-[30px] relative" onClick={() => {
          router.push("/");
        }}>
          <Image src="/Assets/Icons/LogoIcon.png" alt="Astrix Logo" fill priority className="object-contain" />
        </div>
        <div className="hidden md:flex md:flex-1 items-center justify-end gap-3 lg:gap-5 px-4 lg:px-10">
          <span
          className="w-fit px-3 md:px-5 py-1 h-[30px] flex items-center justify-center rounded-3xl border border-[#4e4e4e87] bg-[#FFFFFF] shadow-[inset_0_2.39px_2.29px_rgba(0,0,0,0.25),0_2.29px_2.29px_rgba(0,0,0,0.25)] cursor-pointer hover:contrast-125 transition-all hover:-translate-y-0.5 text-[#0F0F0F] leading-none"
        >
          <p className="leading-none mt-0.5 text-xs font-nohemi font-[400] text-shadow-md">
            ABOUT
          </p>
        </span>
          <Link href="/" className="w-fit transition-all duration-300 hover:bg-[#fff] hover:text-[#1f1f1f9e] cursor-pointe p-3 h-[35px] flex items-center justify-center rounded-3xl border border-[#4e4e4e87] bg-[#1f1f1f9e] text-xs md:text-[10px] leading-none hover:contrast-125 hover:-translate-y-0.5">
            <p className="leading-none mt-0.5 px-2 py-1 text-xs font-nohemi font-[400]">SERVICES</p>
          </Link>
          <Link href="#" className="w-fit transition-all duration-300 hover:bg-[#fff] hover:text-[#1f1f1f9e] cursor-pointer p-3 h-[35px] flex items-center justify-center rounded-3xl border border-[#4e4e4e87] bg-[#1f1f1f9e] text-xs md:text-[10px] leading-none hover:contrast-125 hover:-translate-y-0.5">
            <p className="leading-none mt-0.5 px-2 py-1 text-xs font-nohemi font-[400]">RESOURCES</p>
          </Link>
          <Link href="/#contact" className="w-fit transition-all duration-300 hover:bg-[#fff] hover:text-[#1f1f1f9e] cursor-pointer p-3 h-[35px] flex items-center justify-center rounded-3xl border border-[#4e4e4e87] bg-[#1f1f1f9e] text-xs md:text-[10px] leading-none hover:contrast-125 hover:-translate-y-0.5">
            <p className="leading-none mt-0.5 px-2 py-1 text-xs font-nohemi font-[400]">CONTACT US</p>
          </Link>
        </div>
        <Link
          href="https://app.astrix.live"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden h-[35px] md:inline-flex w-fit px-5 py-1 items-center justify-center rounded-3xl border border-[#4e4e4e87] bg-[#3c3c3cbf] text-xs md:text-[10px] leading-none hover:contrast-125 transition-all hover:-translate-y-0.5"
        >
          <p className="leading-none mt-0.5 text-xs font-nohemi font-[400]">GET STARTED</p>
        </Link>
      </header>
      <section className="w-[100vw] h-full flex items-center justify-center">

      </section>

      {/* Footer */}
      <FooterSection />
    </main>
  );
}
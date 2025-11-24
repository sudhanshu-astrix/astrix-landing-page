"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import mixpanel from "@/lib/mixpanelClient";

interface NavbarProps {
  trackingContext?: string;
}

export default function Navbar({ trackingContext = "Navbar" }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 py-4 bg-[#0F0F0F]/80 backdrop-blur-sm">
        <Link
          href="/"
          className="flex items-center gap-2 w-[120px] h-[50px] relative cursor-pointer hover:opacity-80 transition-opacity"
        >
          <Image
            src="/Assets/Icons/LogoIcon.png"
            alt="Astrix Logo"
            fill
            className="object-contain"
          />
        </Link>

      </nav>

      {/* Mobile Menu */}
      
    </>
  );
}


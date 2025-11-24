"use client";
import Navbar from "../components/Navbar";
import FAQSection from "../components/FAQSection";
import FooterSection from "../components/footerSection";

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-[#0F0F0F] text-white">
      <Navbar trackingContext="FAQ" />
      <FAQSection />
      <FooterSection />
    </main>
  );
}


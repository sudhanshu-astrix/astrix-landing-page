"use client";
import Image from "next/image";
import mixpanel from "@/lib/mixpanelClient";
import { useState } from "react";

// Footer data structure - easily customizable
const footerData = {
  sections: [
    {
      title: "Explore",
      links: [
        { label: "About Us", href: "/about" },
        { label: "FAQs", href: "/faq" },
        { label: "Community Guidelines", target: "_blank", href: "https://aquamarine-manatee-f47.notion.site/community-guidelines?source=copy_link" },
        // { label: "Best Practices", href: "#best-practices" },
        { label: "Affiliate Program", target: "_blank", href: "https://aquamarine-manatee-f47.notion.site/Affiliate-Marketing-2a3d3c99956d809999f7df723a754fd2?source=copy_link" },
        { label: "For Individual Curator", target: "_blank", href: "https://aquamarine-manatee-f47.notion.site/For-Individual-Curators-14a9cd463655480bbed112cfcc3652f6?source=copy_link" },
        { label: "For Business", target: "_blank", href: "https://aquamarine-manatee-f47.notion.site/For-Business-d78baa711bb24985b6943b8a0e1bb7fa?source=copy_link" },
      ],
    },
    {
      title: "By Industry",
      links: [
        { label: "Music Events", target: "_blank", href: "https://aquamarine-manatee-f47.notion.site/Music-Events-9780ab9619c14e738bccfec7b7e3bdab?source=copy_link" },
        { label: "Sporting Events", target: "_blank", href: "https://aquamarine-manatee-f47.notion.site/Sporting-Events-2a9d3c99956d80729e05f559651d49cf?source=copy_link" },
        { label: "Film & Theatre", target: "_blank", href: "https://aquamarine-manatee-f47.notion.site/Films-and-Theatres-2a9d3c99956d80629daed7d2e68d87dd?source=copy_link" },
        { label: "Comedy Clubs", target: "_blank", href: "https://aquamarine-manatee-f47.notion.site/Comedy-Clubs-28325a90fe6c44e79e243752437e3156?source=copy_link" },
        { label: "Art & Culture Clubs", target: "_blank", href: "https://aquamarine-manatee-f47.notion.site/Arts-Culture-Collectives-7dfa613b693f4b8ca6e29edeb8002f13?source=copy_link" },
        { label: "E-Sports & Gaming", target: "_blank", href: "https://aquamarine-manatee-f47.notion.site/Esports-Gaming-3b996e1d34ad4b01b60afa668ded95af?source=copy_link" },
        { label: "Venues", target: "_blank", href: "https://aquamarine-manatee-f47.notion.site/Venues-b716d6432cae45f88a5e000d6da1af59?source=copy_link" },
        { label: "Learning & Workshops", target: "_blank", href: "https://aquamarine-manatee-f47.notion.site/Workshops-Learning-Circles-Skill-Communities-edf87a25e24f4bdf948cd02f4ad34919?source=copy_link" },
        { label: "Experiential Marketing", target: "_blank", href: "https://aquamarine-manatee-f47.notion.site/Experiential-Marketing-3f877e5c52f24e66a9d17dcec608ecbb?source=copy_link" },
        // { label: "Creator Collectives", href: "" },
        { label: "Local Hobby Groups & Community Clubs", target: "_blank", href: "https://aquamarine-manatee-f47.notion.site/Creator-Led-Communities-34c7b7dd6a514ab19a6fd1e495c6b10b?source=copy_link" },
        { label: "Corporate Events", target: "_blank", href: "https://aquamarine-manatee-f47.notion.site/Corporate-Events-9920adc67d5f445fac23464945f15604?source=copy_link" },
        // { label: "Non-Profit Events", href: "#nonprofit" },
      ],
    },
    {
      title: "Resources",
      links: [
        // { label: "Case Studies", href: "#case-studies" },
        // { label: "Reports", href: "#reports" }, 
        { label: "Event Checklist", target: "_blank", href: "https://aquamarine-manatee-f47.notion.site/Pre-Event-Checklist-2a3d3c99956d8039a2c7f5f5ffbb19d9?source=copy_link" },
        // { label: "Licenses Required", href: "#licenses" },
      ],
    },
    // {
    //   title: "Tools",
    //   links: [
    //     { label: "QR Scanner", href: "#qr-scanner" },
    //     { label: "Invoice Generator", href: "#invoice" },
    //   ],
    // },
    {
      title: "Others",
      links: [
        { label: "Terms & Conditions", href: "/terms", target: "_blank" },
        { label: "Privacy policy", href: "/privacy", target: "_blank" },
        { label: "Refund Policy", href: "/refund", target: "_blank" },
        { label: "Contact Us", href: "#contact" },
      ],
    },
  ],
  socials: [
    {
      name: "Spotify",
      href: "https://open.spotify.com/user/31l6qkz4vu5kkzqwqwqwqw",
      icon: "/Assets/Icons/SpotifyIcon.svg",
      ariaLabel: "Spotify",
    },
    {
      name: "X",
      href: "https://x.com/astrix_live",
      icon: "/Assets/Icons/XIcon.svg",
      ariaLabel: "X",
    },
    {
      name: "YouTube",
      href: "https://www.youtube.com/@astrix-live",
      icon: "/Assets/Icons/YoutubeIcon.svg",
      ariaLabel: "YouTube",
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/astrix.live/",
      icon: "/Assets/Icons/InstagramIcon.svg",
      ariaLabel: "Instagram",
    },
  ],
  copyright: "© 2025 Tikitin Solutions Pvt. Ltd. All rights reserved.",
};

// Collapsible section for mobile
function CollapsibleSection({
  title,
  links,
}: {
  title: string;
  links: Array<{ label: string; href: string; target?: string }>;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-3 text-left"
      >
        <span className="text-gray-50 font-nohemi font-[400] text-base">
          {title}
        </span>
        <svg
          className={`w-4 h-4 text-gray-50 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      <div
        className={`overflow-hidden transition-all duration-200 ${
          isOpen ? "max-h-[1000px] pb-4" : "max-h-0"
        }`}
      >
        <ul className="space-y-3">
          {links.map((link, idx) => (
            <li key={idx}>
              <a
                href={link.href}
                target={link.target}
                rel={link.target ? "noopener noreferrer" : undefined}
                className="text-[#939CAA] hover:text-gray-100 transition-colors text-sm font-nohemi font-[300]"
                onClick={() => {
                  mixpanel.track(`Footer - ${link.label} Clicked`, {
                    location: "Footer Mobile",
                    section: title,
                  });
                }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function FooterSection({ className }: { className?: string }) {
  return (
    <footer
      className={`${
        className || ""
      } relative overflow-hidden h-fit bg-[#1f1f1f] text-gray-50 flex items-start pt-16`}
      id="footer"
    >
      <div className="relative z-10 w-full mx-auto px-6 md:px-10 lg:px-16 flex flex-col">
        {/* Desktop Layout */}
        <div className="hidden md:flex md:flex-row justify-between lg:gap-12 mb-16">
          {footerData.sections.map((section, idx) => (
            <div key={idx} className="w-[20%]">
              <h3 className="text-gray-50 font-nohemi font-[400] text-base mb-4">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <a
                      href={link.href}
                      target={link.target}
                      rel={link.target ? "noopener noreferrer" : undefined}
                      className="text-[#bec5d0] hover:text-gray-100 transition-colors text-sm font-nohemi font-[300] block"
                      onClick={() => {
                        mixpanel.track(`Footer - ${link.label} Clicked`, {
                          location: "Footer Desktop",
                          section: section.title,
                        });
                      }}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Mobile Layout - Collapsible */}
        <div className="md:hidden mb-8">
          {footerData.sections.map((section, idx) => (
            <CollapsibleSection
              key={idx}
              title={section.title}
              links={section.links}
            />
          ))}
        </div>

        {/* Divider */}
        <div className="w-full h-[0.5px] bg-[#31373F] mb-8"></div>

        {/* Start your / Onboard Now Section */}
        <div className="flex flex-col md:flex-row items-center justify-start gap-10 mb-8">
          <h3 className="text-white text-xl md:text-2xl font-switzer font-[400] text-center md:text-left">
            Create an Account
          </h3>
          <a
            href="https://app.astrix.live/login?landingPageListEvent=true"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 md:px-8 py-3 md:py-2 rounded-full border border-[#B0E681] bg-transparent text-[#E4E4E4] text-sm md:text-base font-switzer font-[400] transition-all duration-200 hover:bg-[#B0E681] hover:text-[#0F0F0F]"
            onClick={() => {
              if (window != undefined && window.localStorage != undefined) {
                localStorage.setItem("landingPageListEvent", "true");
              }
              mixpanel.track("Footer - Onboard Now Clicked", {
                location: "Footer",
              });
            }}
          >
            ONBOARD NOW
          </a>
        </div>

        {/* Divider */}
        <div className="w-full h-[0.5px] bg-[#31373F] mb-8"></div>

        {/* Bottom row */}
        <div className="flex flex-col-reverse md:flex-row gap-6 md:gap-8 items-center justify-between mb-4">
          <p className="text-sm font-nohemi font-[300] text-[#939CAA] text-center md:text-left">
            {footerData.copyright}
          </p>

          {/* Social icons */}
          <div className="flex items-center gap-4">
            {footerData.socials.map((social, idx) => (
              <a
                key={idx}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.ariaLabel}
                className="w-8 h-8 grid place-items-center rounded-full hover:bg-white/10 transition-colors"
                onClick={() => {
                  mixpanel.track(`Footer - ${social.name} Clicked`, {
                    location: "Footer",
                  });
                }}
              >
                <Image
                  src={social.icon}
                  alt={social.name}
                  width={18}
                  height={18}
                  className="opacity-80 hover:opacity-100 transition-opacity"
                />
              </a>
            ))}
          </div>
        </div>

        {/* Large Astrix Logo at Bottom */}
        <div className="relative w-full flex justify-center items-center mt-4">
          <div className="relative -bottom-8 md:bottom-0 w-full md:w-[85%] h-[120px] md:h-[180px] lg:h-[200px] opacity-30">
            <Image
              src="/Assets/Icons/FooterLogo.png"
              alt="Astrix Logo Large"
              fill
              className="object-contain object-center"
              priority={false}
            />
          </div>
        </div>
      </div>
    </footer>
  );
}

"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import mixpanel from "@/lib/mixpanelClient";

export default function GlobalMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [showIcon, setShowIcon] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";
  

  useEffect(() => {
    const hero = document.querySelector('[data-hero-section="true"]') as HTMLElement | null;
    if (!hero) {
      setShowIcon(true);
      return;
    }

    const update = () => {
      const rect = hero.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      // Hide icon whenever any part of hero is visible
      setShowIcon(!inView);
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  const scrollToProductSection = (targetId: string) => {
    setIsOpen(false);
    const isDesktop = window.innerWidth >= 768;
    if (isDesktop) {
      const root = document.getElementById("product-cycle-root");
      if (root) {
        root.scrollIntoView({ behavior: "smooth", block: "start" });
        setTimeout(() => {
          window.dispatchEvent(
            new CustomEvent("gotoProductCycle", { detail: { id: targetId } })
          );
        }, 200);
      }
    } else {
      const el = document.getElementById(targetId);
      if (el) {
        // First attempt
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        // Mobile + ScrollTrigger may need a refresh and a second attempt on first visit
        let tries = 0;
        const maxTries = 5;
        const reattempt = () => {
          tries++;
        // @ts-expect-error: ScrollTrigger is not defined in TypeScript window type

          if (window.ScrollTrigger && typeof window.ScrollTrigger.refresh === 'function') {
          // @ts-expect-error: ScrollTrigger refresh not recognized by TS
            window.ScrollTrigger.refresh();
          }
          const target = document.getElementById(targetId);
          if (target) {
            target.scrollIntoView({ behavior: "smooth", block: "start" });
          }
          if (tries < maxTries) setTimeout(reattempt, 120);
        };
        setTimeout(reattempt, 150);
      }
    }
  };

  if (!isHome) return null;

  return (
    <>
      {showIcon && (
        <button
          aria-label="Open menu"
          onClick={() => {
            setIsOpen(true);
            mixpanel.track("Opened Global Menu");
          }}
          className="fixed top-6 right-6 z-[1000] w-8 h-8 md:w-9 md:h-9"
        >
          <Image
            src="/Assets/Icons/menuicon.png"
            alt="menu"
            fill
            className="object-contain opacity-90"
            priority={false}
          />
        </button>
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-[#0F0F0F] z-[1100] transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full relative">
          {/* Header */}
          <div className="flex items-center justify-between px-6 pt-6">
            <div className="flex items-center gap-2 w-[80px] h-[30px] relative">
              <Image src="/Assets/Icons/LogoIcon.png" alt="Astrix Logo" fill className="object-contain" />
            </div>
            <button
              onClick={() => {
                setIsOpen(false)
                mixpanel.track("Closed Global Menu");
              }}
              className="text-white hover:text-gray-300 transition-colors"
              aria-label="Close menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 flex flex-col justify-start px-3 pt-8 space-y-4">
            {pathname !== "/" && (
              <Link
                href="/"
                className="text-white text-xs font-nohemi font-[400] py-2 px-4 hover:text-[#CCD0D7] hover:bg-[#1F1F1F] transition-colors text-shadow-sm"
                onClick={() => setIsOpen(false)}
              >
                HOME
              </Link>
            )}
            <Link
              href="/about"
              className="text-white text-xs font-nohemi font-[400] py-2 px-4 hover:text-[#CCD0D7] hover:bg-[#1F1F1F] transition-colors text-shadow-sm"
              onClick={() => {
                setIsOpen(false)
                  mixpanel.track(
                              "Global Menu - About Clicked",
                              { location: "Global Menu" }
                            );
              }}
            >
              ABOUT
            </Link>

            {/* Services */}
            <div className="space-y-3">
              <button
                onClick={() =>
                  { setIsServicesOpen(!isServicesOpen)
                       mixpanel.track(
                              "Global Menu - Services Toggled",
                              { location: "Global Menu" }
                            );
                  }

                }
                className={`flex py-2 px-4 hover:bg-[#1F1F1F] items-center justify-between w-full text-white text-xs font-nohemi font-[400] hover:text-[#CCD0D7] transition-colors text-shadow-sm ${
                  isServicesOpen && "bg-[#1F1F1F]"
                }`}
              >
                <span>SERVICES</span>
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${isServicesOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isServicesOpen && (
                <div className="pl-4 space-y-4">
                  <div>
                    <h4 className="text-white text-xs font-instrument-serif font-[400] mb-2">Distribute</h4>
                    <ul className="space-y-1 pl-2">
                      <li><button onClick={() => {scrollToProductSection('pc-create-event')
                      mixpanel.track("Global Menu - Create Event Clicked", { location: "Global Menu" });
                      }} className="text-left w-full text-white text-xs font-nohemi font-[400] hover:text-[#CCD0D7] transition-colors">Create Event</button></li>
                      <li><button onClick={() => {scrollToProductSection('pc-issue-tickets')
                      mixpanel.track("Global Menu - Issue Tickets Clicked", { location: "Global Menu" });
                      }} className="text-left w-full text-white text-xs font-nohemi font-[400] hover:text-[#CCD0D7] transition-colors">Issue Tickets</button></li>
                      <li><button onClick={() => {scrollToProductSection('pc-purchase-rsvp')
                      mixpanel.track("Global Menu - Purchase/RSVP Clicked", { location: "Global Menu" });
                      }} className="text-left w-full text-white text-xs font-nohemi font-[400] hover:text-[#CCD0D7] transition-colors">Purchase/RSVP</button></li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-white text-xs font-instrument-serif font-[400] mb-2">Retarget</h4>
                    <ul className="space-y-1 pl-2">
                      <li><button onClick={() => {scrollToProductSection('pc-data-insights')
                      mixpanel.track("Global Menu - Data Insights Clicked", { location: "Global Menu" });
                      }} className="text-left w-full text-white text-xs font-nohemi font-[400] hover:text-[#CCD0D7] transition-colors">Data Insights</button></li>
                      <li><button onClick={() => {scrollToProductSection('pc-email-marketing')
                      mixpanel.track("Global Menu - Email Marketing Clicked", { location: "Global Menu" });
                      }} className="text-left w-full text-white text-xs font-nohemi font-[400] hover:text-[#CCD0D7] transition-colors">Email Marketing</button></li>
                      <li><button onClick={() => {scrollToProductSection('pc-promotions')
                      mixpanel.track("Global Menu - Promotions/Discounts Clicked", { location: "Global Menu" });
                      }} className="text-left w-full text-white text-xs font-nohemi font-[400] hover:text-[#CCD0D7] transition-colors">Promotions / Discounts</button></li>
                      <li><button onClick={() => {scrollToProductSection('pc-marketing-insights')
                      mixpanel.track("Global Menu - Marketing Insights Clicked", { location: "Global Menu" });
                      }} className="text-left w-full text-white text-xs font-nohemi font-[400] hover:text-[#CCD0D7] transition-colors">Marketing Insights</button></li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-white text-xs font-instrument-serif font-[400] mb-2">Discover</h4>
                    <ul className="space-y-1 pl-2">
                      <li><button onClick={() => {scrollToProductSection('pc-mini-portfolio')
                      mixpanel.track("Global Menu - Mini Portfolio Clicked", { location: "Global Menu" });
                      }} className="text-left w-full text-white text-xs font-nohemi font-[400] hover:text-[#CCD0D7] transition-colors">Mini Portfolio</button></li>
                      <li><button onClick={() => {scrollToProductSection('pc-discovery-channel')
                      mixpanel.track("Global Menu - Discovery Channel Clicked", { location: "Global Menu" });
                      }} className="text-left w-full text-white text-xs font-nohemi font-[400] hover:text-[#CCD0D7] transition-colors">Discovery Channel</button></li>
                    </ul>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="#"
              className="text-white text-xs font-nohemi font-[400] hover:text-[#CCD0D7] transition-colors text-shadow-sm py-2 px-4 hover:bg-[#1F1F1F]"
              onClick={() => {setIsOpen(false)
                  mixpanel.track(
                              "Global Menu - Resources Clicked",
                              { location: "Global Menu" }
                            );
              }}
            >
              RESOURCES
            </Link>

            <Link
              href="#contact"
              onClick={() => {setIsOpen(false)
                  mixpanel.track(
                              "Global Menu - Contact Us Clicked",
                              { location: "Global Menu" }
                            );
              }}
              className="text-white text-xs font-nohemi font-[400] hover:text-[#CCD0D7] transition-colors text-shadow-sm py-2 px-4 hover:bg-[#1F1F1F]"
            >
              CONTACT US
            </Link>

            <div className="absolute bottom-0 right-0 w-full p-5 flex flex-row gap-4">
              <Link
                href="https://app.astrix.live"
                target="_blank"
                rel="noopener noreferrer"
                className="w-fit px-3 py-1 flex items-center justify-center rounded-3xl border border-[#4e4e4e87] bg-[#FFFFFF] shadow-[inset_0_2.39px_2.29px_rgba(0,0,0,0.25),0_2.29px_2.29px_rgba(0,0,0,0.25)] cursor-pointer hover:contrast-125 transition-all hover:-translate-y-0.5 text-[#0F0F0F] text-[10px] leading-none text-shadow-sm"
                onClick={() => {
                  mixpanel.track("Global Menu - Get Started Clicked", { location: "Global Menu" });
                 
                }}
              >
                <p className="leading-none">GET STARTED</p>
              </Link>
              <Link
                href="#contact"
                className="w-fit px-3 py-1 flex items-center font-nohemi font-[400] justify-center rounded-3xl border border-[#4e4e4e87] bg-[#3c3c3cbf] shadow-[inset_0_2.39px_2.29px_rgba(0,0,0,0.25),0_2.29px_2.29px_rgba(0,0,0,0.25)] cursor-pointer hover:opacity-90 transition-all hover:-translate-y-0.5 text-white text-[10px] leading-none text-shadow-sm"
                onClick={() => {setIsOpen(false)
                  mixpanel.track("Global Menu - Book A Demo Clicked", { location: "Global Menu" });
                }}
              >
                <p className="leading-none mt-0.5">BOOK A DEMO</p>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-[1050]" onClick={() => setIsOpen(false)} />
      )}
    </>
  );
}



"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import mixpanel from "@/lib/mixpanelClient";
import FooterSection from "../components/footerSection";
import Navbar from "../components/Navbar";
import FAQSection from "../components/FAQSection";

// Shared comparison table data - used by both web and mobile
const comparisonTableData = [
  {
    category: "Organiser Fees",
    rows: [
      { label: "Zero listing fees", free: true, smart: true, pro: true },
      { label: "Pre-Event Payout", free: false, smart: false, pro: true },
    ],
  },
  {
    category: "Ticketing Features",
    rows: [
      {
        label: "Private Ticket Listings",
        free: "1",
        smart: "1",
        pro: "Unlimited",
      },
      {
        label: "Ticket Types (RSVP, Paid, PWYW)",
        free: true,
        smart: true,
        pro: true,
      },
      {
        label: "Custom Registration Forms",
        free: "1",
        smart: "1",
        pro: "Unlimited",
      },
      {
        label: "Event Banner Promotion",
        free: false,
        smart: false,
        pro: true,
      },
    ],
  },
  {
    category: "Smart Profile",
    rows: [
      { label: "Zero-Listing Fees", free: true, smart: true, pro: true },
      { label: "Curated Gallery", free: true, smart: true, pro: true },
      { label: "Product / Collection links", free: true, smart: true, pro: true },
      { label: "Social Embeds", free: true, smart: true, pro: true },
      { label: "Custom Public URL", free: true, smart: true, pro: true },
      {
        label: "3rd Party Event Links",
        free: false,
        smart: true,
        pro: true,
      },
      // {
      //   label: "Subscribers Data Insights",
      //   free: false,
      //   smart: true,
      //   pro: true,
      // },
    ],
  },
  {
    category: "Marketing & Growth",
    rows: [
      {
        label: "Email",
        info: "Get 100 Credits in Free and 500 Credits in Pro to send the mentioned number of Emails or SMS.",
        free: "200",
        smart: "500",
        pro: "1000",
      },
      {
        label: "SMS",
        info: "Get 100 Credits in Free and 500 Credits in Pro to send the mentioned number of Emails or SMS.",
        free: "50",
        smart: "150",
        pro: "250",
      },
      { label: "Discount Codes", free: true, smart: true, pro: true },
      {
        label: "Promoter Links (Affiliate Mgmt.)",
        free: true,
        smart: true,
        pro: true,
      },
      {
        label: "Specific Campaign Insights",
        free: false,
        smart: false,
        pro: true,
      },
      {
        label: "Contacts Import",
        free: false,
        smart: false,
        pro: true,
      },
    ],
  },
  {
    category: "Attendees Data",
    rows: [
      { label: "Traffic by Source", free: true, smart: true, pro: true },
      {
        label: "Approve / Reject Attendees",
        free: true,
        smart: true,
        pro: true,
      },
      {
        label: "Demography Insights",
        free: true,
        smart: true,
        pro: true,
      },
      {
        label: "Sales Trend Analysis",
        free: false,
        smart: false,
        pro: true,
      },
      {
        label: "Conversion Rate Tracking",
        free: false,
        smart: false,
        pro: true,
      },
      {
        label: "Location Heat-Map",
        free: false,
        smart: false,
        pro: true,
      },
      {
        label: "Top Engaged Audience",
        free: false,
        smart: true,
        pro: true,
      },
      {
        label: "Contacts Tab",
        free: false,
        smart: true,
        pro: true,
      },
    ],
  },
  {
    category: "Ticketing Redemptions",
    rows: [
      { label: "QR scanner Web App", free: true, smart: true, pro: true },
      // {
      //   label: "Redemption insights",
      //   free: false,
      //   smart: false,
      //   pro: true,
      // },
    ],
  },
];

// Plan header data
const planHeaders = [
  {
    id: "free",
    name: "Free",
    price: "₹0",
    description: "Limited access to basic features.",
    ctaLabel: "GET STARTED",
    href: "https://app.astrix.live/login",
    external: true,
  },
  {
    id: "smart",
    name: "Smart Profile",
    price: "₹2499",
    description: "Only access to Smart Profile.",
    ctaLabel: "BOOK A DEMO",
    href: "https://app.astrix.live/login",
    external: true,
  },
  {
    id: "pro",
    name: "Pro",
    price: "Custom",
    description: "Full access to the entire toolkit.",
    ctaLabel: "BOOK A DEMO",
    href: "/",
    external: false,
  },
];

// Pricing data structure - easily customizable
const pricingData = {
  hero: {
    title: "Start Your Journey: 1-Month Free Trial",
    subtitle: "Spend nothing for first month",
    features: [
      "Access to all pro features",
      "Zero Listing Fees",
      "Unlimited Private Listings",
      "Market to Subscribers for Free",
      "Astrix Sub-domain",
    ],
    cta: {
      label: "BOOK A DEMO",
      href: "#contact",
    },
  },
  plans: [
    {
      id: "free",
      name: "Free",
      price: "₹0",
      period: "/month",
      cta: {
        label: "GET STARTED",
        href: "https://app.astrix.live/login",
        target: "_blank",
      },
      features: {
        "Organiser Fees": ["Zero Listing Fees"],
        "Ticketing Features": [
          "1 Private Ticket Listing",
          "Ticket Types (RSVP, Paid, PWYW)",
          "1 Custom Registration Form",
        ],
        "Ticketing Redemption": ["QR Scanner Web App"],
        "Marketing & Growth": [
          "300 Email Marketing",
          "150 SMS Marketing",
          "Discount Codes",
          "Promoter Links (Affiliate Mgmt)",
          "Overall Campaign Insights",
        ],
        "Attendees Data": [
          "Contacts Overview",
          "Approve / Reject Attendees",
          "Conversion Rate Tracking",
          "Sales Trend Analysis",
          "Demography Insights",
          "Traffic by Source",
        ],
        "Landing Page": [
          "Event Calendar",
          "Curated Gallery",
          "Product / Collection links",
          "Social Embeds",
          "Astrix Sub Domain",
        ],
      },
    },
    {
      id: "pro",
      name: "Pro",
      price: "₹2499",
      period: "/month",
      cta: {
        label: "BOOK A DEMO",
        href: "#contact",
      },
      features: {
        "Organiser Fees": ["Zero Listing Fees", "Pre-Event Payout"],
        "Ticketing Features": [
          "Unlimited Private Ticket Listing",
          "Ticket Types (RSVP, Paid, PWYW)",
          "Unlimited Custom Registration Form",
          "Event Banner Promotion",
        ],
        "Ticketing Redemption": ["QR Scanner Web App", "Redemption Insights"],
        "Marketing & Growth": [
          "1000 Email Marketing",
          "500 SMS Marketing",
          "Discount Codes",
          "Promoter Links (Affiliate Mgmt)",
          "Specific Campaign Insights",
          "Contacts Import",
          "Top Engaged Audience",
        ],
        "Attendees Data": [
          "Contacts Overview",
          "Approve / Reject Attendees",
          "Conversion Rate Tracking",
          "Sales Trend Analysis",
          "Demography Insights",
          "Traffic by Source",
          "Location Heat-map",
        ],
        "Landing Page": [
          "Event Calendar",
          "Curated Gallery",
          "Product / Collection links",
          "Social Embeds",
          "Astrix Sub Domain",
          "Subscribers Data Insights",
          "Third Party Events Links",
        ],
      },
    },
  ],
};


interface GlassButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

function GlassButton({ children, onClick, className = "" }: GlassButtonProps) {
  return (
    <div className="relative">
      {/* Glow effect */}
      <div className="absolute bg-[rgba(255,243,176,0.04)] blur-[35.3px] filter h-[177px] left-1/2 rounded-[20px] top-0 translate-x-[-50%] w-[393px]" />
      
      {/* Button */}
      <button
        onClick={onClick}
        className={`relative bg-[rgba(31,31,31,0.6)] box-border flex gap-[10px] h-[110px] md:h-[139px] items-center justify-center px-6 md:px-[60px] py-[14px] md:py-[21px] rounded-[16px] md:rounded-[20px] max-w-full ${className}`}
      >
        {/* Border overlay */}
        <div aria-hidden="true" className="absolute border-[2px] border-[rgba(49,55,63,0.4)] border-solid inset-0 pointer-events-none rounded-[16px] md:rounded-[20px] shadow-[8px_8px_4px_0px_rgba(0,0,0,0.25)]" />
        
        {/* Content */}
        <div className="font-['Switzer:Medium',sans-serif] leading-[1.2] not-italic relative shrink-0 text-[44px] md:text-[80px] text-nowrap text-white tracking-[-1.6px] whitespace-pre">
          {children}
        </div>
        
        {/* Inner shadow */}
        <div className="absolute inset-0 pointer-events-none rounded-[20px] shadow-[6px_6px_4px_0px_inset_rgba(0,0,0,0.25)]" />
      </button>
    </div>
  );
}

export default function PricingPage() {
  const router = useRouter();
  const [credits, setCredits] = useState(1000);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<"free" | "smart" | "pro">("free");
  const [activeInfoLabel, setActiveInfoLabel] = useState<string | null>(null);
  const sliderAreaRef = useRef<HTMLDivElement | null>(null);
  
  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Calculate price: 1 credit = ₹0.5
  const calculatePrice = (creditValue: number) => {
    return Math.round(creditValue * 0.5);
  };

  const price = calculatePrice(credits);
  
  // Touch handler for credit slider (improves drag on iOS)
  const handleSliderTouch = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!sliderAreaRef.current) return;
    const touch = e.touches[0];
    const rect = sliderAreaRef.current.getBoundingClientRect();
    if (rect.width === 0) return;
    const minCredits = 1000;
    const maxCredits = 10000;
    const creditRange = maxCredits - minCredits;
    let ratio = (touch.clientX - rect.left) / rect.width;
    ratio = Math.min(1, Math.max(0, ratio));
    const rawCredits = minCredits + ratio * creditRange;
    const snapped = Math.round(rawCredits / 100) * 100;
    setCredits(snapped);
  };
  
  // Handle contact navigation - navigate to home then scroll to contact section
  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log("[PricingPage] Contact navigation requested");
    
    // Navigate to home page first
    router.push("/");
    
    // Wait for navigation to complete, then dispatch custom event for home page to handle
    setTimeout(() => {
      console.log("[PricingPage] Dispatching scrollToSection event for contact");
      const event = new CustomEvent("scrollToSection", {
        detail: { targetId: "contact" }
      });
      window.dispatchEvent(event);
    }, 500);
  };
  
  // Generate bar heights for bell curve effect
  const generateBarHeights = (selectedIndex: number, totalBars: number) => {
    const bars = [];
    for (let i = 0; i < totalBars; i++) {
      const distance = Math.abs(i - selectedIndex);
      // Bell curve: taller bars near selected index, shorter bars further away
      // Reduced heights: max ~20px, min ~4px
      const height = Math.max(10, 20 - distance * 1.5);
      bars.push(height);
    }
    return bars;
  };
  
  return (
    <main className="min-h-screen bg-[#0F0F0F] text-white">
      <Navbar trackingContext="Pricing" />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 md:px-10 lg:px-16">
        <div className="w-fit mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-instrument-serif font-[400] text-[#F0E9B2] text-left mb-4">
            {pricingData.hero.title}
          </h1>
          <p className="text-[#E4E4E4] text-left text-lg md:text-md font-switzer font-[400] mb-12">
            {pricingData.hero.subtitle}
          </p>

          {/* Hero Features */}
          <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto mb-12">
            {pricingData.hero.features.map((feature, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <svg
                  className="w-4 h-4 text-[#E4E4E4] flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span className="text-[#E4E4E4] font-switzer font-[400] text-lg">
                  {feature}
                </span>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="flex justify-left">
          <Link
              href="/"
              onClick={(e) => {
                handleContactClick(e);
                mixpanel.track("Pricing Hero - Book a Demo Clicked", {
                  location: "Hero Section",
                });
              }}
              className="w-fit px-3 md:px-8 py-2 md:py-1 h-[30px] md:h-[35px] flex items-center justify-center rounded-3xl border border-[#4e4e4e87] bg-[#FFFFFF] shadow-[inset_0_2.39px_2.29px_rgba(0,0,0,0.25),0_2.29px_2.29px_rgba(0,0,0,0.25)] cursor-pointer hover:contrast-125 transition-all hover:-translate-y-0.5 text-[#0F0F0F] text-[10px] md:text-[10px] leading-none"
            >
              <p className="leading-none flex flex-row gap-2 items-center mt-0.5 text-xs md:text-xs font-nohemi font-[400] text-shadow-md">
                {pricingData.hero.cta.label}
                <svg
                  className="w-5 h-5 -mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M17 7l5 5-5 5" />
                </svg>
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing Plans Section */}
      <section className="py-16 px-6 md:px-10 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-2xl font-instrument-serif font-[400] text-center mb-3 text-gray-300 opacity-90">
            Pricing Plans
          </h2>
          <p className="text-md md:text-sm text-center text-[#BEC5D0] max-w-2xl mx-auto mb-2">
            Our team would be happy to answer all your queries. Please feel free to contact us.
          </p>

          {/* Desktop comparison table */}
          <div className="hidden md:block">
            <div className="bg-[#050505] border border-[#E8EAED]/40 overflow-hidden">
              {/* Plan headers */}
              <div className="grid grid-cols-4 border-b border-[#252525] bg-[#0E0E0E]">
                <div className="py-6 px-6"></div>
                {planHeaders.map((plan) => (
              <div
                key={plan.id}
                    className="py-6 px-6 border-l border-[#E8EAED]/40 flex flex-col gap-3"
              >
                    <div className="flex flex-col gap-1">
                      <p className="text-2xl font-switzer font-[500] text-[#F0E9B2] mb-2">
                    {plan.name}
                      </p>
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl lg:text-4xl font-switzer font-[400] text-white">
                      {plan.price}
                    </span>
                        {plan.id !== "pro" && (
                          <span className="text-xs text-[#9CA3AF] font-switzer font-[400]">
                            / month
                    </span>
                        )}
                  </div>
                      <p className="text-xs text-[#9CA3AF] font-switzer font-[400]">
                        {plan.description}
                      </p>
                  </div>

                  <div>
                  <Link
                    href={plan.href}
                    target={plan.external ? "_blank" : undefined}
                    rel={plan.external ? "noopener noreferrer" : undefined}
                    onClick={(e) => {
                          if (plan.id === "free" || plan.id === "smart") {
                        if (typeof window !== "undefined" && window.localStorage) {
                          window.localStorage.setItem("landingPageListEvent", "true");
                        }
                      }

                          // If CTA is "BOOK A DEMO", always redirect to contact section
                          if (plan.ctaLabel === "BOOK A DEMO") {
                        handleContactClick(e);
                      } else if (!plan.external) {
                        handleContactClick(e);
                      }
                      
                          mixpanel.track(`Pricing - ${plan.ctaLabel} Clicked`, {
                        plan: plan.id,
                            context: "table-header",
                      });
                    }}
                        className="inline-flex items-center justify-center rounded-3xl border border-[#4e4e4e87] bg-white px-8 py-1 text-[11px] font-nohemi font-[400] text-[#0F0F0F] shadow-[inset_0_2.39px_2.29px_rgba(0,0,0,0.25),0_2.29px_2.29px_rgba(0,0,0,0.25)] hover:contrast-125 hover:-translate-y-0.5 transition-all"
                  >
                        <span className="mt-1">{plan.ctaLabel}</span>
                        {plan.id !== "free" && (
                      <svg
                            className="ml-1.5 h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14M17 7l5 5-5 5" />
                    </svg>
                    )}
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              {/* Comparison rows */}
              {comparisonTableData.map((section) => (
                <div key={section.category}>
                  <div className="grid grid-cols-4 bg-[#0E0E0E] border-y border-[#E8EAED]/40">
                    <div className="px-6 py-3"></div>
                    <div className="px-6 py-3"></div>
                    <div className="px-6 py-3">
                      <div className="text-md font-switzer font-[500] text-center text-white">
                        {section.category}
                      </div>
                    </div>
                    <div className="px-6 py-3"></div>
                  </div>
                  {section.rows.map((row, rowIndex) => (
                    <div
                      key={row.label}
                      className={`grid grid-cols-4 text-sm ${
                        rowIndex % 2 === 0 ? "bg-[#1F1F1F]/60" : "bg-[#0E0E0E]"
                      }`}
                    >
                      <div className="px-6 py-3 text-[#E4E4E4] font-switzer font-[400] border-r border-[#E8EAED]/40">
                        <div className="flex items-center justify-between gap-2">
                          <span>{row.label}</span>
                          {("info" in row && row.info) && (
                            <div className="relative group cursor-default">
                              <span className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-[#E8EAED]/60 text-[9px] text-[#E8EAED]/80">
                                i
                              </span>
                              <div className="pointer-events-none absolute left-5 top-full z-20 mt-1 w-56 rounded-md bg-[#202020] px-4 py-2 text-xs text-[#E8EAED] opacity-0 group-hover:opacity-100 transition-opacity">
                                {row.info as string}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      {(["free", "smart", "pro"] as const).map((planId: string) => {
                        const value = (row as Record<string, boolean | string | undefined>)[planId];
                        return (
                          <div
                            key={planId}
                            className={`flex items-center justify-center ${planId !== "pro" && "border-r border-[#E8EAED]/40"}`}
                          >
                            {typeof value === "boolean" ? (
                              value ? (
                                <svg
                                  className="h-4 w-4 text-white"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                              ) : (
                                <span className="text-xs text-[#4B5563]">—</span>
                              )
                            ) : value ? (
                              <span className="text-xs text-[#E4E4E4] font-switzer font-[400]">
                                {value}
                              </span>
                            ) : (
                              <span className="text-xs text-[#4B5563]">—</span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Mobile pricing section with tabs and card */}
          <div className="md:hidden space-y-6">
            {/* Tabs */}
            <div className="">
            <div className="flex">
              {planHeaders.map((plan) => (
                <button
                  key={plan.id}
                  onClick={() => {
                    setSelectedPlan(plan.id as "free" | "smart" | "pro");
                    mixpanel.track("Pricing - Mobile Tab Clicked", {
                      plan: plan.id,
                    });
                  }}
                  className={`flex-1 py-3 border border-[#E8EAED]/40 text-center text-[#F0E9B2] text-sm font-switzer font-[500] transition-colors cursor-pointer ${
                    selectedPlan === plan.id
                      ? "bg-[#1A1A1A]"
                      : ""
                  }`}
                >
                  {plan.name}
                </button>
              ))}
            </div>

            {/* Selected Plan Card */}
            <div className="border border-[#E8EAED]/40">
            {(() => {
              const selectedPlanData = planHeaders.find((p) => p.id === selectedPlan);
              if (!selectedPlanData) return null;
              return (
                <div
                className="bg-[#1A1A1A] rounded-md p-6 my-7 max-w-[350px] mx-auto border border-[#E8EAED]/40">
                  <div className="flex flex-col gap-2">
                    <div>
                      <h3 className="text-sm font-switzer font-[500] text-[#F0E9B2] mb-2">
                        {selectedPlanData.name}
                      </h3>
                      <div className="flex items-baseline gap-2 mb-2">
                        <span className="text-3xl font-switzer font-[400] text-white">
                          {selectedPlanData.price}
                        </span>
                        {selectedPlan === "smart" && (
                          <span className="text-sm text-[#9CA3AF] font-switzer font-[400]">
                            / month
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-[#9CA3AF] font-switzer font-[400]">
                        {selectedPlanData.description}
                      </p>
                    </div>
                    <Link
                      href={selectedPlanData.href}
                      target={selectedPlanData.external ? "_blank" : undefined}
                      rel={selectedPlanData.external ? "noopener noreferrer" : undefined}
                      onClick={(e) => {
                        if (selectedPlan === "free" || selectedPlan === "smart") {
                          if (typeof window !== "undefined" && window.localStorage) {
                            window.localStorage.setItem("landingPageListEvent", "true");
                          }
                        }
                        // If CTA is "BOOK A DEMO", always redirect to contact section
                        if (selectedPlanData.ctaLabel === "BOOK A DEMO") {
                          handleContactClick(e);
                        } else if (!selectedPlanData.external) {
                          handleContactClick(e);
                        }
                        mixpanel.track(`Pricing - Mobile ${selectedPlanData.ctaLabel} Clicked`, {
                          plan: selectedPlan,
                        });
                      }}
                      className="w-full inline-flex items-center justify-center rounded-3xl border border-[#4e4e4e87] bg-white px-6 py-2 text-xs font-nohemi font-[400] text-[#0F0F0F] shadow-[inset_0_2.39px_2.29px_rgba(0,0,0,0.25),0_2.29px_2.29px_rgba(0,0,0,0.25)] hover:contrast-125 hover:-translate-y-0.5 transition-all"
                    >
                      <span className="mt-0.5">{selectedPlanData.ctaLabel}</span>
                      {selectedPlan !== "free" && (
                        <svg
                          className="ml-2 h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M5 12h14M17 7l5 5-5 5" />
                        </svg>
                      )}
                  </Link>
                </div>
                </div>
              );
            })()}
            </div>
            </div>

            {/* Comparison Table */}
            <div
              className="bg-[#050505] overflow-hidden"
              onClick={() => setActiveInfoLabel(null)}
            >
              {comparisonTableData.map((section) => (
                <div key={section.category}>
                  {/* Category Header - Left aligned, full width */}
                  <div className="bg-[#0E0E0E]">
                    <div className="py-3">
                      <div className="text-sm font-switzer font-[500] text-left text-white whitespace-nowrap">
                        {section.category}
                      </div>
                    </div>
                  </div>
                  
                  {/* Table Rows with Excel-like borders */}
                  {section.rows.map((row, rowIndex) => (
                    <div
                      key={row.label}
                      className={`grid grid-cols-5 ${
                        rowIndex % 2 === 0 ? "bg-[#1F1F1F]/60" : "bg-[#0E0E0E]"
                      }`}
                    >
                      {/* First column - Feature name (small text) */}
                      <div className="px-3 py-2.5 border col-span-2 border-[#E8EAED]/40 border-r-0">
                        <div className="flex items-center justify-between">
                          <div className="text-xs text-[#E4E4E4] font-switzer font-[400] leading-tight">
                            {row.label}
                          </div>
                          {("info" in row && row.info) && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveInfoLabel(
                                  activeInfoLabel === row.label ? null : row.label
                                );
                              }}
                              className="relative flex items-center justify-center h-3.5 w-3.5 rounded-full border border-[#E8EAED]/60 text-[8px] text-[#E8EAED]/80 bg-transparent"
                            >
                              i
                              {activeInfoLabel === row.label && (
                                <div className="absolute left-0 top-full z-20 mt-1 w-48 rounded-md bg-[#202020] px-4 py-2 text-xs text-[#E8EAED] shadow-lg">
                                  {row.info as string}
                                </div>
                              )}
                            </button>
                          )}
                        </div>
                      </div>
                      
                      {/* Plan columns */}
                      {(["free", "smart", "pro"] as const).map((planId, colIndex) => {
                        const value = (row as Record<string, boolean | string | undefined>)[planId];
                        const isLastColumn = colIndex === 2;
                        return (
                          <div
                            key={planId}
                            className={`flex items-center justify-center px-2 py-2.5 border border-[#E8EAED]/40 ${
                              !isLastColumn ? "border-r-0" : ""
                            }`}
                          >
                            {typeof value === "boolean" ? (
                              value ? (
                                <svg
                                  className="h-3.5 w-3.5 text-white"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                              ) : (
                                <span className="text-[10px] text-[#FFFFFF]">—</span>
                              )
                            ) : value ? (
                              <span className="text-[10px] text-[#E4E4E4] font-switzer font-[400] text-center">
                                {value}
                              </span>
                            ) : (
                              <span className="text-[10px] text-[#4B5563]">—</span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Credit Plans Section */}
      <section className="py-16 px-6 md:px-10 lg:px-16">
        <div className="max-w-5xl mx-auto space-y-8">
          <h2 className="text-sm md:text-2xl font-instrument-serif font-[400] text-center mb-12 text-gray-300 opacity-90">
            Credit Plans
          </h2>
          {/* Marketing Credits Section */}
          <div className="bg-[#1A1A1A] rounded-2xl p-8 md:p-12 border border-[#2A2A2A]">
            <div className="flex flex-col items-center gap-2">
              <h2 className="text-3xl md:text-3xl font-switzer font-[500] text-[#F0E9B2] text-center">
                Marketing Credits
              </h2>
              <p className="text-[#E4E4E4] text-center text-sm md:text-sm font-switzer font-[300] mb-8">
                Start with flat rate that includes 1000 credits
              </p>
            </div>

            {/* Price Display */}
            <div className="flex justify-center mb-8">
              <GlassButton>
                ₹{price.toLocaleString()}
              </GlassButton>
            </div>

            {/* Usage Description */}
            <div className="text-center mb-8 space-y-2">
              <p className="text-[#E4E4E4] text-sm md:text-sm font-switzer font-[300]">
                Pricing scales are you usage do. No surprises, just usage
              </p>
              <p className="text-gray-300 text-sm md:text-sm font-switzer font-[300]">
                Use the slider to preview your monthly cost.
              </p>
            </div>

            {/* Credit Slider - Bar Chart Style */}
            <div className="w-full max-w-4xl mx-auto mb-8 mt-10 px-2 md:px-0">
              {/* Wrapper allows horizontal dragging on touch devices */}
              <div
                ref={sliderAreaRef}
                className="relative"
                onTouchStart={handleSliderTouch}
                onTouchMove={handleSliderTouch}
              >
                {/* Calculate selected bar index */}
                {(() => {
                  const totalBars = isMobile ? 60 : 100; // 60 bars on mobile, 100 on desktop
                  const minCredits = 1000;
                  const maxCredits = 10000;
                  const creditRange = maxCredits - minCredits;
                  const selectedIndex = Math.round(
                    ((credits - minCredits) / creditRange) * (totalBars - 1)
                  );
                  const barHeights = generateBarHeights(selectedIndex, totalBars);
                  
                  // Calculate tooltip position (percentage from left)
                  const tooltipPosition = (selectedIndex / (totalBars - 1)) * 100;
                  // Show tooltip only when not at min or max credits
                  const showTooltip = credits > minCredits && credits < maxCredits;
                  
                  return (
                    <>
                      {/* Credit Value Tooltip */}
                      {showTooltip && (
                        <div 
                          className="absolute -top-8 md:-top-6 left-0 transform -translate-x-1/2 transition-all duration-200 pointer-events-none z-20"
                          style={{
                            left: `${tooltipPosition}%`,
                            maxWidth: 'calc(100% - 1rem)',
                          }}
                        >
                            <p className="text-[#E4E4E4] text-xs md:text-sm lg:text-md font-switzer font-[600] whitespace-nowrap">
                              {credits.toLocaleString()} credits
                            </p>
                          {/* Tooltip arrow */}
                          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-[#1A1A1A]"></div>
                        </div>
                      )}
                      
                      {/* Vertical Bars */}
                      <div className="flex items-end justify-between gap-[1px] md:gap-0.5 lg:gap-1 h-6 md:h-8 mb-4 relative overflow-hidden">
                        {barHeights.map((height, index) => {
                          const isHighlighted = Math.abs(index - selectedIndex) <= 4; // Highlight bars within 6 positions
                          return (
                            <div
                              key={index}
                              className={`transition-all duration-200 ${
                                isHighlighted
                                  ? "bg-[#F0E9B2]"
                                  : "bg-[#E4E4E4] opacity-40"
                              }`}
                              style={{
                                height: `${height}px`,
                                width: "2px",
                                minWidth: "2px",
                              }}
                            />
                          );
                        })}
                      </div>
                      
                      {/* Dots Below Bars - Limited dots with spacing */}
                      {(() => {
                        const totalDots = 10; // Limited number of dots
                        const minCredits = 1000;
                        const maxCredits = 10000;
                        const creditRange = maxCredits - minCredits;
                        // Calculate which dot should be highlighted based on current credits
                        const selectedDotIndex = Math.round(
                          ((credits - minCredits) / creditRange) * (totalDots - 1)
                        );
                        
                        return (
                          <div className="flex items-center justify-between mb-4 w-full px-0">
                            {Array.from({ length: totalDots }).map((_, index) => {
                              const isSelected = index === selectedDotIndex;
                              return (
                                <div
                                  key={index}
                                  className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full transition-all duration-200 ${
                                    isSelected
                                      ? "bg-[#F0E9B2]"
                                      : "bg-[#E4E4E4] opacity-40"
                                  }`}
                                />
                              );
                            })}
                          </div>
                        );
                      })()}
                      
                      {/* Slider Input (overlaid, handles drag on all devices including iOS) */}
                      <input
                        type="range"
                        min="1000"
                        max="10000"
                        step="100"
                        value={credits}
                        onChange={(e) => setCredits(Number(e.target.value))}
                        onInput={(e) => {
                          // iOS Safari requires onInput for smooth dragging
                          const target = e.target as HTMLInputElement;
                          setCredits(Number(target.value));
                        }}
                        className="absolute inset-0 w-full h-12 opacity-0 cursor-pointer z-10"
                        style={{
                          WebkitTapHighlightColor: 'transparent',
                        }}
                      />
                      
                      {/* Slider Labels */}
                      <div className="flex justify-between mt-2 px-1">
                        <span className="text-[#E4E4E4] text-xs md:text-sm font-switzer font-[400]">
                          1000 credits
                        </span>
                        <span className="text-[#E4E4E4] text-xs md:text-sm font-switzer font-[400]">
                          10k credits
                        </span>
                      </div>
                    </>
                  );
                })()}
              </div>
            </div>

            {/* Credit Conversion Rates */}
            <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8 opacity-60">
              <div className="flex items-center gap-2">
                <span className="text-gray-300 text-sm md:text-base font-switzer font-[400]">
                  1 Email =
                </span>
                <span className="text-gray-300 text-sm md:text-sm font-switzer font-[600] bg-[#1F1F1F] px-3 py-1 rounded">
                  1 Credit
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-300 text-sm md:text-base font-switzer font-[400]">
                  1 SMS =
                </span>
                <span className="text-gray-300 text-sm md:text-sm font-switzer font-[600] bg-[#1F1F1F] px-3 py-1 rounded">
                  2 Credit
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Custom Plan Section */}
      <section className="py-16 px-6 md:px-10 lg:px-16">
        <div className="max-w-5xl mx-auto space-y-8">
          <h2 className="text-sm md:text-2xl font-instrument-serif font-[400] text-center mb-12 text-gray-300 opacity-90">
          Want your own branded platform?
          </h2>
          <div className="bg-[#1A1A1A] rounded-2xl p-8 md:p-12 border border-[#2A2A2A]">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-start gap-6">
              <div className="flex-1">
                <h2 className="text-3xl md:text-4xl font-switzer font-[400] text-[#F0E9B2] mb-2">
                  Custom Plan
                </h2>
                <p className="text-[#E4E4E4] text-sm md:text-lg font-switzer font-[400]">
                 Get in touch for whitelabel services, custom solutions made just for you.
                </p>
              </div>
              <Link
                href="/"
                className="w-fit px-6 md:px-8 py-3 md:py-2 h-[35px] md:h-[40px] flex items-center justify-center rounded-3xl border border-[#4e4e4e87] bg-[#E5E5E5] shadow-[inset_0_2.39px_2.29px_rgba(0,0,0,0.25),0_2.29px_2.29px_rgba(0,0,0,0.25)] cursor-pointer hover:contrast-125 transition-all hover:-translate-y-0.5 text-[#0F0F0F] leading-none"
                onClick={(e) => {
                  handleContactClick(e);
                  mixpanel.track("Pricing - Custom Plan Contact Us Clicked", {
                    location: "Credit Plans Section",
                  });
                }}
              >
                <p className="leading-none flex flex-row gap-2 items-center mt-0.5 text-xs md:text-sm font-nohemi font-[400] text-shadow-md">
                  CONTACT US
                  <svg
                    className="w-5 h-5 -mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={1.8}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14M17 7l5 5-5 5" />
                  </svg>
                </p>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection />

      {/* Footer */}
      <FooterSection />
    </main>
  );
}




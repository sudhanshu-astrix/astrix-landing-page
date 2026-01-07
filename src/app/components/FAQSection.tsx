"use client";
import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQCategory {
  title: string;
  items: FAQItem[];
}

interface FAQSectionProps {
  className?: string;
}

const faqData: FAQCategory[] = [
  {
    title: "Getting Started & Account Management",
    items: [
      {
        question: "How do I create an Astrix account?",
        answer:
          "You can sign up for an account directly on our website. Once you've registered with your email, you will be guided through a one-time verification process to activate your account.",
      },
      {
        question: "What is the account verification process?",
        answer:
          "To ensure a secure platform for all users and to comply with financial regulations, we require all curators to complete a verification process. This involves providing:\n\nBasic Details: Your full name or registered organization name, PAN (Permanent Account Number), and registered address.\n\nBank Details: Your beneficiary name, account number, IFSC code, and bank branch. You will also need to upload a digital copy of a cancelled cheque or a recent bank statement for account verification.",
      },
      {
        question: "Why do you need my PAN and bank details?",
        answer:
          "We require your PAN for tax compliance purposes (TDS) and your bank details to process payouts for your ticket sales. This information is stored securely and is only used for verification and payment processing.",
      },
      {
        question: "What if I am not registered for GST?",
        answer:
          "That's not a problem. During the verification process, you can select \"No\" when asked about GST registration. You will then be prompted to accept a \"GST Undertaking,\" which is a declaration that you are operating below the GST threshold.",
      },
    ],
  },
  {
    title: "Creating an Event",
    items: [
      {
        question: "How do I list a new event?",
        answer:
          "Once your account is verified, you can click the \"Create +\" button on your main dashboard. You'll be guided through the event setup process, which includes choosing an event mode, adding details, and issuing tickets.",
      },
      {
        question:
          'What is the difference between "Standard," "Multi-Day," and "Tour" event modes?',
        answer:
          "Standard Event: Best for a single event that happens on one day (e.g., a concert, workshop, or party).\n\nMulti-Day Event: Use this for events that span multiple consecutive days, like a festival, conference, or weekend-long exhibition.\n\nTour: This mode allows you to group multiple events in different locations under a single tour name, making it easy for fans to see all your upcoming dates.",
      },
      {
        question: "What types of tickets can I create?",
        answer:
          "You have complete flexibility:\n\nPaid Tickets: Create multiple tiers (e.g., Early Bird, General Admission, VIP) with different prices and features.\n\nPay What You Want: Set a suggested price and allow attendees to adjust the amount they wish to contribute, giving them the flexibility to pay more or less.\n\nRSVP Tickets: Offer free entry for guests, but still collect their information and manage capacity.\n\nSet Capacity: Define the total number of tickets available for each tier to prevent overselling.\n\nLimit Purchases: Restrict the number of tickets one person can buy to discourage scalping.",
      },
      {
        question:
          "Can I collect specific information from attendees when they buy a ticket?",
        answer:
          "Yes. You can add a custom survey to the checkout process. This is perfect for collecting information like T-shirt sizes for merchandise, food preferences, or answers to specific questions relevant to your event.",
      },
      {
        question: "Does Astrix support virtual or online events?",
        answer:
          "Absolutely. When creating your event, you can select \"Virtual\" as the location. This allows you to host webinars, live streams, or online workshops and deliver the access link (e.g., Zoom, YouTube Live) to ticket holders automatically.",
      },
    ],
  },
  {
    title: "Marketing & Promoting Your Event",
    items: [
      {
        question: "What tools does Astrix offer for marketing?",
        answer:
          "Astrix has an integrated marketing suite that allows you to run Email Campaigns and SMS Campaigns directly to the contacts you've collected from past events.",
      },
      {
        question: "How do I send an email or SMS to my past attendees?",
        answer:
          "From the \"Marketing\" section in your dashboard, you can create a new campaign. You'll be able to select an audience (e.g., \"Attendees from your Past Event\"), design your message, and schedule it to be sent.",
      },
      {
        question:
          'What\'s the difference between a "Promoter Code" and a "Discount Code"?',
        answer:
          "Discount Code: This is a code that attendees can enter at checkout to receive a discount (e.g., \"SAVE10\" for 10% off). You create these to drive sales.\n\nPromoter Code/Link: This functions like an affiliate marketing link. You provide a unique link or code to your promotional partners (influencers, artists, affiliates, etc.). Its primary purpose is to track every ticket sale that comes from that specific source. This allows you to accurately measure each partner's performance and manage any commissions or rewards, just like an affiliate program. It may or may not include a discount for the buyer; its main job is tracking.",
      },
      {
        question: "Can I import an existing list of contacts to market to?",
        answer:
          "Yes, you can import your existing email and contact lists into the Astrix marketing tool, allowing you to centralize all your community communication on one platform.",
      },
      {
        question: "How do I track how well my campaigns are doing?",
        answer:
          "The marketing dashboard provides real-time analytics for every campaign. You can track metrics like Reach, Open Rate, Click-Through Rate (CTR), and, most importantly, how many ticket sales were generated as a direct result of the campaign.",
      },
      {
        question:
          "I am an influencer/affiliate. How do I get a Promoter Link for an event?",
        answer:
          "Promoter links are managed directly by the event curator. Please reach out to the event organizer, and they can generate a unique promoter link for you from their Astrix dashboard.",
      },
    ],
  },
  {
    title: "Analytics & Understanding Your Audience",
    items: [
      {
        question: "What information can I see on my main dashboard?",
        answer:
          "The dashboard is your command center for real-time event intelligence. Key widgets include:\n\nFinancials: Total Revenue and Total Ticket Sales.\n\nTraffic Sources: See which websites, social media platforms, or direct links are sending the most visitors to your event page.\n\nGeographic Data: A heat map shows you the cities and regions where your attendees are located.\n\nAudience Demographics: Charts that break down your audience by metrics like gender and age.\n\nConversion Funnel: Track how many page visits convert into actual ticket purchases.",
      },
      {
        question: "Can I export my attendee data?",
        answer:
          "Yes. You own your data. You can export your full attendee list any custom survey responses, as a CSV file at any time.",
      },
      {
        question:
          "What is the \"Fan Portal\" and how does it help with community building?",
        answer:
          "The Fan Portal is a customizable public page that acts as a permanent home for your community. Unlike a temporary event page, your portal can host your event calendar, photo galleries, links to your social media or music, and other content. It gives your fans a single place to stay connected with you long after an event has ended.",
      },
    ],
  },
  {
    title: "Payouts & Financials",
    items: [
      {
        question: "How do I get paid for my ticket sales?",
        answer:
          "After your event is over, you will receive an email with the payout details. You will need to submit a compliant invoice based on your final sales report Invoice to finance@astrix.live and our finance team will process the same within 5-7 business days.",
      },
      {
        question: "How long does it take to receive my money?",
        answer:
          "Once you have generated and submitted your invoice to finance@astrix.live, the funds will be transferred to your verified bank account within 5-7 business days.",
      },
      {
        question: "How are taxes handled?",
        answer:
          "Astrix automatically handles the necessary tax compliance based on the information you provided during verification. If you are not GST registered, we manage the tax process accordingly. The invoice you submit should be fully compliant for your accounting records.",
      },
    ],
  },
  {
    title: "Troubleshooting & Event Management",
    items: [
      {
        question: "Can I edit event details after it's published?",
        answer:
          "Yes, most details like the event description, images, and adding new ticket tiers can be edited at any time. For any other changes, you may contact support.",
      },
      {
        question: "What happens if my payout is delayed?",
        answer:
          "Payout delays are uncommon but can occur if the bank details on file are incorrect. If your payout has not arrived within the 5-7 business day window, please first verify your bank information. If the details are correct, contact our support team with your event and payout details, and we will investigate immediately.",
      },
      {
        question:
          "What are some best practices for setting up ticket tiers?",
        answer:
          "A strategic tiering system can create urgency and increase revenue. We recommend:\n\nEarly Bird / Pre-Sale: A limited quantity of tickets at a discounted price to reward your most loyal fans and kickstart sales.\n\nPhased General Admission: Release tickets in phases (Phase 1, Phase 2, etc.) with slight price increases to encourage early purchases.\n\nVIP or Bundled Packages: Offer a premium experience by bundling a ticket with merchandise, a meet-and-greet, or other exclusive perks at a higher price point.",
      },
      {
        question: "How can I use the survey feature strategically?",
        answer:
          "The survey feature is a powerful tool. Use it to gather valuable data that informs your future decisions. Ask questions like: \"What artist would you love to see us bring to town next?\" to guide your curation.",
      },
    ],
  },
  {
    title: "Trust, Safety & Security",
    items: [
      {
        question: "How is my personal and financial data protected?",
        answer:
          "Data security is a top priority at Astrix. All sensitive information, including your personal and banking details, is encrypted both in transit (when you send it to us) and at rest (when it's stored in our databases). We follow industry-best practices to ensure your information is always secure.",
      },
      {
        question: "Is the payment gateway secure for my customers?",
        answer:
          "Absolutely. All transactions on Astrix are processed through a PCI-DSS Level 1 compliant payment gateway. This is the highest level of security certification available in the payments industry, ensuring that your fans' card information is handled safely and securely.",
      },
      {
        question:
          "Where can I find your official Privacy Policy and Terms of Service?",
        answer:
          "You can find links to our complete Privacy Policy and Terms of Service in the footer of the Astrix website. These documents provide comprehensive details on how we handle user data, your rights as a user, and the legal terms of using our platform.",
      },
    ],
  },
  {
    title: "Finding & Accessing Your Tickets",
    items: [
      {
        question: "How do I know where my ticket is?",
        answer:
          "Every purchased ticket lives in your SmartPass section. You'll also receive a copy via email right after checkout.",
      },
      {
        question: "I'm not able to find my QR code.",
        answer:
          "No worries!\n\nGo to your Astrix app → SmartPass → Select the event.\nYour QR code will show up on the ticket screen.\nIf it still doesn't appear, check your confirmation email - it includes a QR.\nIf both are missing, reach out to us at support@astrix.live.",
      },
      {
        question: "Do I need to show the email when I arrive at the event?",
        answer:
          "Your Astrix QR Code is enough for entry, just open the app and show it at the gate. If your phone battery is low or you prefer backup, the email version works too. Either one will scan instantly.",
      },
      {
        question: "What if I don't receive my ticket?",
        answer:
          "Tickets are delivered instantly. If you don't see it, just refresh or check your registered email/SMS for a link. Still missing? Reach out to us at support@astrix.live",
      },
    ],
  },
  {
    title: "Discovering Events",
    items: [
      {
        question: "How do I find events happening near me?",
        answer:
          "Your home feed shows curated experiences based on your interests and location. You can also explore by categories – Music, Culture, Workshops, Parties, or Communities.",
      },
      {
        question: "Will Astrix recommend events for me?",
        answer:
          "Yes. The more you attend and interact, the smarter your recommendations get. We'll never spam, only surface things genuinely relevant to your interests.",
      },
      {
        question: "Can I see all the events I've attended?",
        answer:
          "Yes. Go to your SmartPass section and access the Past Event. You'll see every event, ticket, and badge you've collected.",
      },
    ],
  },
  {
    title: "Purchasing Tickets",
    items: [
      {
        question: "How do I buy a ticket?",
        answer:
          "Tap on any event → choose a ticket type → pay securely via UPI, card, or wallet.\nOnce paid, your ticket appears instantly in your SmartPass section with a QR code.",
      },
    ],
  },
  {
    title: "Event Entry & Age Restrictions",
    items: [
      {
        question: "I am under 18 years of age, would I be allowed at the event?",
        answer:
          "It depends on the event's age policy. Each listing clearly states if it's 18+, 21+, or All Ages. Please bring a valid photo ID, entry rules are enforced by the venue, not Astrix. If unsure, check the event description or contact the organiser directly.",
      },
    ],
  },
  {
    title: "Platform Access",
    items: [
      {
        question: "I can't find the app on the App Store/Play Store, what do I do?",
        answer:
          "Astrix is currently available as a web app and a website at astrix.live.",
      },
    ],
  },
  {
    title: "Refunds & Payment Issues",
    items: [
      {
        question: "Can I get a refund if I can't attend?",
        answer:
          "Whether a refund is possible depends entirely on the policy set by the event organizer, as Astrix does not control their individual refund rules.",
      },
      {
        question: "My payment failed, but the money was deducted. What should I do?",
        answer:
          "In the rare case of a payment failure where money is deducted, the amount is almost always reversed automatically by your bank or payment gateway within 5-10 business days. If you do not receive a ticket or a refund after 24 hours, please contact us at support@astrix.live with your transaction details.",
      },
    ],
  },
];

export default function FAQSection({ className }: FAQSectionProps) {
  const [expandedCategories, setExpandedCategories] = useState<Set<number>>(
    new Set()
  ); // All categories closed by default
  const [expandedQuestions, setExpandedQuestions] = useState<Set<string>>(
    new Set()
  ); // All questions closed by default

  const toggleCategory = (index: number) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedCategories(newExpanded);
  };

  const toggleQuestion = (categoryIndex: number, questionIndex: number) => {
    const key = `${categoryIndex}-${questionIndex}`;
    const newExpanded = new Set(expandedQuestions);
    if (newExpanded.has(key)) {
      newExpanded.delete(key);
    } else {
      newExpanded.add(key);
    }
    setExpandedQuestions(newExpanded);
  };

  return (
    <section
      className={`pt-20 pb-16 px-6 md:px-10 lg:px-16 bg-[#0F0F0F] ${className || ""}`}
    >
      <div className="max-w-4xl mx-auto">
        {/* FAQ Title */}
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-instrument-serif font-[400] text-[#F0E9B2] text-center mb-12">
          FAQ
        </h2>

        {/* FAQ Categories */}
        <div className="space-y-6">
          {faqData.map((category, categoryIndex) => {
            const isCategoryExpanded = expandedCategories.has(categoryIndex);

            return (
              <div key={categoryIndex} className="space-y-4">
                {/* Category Title */}
                <button
                  onClick={() => toggleCategory(categoryIndex)}
                  className="w-full flex items-center justify-between text-left group"
                >
                  <h3 className="text-xl md:text-xl font-switzer font-[300] md:font-[500] text-[#F0E9B2] group-hover:text-[#FFF3B0] transition-colors duration-200">
                    {category.title}
                  </h3>
                  <svg
                    className={`w-5 h-5 text-[#F0E9B2] transition-transform duration-300 ease-in-out ${
                      isCategoryExpanded ? "rotate-180" : "rotate-0"
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

                {/* Questions */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isCategoryExpanded
                      ? "max-h-[5000px] opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  {isCategoryExpanded && (
                    <div className="space-y-3 pt-2">
                    {category.items.map((item, questionIndex) => {
                      const questionKey = `${categoryIndex}-${questionIndex}`;
                      const isQuestionExpanded =
                        expandedQuestions.has(questionKey);

                      return (
                        <div key={questionIndex} className="space-y-2">
                          {/* Question */}
                          <button
                            onClick={() =>
                              toggleQuestion(categoryIndex, questionIndex)
                            }
                            className="w-full flex items-center justify-between text-left group"
                          >
                            <span className="text-[#E4E4E4] text-base md:text-lg font-switzer font-[400] group-hover:text-white transition-colors duration-200">
                              {item.question}
                            </span>
                            <svg
                              className={`w-4 h-4 text-[#E4E4E4] flex-shrink-0 ml-4 transition-transform duration-300 ease-in-out ${
                                isQuestionExpanded ? "rotate-45" : "rotate-0"
                              }`}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 4v16m8-8H4"
                              />
                            </svg>
                          </button>

                          {/* Answer */}
                          <div
                            className={`overflow-hidden transition-all duration-300 ease-in-out ${
                              isQuestionExpanded
                                ? "max-h-[2000px] opacity-100"
                                : "max-h-0 opacity-0"
                            }`}
                          >
                            <div className="pb-4">
                              <p className="text-gray-200 text-sm md:text-base font-switzer font-[300] leading-relaxed whitespace-pre-line">
                                {item.answer}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


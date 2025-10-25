'use client'
import React from "react";

const RefundPage: React.FC = () => {
  return (
    <div className={`flex flex-col min-h-[100vh] gap-5 p-4 mobile:px-8 bg-[#0E0F0C] text-[#E8EAED]`}>
      <header className="text-center">
        <h1 className="text-3xl font-bold">Refund Policy</h1>
        <p>Last Updated: October 15, 2025</p>
      </header>
      <section className="flex flex-col gap-3">
        <h2 className="font-semibold">1. Introduction</h2>
        <p>
          At Astrix, we strive to offer a smooth and fair purchasing experience so you can enjoy live events without complications. This Refund Policy (“Policy”) applies to all purchases made on our website and mobile app(s) on or after January 1, 2023, including primary ticket sales and transfers.
        </p>
        <p>
          “Astrix,” “we,” “us,” or “our” refers to Tikitin Solutions Private Limited. Our website includes domains such as <a href="https://www.astrix.live" className="text-blue-400 underline" target="_blank" rel="noopener noreferrer">www.astrix.live</a> (the “Site”). This Policy supplements our Terms of Use and Privacy Policy. Please review all policies before purchasing.
        </p>
        <p>
          Questions? Contact <a href="mailto:hello@astrix.live" className="text-blue-400 underline">hello@astrix.live</a>.
        </p>
        <p>
          <b>Offer/Raffle Note:</b> Participation in offers and raffles does not guarantee receipt of any item or benefit. All such programs are subject to availability and eligibility criteria, and may be modified or cancelled without notice. Astrix is not liable if participants do not receive stated benefits.
        </p>

        <h2 className="font-semibold">2. Definitions</h2>
        <ul className="list-disc list-inside">
          <li><b>Astrix:</b> Tikitin Solutions Private Limited, registered office at [COMPANY ADDRESS].</li>
          <li><b>Event:</b> Any performance, show, concert, sports event, or other activity for which tickets are sold via the Platform.</li>
          <li><b>Event Partner:</b> The organizer/producer (artists, venues, teams, fan clubs, promoters, leagues, etc.).</li>
          <li><b>Platform:</b> The Astrix application, website, and related services.</li>
          <li><b>Services:</b> Ticket sales, event listings, and related features provided by Astrix.</li>
          <li><b>User/You:</b> Any individual who accesses or uses our Platform or Services.</li>
          <li><b>Booking Ticket Mail:</b> The confirmation email sent after successful purchase.</li>
          <li><b>Convenience Fee:</b> Fee charged by Astrix for using the Platform to purchase tickets.</li>
          <li><b>Service Fee:</b> Fee charged for processing the transaction.</li>
        </ul>

        <h2 className="font-semibold">3. Currency</h2>
        <p>
          All prices are stated and charged in Indian Rupees (INR). If purchasing from outside India, your bank/card provider may apply exchange rates and fees.
        </p>

        <h2 className="font-semibold">4. Payment Methods</h2>
        <p>
          We support multiple payment options (availability may vary by event or provider):
        </p>
        <ul className="list-disc list-inside">
          <li>Digital wallets (e.g., Paytm, PhonePe, MobiKwik)</li>
          <li>VISA/Mastercard/RuPay debit/credit cards</li>
          <li>UPI / QR</li>
          <li>Net Banking</li>
          <li>Pay Later options</li>
        </ul>
        <p>
          For payment-option queries for a specific event, email <a href="mailto:hello@astrix.live" className="text-blue-400 underline">hello@astrix.live</a>.
        </p>
        
        <h2 className="font-semibold">5. Who You Are Buying From</h2>
        <p>
          Astrix generally sells tickets as agent/intermediary for Event Partners; sometimes we may sell a specified allocation as principal (this is indicated at checkout). All transactions—India or international—are processed by Tikitin Solutions Private Limited on behalf of the relevant Event Partner.
        </p>
        <p>
          <b>Unauthorized Channels:</b> Purchases from third-party resellers/scalpers are at your own risk. We cannot verify authenticity and no refunds/replacements are offered for such tickets. Buy only via the official Site or authorized partners.
        </p>

        <h2 className="font-semibold">6. Pricing and Availability</h2>
        <p>
          Event Partners set ticket face values and seating. All channels access the same inventory; popular events may sell out quickly. Additional tickets may be released at the Event Partner’s discretion; availability is not guaranteed.
        </p>
        
        <h2 className="font-semibold">7. Order Confirmation and Processing</h2>
        <p>
          After payment, you’ll receive an on-screen confirmation and/or Booking Ticket Mail. If you don’t receive confirmation, or if you experienced an error, check your account and contact support promptly. We are not responsible for losses arising from assumptions that an order failed without verification. Please review confirmations carefully.
        </p>

        <h2 className="font-semibold">8. Service Fees, Convenience Fees, and Taxes</h2>
        <h3 className="font-semibold">8.1 Fee Structure</h3>
        <ul className="list-disc list-inside">
          <li><b>Convenience Fee:</b> For using our Platform (varies by event/price/other factors).</li>
          <li><b>Service Fee:</b> Covers transaction processing (including payment gateway charges).</li>
          <li><b>Delivery Fee:</b> Where applicable (e.g., physical delivery).</li>
        </ul>
        <p>
          All fees are shown before checkout completion.
        </p>
        <h3 className="font-semibold">8.2 Refundability of Fees</h3>
        <ul className="list-disc list-inside">
          <li>
            <b>Event Cancellation:</b> Ticket face value refunded; Convenience/Service/Delivery Fees refunded as required by applicable consumer laws.
          </li>
          <li>
            <b>Event Rescheduling:</b> If you can’t attend the new date, refunds follow the Event Partner’s policy; Convenience/Service Fees are typically non-refundable unless required by law.
          </li>
          <li>
            <b>Customer-Initiated Cancellations:</b> If permitted (rare, subject to Event Partner approval), Convenience/Service Fees are non-refundable.
          </li>
        </ul>
        <h3 className="font-semibold">8.3 Taxes</h3>
        <p>
          We collect and remit taxes per applicable Central/State/local laws. Taxes may appear as separate line items or be included in fees; the rate depends on event location and applicable law.
        </p>

        <h2 className="font-semibold">9. Ticket Limits (“Number of Tickets”)</h2>
        <p>
          To promote fairness, some events impose per-person/card/household (or similar) limits. We may cancel, without notice, orders exceeding limits (including linked by name, email, billing address, card number, or other identifiers).
        </p>

        <h2 className="font-semibold">10. Cancelled and Rescheduled Events</h2>
        <h3 className="font-semibold">10.1 Event Cancellation</h3>
        <p>
          If an Event Partner cancels and authorizes refunds, we refund the ticket face value. Ancillary fee refunds follow applicable laws (see §8.2).
        </p>
        <h3 className="font-semibold">10.2 Event Rescheduling or Venue Change</h3>
        <ul className="list-disc list-inside">
          <li>
            10.2.1 Tickets may remain valid. If you cannot attend, potential refunds depend on the Event Partner’s policy. Contact <a href="mailto:hello@astrix.live" className="text-blue-400 underline">hello@astrix.live</a> for event-specific details.
          </li>
          <li>
            10.2.2 The policies for refunds, rescheduling, or partial event completion are set by each Event Partner and may be accessed via direct links on the event’s checkout page. It is the User’s responsibility to review specific Event Partner policies prior to purchase.
          </li>
        </ul>
        <h3 className="font-semibold">10.3 Partial Performance</h3>
        <p>
          Refunds for partial performance are subject to Event Partner rules. Examples include events where more than 50% of advertised acts or duration did not occur due to unforeseen circumstances (weather, technical disruption, etc.). If entitled, refunds will be calculated pro rata based on the proportion of the event completed versus scheduled.
        </p>
        <h3 className="font-semibold">10.4 Refund Process (Cancelled Events)</h3>
        <p>
          Where refunds are authorized, we usually issue them automatically to the original payment method. Processing typically takes 7–14 business days, subject to your bank/card timelines.
        </p>

        <h2 className="font-semibold">11. Refund Procedure</h2>
        <h3 className="font-semibold">11.1 Eligibility (General Rule)</h3>
        <ul className="list-disc list-inside">
          <li>Refunds are generally available only if the Event Partner cancels. No refunds for:</li>
          <ul className="list-inside list-[circle] ml-6">
            <li>Inability to attend</li>
            <li>Late arrival</li>
            <li>Weather conditions</li>
            <li>Lineup/support-act changes</li>
            <li>Seat relocations (unless moved to a lower-priced category)</li>
          </ul>
        </ul>
        <h3 className="font-semibold">11.2 How to Request</h3>
        <p>
          If you’re eligible and haven’t received a notification, email <a href="mailto:hello@astrix.live" className="text-blue-400 underline">hello@astrix.live</a> with your order number and purchase details.
        </p>
        <h3 className="font-semibold">11.3 Timeframes</h3>
        <ul className="list-disc list-inside">
          <li>Processing: 7–14 business days (typical)</li>
          <li>Card Statements: 1–2 billing cycles (bank dependent)</li>
        </ul>
        <h3 className="font-semibold">11.4 Chargebacks</h3>
        <p>
          Before filing a chargeback, contact support—most issues resolve quickly. If you initiate a chargeback, we may:
        </p>
        <ul className="list-disc list-inside ml-6">
          <li>Provide evidence to your payment provider</li>
          <li>Charge a reasonable admin fee for chargeback handling</li>
          <li>Suspend/terminate accounts for fraudulent/abusive chargebacks</li>
        </ul>

        <h2 className="font-semibold">12. Force Majeure</h2>
        <p>
          Neither Astrix nor the Event Partner is liable for failure/delay due to causes beyond reasonable control (e.g., natural disasters, pandemics, governmental actions, war, civil unrest, terrorism, labor disputes). Refunds/postponements/cancellations in such cases follow the Event Partner’s policy; we’ll communicate details where possible.
        </p>

        <h2 className="font-semibold">13. Pricing and Other Errors</h2>
        <p>
          If a ticket price/availability is incorrect (posted error, early on-sale, unintended listing, human/system error), we may cancel the order and refund the amount paid. We are not responsible for travel or other costs arising from such errors. If an over-refund occurs, we may re-charge the original payment method for the excess.
        </p>

        <h2 className="font-semibold">14. Multiple Browser Windows</h2>
        <p>
          Use one browser window when purchasing to avoid timer issues, errors, or lost carts.
        </p>

        <h2 className="font-semibold">15. Unlawful Resale; Promotions</h2>
        <p>
          Counterfeit/duplicated/unlawfully resold tickets may be confiscated and cancelled without compensation. We may limit/revoke purchasing privileges for policy violations. Tickets cannot be used for advertising, promotions, contests, or sweepstakes without our written authorization.
        </p>

        <h2 className="font-semibold">16. Venue Entry and Search Policy</h2>
        <p>
          Entry is conditional on consent to person/bag searches; refusal may result in denied entry without refund. Prohibited items (non-exhaustive, per venue rules) include: firearms, alcohol, drugs, controlled substances, cameras/recorders, laser pointers, strobe lights, irritants, artificial noisemakers, bundles, and containers.
        </p>

        <h2 className="font-semibold">17. Limitation of Liability</h2>
        <p>
          By purchasing/attending, you assume all risks and dangers before/during/after the event, including personal injury, death, or exposure to communicable diseases (e.g., COVID-19). You waive claims against Astrix, Event Partners, venues, artists, leagues, and their affiliates/agents/employees (including on behalf of accompanying minors). Event dates/times may change due to weather or other factors. See Terms of Use for additional limits.
        </p>

        <h2 className="font-semibold">18. License; Ejection and Cancellation; No Redemption Value</h2>
        <p>
          Attendance is a revocable license subject to Event Partner rules/policies. The Event Partner may refuse admission or eject anyone for disorderly conduct, abusive language, or non-compliance, without refund. Tickets have no cash value and cannot be redeemed for money.
        </p>

        <h2 className="font-semibold">19. Recording, Transmission, and Exhibition</h2>
        <p>
          Events are public. You have no expectation of privacy regarding your actions at the venue. You grant Astrix, Event Partners, and their licensees/assignees the right to use your name, image, likeness, movements, and statements in any media for event coverage and related purposes, without further authorization or compensation.
        </p>
        <p>
          We may film/photograph events. By attending, you consent to incidental capture for safety, reporting, and coverage. For close-up promotional use, email <a href="mailto:hello@astrix.live" className="text-blue-400 underline">hello@astrix.live</a> to request an opt-out where feasible.
        </p>
        <p>
          <b>Virtual Events:</b> Access is for personal use only. Recording/copying/public exhibition/transmission/distribution, selling views, or sharing access is prohibited.
          <br/>
          Users attending virtual events may be visible to other attendees or presenters, as part of general participation. Astrix does not record or distribute private user footage except with explicit consent or as required by law/contract. Personal information shared in chat or Q&amp;A features is visible to other participants and should be shared with caution.
        </p>

        <h2 className="font-semibold">20. Dispute Resolution</h2>
        <p>
          All disputes, claims, and controversies must be resolved on an individual basis. Users hereby waive any right to participate in class actions, collective arbitrations, or other representative proceedings.
        </p>
        <h3 className="font-semibold">20.1 Initial Resolution</h3>
        <p>
          Please contact <a href="mailto:hello@astrix.live" className="text-blue-400 underline">hello@astrix.live</a> first; most issues can be resolved informally.
        </p>
        <h3 className="font-semibold">20.2 Formal Process</h3>
        <ul className="list-disc list-inside ml-6">
          <li>Email a written description to <a href="mailto:support@astrix.live" className="text-blue-400 underline">support@astrix.live</a>.</li>
          <li>Allow 30 days for investigation/response.</li>
          <li>If still unresolved, the dispute may proceed to binding arbitration.</li>
        </ul>
        <h3 className="font-semibold">20.3 Arbitration</h3>
        <p>
          Seat: Mumbai, India | Language: English | Law: Arbitration and Conciliation Act, 1996 (ad-hoc). Courts at Mumbai have exclusive supervisory jurisdiction. Either party may seek injunctive/equitable relief in a court of competent jurisdiction to prevent irreparable harm.
        </p>
        <h3 className="font-semibold">20.4 Governing Law</h3>
        <p>
          Laws of India, without regard to conflict-of-law principles.
        </p>
        <h3 className="font-semibold">20.5 Jurisdiction</h3>
        <p>
          Exclusive jurisdiction of the courts of Mumbai, India.
        </p>

        <h2 className="font-semibold">21. Changes to this Policy</h2>
        <p>
          Astrix will provide notification of material changes to this Refund Policy via email and/or in-app notification before changes become effective.
        </p>

        <h2 className="font-semibold">22. Contact Information</h2>
        <p>
          Customer Service Hours: Monday to Saturday, 10:00 AM to 7:00 PM IST (excluding public holidays)
        </p>
        <p>
          <b>Tikitin Solutions Private Limited</b>
          <br/>Email: <a href="mailto:hello@astrix.live" className="text-blue-400 underline">hello@astrix.live</a>
          <br/>Address: Office No. 1, 1st Floor, Suite 168, Sapphire Chambers Riviresa, Baner, Pune – 411045
          <br />
          Customer Service Hours: 10:00 AM – 8:00 PM, Monday to Saturday<br />
          <span className="text-sm text-[#AFB6C0]">(Excluding public holidays)</span>
        </p>

        <h2 className="font-semibold">23. Severability; No Waiver</h2>
        <p>
          If any provision is invalid or unenforceable, it will be severed and the remainder enforced to the fullest extent permitted by law. Failure to enforce any right or provision is not a waiver, unless agreed by Astrix in writing.
        </p>
      </section>
    </div>
  );
};

export default RefundPage;

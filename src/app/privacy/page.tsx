import React from "react";

const PrivacyPage = () => {
  return (
    <div className={`max-w-screen-desktop mx-auto px-2 bg-[#0E0F0C] text-[#E8EAED]`}>
      <div className="flex gap-4 pixel:p-4 pixel:pt-6 tablet:p-3 tablet:pt-4">
        <div
          className="flex h-full w-full gap-4 pixel:flex-col laptop:flex-row overflow-y-auto custom-scrollbar"
        >
          <div className="w-full z-20 transition-all duration-300 laptop:relative pb-4">
            <h1 className="text-3xl font-bold text-center uppercase font-mulish text-white">
              Privacy Policy
            </h1>
            <p className="text-sm text-[#AFB6C0] text-center font-medium mb-2">
              Last Updated: October 15, 2025
            </p>
            <section className="w-full flex flex-col mt-2 gap-4 text-sm font-muslish text-[#E8EAED]">
              <p className="font-bold text-[#AFB6C0] text-base">
                THIS PRIVACY POLICY IS AN ELECTRONIC RECORD IN THE FORM OF AN ELECTRONIC CONTRACT AND DOES NOT REQUIRE ANY PHYSICAL, ELECTRONIC, OR DIGITAL SIGNATURE IN ACCORDANCE WITH APPLICABLE LAWS.
              </p>

              <section>
                <h2 className="font-semibold text-base text-[#AFB6C0]">1. Introduction</h2>
                <p>
                  For ease of reference, the use of terms such as “Astrix,” “we,” “us,” “our,” and/or “Company” refer to Tikitin Solutions Private Limited, a private limited company duly incorporated under the Companies Act, 2013, with its registered office at [COMPANY ADDRESS].
                </p>
                <p>
                  The terms “You,” “your,” and/or “user(s)” refer to:
                </p>
                <ul className="list-disc list-inside ml-4">
                  <li>Any user who visits, uses, accesses, deals with, and/or transacts through the Services;</li>
                  <li>End-customers who sign up on Astrix; and</li>
                  <li>A lawful guardian acting on behalf of any person with disability.</li>
                </ul>
                <p>
                  At Astrix, we respect your privacy and are committed to the responsible management of your personal data. This Privacy Policy (“Policy”)—in addition to our Terms of Use and Refund Policy—covers your access to and use of the Astrix application, website, content, and associated services (collectively referred to as the “Services”).
                </p>
                <p>
                  This Policy outlines how we collect, store, use, and share your personal data, whether provided directly by you, by an authorized person, or collected automatically during your interaction with our Services.
                </p>
              </section>

              <section>
                <h2 className="font-semibold text-base text-[#AFB6C0]">2. Changes to This Privacy Policy</h2>
                <p>
                  We may update this Policy periodically. Updated versions will include a new “Last Updated” date. If changes are material or required by law, we will notify you via in-app notice and/or email.
                  <br />
                  Your continued use of the Services after changes take effect will constitute your acceptance of the revised Policy.
                </p>
              </section>

              <section>
                <h2 className="font-semibold text-base text-[#AFB6C0]">3. Age Restrictions and Verification</h2>
                <ul className="list-decimal list-inside ml-4">
                  <li>Users under 18 years of age may access the Platform only under parental or guardian supervision.</li>
                  <li>Users with disabilities may only use the Platform with the consent of their lawful guardian, who must accept this Policy on their behalf.</li>
                  <li>We do not knowingly collect data from children under 13 years of age. If you believe we have collected such data, please contact <a href="mailto:privacy@astrix.live" className="text-blue-400 underline">privacy@astrix.live</a> for removal.</li>
                  <li>We do not engage in targeted marketing to users under 18. Guardians may review or delete a child’s personal data by contacting <a href="mailto:privacy@astrix.live" className="text-blue-400 underline">privacy@astrix.live</a>.</li>
                  <li>
                    Astrix reserves the right to require documentary proof of age and/or lawful guardianship prior to granting access to users under 18 years of age or users with disabilities. Failure to provide satisfactory proof upon request may result in suspension or denial of access to the Services.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="font-semibold text-base text-[#AFB6C0]">4. Consent</h2>
                <p>
                  By using our Platform or Services, you consent to this Privacy Policy. Explicit consent is sought where required by law, including for:
                </p>
                <ul className="list-disc list-inside ml-4">
                  <li>Marketing communications</li>
                  <li>Sharing data with Event Partners</li>
                  <li>Location tracking</li>
                  <li>Third-party app integrations (e.g., Spotify)</li>
                  <li>Use of non-essential cookies</li>
                </ul>
                <p>
                  You may withdraw consent anytime through your account settings or by contacting <a href="mailto:privacy@astrix.live" className="text-blue-400 underline">privacy@astrix.live</a>.
                </p>
              </section>

              <section>
                <h2 className="font-semibold text-base text-[#AFB6C0]">5. Data Protection Officer</h2>
                <p>
                  Data Protection Officer (DPO)
                  <br />
                  Email: <a href="mailto:privacy@astrix.live" className="text-blue-400 underline">privacy@astrix.live</a>
                  <br />
                  Address: [COMPANY ADDRESS]
                </p>
              </section>

              <section>
                <h2 className="font-semibold text-base text-[#AFB6C0]">6. Data Processing and Our Role</h2>
                <p><b>6.1 Roles: Controller vs. Processor</b></p>
                <ul className="list-disc list-inside ml-4">
                  <li><b>Processor:</b> For attendee data shared by Event Partners.</li>
                  <li><b>Controller:</b> For platform accounts, payments, analytics, fraud prevention, and Astrix marketing.</li>
                </ul>
                <p><b>6.2 Lawful Basis for Processing</b></p>
                <ul className="list-disc list-inside ml-4">
                  <li><b>Consent:</b> For marketing, location data, cookies, and third-party integrations.</li>
                  <li><b>Contractual Necessity:</b> For ticketing, payments, and account management.</li>
                  <li><b>Legitimate Interest:</b> For fraud prevention, analytics, and service improvements (after assessment).</li>
                </ul>
              </section>

              <section>
                <h2 className="font-semibold text-base text-[#AFB6C0]">7. Information We Collect</h2>
                <div className="overflow-x-auto">
                  <table className="min-w-[350px] text-[0.96em] border border-[#AFB6C0] my-2">
                    <thead>
                      <tr className="bg-[#1D1F21] text-[#AFB6C0]">
                        <th className="border border-[#AFB6C0] px-2 py-1 font-semibold">Category</th>
                        <th className="border border-[#AFB6C0] px-2 py-1 font-semibold">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-[#AFB6C0] px-2 py-1">7.1 Contact Details</td>
                        <td className="border border-[#AFB6C0] px-2 py-1">Name, gender, email, phone number, ID, address, DOB.</td>
                      </tr>
                      <tr>
                        <td className="border border-[#AFB6C0] px-2 py-1">7.2 Payment Information</td>
                        <td className="border border-[#AFB6C0] px-2 py-1">Billing and transaction details.</td>
                      </tr>
                      <tr>
                        <td className="border border-[#AFB6C0] px-2 py-1">7.3 Location Data</td>
                        <td className="border border-[#AFB6C0] px-2 py-1">IP-based or GPS data (with consent).</td>
                      </tr>
                      <tr>
                        <td className="border border-[#AFB6C0] px-2 py-1">7.4 Media (Images/Recordings)</td>
                        <td className="border border-[#AFB6C0] px-2 py-1">Event photos/videos for safety or promotion (opt-out at hello@astrix.live).</td>
                      </tr>
                      <tr>
                        <td className="border border-[#AFB6C0] px-2 py-1">7.5 Preferences</td>
                        <td className="border border-[#AFB6C0] px-2 py-1">Purchase history, reviews, event interests.</td>
                      </tr>
                      <tr>
                        <td className="border border-[#AFB6C0] px-2 py-1">7.6 Third-Party Access</td>
                        <td className="border border-[#AFB6C0] px-2 py-1">Optional integrations (e.g., Spotify).</td>
                      </tr>
                      <tr>
                        <td className="border border-[#AFB6C0] px-2 py-1">7.7 Device Information</td>
                        <td className="border border-[#AFB6C0] px-2 py-1">IP, device type, OS, browser details.</td>
                      </tr>
                      <tr>
                        <td className="border border-[#AFB6C0] px-2 py-1">7.8 Usage Information</td>
                        <td className="border border-[#AFB6C0] px-2 py-1">Interactions, time spent, features used.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section>
                <h2 className="font-semibold text-base text-[#AFB6C0]">8. Use of Information</h2>
                <p>We use your data to:</p>
                <ul className="list-disc list-inside ml-4">
                  <li>Operate and improve our Platform;</li>
                  <li>Personalize user experience;</li>
                  <li>Provide customer support and notifications;</li>
                  <li>Prevent fraud;</li>
                  <li>Communicate about updates, offers, and promotions;</li>
                  <li>Fulfill legal obligations.</li>
                </ul>
              </section>

              <section>
                <h2 className="font-semibold text-base text-[#AFB6C0]">9. Cookies</h2>
                <p>We use cookies to enhance your experience.</p>
                <p>Types of Cookies:</p>
                <ul className="list-disc list-inside ml-4">
                  <li><b>Strictly Necessary:</b> Essential for basic site operation.</li>
                  <li><b>Analytical/Performance:</b> Helps us improve usability (e.g., Google Analytics).</li>
                  <li><b>Preference:</b> Remembers your settings.</li>
                  <li><b>Targeting:</b> Tailors ads and content (with consent).</li>
                  <li><b>Marketing:</b> Used for behavioral targeting (with consent).</li>
                </ul>
                <p>
                  Manage preferences anytime through the cookie center or email <a href="mailto:hello@astrix.live" className="text-blue-400 underline">hello@astrix.live</a>.
                </p>
              </section>

              <section>
                <h2 className="font-semibold text-base text-[#AFB6C0]">10. Data Retention</h2>
                <div className="overflow-x-auto">
                  <table className="min-w-[550px] text-[0.96em] border border-[#AFB6C0] my-2">
                    <thead>
                      <tr className="bg-[#1D1F21] text-[#AFB6C0]">
                        <th className="border border-[#AFB6C0] px-2 py-1 font-semibold">Data Type</th>
                        <th className="border border-[#AFB6C0] px-2 py-1 font-semibold">Purpose</th>
                        <th className="border border-[#AFB6C0] px-2 py-1 font-semibold">Legal Basis</th>
                        <th className="border border-[#AFB6C0] px-2 py-1 font-semibold">Retention</th>
                        <th className="border border-[#AFB6C0] px-2 py-1 font-semibold">Recipients</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-[#AFB6C0] px-2 py-1">Account Info</td>
                        <td className="border border-[#AFB6C0] px-2 py-1">Account management</td>
                        <td className="border border-[#AFB6C0] px-2 py-1">Contract</td>
                        <td className="border border-[#AFB6C0] px-2 py-1">Active + 2 years</td>
                        <td className="border border-[#AFB6C0] px-2 py-1">Hosting providers</td>
                      </tr>
                      <tr>
                        <td className="border border-[#AFB6C0] px-2 py-1">Payment Info</td>
                        <td className="border border-[#AFB6C0] px-2 py-1">Transactions</td>
                        <td className="border border-[#AFB6C0] px-2 py-1">Contract</td>
                        <td className="border border-[#AFB6C0] px-2 py-1">7 years</td>
                        <td className="border border-[#AFB6C0] px-2 py-1">Payment processors</td>
                      </tr>
                      <tr>
                        <td className="border border-[#AFB6C0] px-2 py-1">Purchase History</td>
                        <td className="border border-[#AFB6C0] px-2 py-1">Order management</td>
                        <td className="border border-[#AFB6C0] px-2 py-1">Contract</td>
                        <td className="border border-[#AFB6C0] px-2 py-1">Active + 7 years</td>
                        <td className="border border-[#AFB6C0] px-2 py-1">Event Partners</td>
                      </tr>
                      <tr>
                        <td className="border border-[#AFB6C0] px-2 py-1">Communication Logs</td>
                        <td className="border border-[#AFB6C0] px-2 py-1">Support</td>
                        <td className="border border-[#AFB6C0] px-2 py-1">Legitimate Interest</td>
                        <td className="border border-[#AFB6C0] px-2 py-1">Active + 3 years</td>
                        <td className="border border-[#AFB6C0] px-2 py-1">Support tools</td>
                      </tr>
                      <tr>
                        <td className="border border-[#AFB6C0] px-2 py-1">Usage Data</td>
                        <td className="border border-[#AFB6C0] px-2 py-1">Security & analytics</td>
                        <td className="border border-[#AFB6C0] px-2 py-1">Legitimate Interest</td>
                        <td className="border border-[#AFB6C0] px-2 py-1">12 months</td>
                        <td className="border border-[#AFB6C0] px-2 py-1">Analytics providers</td>
                      </tr>
                      <tr>
                        <td className="border border-[#AFB6C0] px-2 py-1">Marketing Preferences</td>
                        <td className="border border-[#AFB6C0] px-2 py-1">Targeted messaging</td>
                        <td className="border border-[#AFB6C0] px-2 py-1">Consent</td>
                        <td className="border border-[#AFB6C0] px-2 py-1">Until withdrawn</td>
                        <td className="border border-[#AFB6C0] px-2 py-1">Event Partners</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section>
                <h2 className="font-semibold text-base text-[#AFB6C0]">11. Marketing</h2>
                <p>
                  Users can opt-in for event updates, newsletters, and partner offers. You can withdraw anytime via:
                </p>
                <ul className="list-disc list-inside ml-4">
                  <li>Account settings</li>
                  <li>“Unsubscribe” links in emails</li>
                  <li>Email to <a href="mailto:hello@astrix.live" className="text-blue-400 underline">hello@astrix.live</a></li>
                </ul>
              </section>

              <section>
                <h2 className="font-semibold text-base text-[#AFB6C0]">12. Disclosure of Information</h2>
                <p>We may share data with:</p>
                <ul className="list-disc list-inside ml-4">
                  <li>Agents/Suppliers: Payment, analytics, hosting, CRM, and support providers.</li>
                  <li>Event Partners: For ticketing, safety, and marketing (with consent).</li>
                  <li>Artists: If you choose to follow them.</li>
                  <li>Cookie Providers: For analytics and ads (with consent).</li>
                  <li>Business Transfers: In case of mergers or acquisitions.</li>
                  <li>Law Enforcement: As required by law.</li>
                  <li>Anonymized data may be shared for insights and research.</li>
                </ul>
              </section>

              <section>
                <h2 className="font-semibold text-base text-[#AFB6C0]">13. Information of Other Individuals</h2>
                <p>
                  If you share another person’s data, you confirm you have their consent. Astrix may request written authorization or proof of consent.
                </p>
              </section>

              <section>
                <h2 className="font-semibold text-base text-[#AFB6C0]">14. Security of Data</h2>
                <ul className="list-disc list-inside ml-4">
                  <li>
                    We use encryption, limited access, and secure hosting to safeguard your data. For details on international transfers, contact <a href="mailto:hello@astrix.live" className="text-blue-400 underline">hello@astrix.live</a>.
                  </li>
                  <li>
                    For cross-border transfers, personal data may be stored or processed outside your country or jurisdiction. When personal data is transferred internationally, Astrix ensures adequate protection by implementing Standard Contractual Clauses, Data Processing Agreements, or other mechanisms as required by applicable privacy laws (e.g., GDPR/CCPA). You may request further information or copies of applicable safeguards by emailing <a href="mailto:support@astrix.live" className="text-blue-400 underline">support@astrix.live</a>.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="font-semibold text-base text-[#AFB6C0]">15. Data Breach Notification</h2>
                <p>
                  Astrix will notify affected users and applicable authorities within 72 hours of becoming aware of a personal data breach that may significantly impact your rights or freedoms, including details of the breach, risks, mitigation steps, and recommended actions.
                </p>
              </section>

              <section>
                <h2 className="font-semibold text-base text-[#AFB6C0]">16. Analytics</h2>
                <p>
                  We use Google Analytics and similar tools.<br />
                  Opt-out via:
                </p>
                <ul className="list-disc list-inside ml-4">
                  <li>Google Opt-Out Add-on</li>
                  <li>Cookie preferences</li>
                  <li>Email <a href="mailto:hello@astrix.live" className="text-blue-400 underline">hello@astrix.live</a></li>
                </ul>
              </section>

              <section>
                <h2 className="font-semibold text-base text-[#AFB6C0]">17. Your Rights</h2>
                <p>
                  You have the right to:
                </p>
                <ul className="list-disc list-inside ml-4">
                  <li>Access, correct, or delete your data</li>
                  <li>Restrict or object to processing</li>
                  <li>Withdraw consent</li>
                  <li>Request data portability</li>
                  <li>Avoid automated decision-making</li>
                </ul>
                <p>
                  Astrix does not employ automated decision-making or profiling that produces legal effects concerning you. Should such processes be introduced, you will be notified in advance and provided with the ability to opt out or request human review as required by law.
                </p>
                <p>
                  Requests can be sent to <a href="mailto:support@astrix.live" className="text-blue-400 underline">support@astrix.live</a>. All requests relating to your rights under this Policy - including access, correction, deletion, objection, or portability - must be sent to support@astrix.live. Astrix shall acknowledge receipt within 5 business days and provide a substantive response within 30 business days. If additional time is needed due to complexity, we will notify you and provide an estimated timeline for resolution. Requests may require identity verification for security.
                </p>
              </section>

              <section>
                <h2 className="font-semibold text-base text-[#AFB6C0]">18. International Privacy Rights</h2>
                <p>
                  For users in the EEA, UK, or California, additional rights under GDPR and CCPA apply, including access, correction, erasure, and objection rights.
                </p>
              </section>
              
              <section>
                <h2 className="font-semibold text-base text-[#AFB6C0]">19. Disclaimer</h2>
                <p>
                  By using Astrix, you consent to the collection, use, and disclosure of your data as described. If you disagree, discontinue use immediately.<br/>
                  If using the Platform on behalf of another person or entity, you confirm you are authorized to provide consent on their behalf.
                </p>
              </section>

              <section>
                <h2 className="font-semibold text-base text-[#AFB6C0]">20. External Links</h2>
                <p>
                  Our Platform may contain external links. Astrix is not responsible for the privacy practices of other websites. Please review their policies before sharing personal data.
                </p>
              </section>

              <section>
                <h2 className="font-semibold text-base text-[#AFB6C0]">21. Miscellaneous</h2>
                <ul className="list-disc list-inside ml-4">
                  <li>
                    <b>21.1 Compliance with Law:</b> Users must comply with applicable Indian laws including but not limited to IT Act, FEMA, PMLA, and Income Tax Act.
                  </li>
                  <li>
                    <b>21.2 Severability:</b> If any clause is found invalid, the rest of this Policy remains in effect.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="font-semibold text-base text-[#AFB6C0]">22. Contact Us</h2>
                <p>
                  Astrix is committed to inclusivity and will, to the extent reasonably possible, provide accessible formats or assistance for users with disabilities. To request accommodations for visual, hearing, or cognitive impairments, email <a href="mailto:hello@astrix.live" className="text-blue-400 underline">hello@astrix.live</a>, specifying the required format or support.
                </p>
                <p>
                  Tikitin Solutions Private Limited<br/>
                  Email: <a href="mailto:hello@astrix.live" className="text-blue-400 underline">hello@astrix.live</a><br/>
                  Address: Office No. 1, 1st Floor, Suite 168, Sapphire Chambers Riviresa, Baner, Pune – 411045
                </p>
                <p>
                  For privacy-specific concerns:<br/>
                  Data Protection Officer – [_____@astrix.live]
                </p>
              </section>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;
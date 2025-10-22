import { useState } from "react";
import { toast } from "sonner";

export default function ContactSection({ className }: { className?: string }) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;

    const form = e.currentTarget;
    const firstName = (form[0] as HTMLInputElement).value.trim();
    const lastName = (form[1] as HTMLInputElement).value.trim();
    const email = (form[2] as HTMLInputElement).value.trim();
    const phone = (form[3] as HTMLInputElement).value.trim();
    const message = (form[4] as HTMLTextAreaElement).value.trim();

    if (!firstName) {
      toast.dismiss();
      toast.warning("Please enter your first name.");
      return;
    }

    if (!email) {
      toast.dismiss();
      toast.warning("Please enter your email.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.dismiss();
      toast.warning("Please enter a valid email address.");
      return;
    }

    if (!phone) {
      toast.dismiss();
      toast.warning("Please enter your phone number.");
      return;
    }
    if (phone && !/^\+?\d{7,15}$/.test(phone)) {
      toast.dismiss();
      toast.warning("Please enter a valid phone number.");
      return;
    }

    if (!message) {
      toast.dismiss();
      toast.warning("Please enter your message.");
      return;
    }

    if (message.length < 10) {
      toast.dismiss();
      toast.warning("Message should be at least 10 characters long.");
      return;
    }

    setLoading(true);

    const data = { firstName, lastName, email, phone, message };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      if (result.success) {
        toast.success("Message sent successfully!");
        form.reset();
      } else {
        toast.warning(result.error || "Something went wrong.");
      }
    } catch (err) {
      toast.error("Error submitting the form. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <section
      id="contact"
      className={`${
        className || ""
      } min-h-screen h-fit bg-[#0A0A0A] flex items-center py-12 md:py-16`}
    >
      <div className="w-full mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-10">
          {/* Left Title */}
          <div className="md:col-span-1 flex jusitfy-start w-full md:w-fit">
            <h2 className="text-[48px] sm:text-[56px] md:text-[64px] leading-none text-[#F0E9B2] instrument-serif-regular">
              Get In Touch
            </h2>
          </div>

          {/* Form */}
          <div className="md:col-span-2 w-full md:w-[65%]">
            <form className="w-full text-white" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                <div>
                  {/* <label className="block text-sm text-gray-300/80 mb-3 font-nohemi font-[300]">First Name</label> */}
                  <input
                    placeholder="First Name"
                    type="text"
                    className="w-full bg-transparent outline-none border-b border-white/20 focus:border-white/40 transition-colors pb-3 font-nohemi font-[400] text-base"
                    autoComplete="given-name"
                    autoCorrect="off"
                    autoCapitalize="words"
                  />
                </div>
                <div>
                  {/* <label className="block text-sm text-gray-300/80 mb-3 font-nohemi font-[300]">Last Name</label> */}
                  <input
                    placeholder="Last Name"
                    type="text"
                    className="w-full bg-transparent outline-none border-b border-white/20 focus:border-white/40 transition-colors pb-3 font-nohemi font-[400] text-base"
                    autoComplete="family-name"
                    autoCorrect="off"
                    autoCapitalize="words"
                  />
                </div>
                <div>
                  {/* <label className="block text-sm text-gray-300/80 mb-3 font-nohemi font-[300]">Email</label> */}
                  <input
                    placeholder="Email"
                    type="email"
                    className="w-full bg-transparent outline-none border-b border-white/20 focus:border-white/40 transition-colors pb-3 font-nohemi font-[400] text-base"
                    autoComplete="email"
                    autoCorrect="off"
                    autoCapitalize="none"
                    inputMode="email"
                  />
                </div>
                <div>
                  {/* <label className="block text-sm text-gray-300/80 mb-3 font-nohemi font-[300]">Phone number</label> */}
                  <input
                    placeholder="Phone Number"
                    type="tel"
                    className="w-full bg-transparent outline-none border-b border-white/20 focus:border-white/40 transition-colors pb-3 font-nohemi font-[400] text-base"
                    autoComplete="tel"
                    autoCorrect="off"
                    inputMode="tel"
                  />
                </div>
                <div className="md:col-span-2">
                  {/* <label className="block text-sm text-gray-300/80 mb-3 font-nohemi font-[300]">Message</label> */}
                  <textarea
                    placeholder="Message"
                    rows={1}
                    className="w-full bg-transparent outline-none border-b border-white/20 focus:border-white/40 transition-colors pb-3 font-nohemi font-[400] resize-none text-base"
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="sentences"
                  />
                </div>
              </div>

              <div className="mt-8 flex justify-end md:justify-start">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-fit px-5 py-2 rounded-3xl border border-[#4e4e4e87] bg-[#3c3c3cc2] shadow-[inset_0_2.39px_2.29px_rgba(0,0,0,0.25),0_2.29px_2.29px_rgba(0,0,0,0.25)] cursor-pointer hover:opacity-90 transition-all hover:-translate-y-0.5 text-xs"
                >
                  <p className="leading-none mt-0.5">
                    {" "}
                    {loading ? "SENDING..." : "CONTACT US"}
                  </p>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

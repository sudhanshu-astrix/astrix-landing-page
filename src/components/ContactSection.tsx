import Button from "@/components/ui/Button";

export default function ContactSection({ className }: { className?: string }) {
  return (
    <section id="contact" className={`${className || ''} min-h-screen h-fit bg-[#0A0A0A] flex items-center py-12 md:py-16`}>
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
            <form className="w-full text-white">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                <div>
                  {/* <label className="block text-sm text-gray-300/80 mb-3 font-nohemi300">First Name</label> */}
                  <input
                    placeholder="First Name"
                    type="text"
                    className="w-full bg-transparent outline-none border-b border-white/20 focus:border-white/40 transition-colors pb-3 font-nohemi400"
                  />
                </div>
                <div>
                  {/* <label className="block text-sm text-gray-300/80 mb-3 font-nohemi300">Last Name</label> */}
                  <input
                    placeholder="Last Name"
                    type="text"
                    className="w-full bg-transparent outline-none border-b border-white/20 focus:border-white/40 transition-colors pb-3 font-nohemi400"
                  />
                </div>
                <div>
                  {/* <label className="block text-sm text-gray-300/80 mb-3 font-nohemi300">Email</label> */}
                  <input
                    placeholder="Email"
                    type="email"
                    className="w-full bg-transparent outline-none border-b border-white/20 focus:border-white/40 transition-colors pb-3 font-nohemi400"
                  />
                </div>
                <div>
                  {/* <label className="block text-sm text-gray-300/80 mb-3 font-nohemi300">Phone number</label> */}
                  <input
                    placeholder="Phone Number"
                    type="tel"
                    className="w-full bg-transparent outline-none border-b border-white/20 focus:border-white/40 transition-colors pb-3 font-nohemi400"
                  />
                </div>
                <div className="md:col-span-2">
                  {/* <label className="block text-sm text-gray-300/80 mb-3 font-nohemi300">Message</label> */}
                  <textarea
                    placeholder="Message"
                    rows={1}
                    className="w-full bg-transparent outline-none border-b border-white/20 focus:border-white/40 transition-colors pb-3 font-nohemi400 resize-none"
                  />
                </div>
              </div>

              <div className="mt-8 flex justify-end md:justify-start">
                <button className="w-fit px-5 py-2 rounded-3xl border border-[#4e4e4e87] bg-[#3c3c3cc2] shadow-[inset_0_2.39px_2.29px_rgba(0,0,0,0.25),0_2.29px_2.29px_rgba(0,0,0,0.25)] cursor-pointer hover:opacity-90 transition-all hover:-translate-y-0.5">CONTACT US</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}



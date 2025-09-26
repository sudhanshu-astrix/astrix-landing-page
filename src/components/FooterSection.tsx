import Image from "next/image";

export default function FooterSection({ className }: { className?: string }) {
  return (
    <footer className={`${className || ''} relative overflow-hidde min-h-[60vh] md:min-h-[50vh] h-fit bg-[#1f1f1f70] text-white/80 flex items-start py-10`}>
      {/* Background logo - centered horizontally, slightly off screen at bottom */}
      <div className="pointer-events-none absolute left-1/2 w-[80%] h-[100%] md:max-h-[25vh] max-h-[9vh] -translate-x-1/2 bottom-0 select-none">
        <Image src="/Assets/Icons/FooterLogo.png" alt="Astrix Logo Large" fill objectFit="contain"/>
      </div>

      <div className="relative z-10 w-full mx-auto px-6 md:px-10 lg:px-16 flex flex-col gap-4">
        {/* Top links */}
        <nav className="flex flex-col md:flex-row items-center md:gap-8 gap-4 text-sm font-nohemi400">
          <a href="#" className="hover:text-[#CCD0D7] transition-colors">Home</a>
          <a href="#" className="hover:text-[#CCD0D7] transition-colors">Terms &amp; Conditions</a>
          <a href="#" className="hover:text-[#CCD0D7] transition-colors">Privacy policy</a>
          <a href="#" className="hover:text-[#CCD0D7] transition-colors">Refund Policy</a>
          <a href="#contact" className="hover:text-[#CCD0D7] transition-colors">Contact Us</a>
        </nav>

        {/* Divider */}
        <div className="mt-8 w-[80%] mx-auto h-[0.5px] bg-[#31373F]"></div>

        {/* Bottom row */}
        <div className="mt-8 flex md:flex-row flex-col-reverse gap-8 items-center justify-between">
          <p className="text-sm font-nohemi30 text-[#939CAA]">
            © 2025 Eventide. All rights reserved.
          </p>

          {/* Socials pill */}
          <div className="flex items-center gap-4 bg-[#1f1f1f97] rounded-lg px-4 py-2">
            <a href="#" aria-label="Spotify" className="w-6 h-6 grid place-items-center rounded-full hover:bg-white/20 transition-colors">
              <Image src="/Assets/Icons/SpotifyIcon.svg" alt="Spotify" width={16} height={16} />
            </a>
            <a href="#" aria-label="X" className="w-6 h-6 grid place-items-center rounded-full hover:bg-white/20 transition-colors">
              <Image src="/Assets/Icons/XIcon.svg" alt="X" width={16} height={16} />
            </a>
            <a href="#" aria-label="YouTube" className="w-6 h-6 grid place-items-center rounded-full hover:bg-white/20 transition-colors">
              <Image src="/Assets/Icons/YoutubeIcon.svg" alt="YouTube" width={16} height={16} />
            </a>
            <a href="#" aria-label="Instagram" className="w-6 h-6 grid place-items-center rounded-full hover:bg-white/20 transition-colors">
              <Image src="/Assets/Icons/InstagramIcon.svg" alt="Instagram" width={16} height={16} />
            </a>
          </div>
        </div>

        
      </div>
    </footer>
  );
}



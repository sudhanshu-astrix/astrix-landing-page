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
            <a href="https://www.youtube.com/@astrix-live" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="w-6 h-6 grid place-items-center rounded-full hover:bg-white/20 transition-colors">
              <Image src="/Assets/Icons/YoutubeIcon.svg" alt="YouTube" width={16} height={16} />
            </a>
            <a href="https://www.instagram.com/astrix.live/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-6 h-6 grid place-items-center rounded-full hover:bg-white/20 transition-colors">
              <Image src="/Assets/Icons/InstagramIcon.svg" alt="Instagram" width={16} height={16} />
            </a>
            <a href="https://www.linkedin.com/company/astrix-live" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-6 h-6 grid place-items-center rounded-full hover:bg-white/20 transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          </div>
        </div>

        
      </div>
    </footer>
  );
}



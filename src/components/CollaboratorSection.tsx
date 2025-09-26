"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface CollaboratorSectionProps {
  className?: string;
}

export default function CollaboratorSection({ className }: CollaboratorSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = cardsRef.current;
    if (!cards) return;

    const isMobile = window.innerWidth < 768;

    if (isMobile) {
      // Mobile: Infinite automated scroll animation
      const tl = gsap.timeline({ repeat: -1 });
      
      tl.to(cards, {
        x: () => -((cards.scrollWidth + 200) - window.innerWidth + 200),
        duration: 30, // 20 seconds for full scroll
        ease: "none",
      })
      .to(cards, {
        x: 0,
        duration: 0.5,
        ease: "power2.inOut",
      });
    } else {
      // Desktop: ScrollTrigger animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=500%", // 4x the viewport height for horizontal scroll
          scrub: 1,
          pin: true,
        },
      });

      // Animate cards sliding from right to left
      tl.to(cards, {
        x: () => -((cards.scrollWidth + 200) - window.innerWidth + 200), // Add extra padding to reach last card
        ease: "none",
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Collaborator data matching the design
  const collaborators = [
    {
      title: "Ranj x Clifr",
      description: "PLAY ME! tour with Meba Ofilia - EP launch shows across Shillong, Mumbai, and Bangalore, powered by Jameson Connects Jam Pad.",
      category: "Artists",
      image: "/Assets/Images/Slider/Slide1.svg",
      random: Math.floor(Math.random() * 2)
    },
    {
      title: "Flipside",
      description: "Ticketing partner for Flipside Vol.1 — packed out Nehru Place Social with 600+ people for a lineup featuring Collesttye, Ghildiyal, ZerøKaata, The Seige and Dhanji.",
      category: "Event Organisers",
      image: "/Assets/Images/Slider/Slide2.svg",
      random: Math.floor(Math.random() * 2)
    },
    {
      title: "Music Collaboration",
      description: "Collaborated for Muzzle’s debut EP, October Baby launch party at Depot48, Delhi – his first ever India pop-out.",
      category: "Artists",
      image: "/Assets/Images/Slider/Slide3.svg",
      random: Math.floor(Math.random() * 2)
    },
    {
      title: "Extra Butter New York",
      description: "Partnered with Extra Butter for the India preview party of BAPE’s launch.",
      category: "Venue",
      image: "/Assets/Images/Slider/Slide4.svg",
      random: Math.floor(Math.random() * 2)
    },
    {
      title: "Dohraj",
      description: "Ticketing partner for a show featuring Dee En, Dohnraj & The Peculiars and Fringe Mechanics at the multidisciplinary space – Mool, New Delhi.",
      category: "Artists",
      image: "/Assets/Images/Slider/Slide5.svg",
      random: Math.floor(Math.random() * 2)
    },
    {
      title: "The House Guest",
      description: "Ticketed a secret-location show (address revealed only to buyers) with Shwe G and Acharya on decks.",
      category: "Event Organisers",
      image: "/Assets/Images/Slider/Slide6.svg",
      random: Math.floor(Math.random() * 2)
    },
    {
      title: "This ?",
      description: "Partnered with This? and Sony Music for an intimate Dhruv Singh listening session, hosted at Rolling Stone India.",
      category: "Creative Consultancy",
      image: "/Assets/Images/Slider/Slide7.svg",
      random: Math.floor(Math.random() * 2)
    },
    {
      title: "karun nanku, lnf",
      description: "Karun Nanku Live in Ahmedabad at Niro’s, hosted by LeaveNoFingerprints.",
      category: "Event Organisers",
      image: "/Assets/Images/Slider/Slide8.svg",
      random: Math.floor(Math.random() * 2)
    },
    {
      title: "Frappe ash",
      description: "Delhi leg of his Junkie Tour, hosted by Hot Sauce.",
      category: "Artists",
      image: "/Assets/Images/Slider/Slide9.svg",
      random: Math.floor(Math.random() * 2)
    },
    {
      title: "Pursue Hard Seltzer",
      description: "Brand partner for the BAPE launch at Extra Butter, Mumbai.",
      category: "Brands",
      image: "/Assets/Images/Slider/Slide10.svg",
      random: Math.floor(Math.random() * 2)
    },
    {
      title: "BAPE Preview Launch",
      description: "Curated BAPE’s first India outing with Pursue and Jägermeister. Prithvi and Gandhar on the decks. ",
      category: "Brands",
      image: "/Assets/Images/Slider/Slide11.svg",
      random: Math.floor(Math.random() * 2)
    },
    {
      title: "Jagermeister",
      description: "Brand partner for the BAPE launch at Extra Butter, Mumbai.",
      category: "Brands",
      image: "/Assets/Images/Slider/Slide12.svg",
      random: Math.floor(Math.random() * 2)
    },
    {
      title: "Darzi",
      description: "We partnered with Darzi to ticket his 3rd Year Album Anniversary at One8 Commune, Gurgaon.",
      category: "Event Organisers",
      image: "/Assets/Images/Slider/Slide13.svg",
      random: Math.floor(Math.random() * 2)
    },
    {
      title: "Blue Diamond",
      description: "SUBVERSE at Odella Green Park was an underground takeover – with Maurya, Blud Diamond Collective, and Rasa.",
      category: "Event Organisers",
      image: "/Assets/Images/Slider/Slide14.svg",
      random: Math.floor(Math.random() * 2)
    },
    {
      title: "For the fans",
      description: "When NH7 Weekender got cancelled, artists like Chaar Diwari, Yung Sammy, Bharg, AB!, Oliver Cronin, and Shreyas! rallied together. Their free gig at FC Road Social, Pune, was for the community and by the community. We were proud ticketing partners on a night that embodied our ethos.",
      category: "Event",
      image: "/Assets/Images/Slider/Slide15.svg",
      random: Math.floor(Math.random() * 2)
    },
    {
      title: "Compass Box Studio",
      description: "One of our first collabs – ticketing for The Blues Experience at Blockheads Vinyl Café, Ahmedabad. ",
      category: "Event Organisers",
      image: "/Assets/Images/Slider/Slide16.svg",
      random: Math.floor(Math.random() * 2)
    },
    {
      title: "Pursue Hard Seltzer",
      description: "Curated by Prithvi, &Friends Vol.4 landed on Friendship Day at Khar Social. Karaoke, cyphers, tattoos, and collabs with Superkicks + Extra Butter made it a full-circle celebration.",
      category: "Event Organisers",
      image: "/Assets/Images/Slider/Slide17.svg",
      random: Math.floor(Math.random() * 2)
    },
    {
      title: "Frostbite",
      description: "Frostbite brought fashion and music together at their launch event at Slink & Bardot, Mumbai. ",
      category: "Brands",
      image: "/Assets/Images/Slider/Slide18.svg",
      random: Math.floor(Math.random() * 2)
    },
    {
      title: "LeaveNoFingerprints",
      description: "Ahmedabad’s underground tastemakers. From Karun Nanku’s explosive set to Yashraj’s showcase, we partnered with LNF to ticket their events. ",
      category: "Event Organisers",
      image: "/Assets/Images/Slider/Slide19.svg",
      random: Math.floor(Math.random() * 2)
    },
  ];

  return (
    <section ref={sectionRef} className={`h-screen bg-[#0A0A0A] flex items-center overflow-hidden ${className || ''}`}>
      <div className="w-full mx-auto px-8 flex gap-20 items-center">
        {/* Section Title - Left Side */}
        <div className="flex-shrink-0 w-fit">
          <h2 className="text-3xl instrument-serif-regular md:text-3xl lg:text-7xl text-[#F0E9B2] leading-tight">
            Collaborators
          </h2>
          <p className="text-lg md:text-xl text-white font-nohemi400 mt-2 text-right">
            2024-25
          </p>
        </div>

        {/* Horizontal Scrolling Cards - Right Side */}
        <div className="flex-1 relative h-[80vh]">
          <div 
            ref={cardsRef}
            className={`flex gap-12 h-full bg-[#0A0A0A]`}
            style={{ width: "max-content" }}
          >
            {collaborators.map((collaborator, index) => (
              <div
                key={index}
                className={`flex-shrink-0 bg-transparent flex ${collaborator?.random === 0 ? "items-center" : collaborator?.random === 1 ? "items-start" : "items-end"}`}
                style={{ width: 'fit-content' }}
              >
                <div className="relative group">
                  {/* Image - Maintain original aspect ratio */}
                  <div className="relative overflow-hidden">
                    <img
                      src={collaborator?.image}
                      alt={collaborator?.title}
                      className="w-auto h-auto max-w-none transition-transform group-hover:scale-105"
                      style={{ 
                        width: 'auto', 
                        height: 'auto',
                        maxHeight: '400px',
                        maxWidth: '350px'
                      }}
                    />
                  </div>
                  
                  {/* Content */}
                  <div className="space-y-4 pl-4 border-l-[0.5px] border-[#E4E4E4] pt-6">
                    <h3 className="text-lg md:text-2xl font-nohemi600 text-[#E4E4E4] leading-tight">
                      {collaborator.title}
                    </h3>
                    <p className="text-xs md:text-xs text-[#9C9C9C] font-nohemi400 break-words leading-relaxed max-w-[350px]">
                      {collaborator.description}
                    </p>
                    <div className="text-[12px] md:text-[10px] text-[#E4E4E4] font-nohemi500 uppercase tracking-wider">
                      {collaborator.category}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

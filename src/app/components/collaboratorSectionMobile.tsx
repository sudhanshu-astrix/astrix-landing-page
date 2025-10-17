"use client";
import { useEffect, useRef, useState } from "react";
import { useSwipeable } from "react-swipeable";

interface CollaboratorSectionProps {
  className?: string;
}

export default function CollaboratorSectionMobile({
  className,
}: CollaboratorSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [autoScrollInterval, setAutoScrollInterval] =
    useState<NodeJS.Timeout | null>(null);
  const [inactivityTimeout, setInactivityTimeout] =
    useState<NodeJS.Timeout | null>(null);

  // Auto-scroll logic
  const startAutoScroll = () => {
    console.log("autoooo scrollll")
    if (autoScrollInterval) clearInterval(autoScrollInterval);

    const interval = setInterval(() => {
      const container = cardsRef.current;
      console.log(container, "container autoooo scrollll")
      if (!container) return;

      container.scrollBy({ left: 2, behavior: "auto" });

      // Check if we've reached the end (with some tolerance)
      if (
        container.scrollLeft + container.clientWidth >=
        container.scrollWidth - 10
      ) {
        // Reset to start
        container.scrollTo({ left: 0, behavior: "auto" });
      }
    }, 30);

    setAutoScrollInterval(interval);
  };

  const stopAutoScroll = () => {
    if (autoScrollInterval) {
      clearInterval(autoScrollInterval);
      setAutoScrollInterval(null);
    }
  };

  const restartAutoScroll = () => {
    if (inactivityTimeout) clearTimeout(inactivityTimeout);
    const timeout = setTimeout(() => startAutoScroll(), 3000);
    setInactivityTimeout(timeout);
  };

  useEffect(() => {
    const timer = setTimeout(startAutoScroll, 500); 
    return () => {
      clearTimeout(timer);
      stopAutoScroll();
      if (inactivityTimeout) clearTimeout(inactivityTimeout);
    };
  }, []);


  // Swipe gesture integration
  const handlers = useSwipeable({
    onSwipedLeft: () => {
      const container = cardsRef.current;
      if (container) {
        container.scrollBy({ left: 300, behavior: "smooth" });
      }
      stopAutoScroll();
      restartAutoScroll();
    },
    onSwipedRight: () => {
      const container = cardsRef.current;
      if (container) {
        container.scrollBy({ left: -300, behavior: "smooth" });
      }
      stopAutoScroll();
      restartAutoScroll();
    },
    onSwipeStart: () => {
      stopAutoScroll();
    },
    preventScrollOnSwipe: false,
    trackMouse: false,
    trackTouch: true,
    delta: 10,
  });
  // Collaborator data matching the design
  const collaborators = [
    {
      title: "Ranj x Clifr",
      description:
        "PLAY ME! tour with Meba Ofilia - EP launch shows across Shillong, Mumbai, and Bangalore, powered by Jameson Connects Jam Pad.",
      category: "Artists",
      image: "/Assets/Images/Slider/Slide1.svg",
      random: 0,
    },
    {
      title: "Flipside Vol.1",
      description:
        "Ticketing partner for Flipside Vol.1 — packed out Nehru Place Social with 600+ people for a lineup featuring Collesttye, Ghildiyal, ZerøKaata, The Seige and Dhanji.",
      category: "Event Organisers",
      image: "/Assets/Images/Slider/Slide2.svg",
      random: 1,
    },
    {
      title: "Muzzle",
      description:
        "Collaborated for Muzzle’s debut EP, October Baby launch party at Depot48, Delhi – his first ever India pop-out.",
      category: "Artists",
      image: "/Assets/Images/Slider/Slide3.svg",
      random: 2,
    },
    {
      title: "Extra Butter New York",
      description:
        "Partnered with Extra Butter for the India preview party of BAPE’s launch.",
      category: "Venue",
      image: "/Assets/Images/Slider/Slide4.svg",
      random: 3,
    },
    {
      title: "Dohnraj",
      description:
        "Ticketing partner for a show featuring Dee En, Dohnraj & The Peculiars and Fringe Mechanics at the multidisciplinary space – Mool, New Delhi.",
      category: "Artists",
      image: "/Assets/Images/Slider/Slide5.svg",
      random: 4,
    },
    {
      title: "The House Guest",
      description:
        "Ticketed a secret-location show (address revealed only to buyers) with Shwe G and Acharya on decks.",
      category: "Event Organisers",
      image: "/Assets/Images/Slider/Slide6.svg",
      random: 5,
    },
    {
      title: "This ?",
      description:
        "Partnered with This? and Sony Music for an intimate Dhruv Singh listening session, hosted at Rolling Stone India.",
      category: "Creative Consultancy",
      image: "/Assets/Images/Slider/Slide7.svg",
      random: 6,
    },
    {
      title: "karun nanku, lnf",
      description:
        "Karun Nanku Live in Ahmedabad at Niro’s, hosted by LeaveNoFingerprints.",
      category: "Event Organisers",
      image: "/Assets/Images/Slider/Slide8.svg",
      random: 7,
    },
    {
      title: "Frappe ash",
      description: "Delhi leg of his Junkie Tour, hosted by Hot Sauce.",
      category: "Artists",
      image: "/Assets/Images/Slider/Slide9.svg",
      random: 8,
    },
    {
      title: "Pursue Hard Seltzer",
      description: "Brand partner for the BAPE launch at Extra Butter, Mumbai.",
      category: "Brands",
      image: "/Assets/Images/Slider/Slide10.svg",
      random: 9,
    },
    {
      title: "BAPE Preview Launch",
      description:
        "Curated BAPE’s first India outing with Pursue and Jägermeister. Prithvi and Gandhar on the decks. ",
      category: "Brands",
      image: "/Assets/Images/Slider/Slide11.svg",
      random: 10,
    },
    {
      title: "Jagermeister",
      description: "Brand partner for the BAPE launch at Extra Butter, Mumbai.",
      category: "Brands",
      image: "/Assets/Images/Slider/Slide12.svg",
      random: 11,
    },
    {
      title: "Darzi",
      description:
        "We partnered with Darzi to ticket his 3rd Year Album Anniversary at One8 Commune, Gurgaon.",
      category: "Event Organisers",
      image: "/Assets/Images/Slider/Slide13.svg",
      random: 12,
    },
    {
      title: "Blood Diamond",
      description:
        "SUBVERSE at Odella Green Park was an underground takeover – with Maurya, Blood Diamond Collective, and Rasa.",
      category: "Event Organisers",
      image: "/Assets/Images/Slider/Slide14.svg",
      random: 13,
    },
    {
      title: "For the fans",
      description:
        "When NH7 Weekender got cancelled, artists like Chaar Diwari, Yung Sammy, Bharg, AB!, Oliver Cronin, and Shreyas! rallied together. Their free gig at FC Road Social, Pune, was for the community and by the community. We were proud ticketing partners on a night that embodied our ethos.",
      category: "Event",
      image: "/Assets/Images/Slider/Slide15.svg",
      random: 14,
    },
    {
      title: "Compass Box Studio",
      description:
        "One of our first collabs – ticketing for The Blues Experience at Blockheads Vinyl Café, Ahmedabad. ",
      category: "Event Organisers",
      image: "/Assets/Images/Slider/Slide16.svg",
      random: 15,
    },
    {
      title: "&Friends",
      description:
        "Curated by Prithvi, &Friends Vol.4 landed on Friendship Day at Khar Social. Karaoke, cyphers, tattoos, and collabs with Superkicks + Extra Butter made it a full-circle celebration.",
      category: "Event Organisers",
      image: "/Assets/Images/Slider/Slide17.svg",
      random: 16,
    },
    {
      title: "Frostbite",
      description:
        "Frostbite brought fashion and music together at their launch event at Slink & Bardot, Mumbai. ",
      category: "Brands",
      image: "/Assets/Images/Slider/Slide18.svg",
      random: 17,
    },
    {
      title: "LeaveNoFingerprints",
      description:
        "Ahmedabad’s underground tastemakers. From Karun Nanku’s explosive set to Yashraj’s showcase, we partnered with LNF to ticket their events. ",
      category: "Event Organisers",
      image: "/Assets/Images/Slider/Slide19.svg",
      random: 18,
    },
  ];

   const setRefs = (node: HTMLDivElement | null) => {
    cardsRef.current = node;
    handlers.ref(node);
  };

  return (
    <section
      ref={sectionRef}
      className={`h-screen bg-[#0A0A0A] flex flex-col md:flex-row items-start md:items-center pt-[140px] overflow-hidden ${
        className || ""
      }`}
    >
      <div className="w-full mx-auto px-4 flex flex-col gap-8  items-start  h-full">
        {/* Section Title - Top on mobile, Left on desktop */}
        <div className="flex-shrink-0 md:w-fit pt-1  w-full">
          <h2 className="text-4xl font-instrument-serif font-[400]  text-[#F0E9B2] leading-[100%]">
            Collaborators
          </h2>
          <p className="text-xs  text-[#949494] md:text-[#E4E4E4] font-nohemi font-[300]  mt-2 text-right">
            2024-25
          </p>
        </div>

        {/* Horizontal Scrolling Cards - Below title on mobile, Right side on desktop */}
        <div className="flex-1 relative h-[40vh]  w-full max-w-full  overflow-x-auto scrollbar-hide">
          <div
            ref={setRefs}
            // {...handlers}
            style={{
              // width: "max-content",
              WebkitOverflowScrolling: "touch",
              overscrollBehaviorX: "none",
            }}
            className={`flex justify-start gap-[52px] h-full bg-[#0A0A0A]   `}
          >
            {collaborators.map((collaborator, index) => (
              <div
                key={index}
                className={`flex-shrink-0 cursor-pointer bg-transparent  flex ${
                  collaborator?.random % 2 === 0
                    ? "items-start"
                    : "items-center"
                }`}
                // style={{ width: "fit-content" }}
                style={{
                  // width: "fit-content",
                  WebkitOverflowScrolling: "touch",
                  overscrollBehaviorX: "none",
                  touchAction: "pan-x pan-y",
                  width: "260px",
                }}
              >
                <div className="relative w-full max-w-[260] overflow-hidden h-fit ">
                  {/* Image - Maintain original aspect ratio */}
                  <div className=" w-full  h-full ">
                    <img
                      src={collaborator?.image}
                      alt={collaborator?.title}
                      className="w-full h-full"
                    />
                  </div>

                  {/* Content */}
                  <div className="space-y-3 pl-5 border-l-[0.5px] border-[#E4E4E4] pt-8">
                    <h3 className="text-base md:text-3xl font-nohemi font-[400] text-[#E4E4E4] leading-tight">
                      {collaborator.title}
                    </h3>
                    <p className="text-xs text-[#9C9C9C] font-switzer font-[400] break-words leading-relaxed max-w-[350px]">
                      {collaborator.description}
                    </p>
                    <div className="text-xs  text-[#E4E4E4] font-nohemi font-[400] tracking-wider">
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

import Link from "next/link";
import mixpanel from "@/lib/mixpanelClient";

export default function TeaserSection({ className }: { className?: string }) {
  return (
    <section
      className={`min-h-[50vh] h-fit bg-[#0A0A0A] flex items-start ${
        className || ""
      }`}
      id="teaser"
    >
      <div className="w-full mx-auto px-6 md:px-10">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="font-instrument-serif font-[400] text-4xl sm:text-5xl md:text-6xl text-white/90 leading-tight">
            Spoiler: You are <br />{" "}
            <strong className="italic">already here</strong>
          </h3>
          <div className="mt-8">
            <Link
              href="https://app.astrix.live"
              target="_blank"
              rel="noopener noreferrer"
                 onClick={() => {
              mixpanel.track("Teaser Section - Get Started Clicked", { location: "Teaser Section" });
            }}
              className="inline-block w-fit px-5 py-2 rounded-3xl border border-[#4e4e4e87] bg-[#3c3c3cc2] shadow-[inset_0_2.39px_2.29px_rgba(0,0,0,0.25),0_2.29px_2.29px_rgba(0,0,0,0.25)] cursor-pointer hover:opacity-90 transition-all hover:-translate-y-0.5 text-xs"
              style={{ color: '#FFFFFF' }}
            >
              <p className="leading-none mt-0.5" style={{ color: '#FFFFFF' }}>GET STARTED</p>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

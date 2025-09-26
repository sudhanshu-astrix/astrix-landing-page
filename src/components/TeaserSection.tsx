import Button from "@/components/ui/Button";

export default function TeaserSection({ className }: { className?: string }) {
  return (
    <section className={`min-h-[50vh] h-fit bg-[#0A0A0A] flex items-start ${className || ''}`}>
      <div className="w-full mx-auto px-6 md:px-10">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="instrument-serif-regular text-4xl sm:text-5xl md:text-6xl text-white/90 leading-tight">
            Spoiler: You are <br/> <em className="italic">already here</em>
          </h3>
          <div className="mt-8">
            <button className="w-fit px-5 py-2 rounded-3xl border border-[#4e4e4e87] bg-[#3c3c3cc2] shadow-[inset_0_2.39px_2.29px_rgba(0,0,0,0.25),0_2.29px_2.29px_rgba(0,0,0,0.25)] cursor-pointer hover:opacity-90 transition-all hover:-translate-y-0.5">GET STARTED</button>
          </div>
        </div>
      </div>
    </section>
  );
}



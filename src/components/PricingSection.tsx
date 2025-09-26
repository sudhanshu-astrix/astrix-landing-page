export default function PricingSection({ className }: { className?: string }) {
  return (
    <section id="pricing" className={`${className || ''} h-screen bg-gray-800 flex items-center justify-center`}>
      <div className="text-center max-w-4xl px-8">
        <h2 className="text-4xl md:text-5xl font-nohemi600 text-white mb-8">
          Pricing Plans
        </h2>
        <p className="text-xl text-gray-300 leading-relaxed font-nohemi400">
          Choose the plan that fits your needs. All plans include our core features
          with different levels of support and customization options.
        </p>
      </div>
    </section>
  );
}



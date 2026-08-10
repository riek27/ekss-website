export default function TopBar() {
  return (
    <div id="top-bar" className="hidden sm:block fixed top-0 left-0 w-full bg-deep-forest text-white/90 text-xs z-[60]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1.5 flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
        <span className="whitespace-nowrap">RRC Reg. No. 169</span>
        <span className="hidden sm:inline text-white/40">|</span>
        <span className="whitespace-nowrap">NGO Act 2016</span>
        <span className="hidden sm:inline text-white/40">|</span>
        <span className="whitespace-nowrap">Est. 2014</span>
        <span className="hidden sm:inline text-white/40">|</span>
        <span className="whitespace-nowrap font-semibold text-warm-gold">CAF America validated</span>
        <span className="hidden sm:inline text-white/40">|</span>
        <span className="whitespace-nowrap">Juba, South Sudan</span>
        <span className="hidden sm:inline text-white/40">|</span>
        <a href="mailto:info@ekss.org" className="whitespace-nowrap hover:text-warm-gold transition">info@ekss.org</a>
        <span className="hidden sm:inline text-white/40">|</span>
        <a href="tel:+211926133777" className="whitespace-nowrap hover:text-warm-gold transition">+211 926 133 777</a>
      </div>
    </div>
  );
}
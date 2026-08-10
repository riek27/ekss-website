import programsData from '@/data/programs.json';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ProgramsPage() {
  const { hero, overview, featured, results, partners, cta } = programsData;

  return (
    <>
      <Header />

      {/* ===== Hero ===== */}
      <section
        className="relative h-[60vh] flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `url(${hero.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-deep-forest/70" />
        <div className="relative z-10 text-center px-4 max-w-3xl">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            {hero.title}
          </h1>
          <p className="text-gray-200 text-lg md:text-xl">{hero.subtitle}</p>
        </div>
      </section>

      {/* ===== Programs Overview ===== */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-deep-forest">
              {overview.heading}
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {overview.cards.map((card, i) => (
              <div
                key={i}
                className="card-hover bg-white rounded-3xl overflow-hidden shadow-md border p-6 flex flex-col"
              >
                <span className="text-3xl block mb-3">{card.icon}</span>
                <h3 className="font-display font-bold text-lg text-deep-forest mb-2">
                  {card.title}
                </h3>
                <p className="text-gray-500 text-sm flex-1">{card.description}</p>
                <ul className="text-xs text-gray-600 space-y-1 mt-4">
                  {card.results.map((r, j) => (
                    <li key={j} className="flex items-start gap-1">
                      <span className="text-emerald-green">✓</span> {r}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Featured Program ===== */}
      <section id="featured" className="py-20 lg:py-28 bg-soft-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-0 items-stretch rounded-4xl overflow-hidden shadow-2xl">
            <div className="image-zoom-wrapper h-72 sm:h-96 lg:h-auto min-h-[400px]">
              <img
                src={featured.image}
                alt="Featured program"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="bg-dark-section p-8 sm:p-10 lg:p-14 flex flex-col justify-center">
              <span className="text-warm-gold font-semibold text-sm uppercase mb-3">
                {featured.heading}
              </span>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
                {featured.title}
              </h2>
              <p className="text-gray-300 leading-relaxed mb-6">{featured.description}</p>
              <a
                href={featured.buttonLink}
                className="btn-gold-pulse inline-flex items-center self-start px-6 py-3 bg-warm-gold text-white font-semibold rounded-full shadow-lg hover:bg-yellow-600 transition"
              >
                {featured.buttonText}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Program Results ===== */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-deep-forest mb-10">
            {results.heading}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {results.stats.map((stat, i) => (
              <div
                key={i}
                className="bg-soft-bg rounded-3xl shadow-md p-5 sm:p-7 text-center border"
              >
                <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-deep-forest mb-1">
                  {stat.value}
                </div>
                <p className="text-xs sm:text-sm text-gray-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Partners ===== */}
      <section className="py-16 lg:py-20 bg-soft-bg">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-deep-forest mb-10">
            {partners.heading}
          </h2>
          <div className="relative w-full overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-r from-soft-bg to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-l from-soft-bg to-transparent z-10 pointer-events-none"></div>
            <div className="marquee-wrapper">
              <div className="marquee-track">
                {[...partners.list, ...partners.list].map((p, i) => (
                  <div key={i} className="partner-card">
                    <span className="partner-name">{p.name}</span>
                    <span className="partner-label">{p.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Final CTA ===== */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-deep-forest mb-4">
            {cta.heading}
          </h2>
          <p className="text-gray-600 text-lg mb-10">{cta.text}</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href={cta.buttons.donate.link}
              className="btn-gold-pulse inline-flex items-center justify-center px-8 py-3.5 bg-warm-gold text-white font-semibold rounded-full shadow-lg hover:bg-yellow-600 transition"
            >
              {cta.buttons.donate.text}
            </a>
            <a
              href={cta.buttons.partner.link}
              className="inline-flex items-center justify-center px-8 py-3.5 bg-emerald-green text-white font-semibold rounded-full hover:bg-deep-forest transition shadow-lg"
            >
              {cta.buttons.partner.text}
            </a>
            <a
              href={cta.buttons.getInvolved.link}
              className="inline-flex items-center justify-center px-8 py-3.5 bg-deep-forest text-white font-semibold rounded-full hover:bg-emerald-green transition shadow-lg"
            >
              {cta.buttons.getInvolved.text}
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
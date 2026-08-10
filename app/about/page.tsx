import aboutData from '@/data/about.json';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function AboutPage() {
  const {
    hero,
    whoWeAre,
    coreValues,
    missionVision,
    whatWeDo,
    background,
    impact,
    whereWeWork,
    transparency,
    partners,
    governance,
  } = aboutData;

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

      {/* ===== Who We Are ===== */}
      <section id="who-we-are" className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="image-zoom-wrapper rounded-4xl overflow-hidden shadow-2xl">
              <img
                src={whoWeAre.image}
                alt="Who We Are"
                className="w-full h-80 lg:h-[480px] object-cover"
                loading="lazy"
              />
            </div>
            <div>
              <span className="text-emerald-green font-semibold text-sm uppercase tracking-wider">
                Who We Are
              </span>
              <h2
                className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-deep-forest mt-3 mb-6"
                dangerouslySetInnerHTML={{
                  __html: whoWeAre.heading.replace(/\n/g, '<br/>'),
                }}
              />
              <p className="text-gray-600 leading-relaxed mb-5">{whoWeAre.description1}</p>
              <p className="text-gray-600 leading-relaxed mb-8">{whoWeAre.description2}</p>
              <a
                href={whoWeAre.ctaLink}
                className="inline-flex items-center gap-2 text-emerald-green font-semibold hover:text-deep-forest transition-colors group"
              >
                {whoWeAre.ctaText}
                <svg
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Core Values ===== */}
      <section id="core-values" className="py-20 lg:py-28 bg-soft-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-deep-forest">
              {coreValues.heading}
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.list.map((value, i) => (
              <div
                key={i}
                className="card-hover bg-white rounded-3xl p-6 shadow-md border text-center"
              >
                <span className="text-3xl block mb-3">{value.icon}</span>
                <h3 className="font-display font-bold text-lg text-deep-forest mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-500 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Mission & Vision ===== */}
      <section id="mission-vision" className="py-20 lg:py-28 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-dark-section text-white rounded-4xl p-8 md:p-10 shadow-xl">
              <h3 className="font-display text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-gray-300 leading-relaxed">{missionVision.mission}</p>
            </div>
            <div className="bg-emerald-green text-white rounded-4xl p-8 md:p-10 shadow-xl">
              <h3 className="font-display text-2xl font-bold mb-4">Our Vision</h3>
              <p className="text-gray-100 leading-relaxed">{missionVision.vision}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== What We Do ===== */}
      <section id="what-we-do" className="py-20 lg:py-28 bg-soft-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-deep-forest">
              {whatWeDo.heading}
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whatWeDo.cards.map((card, i) => (
              <div
                key={i}
                className="card-hover bg-white rounded-3xl overflow-hidden shadow-md border p-6"
              >
                <span className="text-3xl block mb-3">{card.icon}</span>
                <h3 className="font-display font-bold text-lg text-deep-forest mb-2">
                  {card.title}
                </h3>
                <p className="text-gray-500 text-sm">{card.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <a
              href={whatWeDo.ctaLink}
              className="btn-gold-pulse inline-flex items-center gap-2 px-8 py-3.5 bg-warm-gold text-white font-semibold rounded-full shadow-lg hover:bg-yellow-600 transition"
            >
              {whatWeDo.ctaText}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* ===== Background / Timeline ===== */}
      <section id="background" className="py-20 lg:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-deep-forest mb-12 text-center">
            {background.heading}
          </h2>
          <div className="relative border-l-2 border-emerald-green ml-6 md:ml-12">
            {background.timeline.map((item, i) => (
              <div key={i} className="mb-10 ml-8 md:ml-10">
                <div className="absolute w-4 h-4 bg-emerald-green rounded-full -left-[9px] mt-1.5" />
                <span className="text-warm-gold font-semibold text-sm uppercase tracking-wide">
                  {item.year}
                </span>
                <h3 className="text-xl font-bold text-deep-forest mt-1">{item.title}</h3>
                <p className="text-gray-600 mt-1">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Impact ===== */}
      <section id="impact" className="py-20 lg:py-28 bg-soft-bg">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-deep-forest mb-4">
            {impact.heading}
          </h2>
          {impact.subtitle && (
            <p className="text-gray-500 text-sm mb-10">{impact.subtitle}</p>
          )}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {impact.stats.map((stat, i) => (
              <div
                key={i}
                className="bg-white rounded-3xl shadow-xl p-5 sm:p-7 text-center border"
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

      {/* ===== Where We Work ===== */}
      <section id="where-we-work" className="py-20 lg:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-deep-forest mb-12 text-center">
            {whereWeWork.heading}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whereWeWork.locations.map((loc, i) => (
              <div
                key={i}
                className="card-hover bg-white rounded-2xl p-6 shadow-md border"
              >
                <h3 className="font-semibold text-lg text-deep-forest">{loc.name}</h3>
                <p className="text-gray-500 text-sm mt-1">{loc.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Transparency & Accountability ===== */}
      <section id="transparency" className="py-20 lg:py-28 bg-soft-bg">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-deep-forest mb-12 text-center">
            {transparency.heading}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {transparency.items.map((item, i) => (
              <div
                key={i}
                className="card-hover bg-white rounded-3xl p-6 shadow-md border text-center"
              >
                <h3 className="font-display font-bold text-lg text-deep-forest mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Partners ===== */}
      <section id="partners" className="py-16 lg:py-20 bg-white overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-deep-forest mb-10">
            {partners.heading}
          </h2>
          <div className="relative w-full overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
            <div className="marquee-wrapper">
              <div className="marquee-track">
                {[...partners.list, ...partners.list].map((partner, i) => (
                  <div key={i} className="partner-card">
                    <span className="partner-name">{partner.name}</span>
                    <span className="partner-label">{partner.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Governance & Leadership ===== */}
      <section id="governance" className="py-20 lg:py-28 bg-soft-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-deep-forest mb-4">
              {governance.heading}
            </h2>
            <p className="text-gray-600 text-lg">{governance.description}</p>
          </div>

          {/* Governance Columns */}
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-16">
            {governance.columns.map((col, i) => (
              <div
                key={i}
                className={`card-hover bg-white rounded-3xl p-8 shadow-lg border ${
                  col.highlight ? 'border-2 border-warm-gold/30 relative overflow-hidden' : 'border-gray-100'
                } text-center`}
              >
                {col.highlight && (
                  <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-warm-gold to-emerald-green" />
                )}
                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 ${
                    col.highlight ? 'bg-warm-gold/20' : 'bg-deep-forest/10'
                  }`}
                >
                  <span className="text-2xl">
                    {col.icon === 'user-group' && '👥'}
                    {col.icon === 'user' && '👤'}
                    {col.icon === 'light-bulb' && '💡'}
                  </span>
                </div>
                <h3 className="font-display text-xl font-bold text-deep-forest mb-3">{col.title}</h3>
                <p className="text-gray-500 text-sm">{col.description}</p>
              </div>
            ))}
          </div>

          {/* Executive Spotlight */}
          <div className="mb-16">
            <div className="bg-white rounded-4xl overflow-hidden shadow-2xl border border-gray-100 grid md:grid-cols-5">
              <div className="md:col-span-2 bg-gradient-to-br from-deep-forest to-emerald-green p-10 flex items-center justify-center min-h-[280px]">
                <div className="text-center">
                  <div className="w-32 h-32 rounded-full border-4 border-white/60 shadow-xl overflow-hidden mx-auto mb-4">
                    <img
                      src={governance.executive.image}
                      alt={governance.executive.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-2xl font-display font-bold text-white">
                    {governance.executive.name}
                  </h3>
                  <p className="text-warm-gold font-semibold text-sm">
                    {governance.executive.title}
                  </p>
                </div>
              </div>
              <div className="md:col-span-3 p-8 md:p-10 flex flex-col justify-center">
                <span className="text-xs text-emerald-green font-semibold uppercase tracking-wider mb-2">
                  Leadership
                </span>
                <p className="text-gray-600 leading-relaxed">{governance.executive.bio1}</p>
                <p className="text-gray-500 text-sm leading-relaxed mt-3">
                  {governance.executive.bio2}
                </p>
                <div className="flex flex-wrap items-center gap-4 mt-4">
                  <span className="text-xs text-gray-400">✉️ {governance.executive.email}</span>
                  <span className="text-xs text-gray-300 hidden sm:inline">|</span>
                  <span className="text-xs text-gray-400">📞 {governance.executive.phone}</span>
                </div>
              </div>
            </div>
          </div>

          {governance.teamCta.text && (
            <div className="text-center mt-10">
              <a
                href={governance.teamCta.link}
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-warm-gold text-white font-semibold rounded-full hover:bg-yellow-600 transition shadow-lg"
              >
                {governance.teamCta.text}
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}
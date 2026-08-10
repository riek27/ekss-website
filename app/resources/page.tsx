'use client';

import resourcesData from '@/data/resources.json';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ResourcesPage() {
  const { hero, featured, categories, donorsPartners, requestDocument, transparency } = resourcesData;

  return (
    <>
      <Header />

      {/* ===== Hero ===== */}
      <section
        className="relative h-[50vh] flex items-center justify-center overflow-hidden"
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

      {/* ===== Featured Resource ===== */}
      {featured && (
        <section className="py-16 lg:py-24 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-dark-section rounded-4xl overflow-hidden shadow-2xl grid md:grid-cols-5">
              <div className="md:col-span-2 image-zoom-wrapper h-64 md:h-full">
                <img src={featured.image} alt={featured.title} className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="md:col-span-3 p-8 md:p-10 flex flex-col justify-center">
                <span className="text-warm-gold font-semibold text-sm uppercase mb-2">Featured Publication</span>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-3">{featured.title}</h2>
                <p className="text-gray-300 mb-6">{featured.description}</p>
                <a
                  href={featured.link}
                  className="btn-gold-pulse inline-flex items-center self-start px-6 py-3 bg-warm-gold text-white font-semibold rounded-full shadow-lg hover:bg-yellow-600 transition"
                >
                  {featured.linkText}
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ===== Document Categories ===== */}
<section className="py-16 lg:py-24 bg-soft-bg">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    {categories.map((category) => (
      <div key={category.title} className="mb-16">
        {/* Category heading */}
        <div className="flex items-center gap-4 mb-8">
          <div className="h-10 w-1.5 rounded-full bg-emerald-green" />
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-deep-forest">
            {category.title}
          </h2>
        </div>

        {/* Documents flex container – centered, wrapping */}
        <div className="flex flex-wrap justify-center gap-6">
          {category.documents.map((doc, i) => (
            <div
              key={i}
              className="w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)] bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col hover:shadow-md transition-shadow group"
            >
              <div className="flex items-start justify-between mb-3">
                {/* Type badge */}
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-green/10 text-emerald-green uppercase">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  {doc.type}
                </span>
                <span className="text-xs text-gray-400">{doc.year}</span>
              </div>

              <h3 className="font-display font-bold text-lg text-deep-forest mb-2 group-hover:text-emerald-green transition-colors">
                {doc.title}
              </h3>
              {doc.description && (
                <p className="text-gray-500 text-sm mb-4 flex-1">{doc.description}</p>
              )}

              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                <span className="text-xs text-gray-400">{doc.fileSize}</span>
                <a
                  href={doc.file}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-warm-gold text-white text-sm font-semibold rounded-full hover:bg-yellow-600 transition shadow-sm"
                  download
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download PDF
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
</section>

      {/* ===== Donors & Partners ===== */}
      <section className="py-16 lg:py-20 bg-soft-bg">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-deep-forest mb-4">{donorsPartners.heading}</h2>
          <p className="text-gray-600 text-lg mb-8">{donorsPartners.text}</p>
          <div className="flex flex-wrap justify-center gap-4">
            {donorsPartners.buttons.map((btn, i) => (
              <a
                key={i}
                href={btn.link}
                className="inline-flex items-center px-6 py-3 bg-white border border-gray-200 rounded-full font-semibold text-deep-forest hover:bg-emerald-green hover:text-white hover:border-emerald-green transition shadow-sm"
              >
                {btn.text}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Request a Document ===== */}
      <section className="py-16 lg:py-24 bg-dark-section text-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">{requestDocument.heading}</h2>
          <p className="text-gray-300 text-lg mb-8">{requestDocument.text}</p>
          <a
            href={requestDocument.buttonLink}
            className="btn-gold-pulse inline-flex items-center px-8 py-3.5 bg-warm-gold text-white font-semibold rounded-full shadow-lg hover:bg-yellow-600 transition"
          >
            {requestDocument.buttonText}
          </a>
        </div>
      </section>

      {/* ===== Transparency Commitment ===== */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-deep-forest mb-4">{transparency.heading}</h2>
          <p className="text-gray-600 text-lg mb-8">{transparency.text}</p>
          <a
            href={transparency.ctaLink}
            className="inline-flex items-center px-8 py-3.5 bg-emerald-green text-white font-semibold rounded-full hover:bg-deep-forest transition shadow-lg"
          >
            {transparency.ctaText}
          </a>
        </div>
      </section>

      <Footer />
    </>
  );
}
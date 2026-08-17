'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function NewsPageClient({ data }: { data: any }) {
  const [expandedIds, setExpandedIds] = useState<number[]>([]);

  // Fade-up observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    );
    document.querySelectorAll('.fade-up').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const toggleExpand = (id: number) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const { hero, featured, items, cta } = data;

  const featuredItem = featured;
  const otherItems = items.filter((item: any) => item.id !== featuredItem?.id);

  return (
    <>
      <Header />

      {/* Hero */}
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

      {/* Featured */}
      {featuredItem && (
        <section className="py-16 lg:py-24 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <span className="text-emerald-green font-semibold text-sm uppercase tracking-wider">Featured Story</span>
            </div>
            <div className="bg-soft-bg rounded-4xl overflow-hidden shadow-2xl grid md:grid-cols-5">
              <div className="md:col-span-2 image-zoom-wrapper h-64 md:h-full">
                <img src={featuredItem.image} alt={featuredItem.title} className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="md:col-span-3 p-8 md:p-10 flex flex-col justify-center">
                <span className="text-warm-gold font-semibold text-sm uppercase">{featuredItem.date}</span>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-deep-forest mt-2 mb-4">{featuredItem.title}</h2>
                <p className="text-gray-600 mb-4">{featuredItem.excerpt}</p>
                {expandedIds.includes(featuredItem.id) && (
                  <div className="prose prose-sm text-gray-600 mt-2 whitespace-pre-line">
                    {featuredItem.content}
                  </div>
                )}
                <button
                  onClick={() => toggleExpand(featuredItem.id)}
                  className="inline-flex items-center gap-1 text-emerald-green font-semibold text-sm hover:text-deep-forest transition-colors mt-2"
                >
                  {expandedIds.includes(featuredItem.id) ? 'Read Less' : 'Read More'}
                  <svg
                    className={`w-4 h-4 transition-transform ${expandedIds.includes(featuredItem.id) ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Grid */}
      <section className="py-16 lg:py-24 bg-soft-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-deep-forest mb-10 text-center">Latest News</h2>
          {otherItems.length === 0 ? (
            <div className="text-center py-20 text-gray-500">No more articles yet.</div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {otherItems.map((item: any) => {
                const isExpanded = expandedIds.includes(item.id);
                return (
                  <article key={item.id} className="fade-up card-hover bg-white rounded-3xl overflow-hidden shadow-md border border-gray-100 flex flex-col">
                    {item.image && (
                      <div className="image-zoom-wrapper h-48 overflow-hidden">
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover" loading="lazy" />
                      </div>
                    )}
                    <div className="p-6 flex flex-col flex-1">
                      <span className="text-emerald-green font-semibold text-sm uppercase mb-2">{item.date}</span>
                      <h3 className="font-display font-bold text-lg text-deep-forest mb-2">{item.title}</h3>
                      {isExpanded ? (
                        <div className="prose prose-sm text-gray-600 flex-1 whitespace-pre-line">{item.content}</div>
                      ) : (
                        <p className="text-gray-600 flex-1">{item.excerpt}</p>
                      )}
                      <button
                        onClick={() => toggleExpand(item.id)}
                        className="inline-flex items-center gap-1 text-emerald-green font-semibold text-sm hover:text-deep-forest transition-colors mt-4"
                      >
                        {isExpanded ? 'Read Less' : 'Read More'}
                        <svg
                          className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-deep-forest mb-4">{cta.heading}</h2>
          <p className="text-gray-600 text-lg mb-10">{cta.text}</p>
          <div className="flex flex-wrap justify-center gap-4">
            {cta.buttons.map((btn: any, i: number) => (
              <a
                key={i}
                href={btn.link}
                className="inline-flex items-center px-8 py-3.5 bg-warm-gold text-white font-semibold rounded-full shadow-lg hover:bg-yellow-600 transition"
              >
                {btn.text}
              </a>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
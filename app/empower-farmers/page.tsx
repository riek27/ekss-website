'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function EmpowerFarmersPage() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch('/api/page-data?page=empower-farmers')
      .then(res => res.json())
      .then(json => {
        if (json && json.hero) setData(json);
      })
      .catch(console.error);
  }, []);

  if (!data) return null;

  const {
    hero,
    mission,
    challenge,
    future,
    strategy,
    methods,
    pfumvudza,
    impact,
    training,
    contact,
  } = data;

  return (
    <>
      <Header />

      {/* Hero */}
      <section
        className="relative min-h-[70vh] flex items-end overflow-hidden"
        style={{
          backgroundImage: `url(${hero.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-deep-forest/70" />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          {hero.logo && (
            <img src={hero.logo} alt="EFSS logo" className="h-20 w-auto mb-4" />
          )}
          <span className="inline-block px-4 py-1.5 bg-warm-gold/20 backdrop-blur-sm text-warm-gold text-xs font-semibold rounded-full uppercase">
            {hero.tagline}
          </span>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-4 mb-4">
            {hero.title}
          </h1>
          <p className="text-lg text-gray-200 max-w-2xl">{hero.subtitle}</p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl font-bold text-deep-forest mb-6">{mission.heading}</h2>
          <p className="text-gray-600 text-lg leading-relaxed">{mission.text}</p>
        </div>
      </section>

      {/* Challenge */}
      <section className="py-20 bg-soft-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold text-deep-forest mb-6">{challenge.heading}</h2>
          <p className="text-gray-600 leading-relaxed">{challenge.text}</p>
        </div>
      </section>

      {/* Future */}
<section className="py-20 bg-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="grid lg:grid-cols-2 gap-12 items-center">
      <div>
        <h2 className="font-display text-3xl font-bold text-deep-forest mb-6">{future.heading}</h2>
        <p className="text-gray-600 mb-6">{future.text}</p>
        <ul className="space-y-3">
          {future.items.map((item: string, i: number) => (
            <li key={i} className="flex items-start gap-2">
              <span className="text-emerald-green text-xl">✓</span>
              <span className="text-gray-600">{item}</span>
            </li>
          ))}
        </ul>
      </div>
      {future.image && (
        <div className="image-zoom-wrapper rounded-4xl overflow-hidden shadow-2xl">
          <img src={future.image} alt="Future vision" className="w-full h-80 lg:h-[420px] object-cover" loading="lazy" />
        </div>
      )}
    </div>
  </div>
</section>

      {/* Strategy */}
      <section className="py-20 bg-soft-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold text-deep-forest mb-4">{strategy.heading}</h2>
          <p className="text-gray-600 mb-10">{strategy.intro}</p>
          <div className="grid md:grid-cols-3 gap-6">
            {strategy.items.map((item: any, i: number) => (
              <div key={i} className="card-hover bg-white rounded-2xl p-6 shadow-md border">
                <span className="text-3xl block mb-3">{item.icon}</span>
                <h3 className="font-display font-bold text-lg text-deep-forest mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm">{item.description}</p>
                <span className="inline-block mt-4 text-emerald-green font-semibold text-sm">
                  {item.cta}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Methods */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold text-deep-forest mb-4">{methods.heading}</h2>
          <p className="text-gray-600 mb-10">{methods.intro}</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {methods.items.map((item: any, i: number) => (
              <div key={i} className="card-hover bg-soft-bg rounded-2xl p-6 shadow-sm border">
                <span className="text-2xl block mb-3">{item.icon}</span>
                <h3 className="font-display font-bold text-deep-forest mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pfumvudza */}
      <section className="py-20 bg-soft-bg">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold text-deep-forest mb-6">{pfumvudza.heading}</h2>
          <p className="text-gray-600 mb-8">{pfumvudza.text}</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {pfumvudza.stats.map((stat: any, i: number) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-md border text-center">
                <div className="text-3xl font-extrabold text-deep-forest">{stat.value}</div>
                <p className="text-sm text-gray-500 mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl font-bold text-deep-forest mb-8">{impact.heading}</h2>
          <div className="grid sm:grid-cols-3 gap-6 mb-8">
            {impact.stats.map((stat: any, i: number) => (
              <div key={i} className="bg-soft-bg rounded-2xl p-6">
                <div className="text-4xl font-extrabold text-deep-forest">{stat.value}</div>
                <p className="text-sm text-gray-600 mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
          <p className="text-gray-500 italic">{impact.note}</p>
        </div>
      </section>

      {/* Training Modules */}
      <section className="py-20 bg-soft-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold text-deep-forest mb-4">{training.heading}</h2>
          <p className="text-gray-600 mb-6">{training.intro}</p>
          <div className="grid sm:grid-cols-2 gap-4">
            {training.modules.map((module: string, i: number) => (
              <div key={i} className="bg-white rounded-lg p-4 shadow-sm border flex items-center gap-3">
                <span className="text-emerald-green font-bold">{i + 1}</span>
                <span className="text-gray-700">{module}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact / CTA */}
      <section className="py-20 bg-dark-section text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl font-bold mb-4">{contact.heading}</h2>
          <p className="mb-6">{contact.text}</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6">
            <a href={`mailto:${contact.email}`} className="inline-flex items-center px-6 py-3 bg-warm-gold text-white font-semibold rounded-full">
              {contact.email}
            </a>
            <a href={`tel:${contact.phone}`} className="inline-flex items-center px-6 py-3 bg-white/10 text-white font-semibold rounded-full border border-white/20">
              {contact.phone}
            </a>
          </div>
          <p className="text-sm text-gray-400">{contact.address}</p>
        </div>
      </section>

      <Footer />
    </>
  );
}
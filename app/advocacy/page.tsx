'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function AdvocacyPage() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch('/api/page-data?page=advocacy')
      .then(res => res.json())
      .then(json => {
        if (json && json.hero) setData(json);
      })
      .catch(console.error);
  }, []);

  if (!data) return null;

  const {
    hero,
    programme,
    civicInAction,
    pathway,
    impact,
    featuredInitiative,
    communityDialogues,
    inclusionParticipation,
    howWeWork,
    connectedPathways,
    partnersDonors,
    gallery,
    resources,
    supportCta,
    footerCta,
  } = data;

  return (
    <>
      <Header />

      {/* HERO */}
      <section
        className="relative min-h-[80vh] flex items-end overflow-hidden"
        style={{
          backgroundImage: `url(${hero.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-deep-forest/70" />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <span className="inline-block px-4 py-1.5 bg-warm-gold/20 backdrop-blur-sm text-warm-gold text-xs font-semibold rounded-full uppercase">
            {hero.tagline}
          </span>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-4 mb-4">
            {hero.title}
          </h1>
          <p className="text-lg text-gray-200 max-w-2xl">{hero.subtitle}</p>
          <div className="flex flex-wrap gap-4 mt-8">
            {hero.buttons.map((btn: any, i: number) => (
              <a
                key={i}
                href={btn.link}
                className={`${i === 0 ? 'bg-warm-gold text-white' : 'bg-white/15 backdrop-blur-sm text-white border-2 border-white/40'} px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition`}
              >
                {btn.text}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* PROGRAMME */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-emerald-green font-semibold text-sm uppercase tracking-wider">{programme.heading}</span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-deep-forest mt-3 mb-6">{programme.intro}</h2>
          <p className="text-gray-600 leading-relaxed mb-4">{programme.text1}</p>
          <p className="text-gray-600 leading-relaxed mb-4">{programme.text2}</p>
          <p className="text-gray-600 leading-relaxed">{programme.text3}</p>
        </div>
      </section>

      {/* CIVIC ENGAGEMENT IN ACTION */}
      <section id="civic-in-action" className="py-20 bg-soft-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-deep-forest mb-4">{civicInAction.heading}</h2>
          <p className="text-gray-600 mb-12 max-w-3xl">{civicInAction.intro}</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {civicInAction.cards.map((card: any, i: number) => (
              <div key={i} className="card-hover bg-white rounded-3xl p-6 shadow-md border flex flex-col">
                <span className="text-3xl block mb-3">{card.icon}</span>
                <h3 className="font-display font-bold text-lg text-deep-forest mb-2">{card.title}</h3>
                <p className="text-gray-500 text-sm flex-1">{card.description}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {card.tags.map((tag: string, j: number) => (
                    <span key={j} className="px-2 py-1 bg-emerald-green/10 text-emerald-green rounded-full text-xs font-semibold">{tag}</span>
                  ))}
                </div>
                <a href={card.link} className="inline-flex items-center mt-4 text-emerald-green font-semibold text-sm hover:text-deep-forest transition-colors">
                  Learn more →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PATHWAY */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-deep-forest mb-4">{pathway.heading}</h2>
          <p className="text-gray-600 mb-12">{pathway.intro}</p>
          <div className="grid md:grid-cols-4 gap-6">
            {pathway.steps.map((step: any, i: number) => (
              <div key={i} className="bg-soft-bg rounded-2xl p-6 relative">
                <span className="text-4xl font-extrabold text-emerald-green/30 absolute top-4 right-4">{step.number}</span>
                <h3 className="font-display font-bold text-xl text-deep-forest mb-2">{step.title}</h3>
                <p className="text-gray-500 text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* IMPACT */}
      <section className="py-20 bg-soft-bg">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-deep-forest mb-4">{impact.heading}</h2>
          <p className="text-gray-600 mb-10">{impact.intro}</p>
          <div className="grid sm:grid-cols-3 gap-6 mb-10">
            {impact.stats.map((stat: any, i: number) => (
              <div key={i} className="bg-white rounded-3xl p-6 shadow-md border text-center">
                <div className="text-4xl font-extrabold text-deep-forest">{stat.value}</div>
                <p className="text-gray-600 font-semibold mt-2">{stat.label}</p>
                <p className="text-sm text-gray-500 mt-1">{stat.description}</p>
              </div>
            ))}
          </div>
          <h3 className="font-display text-2xl font-bold text-deep-forest mb-4">{impact.resultsHeading}</h3>
          <div className="overflow-x-auto shadow-lg rounded-2xl border">
            <table className="w-full text-sm text-left">
              <thead className="bg-deep-forest text-white text-xs uppercase">
                <tr>
                  <th className="px-6 py-3">Metric</th>
                  <th className="px-6 py-3">Outcome</th>
                  <th className="px-6 py-3">Verification</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {impact.resultsRows.map((row: any, i: number) => (
                  <tr key={i}>
                    <td className="px-6 py-3 font-semibold text-deep-forest">{row.metric}</td>
                    <td className="px-6 py-3">{row.outcome}</td>
                    <td className="px-6 py-3 text-xs text-gray-500">{row.verification}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-500 mt-4 italic">{impact.resultsNote}</p>
        </div>
      </section>

      {/* FEATURED INITIATIVE */}
      <section id="featured-initiative" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-emerald-green font-semibold text-sm uppercase tracking-wider">Featured Initiative</span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-deep-forest mt-2 mb-4">{featuredInitiative.title}</h2>
              <p className="text-gray-600 mb-6">{featuredInitiative.subtitle}</p>
              <p className="text-gray-600 leading-relaxed mb-6">{featuredInitiative.description}</p>
              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                {featuredInitiative.points.map((point: any, i: number) => (
                  <div key={i} className="flex gap-2">
                    <span className="text-emerald-green text-xl">✓</span>
                    <div>
                      <p className="font-semibold text-deep-forest">{point.title}</p>
                      <p className="text-sm text-gray-500">{point.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <a href={featuredInitiative.ctaLink} className="btn-gold-pulse inline-flex items-center px-8 py-3.5 bg-warm-gold text-white font-semibold rounded-full shadow-lg hover:bg-yellow-600 transition">
                {featuredInitiative.ctaText}
              </a>
            </div>
            {featuredInitiative.image && (
              <div className="image-zoom-wrapper rounded-4xl overflow-hidden shadow-2xl">
                <img src={featuredInitiative.image} alt={featuredInitiative.title} className="w-full h-80 lg:h-[480px] object-cover" loading="lazy" />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* COMMUNITY DIALOGUES */}
      <section id="community-dialogues" className="py-20 bg-soft-bg">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-deep-forest mb-4">{communityDialogues.heading}</h2>
          <p className="text-gray-600 mb-6">{communityDialogues.intro}</p>
          <p className="text-gray-600 mb-10">{communityDialogues.description}</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {communityDialogues.participants.map((participant: any, i: number) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border">
                <h3 className="font-semibold text-lg text-deep-forest">{participant.title}</h3>
                <p className="text-gray-500 text-sm mt-2">{participant.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INCLUSION & PARTICIPATION */}
      <section id="inclusion-participation" className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-deep-forest mb-4">{inclusionParticipation.heading}</h2>
          <p className="text-gray-600 mb-10">{inclusionParticipation.intro}</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {inclusionParticipation.items.map((item: any, i: number) => (
              <div key={i} className="bg-soft-bg rounded-2xl p-6 shadow-sm border">
                <h3 className="font-semibold text-lg text-deep-forest">{item.title}</h3>
                <p className="text-gray-500 text-sm mt-2">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW WE WORK */}
      <section id="how-we-work" className="py-20 bg-soft-bg">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-deep-forest mb-4">{howWeWork.heading}</h2>
          <p className="text-gray-600 mb-10">{howWeWork.intro}</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {howWeWork.steps.map((step: any, i: number) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border">
                <h3 className="font-semibold text-lg text-deep-forest">{step.title}</h3>
                <p className="text-gray-500 text-sm mt-2">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONNECTED PATHWAYS */}
      <section id="connected-pathways" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-deep-forest mb-4">{connectedPathways.heading}</h2>
          <p className="text-gray-600 mb-12">{connectedPathways.intro}</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {connectedPathways.cards.map((card: any, i: number) => (
              <div key={i} className="card-hover bg-soft-bg rounded-2xl p-6 border">
                <span className="text-3xl block mb-3">{card.icon}</span>
                <h3 className="font-display font-bold text-lg text-deep-forest mb-2">{card.title}</h3>
                <p className="text-gray-500 text-sm mb-4">{card.description}</p>
                <a href={card.link} className="inline-flex items-center text-emerald-green font-semibold text-sm hover:text-deep-forest transition-colors">
                  {card.linkText} →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PARTNERS & DONORS */}
      <section className="py-20 bg-soft-bg">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-deep-forest mb-4">{partnersDonors.heading}</h2>
          <p className="text-gray-600 mb-10">{partnersDonors.intro}</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {partnersDonors.opportunities.map((item: any, i: number) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border">
                <h3 className="font-semibold text-lg text-deep-forest">{item.title}</h3>
                <p className="text-gray-500 text-sm mt-2">{item.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center">
            <a href={partnersDonors.ctaLink} className="inline-flex items-center px-8 py-3.5 bg-emerald-green text-white font-semibold rounded-full hover:bg-deep-forest transition shadow-lg">
              {partnersDonors.ctaText}
            </a>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      {gallery && gallery.images.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-deep-forest mb-8 text-center">{gallery.heading}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {gallery.images.map((img: string, i: number) => (
                <div key={i} className="rounded-2xl overflow-hidden shadow-lg image-zoom-wrapper">
                  <img src={img} alt="" className="w-full h-64 object-cover" loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* RESOURCES */}
      <section className="py-20 bg-soft-bg">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-deep-forest mb-4">{resources.heading}</h2>
          <p className="text-gray-600 mb-10">{resources.intro}</p>
          <div className="grid sm:grid-cols-3 gap-6 mb-10">
            {resources.items.map((item: any, i: number) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border">
                <h3 className="font-semibold text-lg text-deep-forest">{item.title}</h3>
                <p className="text-gray-500 text-sm mt-2">{item.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center">
            <a href={resources.ctaLink} className="inline-flex items-center text-emerald-green font-semibold hover:text-deep-forest transition-colors">
              {resources.ctaText}
            </a>
          </div>
        </div>
      </section>

      {/* SUPPORT CTA */}
      <section className="py-20 bg-dark-section text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">{supportCta.heading}</h2>
          <p className="text-gray-300 mb-10 max-w-2xl mx-auto">{supportCta.text}</p>
          <div className="grid sm:grid-cols-3 gap-6 mb-10">
            {supportCta.ways.map((way: any, i: number) => (
              <div key={i} className="bg-white/5 rounded-2xl p-6 backdrop-blur-sm">
                <h3 className="font-semibold text-lg text-white">{way.title}</h3>
                <p className="text-gray-400 text-sm mt-2">{way.description}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {supportCta.buttons.map((btn: any, i: number) => (
              <a key={i} href={btn.link} className={`${i === 0 ? 'bg-warm-gold text-white' : 'bg-white/10 border border-white/20 text-white'} px-8 py-3.5 font-semibold rounded-full shadow-lg hover:bg-opacity-90 transition`}>
                {btn.text}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-deep-forest mb-4">{footerCta.heading}</h2>
          <p className="text-gray-600 mb-8">{footerCta.text}</p>
          <div className="flex flex-wrap justify-center gap-4">
            {footerCta.buttons.map((btn: any, i: number) => (
              <a key={i} href={btn.link} className={`${i === 0 ? 'bg-warm-gold text-white' : 'bg-emerald-green text-white'} px-8 py-3.5 font-semibold rounded-full shadow-lg hover:shadow-xl transition`}>
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
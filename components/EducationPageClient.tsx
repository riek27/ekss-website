'use client';

import { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function EducationPageClient({ data }: { data: any }) {
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

  const {
    hero,
    glance,
    challenge,
    approach,
    programme,
    educationInAction,
    accessToOpportunity,
    impact,
    featuredProgramme,
    teacherDevelopment,
    poweringLearning,
    inclusiveEducation,
    educationCommunity,
    connectedPathways,
    partnersDonors,
    gallery,
    latestUpdates,
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

      {/* AT A GLANCE */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="font-display text-3xl font-bold text-deep-forest mb-8">{glance.heading}</h2>
          <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {glance.stats.map((stat: any, i: number) => (
              <div key={i} className="p-6 bg-soft-bg rounded-3xl">
                <div className="text-4xl font-extrabold text-deep-forest">{stat.value}</div>
                <p className="text-sm text-gray-600 mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CHALLENGE */}
      <section className="py-20 bg-soft-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold text-deep-forest mb-6">{challenge.heading}</h2>
          <p className="text-gray-600 leading-relaxed">{challenge.text}</p>
        </div>
      </section>

      {/* APPROACH */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold text-deep-forest mb-6">{approach.heading}</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {approach.items.map((item: any, i: number) => (
              <div key={i} className="flex gap-3">
                <span className="text-emerald-green text-2xl">•</span>
                <p className="text-gray-600">
                  <strong>{item.title}</strong> — {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROGRAMME */}
      <section className="py-20 bg-soft-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-emerald-green font-semibold text-sm uppercase tracking-wider">{programme.heading}</span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-deep-forest mt-3 mb-6">{programme.intro}</h2>
          <p className="text-gray-600 leading-relaxed mb-4">{programme.text1}</p>
          <p className="text-gray-600 leading-relaxed mb-4">{programme.text2}</p>
          <p className="text-gray-600 leading-relaxed">{programme.text3}</p>
        </div>
      </section>

      {/* EDUCATION IN ACTION */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-deep-forest mb-4">{educationInAction.heading}</h2>
          <p className="text-gray-600 mb-12 max-w-3xl">{educationInAction.intro}</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {educationInAction.cards.map((card: any, i: number) => (
              <div key={i} className="fade-up card-hover bg-white rounded-3xl p-6 shadow-md border flex flex-col">
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

      {/* FROM ACCESS TO OPPORTUNITY */}
      <section className="py-20 bg-soft-bg">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-deep-forest mb-4">{accessToOpportunity.heading}</h2>
          <p className="text-gray-600 mb-12">{accessToOpportunity.intro}</p>
          <div className="grid md:grid-cols-4 gap-6">
            {accessToOpportunity.steps.map((step: any, i: number) => (
              <div key={i} className="bg-white rounded-2xl p-6 relative">
                <span className="text-4xl font-extrabold text-emerald-green/30 absolute top-4 right-4">{step.number}</span>
                <h3 className="font-display font-bold text-xl text-deep-forest mb-2">{step.title}</h3>
                <p className="text-gray-500 text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* IMPACT */}
      <section id="impact" className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-deep-forest mb-4">{impact.heading}</h2>
          <p className="text-gray-600 mb-10">{impact.intro}</p>
          <div className="grid sm:grid-cols-3 gap-6 mb-10">
            {impact.stats.map((stat: any, i: number) => (
              <div key={i} className="bg-soft-bg rounded-3xl p-6 shadow-md border text-center">
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

      {/* FEATURED PROGRAMME */}
      <section id="featured-programme" className="py-20 bg-soft-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-emerald-green font-semibold text-sm uppercase tracking-wider">Featured Programme</span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-deep-forest mt-2 mb-4">{featuredProgramme.title}</h2>
              <p className="text-gray-600 mb-6">{featuredProgramme.subtitle}</p>
              <p className="text-gray-600 leading-relaxed mb-6">{featuredProgramme.description}</p>
              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                {featuredProgramme.points.map((point: any, i: number) => (
                  <div key={i} className="flex gap-2">
                    <span className="text-emerald-green text-xl">✓</span>
                    <div>
                      <p className="font-semibold text-deep-forest">{point.title}</p>
                      <p className="text-sm text-gray-500">{point.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-6 mb-8">
                {featuredProgramme.reachStats.map((stat: any, i: number) => (
                  <div key={i}>
                    <span className="text-3xl font-extrabold text-deep-forest">{stat.value}</span>
                    <p className="text-sm text-gray-500">{stat.label}</p>
                  </div>
                ))}
              </div>
              <a href={featuredProgramme.ctaLink} className="btn-gold-pulse inline-flex items-center px-8 py-3.5 bg-warm-gold text-white font-semibold rounded-full shadow-lg hover:bg-yellow-600 transition">
                {featuredProgramme.ctaText}
              </a>
            </div>
            {featuredProgramme.image && (
              <div className="image-zoom-wrapper rounded-4xl overflow-hidden shadow-2xl">
                <img src={featuredProgramme.image} alt={featuredProgramme.title} className="w-full h-80 lg:h-[480px] object-cover" loading="lazy" />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* TEACHER DEVELOPMENT */}
      <section id="teacher-development" className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-deep-forest mb-4">{teacherDevelopment.heading}</h2>
          <p className="text-gray-600 mb-8">{teacherDevelopment.intro}</p>
          <p className="text-gray-600 mb-8">{teacherDevelopment.text}</p>
          <div className="grid sm:grid-cols-3 gap-6">
            {teacherDevelopment.stats.map((stat: any, i: number) => (
              <div key={i} className="bg-soft-bg rounded-2xl p-6 text-center">
                <div className="text-2xl font-bold text-deep-forest">{stat.value}</div>
                <p className="text-sm text-gray-500 mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* POWERING LEARNING */}
      <section id="powering-learning" className="py-20 bg-soft-bg">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-deep-forest mb-4">{poweringLearning.heading}</h2>
          <p className="text-gray-600 mb-8">{poweringLearning.intro}</p>
          <p className="text-gray-600 mb-8">{poweringLearning.text}</p>
          <div className="grid sm:grid-cols-2 gap-6 mb-8">
            {poweringLearning.schools.map((school: any, i: number) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border">
                <h3 className="font-semibold text-lg text-deep-forest">{school.name}</h3>
                <p className="text-gray-500 text-sm mt-2">{school.description}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {poweringLearning.tags.map((tag: string, i: number) => (
              <span key={i} className="px-3 py-1 bg-emerald-green/10 text-emerald-green rounded-full text-xs font-semibold">{tag}</span>
            ))}
          </div>
        </div>
      </section>

      {/* INCLUSIVE EDUCATION */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-deep-forest mb-4">{inclusiveEducation.heading}</h2>
          <p className="text-gray-600 mb-10">{inclusiveEducation.intro}</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {inclusiveEducation.items.map((item: any, i: number) => (
              <div key={i} className="bg-soft-bg rounded-2xl p-6 shadow-sm border">
                <h3 className="font-semibold text-lg text-deep-forest">{item.title}</h3>
                <p className="text-gray-500 text-sm mt-2">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EDUCATION & COMMUNITY */}
      <section id="education-community" className="py-20 bg-soft-bg">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-deep-forest mb-4">{educationCommunity.heading}</h2>
          <p className="text-gray-600 mb-8">{educationCommunity.intro}</p>
          <p className="text-gray-600 mb-8">{educationCommunity.text}</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {educationCommunity.items.map((item: any, i: number) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border">
                <h3 className="font-semibold text-lg text-deep-forest">{item.title}</h3>
                <p className="text-gray-500 text-sm mt-2">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONNECTED PATHWAYS */}
      <section className="py-20 bg-white">
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
            {partnersDonors.items.map((item: any, i: number) => (
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

      {/* LATEST UPDATES */}
      <section className="py-20 bg-soft-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-deep-forest mb-4">{latestUpdates.heading}</h2>
          <p className="text-gray-600 mb-10">{latestUpdates.intro}</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {latestUpdates.cards.map((card: any, i: number) => (
              <div key={i} className="card-hover bg-white rounded-2xl p-6 shadow-sm border">
                <h3 className="font-semibold text-lg text-deep-forest">{card.title}</h3>
                <p className="text-gray-500 text-sm mt-2 mb-4">{card.description}</p>
                <a href={card.link} className="inline-flex items-center text-emerald-green font-semibold text-sm hover:text-deep-forest transition-colors">
                  Read the latest →
                </a>
              </div>
            ))}
          </div>
          <div className="text-center">
            <a href={latestUpdates.viewAllLink} className="inline-flex items-center px-8 py-3.5 bg-warm-gold text-white font-semibold rounded-full shadow-lg hover:bg-yellow-600 transition">
              {latestUpdates.viewAllText}
            </a>
          </div>
        </div>
      </section>

      {/* RESOURCES */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-deep-forest mb-4">{resources.heading}</h2>
          <p className="text-gray-600 mb-10">{resources.intro}</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {resources.items.map((item: any, i: number) => (
              <div key={i} className="bg-soft-bg rounded-2xl p-6 shadow-sm border">
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
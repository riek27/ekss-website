'use client';

import { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function EmpowerFarmersPageClient({ data }: { data: any }) {
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
    mission,
    challenge,
    future,
    philosophy,
    strategy,
    methods,
    pfumvudza,
    demonstrationFarming,
    pfumvudzaPractice,
    impact,
    sequentialTraining,
    trainTheTrainer,
    nationalAdoption,
    agroforestry,
    focusAreas,
    fieldToMarket,
    youthAgriculture,
    efssInAction,
    efssModel,
    supervisionQuality,
    partnersEngagement,
    resources,
    latestFromField,
    journey,
    whyConservationAg,
    vision,
    contactEfss,
    supportFarming,
    finalCta,
  } = data;

  return (
    <>
      <Header />

      {/* HERO */}
      <section
        className="relative min-h-[90vh] flex items-end overflow-hidden"
        style={{
          backgroundImage: `url(${hero.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-deep-forest/70" />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          {hero.logo && (
            <img src={hero.logo} alt="EFSS logo" className="h-20 w-auto mb-6" />
          )}
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold text-deep-forest mb-4 text-center">{glance.heading}</h2>
          <p className="text-gray-600 text-center mb-12">{glance.intro}</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {glance.stats.map((stat: any, i: number) => (
              <div key={i} className="bg-soft-bg rounded-3xl p-6 text-center">
                <div className="text-4xl font-extrabold text-deep-forest">{stat.value}</div>
                <p className="text-sm text-gray-600 mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MISSION */}
      <section className="py-20 bg-soft-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-emerald-green font-semibold text-sm uppercase tracking-wider">{mission.heading}</span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-deep-forest mt-3 mb-6">{mission.intro}</h2>
          <p className="text-gray-600 leading-relaxed mb-4">{mission.text1}</p>
          <p className="text-gray-600 leading-relaxed mb-4">{mission.text2}</p>
          <p className="text-gray-600 leading-relaxed">{mission.text3}</p>
        </div>
      </section>

      {/* CHALLENGE */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold text-deep-forest mb-6">{challenge.heading}</h2>
          <p className="text-gray-600 font-semibold mb-4">{challenge.intro}</p>
          <p className="text-gray-600 leading-relaxed mb-6">{challenge.text}</p>
          <ul className="space-y-2 mb-6">
            {challenge.bullets.map((bullet: string, i: number) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-emerald-green font-bold">•</span>
                <span className="text-gray-600">{bullet}</span>
              </li>
            ))}
          </ul>
          <p className="text-deep-forest font-semibold">{challenge.conclusion}</p>
        </div>
      </section>

      {/* FUTURE */}
      <section className="py-20 bg-soft-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold text-deep-forest mb-4 text-center">{future.heading}</h2>
          <p className="text-gray-600 text-center mb-12">{future.intro}</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {future.items.map((item: any, i: number) => (
              <div key={i} className="bg-white rounded-3xl p-6 shadow-md border flex flex-col items-center text-center">
                <span className="text-3xl block mb-3">{item.icon}</span>
                <h3 className="font-display font-bold text-lg text-deep-forest mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold text-deep-forest mb-4 text-center">{philosophy.heading}</h2>
          <p className="text-gray-600 text-center mb-12">{philosophy.intro}</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {philosophy.items.map((item: any, i: number) => (
              <div key={i} className="bg-soft-bg rounded-2xl p-6 shadow-sm border">
                <span className="text-3xl block mb-3">{item.icon}</span>
                <h3 className="font-semibold text-lg text-deep-forest">{item.title}</h3>
                <p className="text-gray-500 text-sm mt-2">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STRATEGY */}
      <section className="py-20 bg-soft-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-deep-forest mb-4 text-center">{strategy.heading}</h2>
          <p className="text-gray-600 text-center mb-12">{strategy.intro}</p>
          <div className="grid md:grid-cols-3 gap-6">
            {strategy.items.map((item: any, i: number) => (
              <div key={i} className="bg-white rounded-3xl p-6 shadow-md border flex flex-col">
                <span className="text-4xl font-extrabold text-emerald-green/30">{item.number}</span>
                <h3 className="font-display font-bold text-xl text-deep-forest mt-2 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500 font-semibold mb-3">{item.subtitle}</p>
                <p className="text-gray-600 text-sm mb-4 flex-1">{item.description}</p>
                {item.bullets.length > 0 && (
                  <ul className="text-sm text-gray-600 space-y-1 mb-4">
                    {item.bullets.map((bullet: string, j: number) => (
                      <li key={j} className="flex items-start gap-1">
                        <span className="text-emerald-green">✓</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}
                <a href={item.ctaLink} className="inline-flex items-center text-emerald-green font-semibold text-sm hover:text-deep-forest transition-colors">
                  {item.ctaText}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* METHODS */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold text-deep-forest mb-4 text-center">{methods.heading}</h2>
          <p className="text-gray-600 text-center mb-12">{methods.intro}</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {methods.principles.map((principle: any, i: number) => (
              <div key={i} className="bg-soft-bg rounded-2xl p-6 shadow-sm border">
                <h3 className="font-display font-bold text-lg text-deep-forest mb-2">{principle.title}</h3>
                <p className="text-gray-500 text-sm">{principle.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PFUMVUDZA */}
      <section className="py-20 bg-soft-bg">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold text-deep-forest mb-4 text-center">{pfumvudza.heading}</h2>
          <p className="text-gray-600 text-center mb-6">{pfumvudza.intro}</p>
          <p className="text-gray-600 text-center mb-12 max-w-3xl mx-auto">{pfumvudza.text}</p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {pfumvudza.stats.map((stat: any, i: number) => (
              <div key={i} className="bg-white rounded-2xl p-4 shadow-sm border text-center">
                <div className="text-2xl font-extrabold text-deep-forest">{stat.value}</div>
                <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DEMONSTRATION FARMING */}
      <section id="demonstration-farming" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <span className="text-emerald-green font-semibold text-sm uppercase tracking-wider">{demonstrationFarming.heading}</span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-deep-forest mt-3 mb-6">{demonstrationFarming.intro}</h2>
              <p className="text-gray-600 leading-relaxed mb-8">{demonstrationFarming.text}</p>
              <div className="space-y-4 mb-8">
                {demonstrationFarming.whatWeDo.map((item: any, i: number) => (
                  <div key={i} className="flex gap-2">
                    <span className="text-emerald-green text-xl">✓</span>
                    <div>
                      <p className="font-semibold text-deep-forest">{item.title}</p>
                      <p className="text-sm text-gray-500">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-gray-600 mb-8">{demonstrationFarming.whyItMatters}</p>
              <a href={demonstrationFarming.ctaLink} className="inline-flex items-center px-6 py-3 bg-warm-gold text-white font-semibold rounded-full shadow-lg hover:bg-yellow-600 transition">
                {demonstrationFarming.ctaText}
              </a>
            </div>
            {demonstrationFarming.image && (
              <div className="image-zoom-wrapper rounded-4xl overflow-hidden shadow-2xl">
                <img src={demonstrationFarming.image} alt="Demonstration Farming" className="w-full h-80 lg:h-[480px] object-cover" loading="lazy" />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* PFUMVUDZA IN PRACTICE */}
      <section className="py-20 bg-soft-bg">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold text-deep-forest mb-4 text-center">{pfumvudzaPractice.heading}</h2>
          <p className="text-gray-600 text-center mb-12">{pfumvudzaPractice.intro}</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {pfumvudzaPractice.steps.map((step: any, i: number) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border relative">
                <span className="text-4xl font-extrabold text-emerald-green/30 absolute top-4 right-4">{step.number}</span>
                <h3 className="font-display font-bold text-lg text-deep-forest mb-2">{step.title}</h3>
                <p className="text-gray-500 text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* IMPACT */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl font-bold text-deep-forest mb-4">{impact.heading}</h2>
          <p className="text-gray-600 mb-12">{impact.intro}</p>
          <div className="grid sm:grid-cols-3 gap-6 mb-10">
            {impact.stats.map((stat: any, i: number) => (
              <div key={i} className="bg-soft-bg rounded-3xl p-6 shadow-md border">
                <div className="text-4xl font-extrabold text-deep-forest">{stat.value}</div>
                <p className="text-gray-600 font-semibold mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
          <p className="text-gray-600 max-w-3xl mx-auto">{impact.fromPilotToScale}</p>
        </div>
      </section>

      {/* SEQUENTIAL TRAINING */}
      <section className="py-20 bg-soft-bg">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold text-deep-forest mb-4 text-center">{sequentialTraining.heading}</h2>
          <p className="text-gray-600 text-center mb-12">{sequentialTraining.intro}</p>
          <div className="space-y-6">
            {sequentialTraining.steps.map((step: any, i: number) => (
              <div key={i} className="flex items-start gap-4">
                <span className="text-3xl font-extrabold text-emerald-green/40">{step.number}</span>
                <div>
                  <h3 className="font-display font-bold text-lg text-deep-forest">{step.title}</h3>
                  <p className="text-gray-500 text-sm">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRAIN-THE-TRAINER */}
      <section id="train-the-trainer" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <span className="text-emerald-green font-semibold text-sm uppercase tracking-wider">{trainTheTrainer.heading}</span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-deep-forest mt-3 mb-6">{trainTheTrainer.intro}</h2>
              <p className="text-gray-600 leading-relaxed mb-8">{trainTheTrainer.text}</p>
              <div className="space-y-4 mb-8">
                {trainTheTrainer.whatWeDo.map((item: any, i: number) => (
                  <div key={i} className="flex gap-2">
                    <span className="text-emerald-green text-xl">✓</span>
                    <div>
                      <p className="font-semibold text-deep-forest">{item.title}</p>
                      <p className="text-sm text-gray-500">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-gray-600 mb-8">{trainTheTrainer.whyItMatters}</p>
              <a href={trainTheTrainer.ctaLink} className="inline-flex items-center px-6 py-3 bg-warm-gold text-white font-semibold rounded-full shadow-lg hover:bg-yellow-600 transition">
                {trainTheTrainer.ctaText}
              </a>
            </div>
            {trainTheTrainer.image && (
              <div className="image-zoom-wrapper rounded-4xl overflow-hidden shadow-2xl">
                <img src={trainTheTrainer.image} alt="Train the Trainer" className="w-full h-80 lg:h-[480px] object-cover" loading="lazy" />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* NATIONAL ADOPTION */}
      <section id="national-adoption" className="py-20 bg-soft-bg">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold text-deep-forest mb-4 text-center">{nationalAdoption.heading}</h2>
          <p className="text-gray-600 text-center mb-12">{nationalAdoption.intro}</p>
          <p className="text-gray-600 mb-10 text-center max-w-3xl mx-auto">{nationalAdoption.text}</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {nationalAdoption.whatWeDo.map((item: any, i: number) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border">
                <h3 className="font-semibold text-lg text-deep-forest">{item.title}</h3>
                <p className="text-gray-500 text-sm mt-2">{item.description}</p>
              </div>
            ))}
          </div>
          <p className="text-gray-600 text-center">{nationalAdoption.whyItMatters}</p>
          <div className="text-center mt-8">
            <a href={nationalAdoption.ctaLink} className="inline-flex items-center px-6 py-3 bg-emerald-green text-white font-semibold rounded-full hover:bg-deep-forest transition shadow-lg">
              {nationalAdoption.ctaText}
            </a>
          </div>
        </div>
      </section>

      {/* AGROFORESTRY & CLIMATE */}
      <section id="agroforestry-climate" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <span className="text-emerald-green font-semibold text-sm uppercase tracking-wider">{agroforestry.heading}</span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-deep-forest mt-3 mb-6">{agroforestry.intro}</h2>
              <p className="text-gray-600 leading-relaxed mb-8">{agroforestry.text}</p>
              <div className="space-y-4 mb-8">
                {agroforestry.whatWeDo.map((item: any, i: number) => (
                  <div key={i} className="flex gap-2">
                    <span className="text-emerald-green text-xl">✓</span>
                    <div>
                      <p className="font-semibold text-deep-forest">{item.title}</p>
                      <p className="text-sm text-gray-500">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-gray-600 mb-8">{agroforestry.whyItMatters}</p>
              <a href={agroforestry.ctaLink} className="inline-flex items-center px-6 py-3 bg-warm-gold text-white font-semibold rounded-full shadow-lg hover:bg-yellow-600 transition">
                {agroforestry.ctaText}
              </a>
            </div>
            {agroforestry.image && (
              <div className="image-zoom-wrapper rounded-4xl overflow-hidden shadow-2xl">
                <img src={agroforestry.image} alt="Agroforestry" className="w-full h-80 lg:h-[480px] object-cover" loading="lazy" />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FOCUS AREAS */}
      <section className="py-20 bg-soft-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-deep-forest mb-4 text-center">{focusAreas.heading}</h2>
          <p className="text-gray-600 text-center mb-12">{focusAreas.intro}</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {focusAreas.items.map((item: any, i: number) => (
              <div key={i} className="card-hover bg-white rounded-2xl p-6 shadow-sm border flex flex-col">
                <span className="text-3xl block mb-3">{item.icon}</span>
                <h3 className="font-display font-bold text-lg text-deep-forest mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm flex-1">{item.description}</p>
                <a href={item.link} className="inline-flex items-center mt-4 text-emerald-green font-semibold text-sm hover:text-deep-forest transition-colors">
                  {item.linkText}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FIELD TO MARKET */}
      <section id="field-to-market" className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold text-deep-forest mb-4 text-center">{fieldToMarket.heading}</h2>
          <p className="text-gray-600 text-center mb-12">{fieldToMarket.intro}</p>
          <p className="text-gray-600 mb-10 text-center">{fieldToMarket.text}</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {fieldToMarket.items.map((item: any, i: number) => (
              <div key={i} className="bg-soft-bg rounded-2xl p-6 shadow-sm border">
                <h3 className="font-semibold text-lg text-deep-forest">{item.title}</h3>
                <p className="text-gray-500 text-sm mt-2">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* YOUTH & AGRICULTURE */}
      <section className="py-20 bg-soft-bg">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold text-deep-forest mb-4 text-center">{youthAgriculture.heading}</h2>
          <p className="text-gray-600 text-center mb-12">{youthAgriculture.intro}</p>
          <p className="text-gray-600 mb-10 text-center">{youthAgriculture.text}</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {youthAgriculture.items.map((item: any, i: number) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border">
                <h3 className="font-semibold text-lg text-deep-forest">{item.title}</h3>
                <p className="text-gray-500 text-sm mt-2">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EFSS IN ACTION */}
      <section id="efss-in-action" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-deep-forest mb-4 text-center">{efssInAction.heading}</h2>
          <p className="text-gray-600 text-center mb-12">{efssInAction.intro}</p>
          <div className="relative rounded-4xl overflow-hidden shadow-2xl mb-12">
            {efssInAction.featuredImage && (
              <img src={efssInAction.featuredImage} alt={efssInAction.featuredCaption} className="w-full h-96 object-cover" loading="lazy" />
            )}
            <div className="absolute inset-0 bg-deep-forest/60 flex items-end">
              <div className="p-6 md:p-10">
                <p className="font-display text-2xl md:text-3xl font-bold text-white mb-2">{efssInAction.featuredCaption}</p>
                <p className="text-gray-200 max-w-2xl">{efssInAction.featuredText}</p>
              </div>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {efssInAction.gallery.map((item: any, i: number) => (
              <div key={i} className="rounded-2xl overflow-hidden shadow-md image-zoom-wrapper">
                <img src={item.image} alt={item.caption} className="w-full h-56 object-cover" loading="lazy" />
                <p className="bg-white p-3 text-sm text-gray-600">{item.caption}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EFSS MODEL */}
      <section className="py-20 bg-soft-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold text-deep-forest mb-4 text-center">{efssModel.heading}</h2>
          <p className="text-gray-600 text-center mb-12">{efssModel.intro}</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {efssModel.steps.map((step: any, i: number) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border relative">
                <span className="text-4xl font-extrabold text-emerald-green/30 absolute top-4 right-4">{i + 1}</span>
                <h3 className="font-display font-bold text-xl text-deep-forest mb-2">{step.title}</h3>
                <p className="text-gray-500 text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SUPERVISION & QUALITY */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold text-deep-forest mb-4 text-center">{supervisionQuality.heading}</h2>
          <p className="text-gray-600 text-center mb-12">{supervisionQuality.intro}</p>
          <p className="text-gray-600 mb-10 text-center max-w-3xl mx-auto">{supervisionQuality.text}</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {supervisionQuality.items.map((item: any, i: number) => (
              <div key={i} className="bg-soft-bg rounded-2xl p-6 shadow-sm border">
                <h3 className="font-semibold text-lg text-deep-forest">{item.title}</h3>
                <p className="text-gray-500 text-sm mt-2">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PARTNERS & ENGAGEMENT */}
      <section className="py-20 bg-soft-bg">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold text-deep-forest mb-4 text-center">{partnersEngagement.heading}</h2>
          <p className="text-gray-600 text-center mb-12">{partnersEngagement.intro}</p>
          <p className="text-gray-600 mb-10 text-center">{partnersEngagement.text}</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {partnersEngagement.items.map((item: any, i: number) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border">
                <h3 className="font-semibold text-lg text-deep-forest">{item.title}</h3>
                <p className="text-gray-500 text-sm mt-2">{item.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center">
            <a href={partnersEngagement.ctaLink} className="inline-flex items-center px-8 py-3.5 bg-emerald-green text-white font-semibold rounded-full hover:bg-deep-forest transition shadow-lg">
              {partnersEngagement.ctaText}
            </a>
          </div>
        </div>
      </section>

      {/* RESOURCES */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold text-deep-forest mb-4 text-center">{resources.heading}</h2>
          <p className="text-gray-600 text-center mb-12">{resources.intro}</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
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

      {/* LATEST FROM FIELD */}
      <section className="py-20 bg-soft-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold text-deep-forest mb-4 text-center">{latestFromField.heading}</h2>
          <p className="text-gray-600 text-center mb-12">{latestFromField.intro}</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {latestFromField.cards.map((card: any, i: number) => (
              <div key={i} className="card-hover bg-white rounded-2xl p-6 shadow-sm border">
                <h3 className="font-semibold text-lg text-deep-forest">{card.title}</h3>
                <p className="text-gray-500 text-sm mt-2 mb-4">{card.description}</p>
                <a href={card.link} className="inline-flex items-center text-emerald-green font-semibold text-sm hover:text-deep-forest transition-colors">
                  Read more →
                </a>
              </div>
            ))}
          </div>
          <div className="text-center">
            <a href={latestFromField.viewAllLink} className="inline-flex items-center px-8 py-3.5 bg-warm-gold text-white font-semibold rounded-full shadow-lg hover:bg-yellow-600 transition">
              {latestFromField.viewAllText}
            </a>
          </div>
        </div>
      </section>

      {/* JOURNEY */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold text-deep-forest mb-4 text-center">{journey.heading}</h2>
          <p className="text-gray-600 text-center mb-12">{journey.intro}</p>
          <div className="relative border-l-2 border-emerald-green ml-6 md:ml-12">
            {journey.timeline.map((item: any, i: number) => (
              <div key={i} className="mb-10 ml-8 md:ml-10">
                <div className="absolute w-4 h-4 bg-emerald-green rounded-full -left-[9px] mt-1.5" />
                <span className="text-warm-gold font-semibold text-sm uppercase">{item.year}</span>
                <h3 className="text-xl font-bold text-deep-forest mt-1">{item.title}</h3>
                <p className="text-gray-600 mt-1">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CONSERVATION AG */}
      <section className="py-20 bg-soft-bg">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold text-deep-forest mb-4 text-center">{whyConservationAg.heading}</h2>
          <p className="text-gray-600 text-center mb-12">{whyConservationAg.intro}</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyConservationAg.items.map((item: any, i: number) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border">
                <h3 className="font-semibold text-lg text-deep-forest">{item.title}</h3>
                <p className="text-gray-500 text-sm mt-2">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VISION */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl font-bold text-deep-forest mb-4">{vision.heading}</h2>
          <p className="text-gray-600 mb-6">{vision.intro}</p>
          <p className="text-gray-600 mb-10">{vision.text}</p>
          <ul className="space-y-2 max-w-xl mx-auto text-left">
            {vision.items.map((item: string, i: number) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-emerald-green font-bold">✓</span>
                <span className="text-gray-600">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CONTACT EFSS */}
      <section id="contact-efss" className="py-20 bg-soft-bg">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold text-deep-forest mb-4 text-center">{contactEfss.heading}</h2>
          <p className="text-gray-600 text-center mb-12">{contactEfss.intro}</p>
          <p className="text-gray-600 text-center mb-10">{contactEfss.text}</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {contactEfss.audiences.map((aud: any, i: number) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border">
                <h3 className="font-semibold text-lg text-deep-forest">{aud.title}</h3>
                <p className="text-gray-500 text-sm mt-2">{aud.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center space-y-4">
            <p className="text-gray-600"><strong>Email:</strong> <a href={`mailto:${contactEfss.email}`} className="text-emerald-green">{contactEfss.email}</a></p>
            <p className="text-gray-600"><strong>Phone:</strong> <a href={`tel:${contactEfss.phone}`} className="text-emerald-green">{contactEfss.phone}</a></p>
            <p className="text-gray-600 whitespace-pre-line">{contactEfss.address}</p>
            <a href={contactEfss.ctaLink} className="inline-flex items-center px-8 py-3.5 bg-warm-gold text-white font-semibold rounded-full shadow-lg hover:bg-yellow-600 transition">
              {contactEfss.ctaText}
            </a>
          </div>
        </div>
      </section>

      {/* SUPPORT FARMING */}
      <section className="py-20 bg-dark-section text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">{supportFarming.heading}</h2>
          <p className="text-gray-300 mb-10 max-w-2xl mx-auto">{supportFarming.intro}</p>
          <p className="text-gray-300 mb-10 max-w-2xl mx-auto">{supportFarming.text}</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {supportFarming.ways.map((way: any, i: number) => (
              <div key={i} className="bg-white/5 rounded-2xl p-6 backdrop-blur-sm">
                <h3 className="font-semibold text-lg text-white">{way.title}</h3>
                <p className="text-gray-400 text-sm mt-2">{way.description}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {supportFarming.buttons.map((btn: any, i: number) => (
              <a key={i} href={btn.link} className={`${i === 0 ? 'bg-warm-gold text-white' : 'bg-white/10 border border-white/20 text-white'} px-8 py-3.5 font-semibold rounded-full shadow-lg hover:bg-opacity-90 transition`}>
                {btn.text}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-deep-forest mb-4">{finalCta.heading}</h2>
          <p className="text-gray-600 mb-2">{finalCta.text}</p>
          <p className="text-gray-500 text-sm mb-8">{finalCta.subtext}</p>
          <div className="flex flex-wrap justify-center gap-4">
            {finalCta.buttons.map((btn: any, i: number) => (
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
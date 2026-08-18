'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function HomePageClient({ data }: { data: any }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [backToTopVisible, setBackToTopVisible] = useState(false);
  const homeData = data;

  // Hero slider
  useEffect(() => {
    if (!homeData?.hero?.images || homeData.hero.images.length <= 1) return;
    const validImages = homeData.hero.images.filter((img: string) => img && img.trim() !== '');
    if (validImages.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % validImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [homeData?.hero?.images]);

  // Back to top button visibility
  useEffect(() => {
    const handleScroll = () => setBackToTopVisible(window.scrollY > 600);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
  }, [homeData]);

  // Counter animation
  useEffect(() => {
    if (!homeData) return;
    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const target = parseInt(el.dataset.target || '0', 10);
            let start: number | null = null;
            el.textContent = '0';
            const step = (ts: number) => {
              if (!start) start = ts;
              const progress = Math.min((ts - start) / 2000, 1);
              el.textContent = Math.round(progress * target).toString();
              if (progress < 1) requestAnimationFrame(step);
              else el.textContent = target.toString();
            };
            requestAnimationFrame(step);
            counterObserver.unobserve(el);
          }
        });
      },
      { threshold: 0.5 }
    );
    document.querySelectorAll('.counter-value').forEach((el) => counterObserver.observe(el));
    return () => counterObserver.disconnect();
  }, [homeData]);

  const {
    hero,
    stats,
    about,
    board,
    programs,
    scholarSpotlight,
    featuredProject,
    resultsLedger,
    news,
    donate,
    partners,
    getInvolved,
    contact,
  } = homeData;

  const validHeroImages = hero.images.filter((img: string) => img && img.trim() !== '');

  return (
    <>
      <Header />

      {/* Hero slider */}
      <section id="home" className="relative min-h-screen flex items-center overflow-hidden" style={{ paddingTop: '5rem' }}>
        {validHeroImages.map((img: string, index: number) => (
          <div key={index} className={`hero-slide ${index === currentSlide % validHeroImages.length ? 'active' : ''}`}>
            <img src={img} alt={`Slide ${index + 1}`} className="w-full h-full object-cover" />
          </div>
        ))}
        <div className="hero-overlay absolute inset-0 z-10"></div>
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 lg:py-40 w-full">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-1.5 bg-warm-gold/20 backdrop-blur-sm text-warm-gold text-xs sm:text-sm font-semibold rounded-full mb-6 uppercase border border-warm-gold/30">
              {hero.tagline}
            </span>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6"
              dangerouslySetInnerHTML={{ __html: hero.title.replace(/\n/g, '<br/>') }} />
            <p className="text-lg sm:text-xl text-gray-200 leading-relaxed mb-8 max-w-xl">{hero.subtitle}</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="/get-involved" className="btn-gold-pulse inline-flex items-center justify-center px-7 py-3.5 bg-warm-gold text-white font-semibold rounded-full shadow-xl hover:bg-yellow-600 transition text-base">
                Fund a programme
              </a>
              <a href="/resources" className="inline-flex items-center justify-center px-7 py-3.5 bg-white/15 backdrop-blur-sm text-white font-semibold rounded-full border-2 border-white/40 hover:bg-white/25 transition text-base">
                Review our documents
              </a>
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce">
          <svg className="w-8 h-8 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/></svg>
        </div>
      </section>

      {/* Stats */}
      <section className="relative -mt-20 z-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {stats.map((stat: any, i: number) => (
              <div key={i} className="fade-up bg-white rounded-3xl shadow-xl p-5 sm:p-7 text-center border">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-deep-forest counter-value mb-1" data-target={stat.value}>0</div>
                <p className="text-xs sm:text-sm text-gray-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="fade-up image-zoom-wrapper rounded-4xl overflow-hidden shadow-2xl">
              <img src={about.image} alt="About" className="w-full h-80 lg:h-[480px] object-cover" loading="lazy" />
            </div>
            <div className="fade-up fade-up-delay-2">
              <span className="text-emerald-green font-semibold text-sm uppercase tracking-wider">Who We Are</span>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-deep-forest mt-3 mb-6"
                dangerouslySetInnerHTML={{ __html: about.heading.replace(/\n/g, '<br/>') }} />
              <p className="text-gray-600 leading-relaxed mb-5">{about.description1}</p>
              <p className="text-gray-600 leading-relaxed mb-8">{about.description2}</p>
              <a href="/about#governance" className="inline-flex items-center gap-2 text-emerald-green font-semibold hover:text-deep-forest transition-colors group">
                {about.ctaText} <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Board */}
      <section id="board-leadership" className="py-20 lg:py-28 bg-soft-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-emerald-green font-semibold text-sm uppercase tracking-wider">Governance</span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-deep-forest mt-3 mb-5">{board.heading}</h2>
            <p className="text-gray-600 text-lg leading-relaxed">{board.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-16">
            {board.columns.map((col: any, i: number) => (
              <div key={i} className={`fade-up card-hover bg-white rounded-3xl p-8 shadow-lg border border-gray-100 text-center ${col.highlight ? 'border-2 border-warm-gold/30 relative overflow-hidden' : ''}`}
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                {col.highlight && (
                  <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-warm-gold to-emerald-green"></div>
                )}
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 ${col.highlight ? 'bg-warm-gold/20' : 'bg-deep-forest/10'}`}>
                  {col.icon === 'user-group' && (
                    <svg className="w-8 h-8 text-deep-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21v-2a4 4 0 00-4-4H9a4 4 0 00-4 4v2m8-10a4 4 0 11-8 0 4 4 0 018 0z"/></svg>
                  )}
                  {col.icon === 'user' && (
                    <svg className="w-8 h-8 text-warm-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
                  )}
                  {col.icon === 'light-bulb' && (
                    <svg className="w-8 h-8 text-emerald-green" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>
                  )}
                </div>
                <h3 className="font-display text-xl font-bold text-deep-forest mb-3">{col.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{col.description}</p>
                {col.executive && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Executive Director</p>
                    <p className="font-display font-bold text-deep-forest text-base mt-1">{col.executive.name}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Executive Director Spotlight */}
          <div className="fade-up mb-16">
            <div className="bg-white rounded-4xl overflow-hidden shadow-2xl border border-gray-100 grid md:grid-cols-5">
              <div className="md:col-span-2 bg-gradient-to-br from-deep-forest to-emerald-green p-10 flex items-center justify-center min-h-[280px]">
                <div className="text-center">
                  <div className="w-32 h-32 rounded-full border-4 border-white/60 shadow-xl overflow-hidden mx-auto mb-4">
                    <img src={board.executiveSpotlight.image} alt={board.executiveSpotlight.name} className="w-full h-full object-cover" />
                  </div>
                  <h3 className="text-2xl font-display font-bold text-white">{board.executiveSpotlight.name}</h3>
                  <p className="text-warm-gold font-semibold text-sm">{board.executiveSpotlight.title}</p>
                </div>
              </div>
              <div className="md:col-span-3 p-8 md:p-10 flex flex-col justify-center">
                <span className="text-xs text-emerald-green font-semibold uppercase tracking-wider mb-2">Leadership</span>
                <p className="text-gray-600 leading-relaxed">{board.executiveSpotlight.bio1}</p>
                <p className="text-gray-500 text-sm leading-relaxed mt-3">{board.executiveSpotlight.bio2}</p>
                <div className="flex flex-wrap items-center gap-4 mt-4">
                  <span className="text-xs text-gray-400">✉️ {board.executiveSpotlight.email}</span>
                  <span className="text-xs text-gray-300 hidden sm:inline">|</span>
                  <span className="text-xs text-gray-400">📞 {board.executiveSpotlight.phone}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <div className="fade-up bg-white rounded-4xl p-8 sm:p-10 max-w-2xl mx-auto border border-gray-200 shadow-sm">
              <span className="text-3xl block mb-3">👥</span>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-deep-forest mb-2">{board.teamCTA.heading}</h3>
              <p className="text-gray-600 text-sm sm:text-base mb-6">{board.teamCTA.text}</p>
              <a href="/about#governance" className="inline-flex items-center gap-2 px-10 py-4 bg-gradient-to-r from-warm-gold to-yellow-500 text-white font-bold rounded-full shadow-lg shadow-warm-gold/30 hover:from-yellow-500 hover:to-warm-gold hover:shadow-xl hover:shadow-warm-gold/50 transition-all duration-300 transform hover:scale-105 text-sm sm:text-base">
                {board.teamCTA.buttonText}
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Programs */}
      <section id="programs" className="py-20 lg:py-28 bg-soft-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-emerald-green font-semibold text-sm uppercase tracking-wider">Four Programmes</span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-deep-forest mt-3 mb-5">{programs.heading}</h2>
            <p className="text-gray-600 text-lg">{programs.subtitle}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {programs.list.map((prog: any, i: number) => (
              <div key={i} className={`fade-up card-hover bg-white rounded-3xl overflow-hidden shadow-md border`} style={{ transitionDelay: `${i * 0.1}s` }}>
                <div className="p-6">
                  <span className="text-3xl mb-3 block">{prog.icon}</span>
                  <h3 className="font-display text-xl font-bold text-deep-forest mb-2">{prog.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4">{prog.description}</p>
                  <ul className="text-xs text-gray-600 space-y-1 mb-4">
                    {prog.bullets.map((b: string, j: number) => (
                      <li key={j}>✓ {b}</li>
                    ))}
                  </ul>
                  <a href={prog.link} className="text-emerald-green font-semibold text-sm hover:text-deep-forest">See the programme →</a>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 md:mt-20 text-center">
            <div className="fade-up bg-white rounded-4xl shadow-2xl p-8 sm:p-10 md:p-14 max-w-3xl mx-auto border border-gray-100/80 relative overflow-hidden">
              <div className="absolute -top-16 -right-16 w-64 h-64 bg-emerald-green/5 rounded-full blur-3xl pointer-events-none"></div>
              <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-warm-gold/5 rounded-full blur-3xl pointer-events-none"></div>
              <div className="relative z-10">
                <span className="text-4xl block mb-4">🌟</span>
                <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-deep-forest mb-3">{programs.cta.title}</h3>
                <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto mb-8">{programs.cta.text}</p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <a href="/get-involved" className="btn-gold-pulse inline-flex items-center justify-center px-8 py-4 bg-warm-gold text-white font-semibold rounded-full shadow-lg hover:bg-yellow-600 transition text-base gap-2">
                    {programs.cta.donateText}
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                  </a>
                  <a href="/get-involved" className="inline-flex items-center justify-center px-8 py-4 bg-deep-forest/10 text-deep-forest font-semibold rounded-full hover:bg-deep-forest/20 transition text-base">
                    {programs.cta.getInvolvedText}
                  </a>
                </div>
                <p className="text-xs text-gray-400 mt-6">{programs.cta.footerText}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Scholar Spotlight */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="fade-up bg-soft-bg rounded-4xl overflow-hidden shadow-xl grid md:grid-cols-5">
            <div className="md:col-span-2 image-zoom-wrapper h-64 md:h-full">
              <img src={scholarSpotlight.image} alt="Scholar" className="w-full h-full object-cover" loading="lazy" />
            </div>
            <div className="md:col-span-3 p-8 md:p-10 flex flex-col justify-center">
              <span className="text-xs font-semibold text-warm-gold uppercase tracking-wider">{scholarSpotlight.label}</span>
              <blockquote className="font-display text-xl md:text-2xl italic text-deep-forest mt-3 mb-4 leading-relaxed">
                {scholarSpotlight.quote}
              </blockquote>
              <p className="text-gray-500 text-sm" dangerouslySetInnerHTML={{ __html: scholarSpotlight.details.replace(/\n/g, '<br/>') }}></p>
              <p className="text-xs text-gray-400 mt-4 italic">{scholarSpotlight.footerNote}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Project */}
      <section id="featured" className="py-20 lg:py-28 bg-soft-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-0 items-stretch rounded-4xl overflow-hidden shadow-2xl">
            <div className="fade-up image-zoom-wrapper h-72 sm:h-96 lg:h-auto min-h-[400px]">
              <img src={featuredProject.image} alt="Featured" className="w-full h-full object-cover" loading="lazy" />
            </div>
            <div className="fade-up fade-up-delay-2 bg-dark-section p-8 sm:p-10 lg:p-14 flex flex-col justify-center">
              <span className="text-warm-gold font-semibold text-sm uppercase mb-3">{featuredProject.label}</span>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">{featuredProject.title}</h2>
              <p className="text-gray-300 leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: featuredProject.description }} />
              <ul className="space-y-3 text-gray-300 mb-8">
                {featuredProject.bullets.map((b: string, i: number) => (
                  <li key={i} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-warm-gold flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                    {b}
                  </li>
                ))}
              </ul>
              <a href="/empower-farmers" className="btn-gold-pulse inline-flex items-center self-start px-6 py-3 bg-warm-gold text-white font-semibold rounded-full shadow-lg hover:bg-yellow-600 transition">{featuredProject.buttonText}</a>
            </div>
          </div>
        </div>
      </section>

      {/* Results Ledger */}
      <section id="results-ledger" className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-emerald-green font-semibold text-sm uppercase tracking-wider">The Results Ledger</span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-deep-forest mt-3 mb-5">{resultsLedger.heading}</h2>
            <p className="text-gray-500 text-sm" dangerouslySetInnerHTML={{ __html: resultsLedger.updateInfo }} />
          </div>
          <div className="overflow-x-auto shadow-lg rounded-3xl border">
            <table className="results-table w-full text-sm text-left bg-white">
              <thead className="bg-deep-forest text-white text-xs uppercase">
                <tr>
                  <th className="px-6 py-4">Value</th>
                  <th className="px-6 py-4">Result</th>
                  <th className="px-6 py-4">Programme</th>
                  <th className="px-6 py-4">Verification</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {resultsLedger.rows.map((row: any, i: number) => (
                  <tr key={i} className="hover:bg-soft-bg transition">
                    <td className="px-6 py-4 font-semibold text-deep-forest text-lg" data-label="Value">{row.value}</td>
                    <td className="px-6 py-4" data-label="Result">{row.result}</td>
                    <td className="px-6 py-4" data-label="Programme">{row.programme}</td>
                    <td className="px-6 py-4 text-xs text-gray-500" data-label="Verification">{row.verification}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* News */}
      <section id="news" className="py-20 lg:py-28 bg-soft-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-emerald-green font-semibold text-sm uppercase tracking-wider">News & Updates</span>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-deep-forest mt-3">{news.heading}</h2>
            </div>
            <a href="/news" className="inline-flex items-center gap-2 px-6 py-3 bg-warm-gold text-white font-semibold rounded-full shadow-md hover:bg-yellow-600 transition text-sm">
              View all news
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
            </a>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.items.map((item: any, i: number) => (
              <div key={i} className={`fade-up card-hover bg-white rounded-3xl p-6 shadow-md border flex flex-col`} style={{ transitionDelay: `${i * 0.1}s` }}>
                <span className="text-xs text-emerald-green font-semibold uppercase">{item.date}</span>
                <h3 className="font-display text-lg font-bold text-deep-forest mt-2 mb-3">{item.title}</h3>
                <p className="text-gray-500 text-sm flex-1">{item.excerpt}</p>
                <a href="/news" className="inline-flex items-center gap-1 mt-4 text-emerald-green font-semibold text-sm hover:text-deep-forest transition-colors">
                  Read more
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                </a>
              </div>
            ))}
          </div>
          <div className="mt-14 text-center">
            <div className="fade-up bg-white/70 backdrop-blur-sm rounded-4xl p-8 sm:p-10 max-w-2xl mx-auto border border-white shadow-lg">
              <span className="text-3xl block mb-3">📰</span>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-deep-forest mb-2">{news.cta.title}</h3>
              <p className="text-gray-600 text-sm sm:text-base mb-6">{news.cta.text}</p>
              <a href="/news" className="inline-flex items-center gap-2 px-8 py-3.5 bg-emerald-green text-white font-semibold rounded-full shadow-md hover:bg-deep-forest transition text-sm">
                {news.cta.buttonText}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Donate */}
      <section id="donate" className="relative py-20 lg:py-28 bg-dark-section overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-warm-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-green/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3 pointer-events-none"></div>
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-warm-gold font-semibold text-sm uppercase tracking-wider">Ways to Give</span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-4 mb-5">{donate.heading}</h2>
          <p className="text-gray-300 text-lg mb-10 max-w-2xl mx-auto">{donate.subtitle}</p>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {donate.badges.map((badge: string, i: number) => (
              <span key={i} className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 text-white/80 text-xs">
                <svg className="w-4 h-4 text-warm-gold" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                ✅ {badge}
              </span>
            ))}
          </div>
          <div className="grid sm:grid-cols-3 gap-6 mb-8">
            {donate.tiers.map((tier: any, i: number) => (
              <div key={i} className={`fade-up bg-white/5 backdrop-blur-sm rounded-3xl p-6 border ${tier.highlight ? 'border-2 border-warm-gold/50 shadow-lg shadow-warm-gold/10' : 'border-white/10'} hover:border-warm-gold/40 transition-all duration-300 hover:bg-white/10 hover:-translate-y-1 flex flex-col justify-between relative overflow-hidden`}
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                {tier.highlight && (
                  <>
                    <div className="absolute -top-12 -right-12 w-24 h-24 bg-warm-gold/20 rounded-full blur-2xl pointer-events-none"></div>
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-warm-gold to-yellow-500"></div>
                  </>
                )}
                <div>
                  <span className="text-3xl block mb-3">{tier.icon || (i === 0 ? '🌾' : i === 1 ? '📚' : '🤝')}</span>
                  <span className="text-4xl font-bold text-warm-gold">{tier.amount}</span>
                  {tier.badge && (
                    <span className="inline-block ml-2 text-[10px] font-semibold uppercase tracking-wider bg-warm-gold/20 text-warm-gold px-2 py-0.5 rounded-full">{tier.badge}</span>
                  )}
                  <p className="text-white font-semibold mt-2">{tier.title}</p>
                  <p className="text-gray-300 text-sm mt-2 leading-relaxed">{tier.description}</p>
                </div>
                <a href="/get-involved" className={`mt-6 inline-flex items-center justify-center px-6 py-2.5 ${tier.highlight ? 'bg-gradient-to-r from-warm-gold to-yellow-500 text-white font-bold shadow-lg shadow-warm-gold/30 hover:from-yellow-500 hover:to-warm-gold' : 'bg-warm-gold text-white font-semibold hover:bg-yellow-600'} rounded-full text-sm transition`}>
                  {tier.buttonText}
                </a>
              </div>
            ))}
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 mb-8 border border-white/10 max-w-2xl mx-auto">
            <p className="text-gray-300 text-sm leading-relaxed">
              💡 <span className="text-white font-semibold">Your donation</span> {donate.note}
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-full border border-white/20 hover:bg-white/20 transition text-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
              {donate.institutionalContact}
            </a>
          </div>
          <p className="text-gray-400 text-xs italic mt-8 max-w-2xl mx-auto">
            Institutional funders: <a href={`mailto:${donate.email}`} className="text-warm-gold underline hover:text-yellow-400 transition">{donate.email}</a>
          </p>
        </div>
      </section>

      {/* Partners */}
      <section id="partners" className="py-16 lg:py-20 bg-white overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-emerald-green font-semibold text-sm uppercase tracking-wider">{partners.subtitle}</span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-deep-forest mt-3 mb-12">{partners.heading}</h2>
        </div>
        <div className="relative w-full overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
          <div className="marquee-wrapper">
            <div className="marquee-track">
              {[...partners.list, ...partners.list].map((partner: any, i: number) => (
                <div key={i} className="partner-card">
                  {partner.image && (
                    <img src={partner.image} alt={partner.name} className="h-12 w-auto object-contain mb-2" />
                  )}
                  <span className="partner-name">{partner.name}</span>
                  <span className="partner-label">{partner.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Get Involved */}
      <section id="get-involved" className="py-20 lg:py-28 bg-soft-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-emerald-green font-semibold text-sm uppercase">Get Involved</span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-deep-forest mt-3 mb-5">{getInvolved.heading}</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {getInvolved.options.map((option: any, i: number) => (
              <div key={i} className={`fade-up card-hover bg-white rounded-3xl p-8 text-center`} style={{ transitionDelay: `${i * 0.1}s` }}>
                <div className={`w-16 h-16 ${i === 0 ? 'bg-warm-gold/20' : i === 1 ? 'bg-emerald-green/20' : 'bg-deep-forest/20'} rounded-2xl mx-auto mb-5 flex items-center justify-center text-3xl`}>
                  {option.icon}
                </div>
                <h3 className="font-display text-xl font-bold text-deep-forest mb-3">{option.title}</h3>
                <p className="text-gray-500 text-sm">{option.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-16 text-center">
            <div className="fade-up relative overflow-hidden rounded-4xl p-10 sm:p-14 max-w-3xl mx-auto" style={{ background: 'linear-gradient(135deg, #0B3D2E 0%, #159957 100%)' }}>
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-warm-gold/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/3 pointer-events-none"></div>
              <div className="relative z-10">
                <span className="text-4xl block mb-4">🌟</span>
                <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">{getInvolved.cta.title}</h3>
                <p className="text-white/80 text-sm sm:text-base max-w-lg mx-auto mb-8 leading-relaxed">{getInvolved.cta.text}</p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <a href="/get-involved" className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-warm-gold text-white font-semibold rounded-full shadow-lg hover:bg-yellow-600 transition text-sm">
                    {getInvolved.cta.donateText}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                  </a>
                  <a href="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-full border border-white/30 hover:bg-white/30 transition text-sm">
                    {getInvolved.cta.contactText}
                  </a>
                </div>
                <p className="text-white/50 text-xs mt-6">Have questions? We'd love to hear from you.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-emerald-green font-semibold text-sm uppercase tracking-wider">Contact</span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-deep-forest mt-3 mb-5">{contact.heading}</h2>
            <p className="text-gray-600 text-lg leading-relaxed">{contact.subtitle}</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="fade-up space-y-8">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-emerald-green/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-emerald-green" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/></svg>
                </div>
                <div>
                  <p className="font-semibold text-deep-forest">Address</p>
                  <p className="text-gray-500 text-sm mt-1 whitespace-pre-line">{contact.address}</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-warm-gold/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-warm-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                </div>
                <div>
                  <p className="font-semibold text-deep-forest">Email</p>
                  <a href={`mailto:${contact.email}`} className="text-emerald-green text-sm hover:text-deep-forest transition">{contact.email}</a>
                  <p className="text-xs text-gray-400 mt-1">For partnerships & general enquiries</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-deep-forest/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-deep-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                </div>
                <div>
                  <p className="font-semibold text-deep-forest">Phone</p>
                  <a href={`tel:${contact.phone.replace(/\s/g, '')}`} className="text-gray-500 text-sm hover:text-deep-forest transition">{contact.phone}</a>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-soft-bg rounded-2xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                </div>
                <div>
                  <p className="font-semibold text-deep-forest">Working Hours</p>
                  <p className="text-gray-500 text-sm mt-1 whitespace-pre-line">{contact.hours}</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-12 h-12 bg-emerald-green/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-emerald-green" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/></svg>
                </div>
                <div>
                  <p className="font-semibold text-deep-forest">Follow Us</p>
                  <div className="flex gap-3 mt-2">
                    <a href={contact.social.facebook} target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-[#1877F2] rounded-full flex items-center justify-center hover:scale-110 transition-transform"><svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg></a>
                    <a href={contact.social.linkedin} target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-[#0A66C2] rounded-full flex items-center justify-center hover:scale-110 transition-transform"><svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg></a>
                    <a href={contact.social.twitter} target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-black rounded-full flex items-center justify-center hover:scale-110 transition-transform"><svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>
                    <a href={contact.social.tiktok} target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-[#000000] rounded-full flex items-center justify-center hover:scale-110 transition-transform"><svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg></a>
                  </div>
                </div>
              </div>
            </div>

            <div className="fade-up fade-up-delay-2">
              <div className="rounded-3xl overflow-hidden shadow-2xl border border-gray-100 h-80 sm:h-96 lg:h-full min-h-[400px] bg-soft-bg">
                <iframe 
                  src={contact.mapUrl}
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="EmpowerKids-South Sudan Office Location"
                  className="w-full h-full"
                ></iframe>
              </div>
              <p className="text-xs text-gray-400 mt-2 text-center">Visit us at Gudele West, Juba</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* Back to Top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-6 right-6 z-50 w-12 h-12 bg-warm-gold text-white rounded-full shadow-xl flex items-center justify-center transition-opacity ${backToTopVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      >
        ↑
      </button>
    </>
  );
}
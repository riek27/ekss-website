'use client';

import { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface AboutPageData {
  hero: {
    title: string;
    subtitle: string;
    image: string;
  };
  whoWeAre: {
    heading: string;
    description1: string;
    description2: string;
    missionStatement: string;
    visionStatement: string;
    whereWeWorkStatement: string;
    image: string;
    ctaText: string;
    ctaLink: string;
  };
  governance: {
    heading: string;
    description: string;
    board: Array<{
      name: string;
      title: string;
      image: string;
      bio: string;
    }>;
    executiveDirector: {
      name: string;
      title: string;
      image: string;
      bio: string;
      email: string;
      phone: string;
    };
    leadershipTeam: Array<{
      name: string;
      title: string;
      image: string;
      bio: string;
    }>;
    advisory: Array<{
      name: string;
      title: string;
      image: string;
      bio: string;
    }>;
    teamCta: {
      text: string;
      link: string;
    };
  };
  journey: {
    heading: string;
    timeline: Array<{
      year: string;
      title: string;
      description: string;
    }>;
  };
  partners: {
    heading: string;
    list: Array<{
      name: string;
      label: string;
      image: string;
    }>;
  };
  transparency: {
    heading: string;
    intro: string;
    items: Array<{
      title: string;
      description: string;
    }>;
    recordsNote: string;
    documentsLinkText: string;
    documentsLinkUrl: string;
  };
}

// Helper component for person avatars (executive, board, leadership, advisory)
function PersonAvatar({ name, image, size = 'w-24 h-24' }: { name: string; image?: string; size?: string }) {
  if (image && image.trim() !== '') {
    return (
      <img
        src={image}
        alt={name}
        className={`${size} rounded-full object-cover mx-auto mb-4`}
      />
    );
  }
  // Fallback: initials
  const initials = name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
  return (
    <div
      className={`${size} rounded-full bg-emerald-green/10 flex items-center justify-center mx-auto mb-4 border-2 border-emerald-green/30`}
    >
      <span className="text-2xl font-bold text-emerald-green">{initials || '?'}</span>
    </div>
  );
}

// Helper for partner logos
function PartnerLogo({ name, image }: { name: string; image?: string }) {
  if (image && image.trim() !== '') {
    return (
      <img src={image} alt={name} className="h-12 w-auto object-contain mb-2" />
    );
  }
  return (
    <div className="h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center mb-2">
      <span className="text-gray-400 text-lg">🏢</span>
    </div>
  );
}

export default function AboutPageClient({ data }: { data: AboutPageData }) {
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

  const { hero, whoWeAre, governance, journey, partners, transparency } = data;

  return (
    <>
      <Header />

      {/* Hero */}
      <section
        className="relative h-[60vh] flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: hero.image
            ? `url(${hero.image})`
            : 'linear-gradient(135deg, #0B3D2E 0%, #159957 100%)',
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

      {/* Who We Are + Mission/Vision/Where We Work */}
      <section id="who-we-are" className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="fade-up image-zoom-wrapper rounded-4xl overflow-hidden shadow-2xl">
              {whoWeAre.image ? (
                <img
                  src={whoWeAre.image}
                  alt="Who We Are"
                  className="w-full h-80 lg:h-[480px] object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-80 lg:h-[480px] bg-soft-bg flex items-center justify-center">
                  <span className="text-6xl">🌱</span>
                </div>
              )}
            </div>
            <div className="fade-up fade-up-delay-2">
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

              {/* Three concise statements */}
              <div className="space-y-4 mb-8">
                <div className="flex gap-3">
                  <span className="text-emerald-green text-xl">🎯</span>
                  <p className="text-gray-700">
                    <strong>Mission:</strong> {whoWeAre.missionStatement}
                  </p>
                </div>
                <div className="flex gap-3">
                  <span className="text-emerald-green text-xl">🔭</span>
                  <p className="text-gray-700">
                    <strong>Vision:</strong> {whoWeAre.visionStatement}
                  </p>
                </div>
                <div className="flex gap-3">
                  <span className="text-emerald-green text-xl">📍</span>
                  <p className="text-gray-700">
                    <strong>Where We Work:</strong> {whoWeAre.whereWeWorkStatement}
                  </p>
                </div>
              </div>

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

      {/* Governance & Leadership */}
      <section id="governance" className="py-20 lg:py-28 bg-soft-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-deep-forest mb-4">
              {governance.heading}
            </h2>
            <p className="text-gray-600 text-lg">{governance.description}</p>
          </div>

          {/* Executive Director Spotlight */}
          <div className="fade-up mb-16">
            <div className="bg-white rounded-4xl overflow-hidden shadow-2xl border border-gray-100 grid md:grid-cols-5">
              <div className="md:col-span-2 bg-gradient-to-br from-deep-forest to-emerald-green p-10 flex items-center justify-center min-h-[280px]">
                <div className="text-center">
                  <PersonAvatar
                    name={governance.executiveDirector.name}
                    image={governance.executiveDirector.image}
                    size="w-32 h-32"
                  />
                  <h3 className="text-2xl font-display font-bold text-white">
                    {governance.executiveDirector.name}
                  </h3>
                  <p className="text-warm-gold font-semibold text-sm">
                    {governance.executiveDirector.title}
                  </p>
                </div>
              </div>
              <div className="md:col-span-3 p-8 md:p-10 flex flex-col justify-center">
                <span className="text-xs text-emerald-green font-semibold uppercase tracking-wider mb-2">
                  Leadership
                </span>
                <p className="text-gray-600 leading-relaxed">{governance.executiveDirector.bio}</p>
                <div className="flex flex-wrap items-center gap-4 mt-4">
                  <span className="text-xs text-gray-400">✉️ {governance.executiveDirector.email}</span>
                  <span className="text-xs text-gray-300 hidden sm:inline">|</span>
                  <span className="text-xs text-gray-400">📞 {governance.executiveDirector.phone}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Board of Directors */}
          {governance.board.length > 0 && (
            <div className="mb-16">
              <h3 className="font-display text-2xl font-bold text-deep-forest text-center mb-8">
                Board of Directors
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {governance.board.map((member, i) => (
                  <div
                    key={i}
                    className="fade-up card-hover bg-white rounded-3xl p-6 shadow-md border text-center"
                    style={{ transitionDelay: `${i * 0.1}s` }}
                  >
                    <PersonAvatar name={member.name} image={member.image} />
                    <h4 className="font-bold text-lg text-deep-forest">{member.name}</h4>
                    <p className="text-emerald-green text-sm font-medium mb-2">{member.title}</p>
                    <p className="text-gray-500 text-sm leading-snug">{member.bio}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Leadership Team */}
          {governance.leadershipTeam.length > 0 && (
            <div className="mb-16">
              <h3 className="font-display text-2xl font-bold text-deep-forest text-center mb-8">
                Leadership Team
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {governance.leadershipTeam.map((member, i) => (
                  <div
                    key={i}
                    className="fade-up card-hover bg-white rounded-3xl p-6 shadow-md border text-center"
                    style={{ transitionDelay: `${i * 0.1}s` }}
                  >
                    <PersonAvatar name={member.name} image={member.image} />
                    <h4 className="font-bold text-lg text-deep-forest">{member.name}</h4>
                    <p className="text-emerald-green text-sm font-medium mb-2">{member.title}</p>
                    <p className="text-gray-500 text-sm leading-snug">{member.bio}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Advisory Committee */}
          {governance.advisory.length > 0 && (
            <div className="mb-8">
              <h3 className="font-display text-2xl font-bold text-deep-forest text-center mb-8">
                Advisory Committee
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {governance.advisory.map((member, i) => (
                  <div
                    key={i}
                    className="fade-up card-hover bg-white rounded-3xl p-6 shadow-md border text-center"
                    style={{ transitionDelay: `${i * 0.1}s` }}
                  >
                    <PersonAvatar name={member.name} image={member.image} />
                    <h4 className="font-bold text-lg text-deep-forest">{member.name}</h4>
                    <p className="text-emerald-green text-sm font-medium mb-2">{member.title}</p>
                    <p className="text-gray-500 text-sm leading-snug">{member.bio}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

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

            {/* Our Journey */}
      <section id="journey" className="py-20 lg:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-deep-forest mb-12 text-center">
            {journey.heading}
          </h2>
          <div className="relative border-l-2 border-emerald-green ml-6 md:ml-12">
            {journey.timeline.map((item, i) => (
              <div key={i} className="mb-10 pl-8 md:pl-10 relative">
                {/* Dot marker – now positioned to the far left, not overlapping text */}
                <div className="absolute left-0 top-1.5 w-4 h-4 bg-emerald-green rounded-full -translate-x-1/2" />
                <span className="block text-warm-gold font-semibold text-sm uppercase tracking-wide bg-transparent">
                  {item.year}
                </span>
                <h3 className="text-xl font-bold text-deep-forest mt-1">{item.title}</h3>
                <p className="text-gray-600 mt-1">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section id="partners" className="py-16 lg:py-20 bg-soft-bg overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-deep-forest mb-10">
            {partners.heading}
          </h2>
          <div className="relative w-full overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-r from-soft-bg to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-l from-soft-bg to-transparent z-10 pointer-events-none"></div>
            <div className="marquee-wrapper">
              <div className="marquee-track">
                {[...partners.list, ...partners.list].map((partner, i) => (
                  <div key={i} className="partner-card">
                    <PartnerLogo name={partner.name} image={partner.image} />
                    <span className="partner-name">{partner.name}</span>
                    <span className="partner-label">{partner.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Transparency */}
      <section id="transparency" className="py-20 lg:py-28 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-deep-forest mb-6 text-center">
            {transparency.heading}
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-3xl mx-auto">{transparency.intro}</p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {transparency.items.map((item, i) => (
              <div
                key={i}
                className="fade-up card-hover bg-soft-bg rounded-3xl p-6 shadow-md border text-center"
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <h3 className="font-display font-bold text-lg text-deep-forest mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-sm">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="bg-emerald-green/5 border border-emerald-green/20 rounded-2xl p-6 md:p-8">
            <p className="text-gray-700 leading-relaxed">{transparency.recordsNote}</p>
            {transparency.documentsLinkText && transparency.documentsLinkUrl && (
              <a
                href={transparency.documentsLinkUrl}
                className="inline-flex items-center gap-2 mt-4 text-emerald-green font-semibold hover:text-deep-forest transition-colors"
              >
                {transparency.documentsLinkText}
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
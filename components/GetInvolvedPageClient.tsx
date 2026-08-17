'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function GetInvolvedPageClient({ data }: { data: any }) {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    interest: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: new URLSearchParams({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY || '',
          from_name: formState.name,
          email: formState.email,
          subject: `New Get Involved Submission: ${formState.interest}`,
          message: `Name: ${formState.name}\nEmail: ${formState.email}\nPhone: ${formState.phone}\nOrganization: ${formState.organization}\nInterest: ${formState.interest}\nMessage: ${formState.message}`,
        }),
      });
      const result = await response.json();
      if (response.ok) {
        setSubmitted(true);
        setFormState({
          name: '',
          email: '',
          phone: '',
          organization: '',
          interest: '',
          message: '',
        });
      } else {
        alert('Error: ' + (result.message || 'Something went wrong.'));
      }
    } catch (error) {
      alert('Network error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const {
    hero,
    ways,
    programs,
    organizations,
    whyGetInvolved,
    stories,
    form,
    faq,
    finalCta,
  } = data;

  return (
    <>
      <Header />

      {/* Hero */}
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
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">{hero.title}</h1>
          <p className="text-gray-200 text-lg md:text-xl mb-8">{hero.subtitle}</p>
          <div className="flex flex-wrap justify-center gap-4">
            {hero.buttons.map((btn: any, i: number) => (
              <a
                key={i}
                href={btn.link}
                className={`${i === 0 ? 'bg-warm-gold text-white' : 'bg-white/15 text-white border-2 border-white/40'} px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition`}
              >
                {btn.text}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Ways to Get Involved */}
      <section id="ways" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-deep-forest">{ways.heading}</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ways.cards.map((card: any, i: number) => (
              <div key={i} className="fade-up card-hover bg-white rounded-3xl p-6 shadow-md border flex flex-col items-center text-center">
                <span className="text-3xl block mb-3">{card.icon}</span>
                <h3 className="font-display font-bold text-lg text-deep-forest mb-2">{card.title}</h3>
                <p className="text-gray-500 text-sm flex-1">{card.description}</p>
                <a href={card.ctaLink} className="inline-flex items-center mt-4 text-emerald-green font-semibold text-sm hover:text-deep-forest transition-colors">
                  {card.ctaText} →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Support a Program */}
      <section className="py-20 bg-soft-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-deep-forest mb-12 text-center">{programs.heading}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {programs.cards.map((card: any, i: number) => (
              <div key={i} className="fade-up card-hover bg-white rounded-3xl p-6 shadow-md border text-center">
                <span className="text-3xl block mb-3">{card.icon}</span>
                <h3 className="font-display font-bold text-lg text-deep-forest mb-2">{card.title}</h3>
                <p className="text-gray-500 text-sm">{card.description}</p>
                <a href={card.link} className="inline-flex items-center mt-4 text-emerald-green font-semibold text-sm hover:text-deep-forest transition-colors">
                  Learn More →
                </a>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <a href={programs.ctaLink} className="btn-gold-pulse inline-flex items-center px-8 py-3.5 bg-warm-gold text-white font-semibold rounded-full shadow-lg hover:bg-yellow-600 transition">
              {programs.ctaText}
            </a>
          </div>
        </div>
      </section>

      {/* For Organizations */}
      <section id="partner-with-us" className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-deep-forest mb-6 text-center">{organizations.heading}</h2>
          <p className="text-gray-600 text-lg text-center mb-12 max-w-3xl mx-auto">{organizations.text}</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {organizations.areas.map((area: any, i: number) => (
              <div key={i} className="bg-soft-bg rounded-2xl p-6 text-center">
                <h3 className="font-semibold text-deep-forest mb-2">{area.title}</h3>
                <p className="text-gray-500 text-sm">{area.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center">
            <a href={organizations.ctaLink} className="inline-flex items-center px-8 py-3.5 bg-emerald-green text-white font-semibold rounded-full hover:bg-deep-forest transition shadow-lg">
              {organizations.ctaText}
            </a>
          </div>
        </div>
      </section>

      {/* Why Get Involved */}
      <section className="py-20 bg-soft-bg">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-deep-forest mb-10">{whyGetInvolved.heading}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
            {whyGetInvolved.stats.map((stat: any, i: number) => (
              <div key={i} className="bg-white rounded-3xl shadow-xl p-5 sm:p-7 text-center border">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-deep-forest mb-1">{stat.value}</div>
                <p className="text-xs sm:text-sm text-gray-500">{stat.label}</p>
              </div>
            ))}
          </div>
          <a href={whyGetInvolved.ctaLink} className="inline-flex items-center gap-2 text-emerald-green font-semibold hover:text-deep-forest transition-colors">
            {whyGetInvolved.ctaText}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </section>

      {/* Stories */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-deep-forest mb-12 text-center">{stories.heading}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {stories.list.map((story: any, i: number) => (
              <div key={i} className="fade-up card-hover bg-white rounded-3xl overflow-hidden shadow-md border">
                <div className="image-zoom-wrapper h-48">
                  <img src={story.image} alt={story.title} className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div className="p-6">
                  <h3 className="font-display font-bold text-lg text-deep-forest mb-2">{story.title}</h3>
                  <p className="text-gray-500 text-sm mb-4">{story.excerpt}</p>
                  <a href={story.link} className="inline-flex items-center text-emerald-green font-semibold text-sm hover:text-deep-forest transition-colors">
                    Read More →
                  </a>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <a href={stories.ctaLink} className="inline-flex items-center px-8 py-3.5 bg-warm-gold text-white font-semibold rounded-full shadow-lg hover:bg-yellow-600 transition">
              {stories.ctaText}
            </a>
          </div>
        </div>
      </section>

      {/* Interest Form */}
      <section id="volunteer-form" className="py-20 lg:py-28 bg-soft-bg">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-deep-forest mb-8 text-center">{form.heading}</h2>
          {submitted ? (
            <div className="bg-emerald-green/10 text-emerald-green p-6 rounded-2xl font-medium text-center">{form.successMessage}</div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-xl p-8 space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input type="text" required value={formState.name} onChange={(e) => setFormState({ ...formState, name: e.target.value })} className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-green focus:border-emerald-green outline-none" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input type="email" required value={formState.email} onChange={(e) => setFormState({ ...formState, email: e.target.value })} className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-green focus:border-emerald-green outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone / WhatsApp</label>
                  <input type="text" value={formState.phone} onChange={(e) => setFormState({ ...formState, phone: e.target.value })} className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-green focus:border-emerald-green outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Organization (optional)</label>
                <input type="text" value={formState.organization} onChange={(e) => setFormState({ ...formState, organization: e.target.value })} className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-green focus:border-emerald-green outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">How would you like to get involved?</label>
                <select value={formState.interest} onChange={(e) => setFormState({ ...formState, interest: e.target.value })} className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-green focus:border-emerald-green outline-none">
                  <option value="">Select an option</option>
                  <option value="donate">Donate</option>
                  <option value="volunteer">Volunteer</option>
                  <option value="partner">Partner</option>
                  <option value="technical">Technical expertise</option>
                  <option value="funding">Funding</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tell us more</label>
                <textarea rows={4} value={formState.message} onChange={(e) => setFormState({ ...formState, message: e.target.value })} className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-green focus:border-emerald-green outline-none" />
              </div>
              <button type="submit" disabled={submitting} className="w-full bg-emerald-green text-white font-semibold py-3 px-6 rounded-full hover:bg-deep-forest transition shadow-lg disabled:opacity-50">
                {submitting ? 'Sending…' : 'Submit Interest'}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-deep-forest mb-12 text-center">{faq.heading}</h2>
          <div className="space-y-4">
            {faq.questions.map((item: any, i: number) => (
              <details key={i} className="bg-soft-bg rounded-2xl p-6 group">
                <summary className="font-semibold text-deep-forest cursor-pointer list-none flex items-center justify-between">
                  {item.q}
                  <svg className="w-5 h-5 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-3 text-gray-600 text-sm leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 lg:py-28 bg-dark-section text-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-6">{finalCta.text}</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {finalCta.buttons.map((btn: any, i: number) => (
              <a key={i} href={btn.link} className="btn-gold-pulse inline-flex items-center px-8 py-3.5 bg-warm-gold text-white font-semibold rounded-full shadow-lg hover:bg-yellow-600 transition">
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
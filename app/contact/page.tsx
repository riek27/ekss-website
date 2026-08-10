'use client';

import { useState } from 'react';
import contactData from '@/data/contact.json';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ContactPage() {
  const { hero, contactInfo, form, map, helpCards, faq, finalCta } = contactData;

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: new URLSearchParams({
          access_key: 'b29c43ae-b5c8-4593-9579-25518fda5221',
          from_name: formState.name,
          email: formState.email,
          subject: `New Contact Form Submission: ${formState.subject}`,
          message: `Name: ${formState.name}\nEmail: ${formState.email}\nPhone: ${formState.phone}\nOrganization: ${formState.organization}\nSubject: ${formState.subject}\nMessage: ${formState.message}`,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitted(true);
        // Reset form fields after success
        setFormState({
          name: '',
          email: '',
          phone: '',
          organization: '',
          subject: '',
          message: '',
        });
      } else {
        alert('Error: ' + (result.message || 'Something went wrong. Please try again.'));
      }
    } catch (error) {
      alert('Network error. Please try again later.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Header />

      {/* ===== Hero ===== */}
      <section
        className="relative h-[60vh] flex items-center justify-center overflow-hidden mb-16"
        style={{
          backgroundImage: `url(${hero.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          paddingTop: '8rem',
        }}
      >
        <div className="absolute inset-0 bg-deep-forest/70" style={{ top: '8rem' }}></div>
        <div className="relative z-10 text-center px-4 max-w-3xl">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            {hero.title}
          </h1>
          <p className="text-gray-200 text-lg md:text-xl">{hero.subtitle}</p>
        </div>
      </section>

      {/* ===== Contact Info & Form ===== */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Contact Details */}
            <div className="space-y-8">
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-deep-forest">
                {contactInfo.heading}
              </h2>
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-emerald-green/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-emerald-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-deep-forest">Office</p>
                  <p className="text-gray-500 text-sm mt-1 whitespace-pre-line">{contactInfo.address}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-warm-gold/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-warm-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-deep-forest">Email</p>
                  <a href={`mailto:${contactInfo.email}`} className="text-emerald-green text-sm hover:text-deep-forest transition">
                    {contactInfo.email}
                  </a>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-deep-forest/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-deep-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-deep-forest">Phone</p>
                  <a href={`tel:${contactInfo.phone}`} className="text-gray-500 text-sm hover:text-deep-forest transition">
                    {contactInfo.phone}
                  </a>
                </div>
              </div>
              {contactInfo.executive && (
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-deep-forest">Executive Director</p>
                    <p className="text-gray-500 text-sm mt-1">
                      {contactInfo.executive.name}, {contactInfo.executive.title}
                    </p>
                    <a href={`mailto:${contactInfo.executive.email}`} className="text-emerald-green text-sm hover:text-deep-forest transition">
                      {contactInfo.executive.email}
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Contact Form */}
            <div className="bg-soft-bg rounded-4xl p-8 shadow-xl">
              <h3 className="font-display text-2xl font-bold text-deep-forest mb-6">{form.heading}</h3>
              {submitted ? (
                <div className="bg-emerald-green/10 text-emerald-green p-6 rounded-2xl font-medium text-center">
                  {form.successMessage}
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-green focus:border-emerald-green outline-none"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-green focus:border-emerald-green outline-none"
                        placeholder="you@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone / WhatsApp</label>
                      <input
                        type="text"
                        value={formState.phone}
                        onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-green focus:border-emerald-green outline-none"
                        placeholder="+211..."
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Organization</label>
                    <input
                      type="text"
                      value={formState.organization}
                      onChange={(e) => setFormState({ ...formState, organization: e.target.value })}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-green focus:border-emerald-green outline-none"
                      placeholder="Organization name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Subject *</label>
                    <select
                      required
                      value={formState.subject}
                      onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-green focus:border-emerald-green outline-none"
                    >
                      <option value="">Select a subject</option>
                      {form.subjectOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
                    <textarea
                      required
                      rows={4}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-green focus:border-emerald-green outline-none"
                      placeholder="Write your message..."
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-emerald-green text-white font-semibold py-3 px-6 rounded-full hover:bg-deep-forest transition shadow-lg disabled:opacity-50"
                  >
                    {submitting ? 'Sending…' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ===== Map ===== */}
      <section className="py-16 lg:py-24 bg-soft-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-deep-forest mb-6 text-center">
            {map.heading}
          </h2>
          <p className="text-gray-600 text-center mb-8">{map.description}</p>
          <div className="rounded-4xl overflow-hidden shadow-2xl">
            <iframe
              src={map.mapUrl}
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="EmpowerKids–South Sudan Office Location"
            ></iframe>
          </div>
          <div className="text-center mt-6">
            <a
              href={map.directionLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3 bg-warm-gold text-white font-semibold rounded-full shadow-lg hover:bg-yellow-600 transition"
            >
              Get Directions
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* ===== Help Cards ===== */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-deep-forest mb-12 text-center">
            {helpCards.heading}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {helpCards.cards.map((card, i) => (
              <a
                key={i}
                href={card.link}
                className="card-hover bg-white rounded-3xl p-6 shadow-md border text-center block"
              >
                <span className="text-3xl block mb-3">{card.icon}</span>
                <h3 className="font-display font-bold text-lg text-deep-forest mb-2">{card.title}</h3>
                <p className="text-gray-500 text-sm">{card.description}</p>
                <span className="inline-flex items-center mt-4 text-emerald-green font-semibold text-sm hover:text-deep-forest transition-colors">
                  Learn More →
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="py-20 lg:py-28 bg-soft-bg">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-deep-forest mb-12 text-center">
            {faq.heading}
          </h2>
          <div className="space-y-4">
            {faq.questions.map((item, i) => (
              <details key={i} className="bg-white rounded-2xl p-6 group shadow-sm">
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

      {/* ===== Final CTA ===== */}
      <section className="py-20 lg:py-28 bg-dark-section text-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">{finalCta.heading}</h2>
          <p className="text-gray-300 text-lg mb-8">{finalCta.text}</p>
          <div className="flex flex-wrap justify-center gap-4">
            {finalCta.buttons.map((btn, i) => (
              <a
                key={i}
                href={btn.link}
                className="btn-gold-pulse inline-flex items-center px-8 py-3.5 bg-warm-gold text-white font-semibold rounded-full shadow-lg hover:bg-yellow-600 transition"
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
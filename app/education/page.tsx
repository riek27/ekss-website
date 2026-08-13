'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function EducationPage() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch('/api/page-data?page=education')
      .then(res => res.json())
      .then(json => {
        if (json && json.hero) setData(json);
      })
      .catch(console.error);
  }, []);

  if (!data) return null;

  const { hero, stats, challenge, approach, currentWork, results, projects, partners, resources, gallery, cta } = data;

  return (
    <>
      <Header />

      {/* Hero */}
      <section
        className="relative h-[60vh] flex items-end overflow-hidden"
        style={{
          backgroundImage: `url(${hero.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-deep-forest/70" />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
          <span className="inline-block px-4 py-1.5 bg-warm-gold/20 backdrop-blur-sm text-warm-gold text-xs font-semibold rounded-full uppercase">
            {hero.tagline}
          </span>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-4 mb-4">
            {hero.title}
          </h1>
          <p className="text-lg text-gray-200 max-w-2xl">{hero.subtitle}</p>
        </div>
      </section>

      {/* At a Glance */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="font-display text-3xl font-bold text-deep-forest mb-8">At a Glance</h2>
          <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {stats.map((stat: any, i: number) => (
              <div key={i} className="p-6 bg-soft-bg rounded-3xl">
                <div className="text-4xl font-extrabold text-deep-forest">{stat.value}</div>
                <p className="text-sm text-gray-600 mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Challenge */}
      <section className="py-20 bg-soft-bg">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-display text-3xl font-bold text-deep-forest mb-6">{challenge.heading}</h2>
          <p className="text-gray-600 max-w-4xl leading-relaxed">{challenge.text}</p>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto">
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

      {/* What We Are Doing Now */}
      <section className="py-20 bg-soft-bg">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-display text-3xl font-bold text-deep-forest mb-6">{currentWork.heading}</h2>
          <ul className="space-y-3 text-gray-600">
            {currentWork.items.map((item: string, i: number) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-emerald-green font-bold">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Results */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-display text-3xl font-bold text-deep-forest mb-6">{results.heading}</h2>
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
                {results.rows.map((row: any, i: number) => (
                  <tr key={i}>
                    <td className="px-6 py-3 font-semibold">{row.metric}</td>
                    <td className="px-6 py-3">{row.outcome}</td>
                    <td className="px-6 py-3 text-xs text-gray-500">{row.verification}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="py-20 bg-soft-bg">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-display text-3xl font-bold text-deep-forest mb-6">{projects.heading}</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {projects.items.map((project: any, i: number) => (
              <div key={i} className="bg-white p-6 rounded-3xl shadow">
                <span className="text-2xl mr-2">{project.icon}</span>
                <h3 className="font-semibold text-lg text-deep-forest">{project.title}</h3>
                <p className="text-gray-500 text-sm mt-2">{project.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners & Donors */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-display text-3xl font-bold text-deep-forest mb-6">{partners.heading}</h2>
          <p className="text-gray-600">{partners.text}</p>
        </div>
      </section>

      {/* Gallery */}
      {gallery && gallery.images.length > 0 && (
        <section className="py-20 bg-soft-bg">
          <div className="max-w-7xl mx-auto">
            <h2 className="font-display text-3xl font-bold text-deep-forest mb-8 text-center">{gallery.heading}</h2>
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

      {/* Resources */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-display text-3xl font-bold text-deep-forest mb-6">{resources.heading}</h2>
          <p className="text-gray-600">
            {resources.text}{' '}
            <a href={resources.link} className="text-emerald-green font-semibold">
              Visit the document shelf →
            </a>
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-dark-section text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-3xl font-bold mb-4">{cta.heading}</h2>
          <p className="mb-6">{cta.text}</p>
          <a href={cta.buttonLink} className="btn-gold-pulse inline-block px-8 py-3.5 bg-warm-gold text-white font-semibold rounded-full">
            {cta.buttonText}
          </a>
        </div>
      </section>

      <Footer />
    </>
  );
}
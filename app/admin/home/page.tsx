// @ts-nocheck
'use client';

import { useState, useEffect, useRef } from 'react';
import FileUploadField from '@/components/FileUploadField';
import { savePageData } from '@/app/actions';

type SectionKey =
  | 'hero'
  | 'stats'
  | 'about'
  | 'board'
  | 'programs'
  | 'scholar'
  | 'featured'
  | 'results'
  | 'news'
  | 'resources'
  | 'donate'
  | 'partners'
  | 'getInvolved'
  | 'contact';

const sectionNames: { key: SectionKey; label: string }[] = [
  { key: 'hero', label: 'Hero' },
  { key: 'stats', label: 'Stats' },
  { key: 'about', label: 'About' },
  { key: 'board', label: 'Board & Leadership' },
  { key: 'programs', label: 'Programs' },
  { key: 'scholar', label: 'Scholar Spotlight' },
  { key: 'featured', label: 'Featured Project' },
  { key: 'results', label: 'Results Ledger' },
  { key: 'news', label: 'News' },
  { key: 'resources', label: 'Resources' },
  { key: 'donate', label: 'Donate' },
  { key: 'partners', label: 'Partners' },
  { key: 'getInvolved', label: 'Get Involved' },
  { key: 'contact', label: 'Contact' },
];

export default function AdminHome() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState<SectionKey>('hero');
  const [saveMessage, setSaveMessage] = useState('');

  useEffect(() => {
  fetch('/api/page-data?page=home')
    .then(res => res.json())
    .then(json => {
      if (json && json.hero) {
        // Ensure organizationalReview is always an array
        if (json.resources && !Array.isArray(json.resources.organizationalReview)) {
          json.resources.organizationalReview = json.resources.organizationalReview
            ? [json.resources.organizationalReview]
            : [];
        }
        setData(json);
      }
      setLoading(false);
    })
    .catch(() => setLoading(false));
}, []);

  const handleSave = async () => {
    const result = await savePageData('home', data);
    if (result.success) {
      setSaveMessage('✅ All changes saved!');
      setTimeout(() => setSaveMessage(''), 4000);
    } else {
      setSaveMessage('❌ Error: ' + result.error);
    }
  };

  const update = (path: string, value: any) => {
    const keys = path.split('.');
    setData((prev: any) => {
      const newData = JSON.parse(JSON.stringify(prev));
      let obj = newData;
      for (let i = 0; i < keys.length - 1; i++) obj = obj[keys[i]];
      obj[keys[keys.length - 1]] = value;
      return newData;
    });
  };

  // --------------- RENDER SECTION ---------------
  const renderSection = () => {
    if (!data) return null;

    switch (activeSection) {
      // ================= HERO =================
      case 'hero':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tagline</label>
              <input
                value={data.hero.tagline}
                onChange={(e) => update('hero.tagline', e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-green focus:border-emerald-green outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <textarea
                value={data.hero.title}
                onChange={(e) => update('hero.title', e.target.value)}
                rows={2}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-green focus:border-emerald-green outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
              <textarea
                value={data.hero.subtitle}
                onChange={(e) => update('hero.subtitle', e.target.value)}
                rows={2}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-green focus:border-emerald-green outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Slider Images</label>
              <div className="flex flex-col gap-4">
                {data.hero.images.map((img: string, idx: number) => (
                  <div
                    key={idx}
                    className="border border-gray-200 rounded-xl p-4 bg-white shadow-sm flex flex-col sm:flex-row gap-4 items-start"
                  >
                    <div className="w-full sm:w-48 h-28 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                      {img ? (
                        <img
                          src={img}
                          alt=""
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              'data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22320%22%20height%3D%22180%22%20fill%3D%22%23f0f0f0%22%3E%3Crect%20width%3D%22320%22%20height%3D%22180%22%2F%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2250%25%22%20text-anchor%3D%22middle%22%20dy%3D%22.3em%22%20fill%3D%22%23aaa%22%20font-size%3D%2214%22%3ENo%20Image%3C%2Ftext%3E%3C%2Fsvg%3E';
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                          No image
                        </div>
                      )}
                    </div>
                    <div className="flex-1 w-full space-y-2">
                      <FileUploadField
                        currentValue={img}
                        onChange={(url) => {
                          const newImages = [...data.hero.images];
                          newImages[idx] = url;
                          update('hero.images', newImages);
                        }}
                        accept="image/*"
                      />
                      <button
                        onClick={() => {
                          const newImages = data.hero.images.filter(
                            (_: any, i: number) => i !== idx
                          );
                          update('hero.images', newImages);
                        }}
                        className="text-red-500 text-sm font-medium hover:text-red-700 transition-colors"
                      >
                        ✕ Remove image
                      </button>
                    </div>
                  </div>
                ))}
                <button
                  onClick={() => update('hero.images', [...data.hero.images, ''])}
                  className="border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center text-gray-400 hover:border-emerald-green hover:text-emerald-green transition-colors h-32"
                >
                  <span className="text-2xl">+</span>
                  <span className="text-sm mt-1 font-medium">Add Image</span>
                </button>
              </div>
            </div>
          </div>
        );

      // ================= STATS =================
      case 'stats':
        return (
          <div>
            {data.stats.map((stat: any, i: number) => (
              <div key={i} className="flex gap-3 items-end mb-3">
                <div className="flex-1">
                  <label className="text-xs text-gray-500">Value</label>
                  <input
                    type="number"
                    value={stat.value}
                    onChange={(e) => {
                      const s = [...data.stats];
                      s[i].value = Number(e.target.value);
                      update('stats', s);
                    }}
                    className="w-full border border-gray-200 rounded-lg px-2 py-1 mt-1"
                  />
                </div>
                <div className="flex-1">
                  <label className="text-xs text-gray-500">Label</label>
                  <input
                    value={stat.label}
                    onChange={(e) => {
                      const s = [...data.stats];
                      s[i].label = e.target.value;
                      update('stats', s);
                    }}
                    className="w-full border border-gray-200 rounded-lg px-2 py-1 mt-1"
                  />
                </div>
                <button
                  onClick={() =>
                    update(
                      'stats',
                      data.stats.filter((_: any, idx: number) => idx !== i)
                    )
                  }
                  className="text-red-500 text-sm hover:text-red-700 mb-1"
                >
                  ✕
                </button>
              </div>
            ))}
            <button
              onClick={() =>
                update('stats', [...data.stats, { value: 0, label: 'New stat' }])
              }
              className="text-sm text-emerald-green font-medium hover:text-deep-forest mt-2 inline-flex items-center gap-1"
            >
              <span>+</span> Add Stat
            </button>
          </div>
        );

      // ================= ABOUT =================
      case 'about':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Heading</label>
              <textarea
                value={data.about.heading}
                onChange={(e) => update('about.heading', e.target.value)}
                rows={2}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-green focus:border-emerald-green outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description 1</label>
              <textarea
                value={data.about.description1}
                onChange={(e) => update('about.description1', e.target.value)}
                rows={3}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-green focus:border-emerald-green outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description 2</label>
              <textarea
                value={data.about.description2}
                onChange={(e) => update('about.description2', e.target.value)}
                rows={3}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-green focus:border-emerald-green outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
              <FileUploadField
                currentValue={data.about.image}
                onChange={(url) => update('about.image', url)}
                accept="image/*"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">CTA Text</label>
                <input
                  value={data.about.ctaText}
                  onChange={(e) => update('about.ctaText', e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-green focus:border-emerald-green outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">CTA Link</label>
                <input
                  value={data.about.ctaLink}
                  onChange={(e) => update('about.ctaLink', e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-green focus:border-emerald-green outline-none"
                />
              </div>
            </div>
          </div>
        );

      // ================= BOARD =================
      case 'board':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Heading</label>
              <input
                value={data.board.heading}
                onChange={(e) => update('board.heading', e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-green focus:border-emerald-green outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
              <textarea
                value={data.board.subtitle}
                onChange={(e) => update('board.subtitle', e.target.value)}
                rows={2}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-green focus:border-emerald-green outline-none"
              />
            </div>

            <h3 className="font-display font-bold text-lg text-deep-forest mt-4">Board Columns</h3>
            {data.board.columns.map((col: any, i: number) => (
              <div key={i} className="border border-gray-200 rounded-xl p-4 bg-gray-50 space-y-3">
                <input
                  value={col.title}
                  onChange={(e) => {
                    const c = [...data.board.columns];
                    c[i].title = e.target.value;
                    update('board.columns', c);
                  }}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2"
                  placeholder="Title"
                />
                <input
                  value={col.description}
                  onChange={(e) => {
                    const c = [...data.board.columns];
                    c[i].description = e.target.value;
                    update('board.columns', c);
                  }}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2"
                  placeholder="Description"
                />
                <input
                  value={col.icon}
                  onChange={(e) => {
                    const c = [...data.board.columns];
                    c[i].icon = e.target.value;
                    update('board.columns', c);
                  }}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2"
                  placeholder="Icon (user-group, user, light-bulb)"
                />
                <label className="inline-flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={col.highlight}
                    onChange={(e) => {
                      const c = [...data.board.columns];
                      c[i].highlight = e.target.checked;
                      update('board.columns', c);
                    }}
                    className="rounded"
                  />
                  <span className="text-sm">Highlight this column?</span>
                </label>
                {col.executive && (
                  <div className="space-y-2 ml-4">
                    <input
                      value={col.executive.name}
                      onChange={(e) => {
                        const c = [...data.board.columns];
                        c[i].executive.name = e.target.value;
                        update('board.columns', c);
                      }}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2"
                      placeholder="Executive Name"
                    />
                    <input
                      value={col.executive.title}
                      onChange={(e) => {
                        const c = [...data.board.columns];
                        c[i].executive.title = e.target.value;
                        update('board.columns', c);
                      }}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2"
                      placeholder="Executive Title"
                    />
                  </div>
                )}
                <button
                  onClick={() =>
                    update(
                      'board.columns',
                      data.board.columns.filter((_: any, idx: number) => idx !== i)
                    )
                  }
                  className="text-red-500 text-sm hover:text-red-700"
                >
                  Remove column
                </button>
              </div>
            ))}
            <button
              onClick={() =>
                update('board.columns', [
                  ...data.board.columns,
                  { title: '', description: '', icon: 'user-group', highlight: false },
                ])
              }
              className="text-sm text-emerald-green font-medium hover:text-deep-forest inline-flex items-center gap-1"
            >
              <span>+</span> Add Column
            </button>

            <h3 className="font-display font-bold text-lg text-deep-forest mt-6">Executive Director Spotlight</h3>
            <div className="space-y-3">
              <input
                value={data.board.executiveSpotlight.name}
                onChange={(e) => update('board.executiveSpotlight.name', e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2"
                placeholder="Full Name"
              />
              <input
                value={data.board.executiveSpotlight.title}
                onChange={(e) => update('board.executiveSpotlight.title', e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2"
                placeholder="Job Title"
              />
              <label className="block text-sm font-medium text-gray-700">Photo</label>
              <FileUploadField
                currentValue={data.board.executiveSpotlight.image}
                onChange={(url) => update('board.executiveSpotlight.image', url)}
                accept="image/*"
              />
              <textarea
                value={data.board.executiveSpotlight.bio1}
                onChange={(e) => update('board.executiveSpotlight.bio1', e.target.value)}
                rows={3}
                className="w-full border border-gray-200 rounded-lg px-3 py-2"
                placeholder="Bio paragraph 1"
              />
              <textarea
                value={data.board.executiveSpotlight.bio2}
                onChange={(e) => update('board.executiveSpotlight.bio2', e.target.value)}
                rows={2}
                className="w-full border border-gray-200 rounded-lg px-3 py-2"
                placeholder="Bio paragraph 2"
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  value={data.board.executiveSpotlight.email}
                  onChange={(e) => update('board.executiveSpotlight.email', e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2"
                  placeholder="Email"
                />
                <input
                  value={data.board.executiveSpotlight.phone}
                  onChange={(e) => update('board.executiveSpotlight.phone', e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2"
                  placeholder="Phone"
                />
              </div>
            </div>

            <h3 className="font-display font-bold text-lg text-deep-forest mt-6">Team CTA</h3>
            <div className="space-y-3">
              <input
                value={data.board.teamCTA.heading}
                onChange={(e) => update('board.teamCTA.heading', e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2"
                placeholder="Heading"
              />
              <textarea
                value={data.board.teamCTA.text}
                onChange={(e) => update('board.teamCTA.text', e.target.value)}
                rows={2}
                className="w-full border border-gray-200 rounded-lg px-3 py-2"
                placeholder="Text"
              />
              <input
                value={data.board.teamCTA.buttonText}
                onChange={(e) => update('board.teamCTA.buttonText', e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2"
                placeholder="Button Text"
              />
              <input
                value={data.board.teamCTA.link}
                onChange={(e) => update('board.teamCTA.link', e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2"
                placeholder="Link (e.g., #board-leadership)"
              />
            </div>
          </div>
        );

      // ================= PROGRAMS =================
      case 'programs':
        return (
          <div className="space-y-6">
            <input
              value={data.programs.heading}
              onChange={(e) => update('programs.heading', e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2"
              placeholder="Heading"
            />
            <textarea
              value={data.programs.subtitle}
              onChange={(e) => update('programs.subtitle', e.target.value)}
              rows={2}
              className="w-full border border-gray-200 rounded-lg px-3 py-2"
              placeholder="Subtitle"
            />
            <h3 className="font-display font-bold text-lg text-deep-forest">Program Cards</h3>
            {data.programs.list.map((prog: any, i: number) => (
              <div key={i} className="border border-gray-200 rounded-xl p-4 bg-gray-50 space-y-3">
                <input
                  value={prog.title}
                  onChange={(e) => {
                    const l = [...data.programs.list];
                    l[i].title = e.target.value;
                    update('programs.list', l);
                  }}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2"
                  placeholder="Title"
                />
                <input
                  value={prog.icon}
                  onChange={(e) => {
                    const l = [...data.programs.list];
                    l[i].icon = e.target.value;
                    update('programs.list', l);
                  }}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2"
                  placeholder="Icon (emoji)"
                />
                <textarea
                  value={prog.description}
                  onChange={(e) => {
                    const l = [...data.programs.list];
                    l[i].description = e.target.value;
                    update('programs.list', l);
                  }}
                  rows={2}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2"
                  placeholder="Description"
                />
                <label className="text-sm">Bullets (one per line)</label>
                <textarea
                  value={prog.bullets.join('\n')}
                  onChange={(e) => {
                    const l = [...data.programs.list];
                    l[i].bullets = e.target.value.split('\n');
                    update('programs.list', l);
                  }}
                  rows={3}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2"
                  placeholder="✓ Feature 1&#10;✓ Feature 2"
                />
                <button
                  onClick={() =>
                    update(
                      'programs.list',
                      data.programs.list.filter((_: any, idx: number) => idx !== i)
                    )
                  }
                  className="text-red-500 text-sm hover:text-red-700"
                >
                  Remove program
                </button>
              </div>
            ))}
            <button
              onClick={() =>
                update('programs.list', [
                  ...data.programs.list,
                  { title: '', icon: '', description: '', bullets: [] },
                ])
              }
              className="text-sm text-emerald-green font-medium hover:text-deep-forest inline-flex items-center gap-1"
            >
              <span>+</span> Add Program
            </button>

            <h3 className="font-display font-bold text-lg text-deep-forest mt-6">Programs CTA</h3>
            <div className="space-y-3">
              <input
                value={data.programs.cta.title}
                onChange={(e) => update('programs.cta.title', e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2"
                placeholder="CTA Title"
              />
              <textarea
                value={data.programs.cta.text}
                onChange={(e) => update('programs.cta.text', e.target.value)}
                rows={2}
                className="w-full border border-gray-200 rounded-lg px-3 py-2"
                placeholder="CTA Text"
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  value={data.programs.cta.donateText}
                  onChange={(e) => update('programs.cta.donateText', e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2"
                  placeholder="Donate Button Text"
                />
                <input
                  value={data.programs.cta.getInvolvedText}
                  onChange={(e) => update('programs.cta.getInvolvedText', e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2"
                  placeholder="Get Involved Button Text"
                />
              </div>
              <input
                value={data.programs.cta.footerText}
                onChange={(e) => update('programs.cta.footerText', e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2"
                placeholder="Footer Text"
              />
            </div>
          </div>
        );

      // ================= SCHOLAR SPOTLIGHT =================
      case 'scholar':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Label</label>
              <input
                value={data.scholarSpotlight.label}
                onChange={(e) => update('scholarSpotlight.label', e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Quote</label>
              <textarea
                value={data.scholarSpotlight.quote}
                onChange={(e) => update('scholarSpotlight.quote', e.target.value)}
                rows={3}
                className="w-full border border-gray-200 rounded-lg px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Scholar Name</label>
              <input
                value={data.scholarSpotlight.name}
                onChange={(e) => update('scholarSpotlight.name', e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Details (line breaks allowed)</label>
              <textarea
                value={data.scholarSpotlight.details}
                onChange={(e) => update('scholarSpotlight.details', e.target.value)}
                rows={2}
                className="w-full border border-gray-200 rounded-lg px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Scholar Image</label>
              <FileUploadField
                currentValue={data.scholarSpotlight.image}
                onChange={(url) => update('scholarSpotlight.image', url)}
                accept="image/*"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Footer Note</label>
              <textarea
                value={data.scholarSpotlight.footerNote}
                onChange={(e) => update('scholarSpotlight.footerNote', e.target.value)}
                rows={2}
                className="w-full border border-gray-200 rounded-lg px-3 py-2"
              />
            </div>
          </div>
        );

      // ================= FEATURED PROJECT =================
      case 'featured':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Label</label>
              <input
                value={data.featuredProject.label}
                onChange={(e) => update('featuredProject.label', e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                value={data.featuredProject.title}
                onChange={(e) => update('featuredProject.title', e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description (HTML allowed)</label>
              <textarea
                value={data.featuredProject.description}
                onChange={(e) => update('featuredProject.description', e.target.value)}
                rows={3}
                className="w-full border border-gray-200 rounded-lg px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Bullets (one per line)</label>
              <textarea
                value={data.featuredProject.bullets.join('\n')}
                onChange={(e) =>
                  update('featuredProject.bullets', e.target.value.split('\n'))
                }
                rows={3}
                className="w-full border border-gray-200 rounded-lg px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
              <FileUploadField
                currentValue={data.featuredProject.image}
                onChange={(url) => update('featuredProject.image', url)}
                accept="image/*"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <input
                value={data.featuredProject.buttonText}
                onChange={(e) => update('featuredProject.buttonText', e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2"
                placeholder="Button Text"
              />
              <input
                value={data.featuredProject.buttonLink}
                onChange={(e) => update('featuredProject.buttonLink', e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2"
                placeholder="Button Link"
              />
            </div>
          </div>
        );

      // ================= RESULTS LEDGER =================
      case 'results':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Heading</label>
              <input
                value={data.resultsLedger.heading}
                onChange={(e) => update('resultsLedger.heading', e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Update Info (HTML allowed)</label>
              <textarea
                value={data.resultsLedger.updateInfo}
                onChange={(e) => update('resultsLedger.updateInfo', e.target.value)}
                rows={2}
                className="w-full border border-gray-200 rounded-lg px-3 py-2"
              />
            </div>
            <h3 className="font-display font-bold text-lg text-deep-forest">Table Rows</h3>
            {data.resultsLedger.rows.map((row: any, i: number) => (
              <div key={i} className="border border-gray-200 rounded-xl p-4 bg-gray-50 grid grid-cols-2 gap-3">
                <input
                  value={row.value}
                  onChange={(e) => {
                    const r = [...data.resultsLedger.rows];
                    r[i].value = e.target.value;
                    update('resultsLedger.rows', r);
                  }}
                  className="border border-gray-200 rounded-lg px-3 py-2"
                  placeholder="Value"
                />
                <input
                  value={row.programme}
                  onChange={(e) => {
                    const r = [...data.resultsLedger.rows];
                    r[i].programme = e.target.value;
                    update('resultsLedger.rows', r);
                  }}
                  className="border border-gray-200 rounded-lg px-3 py-2"
                  placeholder="Programme"
                />
                <input
                  value={row.result}
                  onChange={(e) => {
                    const r = [...data.resultsLedger.rows];
                    r[i].result = e.target.value;
                    update('resultsLedger.rows', r);
                  }}
                  className="col-span-2 border border-gray-200 rounded-lg px-3 py-2"
                  placeholder="Result"
                />
                <input
                  value={row.verification}
                  onChange={(e) => {
                    const r = [...data.resultsLedger.rows];
                    r[i].verification = e.target.value;
                    update('resultsLedger.rows', r);
                  }}
                  className="col-span-2 border border-gray-200 rounded-lg px-3 py-2"
                  placeholder="Verification"
                />
                <button
                  onClick={() =>
                    update(
                      'resultsLedger.rows',
                      data.resultsLedger.rows.filter((_: any, idx: number) => idx !== i)
                    )
                  }
                  className="text-red-500 text-sm hover:text-red-700"
                >
                  Remove row
                </button>
              </div>
            ))}
            <button
              onClick={() =>
                update('resultsLedger.rows', [
                  ...data.resultsLedger.rows,
                  { value: '', result: '', programme: '', verification: '' },
                ])
              }
              className="text-sm text-emerald-green font-medium hover:text-deep-forest inline-flex items-center gap-1"
            >
              <span>+</span> Add Row
            </button>
          </div>
        );

      // ================= NEWS =================
      case 'news':
        return (
          <div className="space-y-6">
            <input
              value={data.news.heading}
              onChange={(e) => update('news.heading', e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2"
              placeholder="Heading"
            />
            <h3 className="font-display font-bold text-lg text-deep-forest">News Items</h3>
            {data.news.items.map((item: any, i: number) => (
              <div key={i} className="border border-gray-200 rounded-xl p-4 bg-gray-50 space-y-3">
                <input
                  value={item.date}
                  onChange={(e) => {
                    const it = [...data.news.items];
                    it[i].date = e.target.value;
                    update('news.items', it);
                  }}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2"
                  placeholder="Date (e.g., September 2025)"
                />
                <input
                  value={item.title}
                  onChange={(e) => {
                    const it = [...data.news.items];
                    it[i].title = e.target.value;
                    update('news.items', it);
                  }}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2"
                  placeholder="Title"
                />
                <textarea
                  value={item.excerpt}
                  onChange={(e) => {
                    const it = [...data.news.items];
                    it[i].excerpt = e.target.value;
                    update('news.items', it);
                  }}
                  rows={2}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2"
                  placeholder="Excerpt"
                />
                <input
                  value={item.link}
                  onChange={(e) => {
                    const it = [...data.news.items];
                    it[i].link = e.target.value;
                    update('news.items', it);
                  }}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2"
                  placeholder="Link"
                />
                <button
                  onClick={() =>
                    update(
                      'news.items',
                      data.news.items.filter((_: any, idx: number) => idx !== i)
                    )
                  }
                  className="text-red-500 text-sm hover:text-red-700"
                >
                  Remove item
                </button>
              </div>
            ))}
            <button
              onClick={() =>
                update('news.items', [
                  ...data.news.items,
                  { date: '', title: '', excerpt: '', link: '' },
                ])
              }
              className="text-sm text-emerald-green font-medium hover:text-deep-forest inline-flex items-center gap-1"
            >
              <span>+</span> Add News Item
            </button>
            <h3 className="font-display font-bold text-lg text-deep-forest mt-6">News CTA</h3>
            <div className="space-y-3">
              <input
                value={data.news.cta.title}
                onChange={(e) => update('news.cta.title', e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2"
                placeholder="Title"
              />
              <input
                value={data.news.cta.text}
                onChange={(e) => update('news.cta.text', e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2"
                placeholder="Text"
              />
              <input
                value={data.news.cta.buttonText}
                onChange={(e) => update('news.cta.buttonText', e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2"
                placeholder="Button Text"
              />
              <input
                value={data.news.cta.link}
                onChange={(e) => update('news.cta.link', e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2"
                placeholder="Link"
              />
            </div>
          </div>
        );

     // ================= RESOURCES (homepage resource summaries) =================
case 'resources':
  return (
    <div className="space-y-6">
      <input
        value={data.resources.heading}
        onChange={(e) => update('resources.heading', e.target.value)}
        className="w-full border border-gray-200 rounded-lg px-3 py-2"
        placeholder="Heading"
      />
      <textarea
        value={data.resources.subtitle}
        onChange={(e) => update('resources.subtitle', e.target.value)}
        rows={2}
        className="w-full border border-gray-200 rounded-lg px-3 py-2"
        placeholder="Subtitle"
      />

      {/* Annual Reports */}
      <h3 className="font-display font-bold text-lg text-deep-forest">Annual Reports</h3>
      {data.resources.annualReports.map((report: any, i: number) => (
        <div key={i} className="border border-gray-200 rounded-xl p-4 bg-gray-50 space-y-3">
          <input
            value={report.title}
            onChange={(e) => {
              const a = [...data.resources.annualReports];
              a[i].title = e.target.value;
              update('resources.annualReports', a);
            }}
            className="w-full border border-gray-200 rounded-lg px-3 py-2"
            placeholder="Title"
          />
          <textarea
            value={report.description}
            onChange={(e) => {
              const a = [...data.resources.annualReports];
              a[i].description = e.target.value;
              update('resources.annualReports', a);
            }}
            rows={2}
            className="w-full border border-gray-200 rounded-lg px-3 py-2"
            placeholder="Description"
          />
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">PDF Document</label>
            <FileUploadField
              currentValue={report.link}
              onChange={(url) => {
                const a = [...data.resources.annualReports];
                a[i].link = url;
                update('resources.annualReports', a);
              }}
              accept=".pdf,.doc,.docx"
            />
          </div>
          <button
            onClick={() =>
              update(
                'resources.annualReports',
                data.resources.annualReports.filter((_: any, idx: number) => idx !== i)
              )
            }
            className="text-red-500 text-sm"
          >
            Remove
          </button>
        </div>
      ))}
      <button
        onClick={() =>
          update('resources.annualReports', [
            ...data.resources.annualReports,
            { title: '', description: '', link: '' },
          ])
        }
        className="text-sm text-emerald-green"
      >
        + Add Report
      </button>

      {/* Organizational Review */}
<h3 className="font-display font-bold text-lg text-deep-forest">Organizational Review</h3>
{data.resources.organizationalReview.map((review: any, i: number) => (
  <div key={i} className="border border-gray-200 rounded-xl p-4 bg-gray-50 space-y-3">
    <input
      value={review.title}
      onChange={(e) => {
        const reviews = [...data.resources.organizationalReview];
        reviews[i].title = e.target.value;
        update('resources.organizationalReview', reviews);
      }}
      className="w-full border rounded-lg px-3 py-2"
      placeholder="Title"
    />
    <textarea
      value={review.description}
      onChange={(e) => {
        const reviews = [...data.resources.organizationalReview];
        reviews[i].description = e.target.value;
        update('resources.organizationalReview', reviews);
      }}
      rows={2}
      className="w-full border rounded-lg px-3 py-2"
      placeholder="Description"
    />
    <div>
      <label className="block text-xs font-medium text-gray-500 mb-1">PDF Document</label>
      <FileUploadField
        currentValue={review.link}
        onChange={(url) => {
          const reviews = [...data.resources.organizationalReview];
          reviews[i].link = url;
          update('resources.organizationalReview', reviews);
        }}
        accept=".pdf,.doc,.docx"
      />
    </div>
    <button
      onClick={() =>
        update(
          'resources.organizationalReview',
          data.resources.organizationalReview.filter((_: any, idx: number) => idx !== i)
        )
      }
      className="text-red-500 text-sm"
    >
      Remove
    </button>
  </div>
))}
<button
  onClick={() =>
    update('resources.organizationalReview', [
      ...data.resources.organizationalReview,
      { title: '', description: '', link: '' },
    ])
  }
  className="text-sm text-emerald-green"
>
  + Add Review
</button>

      {/* Program Reports */}
      <h3 className="font-display font-bold text-lg text-deep-forest">Program Reports</h3>
      {data.resources.programReports.map((r: any, i: number) => (
        <div key={i} className="border border-gray-200 rounded-xl p-4 bg-gray-50 space-y-3">
          <input
            value={r.title}
            onChange={(e) => {
              const p = [...data.resources.programReports];
              p[i].title = e.target.value;
              update('resources.programReports', p);
            }}
            className="w-full border rounded-lg px-3 py-2"
            placeholder="Title"
          />
          <textarea
            value={r.description}
            onChange={(e) => {
              const p = [...data.resources.programReports];
              p[i].description = e.target.value;
              update('resources.programReports', p);
            }}
            rows={2}
            className="w-full border rounded-lg px-3 py-2"
            placeholder="Description"
          />
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">PDF Document</label>
            <FileUploadField
              currentValue={r.link}
              onChange={(url) => {
                const p = [...data.resources.programReports];
                p[i].link = url;
                update('resources.programReports', p);
              }}
              accept=".pdf,.doc,.docx"
            />
          </div>
          <button
            onClick={() =>
              update(
                'resources.programReports',
                data.resources.programReports.filter((_: any, idx: number) => idx !== i)
              )
            }
            className="text-red-500 text-sm"
          >
            Remove
          </button>
        </div>
      ))}
      <button
        onClick={() =>
          update('resources.programReports', [
            ...data.resources.programReports,
            { title: '', description: '', link: '' },
          ])
        }
        className="text-sm text-emerald-green"
      >
        + Add Program Report
      </button>

      {/* Research */}
      <h3 className="font-display font-bold text-lg text-deep-forest">Research</h3>
      {data.resources.research.map((r: any, i: number) => (
        <div key={i} className="border border-gray-200 rounded-xl p-4 bg-gray-50 space-y-3">
          <input
            value={r.title}
            onChange={(e) => {
              const re = [...data.resources.research];
              re[i].title = e.target.value;
              update('resources.research', re);
            }}
            className="w-full border rounded-lg px-3 py-2"
            placeholder="Title"
          />
          <textarea
            value={r.description}
            onChange={(e) => {
              const re = [...data.resources.research];
              re[i].description = e.target.value;
              update('resources.research', re);
            }}
            rows={2}
            className="w-full border rounded-lg px-3 py-2"
            placeholder="Description"
          />
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">PDF Document</label>
            <FileUploadField
              currentValue={r.link}
              onChange={(url) => {
                const re = [...data.resources.research];
                re[i].link = url;
                update('resources.research', re);
              }}
              accept=".pdf,.doc,.docx"
            />
          </div>
          <button
            onClick={() =>
              update(
                'resources.research',
                data.resources.research.filter((_: any, idx: number) => idx !== i)
              )
            }
            className="text-red-500 text-sm"
          >
            Remove
          </button>
        </div>
      ))}
      <button
        onClick={() =>
          update('resources.research', [
            ...data.resources.research,
            { title: '', description: '', link: '' },
          ])
        }
        className="text-sm text-emerald-green"
      >
        + Add Research Item
      </button>

      {/* Policies */}
      <h3 className="font-display font-bold text-lg text-deep-forest">Policies</h3>
      {data.resources.policies.map((p: any, i: number) => (
        <div key={i} className="border border-gray-200 rounded-xl p-4 bg-gray-50 space-y-3">
          <input
            value={p.title}
            onChange={(e) => {
              const po = [...data.resources.policies];
              po[i].title = e.target.value;
              update('resources.policies', po);
            }}
            className="w-full border rounded-lg px-3 py-2"
            placeholder="Title"
          />
          <input
            value={p.subtitle || ''}
            onChange={(e) => {
              const po = [...data.resources.policies];
              po[i].subtitle = e.target.value;
              update('resources.policies', po);
            }}
            className="w-full border rounded-lg px-3 py-2"
            placeholder="Subtitle (optional)"
          />
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">PDF Document</label>
            <FileUploadField
              currentValue={p.link}
              onChange={(url) => {
                const po = [...data.resources.policies];
                po[i].link = url;
                update('resources.policies', po);
              }}
              accept=".pdf,.doc,.docx"
            />
          </div>
          <button
            onClick={() =>
              update(
                'resources.policies',
                data.resources.policies.filter((_: any, idx: number) => idx !== i)
              )
            }
            className="text-red-500 text-sm"
          >
            Remove
          </button>
        </div>
      ))}
      <button
        onClick={() =>
          update('resources.policies', [
            ...data.resources.policies,
            { title: '', subtitle: '', link: '' },
          ])
        }
        className="text-sm text-emerald-green"
      >
        + Add Policy
      </button>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Footer Note</label>
        <input
          value={data.resources.footerNote}
          onChange={(e) => update('resources.footerNote', e.target.value)}
          className="w-full border border-gray-200 rounded-lg px-3 py-2"
          placeholder="Footer note"
        />
      </div>
    </div>
  );

      // ================= DONATE =================
      case 'donate':
        return (
          <div className="space-y-6">
            <input
              value={data.donate.heading}
              onChange={(e) => update('donate.heading', e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2"
              placeholder="Heading"
            />
            <textarea
              value={data.donate.subtitle}
              onChange={(e) => update('donate.subtitle', e.target.value)}
              rows={2}
              className="w-full border border-gray-200 rounded-lg px-3 py-2"
              placeholder="Subtitle"
            />
            <h3 className="font-display font-bold text-lg text-deep-forest">Badges</h3>
            {data.donate.badges.map((b: string, i: number) => (
              <div key={i} className="flex gap-2 mb-2">
                <input
                  value={b}
                  onChange={(e) => {
                    const ba = [...data.donate.badges];
                    ba[i] = e.target.value;
                    update('donate.badges', ba);
                  }}
                  className="flex-1 border border-gray-200 rounded-lg px-3 py-2"
                  placeholder="Badge text"
                />
                <button
                  onClick={() =>
                    update(
                      'donate.badges',
                      data.donate.badges.filter((_: any, idx: number) => idx !== i)
                    )
                  }
                  className="text-red-500"
                >
                  ✕
                </button>
              </div>
            ))}
            <button
              onClick={() => update('donate.badges', [...data.donate.badges, ''])}
              className="text-sm text-emerald-green font-medium hover:text-deep-forest inline-flex items-center gap-1"
            >
              <span>+</span> Add Badge
            </button>

            <h3 className="font-display font-bold text-lg text-deep-forest mt-6">Donation Tiers</h3>
            {data.donate.tiers.map((tier: any, i: number) => (
              <div key={i} className="border border-gray-200 rounded-xl p-4 bg-gray-50 space-y-3">
                <input
                  value={tier.amount}
                  onChange={(e) => {
                    const t = [...data.donate.tiers];
                    t[i].amount = e.target.value;
                    update('donate.tiers', t);
                  }}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2"
                  placeholder="Amount (e.g., $40, Monthly)"
                />
                <input
                  value={tier.title}
                  onChange={(e) => {
                    const t = [...data.donate.tiers];
                    t[i].title = e.target.value;
                    update('donate.tiers', t);
                  }}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2"
                  placeholder="Title"
                />
                <textarea
                  value={tier.description}
                  onChange={(e) => {
                    const t = [...data.donate.tiers];
                    t[i].description = e.target.value;
                    update('donate.tiers', t);
                  }}
                  rows={2}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2"
                  placeholder="Description"
                />
                <input
                  value={tier.buttonText}
                  onChange={(e) => {
                    const t = [...data.donate.tiers];
                    t[i].buttonText = e.target.value;
                    update('donate.tiers', t);
                  }}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2"
                  placeholder="Button Text"
                />
                <label className="inline-flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={tier.highlight}
                    onChange={(e) => {
                      const t = [...data.donate.tiers];
                      t[i].highlight = e.target.checked;
                      update('donate.tiers', t);
                    }}
                    className="rounded"
                  />
                  <span className="text-sm">Highlight this tier?</span>
                </label>
                <button
                  onClick={() =>
                    update(
                      'donate.tiers',
                      data.donate.tiers.filter((_: any, idx: number) => idx !== i)
                    )
                  }
                  className="text-red-500 text-sm hover:text-red-700"
                >
                  Remove tier
                </button>
              </div>
            ))}
            <button
              onClick={() =>
                update('donate.tiers', [
                  ...data.donate.tiers,
                  { amount: '', title: '', description: '', buttonText: '', highlight: false },
                ])
              }
              className="text-sm text-emerald-green font-medium hover:text-deep-forest inline-flex items-center gap-1"
            >
              <span>+</span> Add Tier
            </button>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Note</label>
              <textarea
                value={data.donate.note}
                onChange={(e) => update('donate.note', e.target.value)}
                rows={2}
                className="w-full border border-gray-200 rounded-lg px-3 py-2"
                placeholder="Donation note"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <input
                value={data.donate.institutionalContact}
                onChange={(e) => update('donate.institutionalContact', e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2"
                placeholder="Institutional Contact Text"
              />
              <input
                value={data.donate.email}
                onChange={(e) => update('donate.email', e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2"
                placeholder="Contact Email"
              />
            </div>
          </div>
        );

     // ================= PARTNERS =================
case 'partners':
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Heading</label>
        <input
          value={data.partners.heading}
          onChange={(e) => update('partners.heading', e.target.value)}
          className="w-full border border-gray-200 rounded-lg px-3 py-2"
          placeholder="Heading"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
        <input
          value={data.partners.subtitle}
          onChange={(e) => update('partners.subtitle', e.target.value)}
          className="w-full border border-gray-200 rounded-lg px-3 py-2"
          placeholder="Subtitle"
        />
      </div>

      <h3 className="font-display font-bold text-lg text-deep-forest">Partner List</h3>
      <div className="space-y-3">
        {data.partners.list.map((partner: any, i: number) => (
          <div key={i} className="border border-gray-200 rounded-xl p-3 bg-gray-50">
            <div className="flex gap-2 items-start">
              <input
                value={partner.name}
                onChange={(e) => {
                  const l = [...data.partners.list];
                  l[i].name = e.target.value;
                  update('partners.list', l);
                }}
                className="flex-1 border border-gray-200 rounded-lg px-3 py-2"
                placeholder="Partner Name"
              />
              <input
                value={partner.label}
                onChange={(e) => {
                  const l = [...data.partners.list];
                  l[i].label = e.target.value;
                  update('partners.list', l);
                }}
                className="flex-1 border border-gray-200 rounded-lg px-3 py-2"
                placeholder="Label"
              />
              <button
                onClick={() =>
                  update(
                    'partners.list',
                    data.partners.list.filter((_: any, idx: number) => idx !== i)
                  )
                }
                className="text-red-500 hover:text-red-700"
              >
                ✕
              </button>
            </div>

            {/* Logo Upload with preview */}
            <div className="mt-2">
              <label className="text-xs text-gray-500 font-medium mb-1 block">Logo</label>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white border border-gray-200 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
                  {partner.image ? (
                    <img src={partner.image} alt="" className="w-full h-full object-contain" />
                  ) : (
                    <span className="text-gray-300 text-xs">No logo</span>
                  )}
                </div>
                <FileUploadField
                  currentValue={partner.image || ''}
                  onChange={(url) => {
                    const l = [...data.partners.list];
                    l[i].image = url;
                    update('partners.list', l);
                  }}
                  accept="image/*"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() =>
          update('partners.list', [
            ...data.partners.list,
            { name: '', label: '', image: '' },
          ])
        }
        className="text-sm text-emerald-green font-medium hover:text-deep-forest inline-flex items-center gap-1"
      >
        <span>+</span> Add Partner
      </button>
    </div>
  );

      // ================= GET INVOLVED =================
      case 'getInvolved':
        return (
          <div className="space-y-6">
            <input
              value={data.getInvolved.heading}
              onChange={(e) => update('getInvolved.heading', e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2"
              placeholder="Heading"
            />
            <h3 className="font-display font-bold text-lg text-deep-forest">Options</h3>
            {data.getInvolved.options.map((opt: any, i: number) => (
              <div key={i} className="border border-gray-200 rounded-xl p-4 bg-gray-50 space-y-3">
                <input
                  value={opt.title}
                  onChange={(e) => {
                    const o = [...data.getInvolved.options];
                    o[i].title = e.target.value;
                    update('getInvolved.options', o);
                  }}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2"
                  placeholder="Title"
                />
                <input
                  value={opt.description}
                  onChange={(e) => {
                    const o = [...data.getInvolved.options];
                    o[i].description = e.target.value;
                    update('getInvolved.options', o);
                  }}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2"
                  placeholder="Description"
                />
                <input
                  value={opt.icon}
                  onChange={(e) => {
                    const o = [...data.getInvolved.options];
                    o[i].icon = e.target.value;
                    update('getInvolved.options', o);
                  }}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2"
                  placeholder="Icon (emoji)"
                />
                <button
                  onClick={() =>
                    update(
                      'getInvolved.options',
                      data.getInvolved.options.filter((_: any, idx: number) => idx !== i)
                    )
                  }
                  className="text-red-500 text-sm hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              onClick={() =>
                update('getInvolved.options', [
                  ...data.getInvolved.options,
                  { title: '', description: '', icon: '' },
                ])
              }
              className="text-sm text-emerald-green font-medium hover:text-deep-forest inline-flex items-center gap-1"
            >
              <span>+</span> Add Option
            </button>
            <h3 className="font-display font-bold text-lg text-deep-forest mt-6">CTA</h3>
            <div className="space-y-3">
              <input
                value={data.getInvolved.cta.title}
                onChange={(e) => update('getInvolved.cta.title', e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2"
                placeholder="Title"
              />
              <textarea
                value={data.getInvolved.cta.text}
                onChange={(e) => update('getInvolved.cta.text', e.target.value)}
                rows={2}
                className="w-full border border-gray-200 rounded-lg px-3 py-2"
                placeholder="Text"
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  value={data.getInvolved.cta.donateText}
                  onChange={(e) => update('getInvolved.cta.donateText', e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2"
                  placeholder="Donate Text"
                />
                <input
                  value={data.getInvolved.cta.contactText}
                  onChange={(e) => update('getInvolved.cta.contactText', e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2"
                  placeholder="Contact Text"
                />
              </div>
            </div>
          </div>
        );

      // ================= CONTACT =================
      case 'contact':
        return (
          <div className="space-y-4">
            <input
              value={data.contact.heading}
              onChange={(e) => update('contact.heading', e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2"
              placeholder="Heading"
            />
            <textarea
              value={data.contact.subtitle}
              onChange={(e) => update('contact.subtitle', e.target.value)}
              rows={2}
              className="w-full border border-gray-200 rounded-lg px-3 py-2"
              placeholder="Subtitle"
            />
            <label className="block text-sm font-medium text-gray-700">Address</label>
            <textarea
              value={data.contact.address}
              onChange={(e) => update('contact.address', e.target.value)}
              rows={3}
              className="w-full border border-gray-200 rounded-lg px-3 py-2"
            />
            <label className="block text-sm font-medium text-gray-700 mt-2">Email</label>
            <input
              value={data.contact.email}
              onChange={(e) => update('contact.email', e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2"
            />
            <label className="block text-sm font-medium text-gray-700 mt-2">Phone</label>
            <input
              value={data.contact.phone}
              onChange={(e) => update('contact.phone', e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2"
            />
            <label className="block text-sm font-medium text-gray-700 mt-2">Working Hours</label>
            <textarea
              value={data.contact.hours}
              onChange={(e) => update('contact.hours', e.target.value)}
              rows={2}
              className="w-full border border-gray-200 rounded-lg px-3 py-2"
            />
            <h3 className="font-display font-bold text-lg text-deep-forest mt-4">Social Links</h3>
            <div className="grid grid-cols-2 gap-3">
              <input
                value={data.contact.social.facebook}
                onChange={(e) => update('contact.social.facebook', e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2"
                placeholder="Facebook URL"
              />
              <input
                value={data.contact.social.linkedin}
                onChange={(e) => update('contact.social.linkedin', e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2"
                placeholder="LinkedIn URL"
              />
              <input
                value={data.contact.social.twitter}
                onChange={(e) => update('contact.social.twitter', e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2"
                placeholder="Twitter URL"
              />
              <input
                value={data.contact.social.tiktok}
                onChange={(e) => update('contact.social.tiktok', e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2"
                placeholder="TikTok URL"
              />
            </div>
            <label className="block text-sm font-medium text-gray-700 mt-2">Map URL (embed src)</label>
            <input
              value={data.contact.mapUrl}
              onChange={(e) => update('contact.mapUrl', e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2"
              placeholder="Google Maps embed URL"
            />
          </div>
        );

      default:
        return <div className="text-center py-20 text-gray-500">Select a section</div>;
    }
  };

  if (loading) return <div className="p-8 text-center">Loading editor...</div>;
  if (!data) return <div className="p-8 text-center">No data found. Please seed the database.</div>;

  return (
    <div className="flex gap-6">
      {/* ---- Section Sidebar ---- */}
      <nav className="w-56 flex-shrink-0">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sticky top-20">
          <h2 className="font-display font-bold text-lg text-deep-forest mb-4">Home Sections</h2>
          <div className="flex flex-col gap-1">
            {sectionNames.map((sec) => (
              <button
                key={sec.key}
                onClick={() => setActiveSection(sec.key)}
                className={`text-left px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  activeSection === sec.key
                    ? 'bg-emerald-green text-white shadow-md shadow-emerald-green/20'
                    : 'text-gray-600 hover:bg-soft-bg hover:text-deep-forest'
                }`}
              >
                {sec.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* ---- Main Editing Area ---- */}
      <div className="flex-1 min-w-0">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-display font-bold text-deep-forest">
              {sectionNames.find((s) => s.key === activeSection)?.label}
            </h1>
            <button
              onClick={handleSave}
              className="bg-emerald-green text-white px-6 py-2.5 rounded-full font-semibold hover:bg-deep-forest transition-colors shadow-lg shadow-emerald-green/20 hover:shadow-xl"
            >
              Save All Changes
            </button>
          </div>
          {renderSection()}
          {saveMessage && (
            <p className="mt-6 text-sm font-medium text-emerald-green bg-emerald-green/5 p-3 rounded-lg">
              {saveMessage}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
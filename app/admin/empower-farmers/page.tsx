// @ts-nocheck
'use client';

import { useState, useEffect, useRef } from 'react';
import FileUploadField from '@/components/FileUploadField';
import { savePageData } from '@/app/actions';

type SectionKey =
  | 'hero'
  | 'mission'
  | 'challenge'
  | 'future'
  | 'strategy'
  | 'methods'
  | 'pfumvudza'
  | 'impact'
  | 'training'
  | 'contact';

const sectionNames: { key: SectionKey; label: string }[] = [
  { key: 'hero', label: 'Hero' },
  { key: 'mission', label: 'Mission' },
  { key: 'challenge', label: 'Challenge' },
  { key: 'future', label: 'Future' },
  { key: 'strategy', label: 'Strategy' },
  { key: 'methods', label: 'Methods' },
  { key: 'pfumvudza', label: 'Pfumvudza' },
  { key: 'impact', label: 'Impact' },
  { key: 'training', label: 'Training' },
  { key: 'contact', label: 'Contact' },
];

export default function AdminEmpowerFarmers() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState<SectionKey>('hero');
  const [saveMessage, setSaveMessage] = useState('');

  useEffect(() => {
    fetch('/api/page-data?page=empower-farmers')
      .then(res => res.json())
      .then(json => {
        if (json && json.hero) setData(json);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    const result = await savePageData('empower-farmers', data);
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

  const renderSection = () => {
    if (!data) return null;

    switch (activeSection) {
      // ================= HERO =================
      case 'hero':
        return (
          <div className="space-y-4">
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
              <input
                value={data.hero.title}
                onChange={(e) => update('hero.title', e.target.value)}
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
              <label className="block text-sm font-medium text-gray-700 mb-1">Background Image</label>
              <FileUploadField
                currentValue={data.hero.image}
                onChange={(url) => update('hero.image', url)}
                accept="image/*"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Logo</label>
              <FileUploadField
                currentValue={data.hero.logo || ''}
                onChange={(url) => update('hero.logo', url)}
                accept="image/*"
              />
            </div>
          </div>
        );

      // ================= MISSION =================
      case 'mission':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Heading</label>
              <input
                value={data.mission.heading}
                onChange={(e) => update('mission.heading', e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Text</label>
              <textarea
                value={data.mission.text}
                onChange={(e) => update('mission.text', e.target.value)}
                rows={5}
                className="w-full border border-gray-200 rounded-lg px-3 py-2"
              />
            </div>
          </div>
        );

      // ================= CHALLENGE =================
      case 'challenge':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Heading</label>
              <input
                value={data.challenge.heading}
                onChange={(e) => update('challenge.heading', e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Text</label>
              <textarea
                value={data.challenge.text}
                onChange={(e) => update('challenge.text', e.target.value)}
                rows={7}
                className="w-full border border-gray-200 rounded-lg px-3 py-2"
              />
            </div>
          </div>
        );

      // ================= FUTURE =================
case 'future':
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Heading</label>
        <input
          value={data.future.heading}
          onChange={(e) => update('future.heading', e.target.value)}
          className="w-full border border-gray-200 rounded-lg px-3 py-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Text</label>
        <textarea
          value={data.future.text}
          onChange={(e) => update('future.text', e.target.value)}
          rows={4}
          className="w-full border border-gray-200 rounded-lg px-3 py-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
        <FileUploadField
          currentValue={data.future.image || ''}
          onChange={(url) => update('future.image', url)}
          accept="image/*"
        />
      </div>
      <h3 className="font-display font-bold text-lg text-deep-forest">Items</h3>
      {data.future.items.map((item: string, i: number) => (
        <div key={i} className="flex gap-2 items-center">
          <input
            value={item}
            onChange={(e) => {
              const f = [...data.future.items];
              f[i] = e.target.value;
              update('future.items', f);
            }}
            className="flex-1 border border-gray-200 rounded-lg px-3 py-2"
          />
          <button
            onClick={() =>
              update('future.items', data.future.items.filter((_: any, idx: number) => idx !== i))
            }
            className="text-red-500"
          >
            ✕
          </button>
        </div>
      ))}
      <button
        onClick={() => update('future.items', [...data.future.items, ''])}
        className="text-sm text-emerald-green font-medium hover:text-deep-forest inline-flex items-center gap-1"
      >
        <span>+</span> Add Item
      </button>
    </div>
  );

      // ================= STRATEGY =================
      case 'strategy':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Heading</label>
              <input
                value={data.strategy.heading}
                onChange={(e) => update('strategy.heading', e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Intro</label>
              <input
                value={data.strategy.intro}
                onChange={(e) => update('strategy.intro', e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2"
              />
            </div>
            <h3 className="font-display font-bold text-lg text-deep-forest">Strategies</h3>
            {data.strategy.items.map((item: any, i: number) => (
              <div key={i} className="border border-gray-200 rounded-xl p-4 bg-gray-50 space-y-3">
                <input
                  value={item.icon}
                  onChange={(e) => {
                    const s = [...data.strategy.items];
                    s[i].icon = e.target.value;
                    update('strategy.items', s);
                  }}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2"
                  placeholder="Icon (emoji)"
                />
                <input
                  value={item.title}
                  onChange={(e) => {
                    const s = [...data.strategy.items];
                    s[i].title = e.target.value;
                    update('strategy.items', s);
                  }}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2"
                  placeholder="Title"
                />
                <textarea
                  value={item.description}
                  onChange={(e) => {
                    const s = [...data.strategy.items];
                    s[i].description = e.target.value;
                    update('strategy.items', s);
                  }}
                  rows={4}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2"
                  placeholder="Description"
                />
                <input
                  value={item.cta}
                  onChange={(e) => {
                    const s = [...data.strategy.items];
                    s[i].cta = e.target.value;
                    update('strategy.items', s);
                  }}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2"
                  placeholder="CTA text"
                />
                <button
                  onClick={() =>
                    update(
                      'strategy.items',
                      data.strategy.items.filter((_: any, idx: number) => idx !== i)
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
                update('strategy.items', [
                  ...data.strategy.items,
                  { icon: '', title: '', description: '', cta: '' },
                ])
              }
              className="text-sm text-emerald-green font-medium hover:text-deep-forest inline-flex items-center gap-1"
            >
              <span>+</span> Add Strategy
            </button>
          </div>
        );

      // ================= METHODS =================
      case 'methods':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Heading</label>
              <input
                value={data.methods.heading}
                onChange={(e) => update('methods.heading', e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Intro</label>
              <input
                value={data.methods.intro}
                onChange={(e) => update('methods.intro', e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2"
              />
            </div>
            <h3 className="font-display font-bold text-lg text-deep-forest">Methods</h3>
            {data.methods.items.map((item: any, i: number) => (
              <div key={i} className="border border-gray-200 rounded-xl p-4 bg-gray-50 space-y-3">
                <input
                  value={item.icon}
                  onChange={(e) => {
                    const m = [...data.methods.items];
                    m[i].icon = e.target.value;
                    update('methods.items', m);
                  }}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2"
                  placeholder="Icon"
                />
                <input
                  value={item.title}
                  onChange={(e) => {
                    const m = [...data.methods.items];
                    m[i].title = e.target.value;
                    update('methods.items', m);
                  }}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2"
                  placeholder="Title"
                />
                <textarea
                  value={item.description}
                  onChange={(e) => {
                    const m = [...data.methods.items];
                    m[i].description = e.target.value;
                    update('methods.items', m);
                  }}
                  rows={3}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2"
                  placeholder="Description"
                />
                <button
                  onClick={() =>
                    update(
                      'methods.items',
                      data.methods.items.filter((_: any, idx: number) => idx !== i)
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
                update('methods.items', [
                  ...data.methods.items,
                  { icon: '', title: '', description: '' },
                ])
              }
              className="text-sm text-emerald-green font-medium hover:text-deep-forest inline-flex items-center gap-1"
            >
              <span>+</span> Add Method
            </button>
          </div>
        );

      // ================= PFUMVUDZA =================
      case 'pfumvudza':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Heading</label>
              <input
                value={data.pfumvudza.heading}
                onChange={(e) => update('pfumvudza.heading', e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Text</label>
              <textarea
                value={data.pfumvudza.text}
                onChange={(e) => update('pfumvudza.text', e.target.value)}
                rows={4}
                className="w-full border border-gray-200 rounded-lg px-3 py-2"
              />
            </div>
            <h3 className="font-display font-bold text-lg text-deep-forest">Stats</h3>
            {data.pfumvudza.stats.map((stat: any, i: number) => (
              <div key={i} className="flex gap-3 items-end mb-3">
                <div className="flex-1">
                  <label className="text-xs text-gray-500">Value</label>
                  <input
                    value={stat.value}
                    onChange={(e) => {
                      const s = [...data.pfumvudza.stats];
                      s[i].value = e.target.value;
                      update('pfumvudza.stats', s);
                    }}
                    className="w-full border border-gray-200 rounded-lg px-2 py-1 mt-1"
                  />
                </div>
                <div className="flex-1">
                  <label className="text-xs text-gray-500">Label</label>
                  <input
                    value={stat.label}
                    onChange={(e) => {
                      const s = [...data.pfumvudza.stats];
                      s[i].label = e.target.value;
                      update('pfumvudza.stats', s);
                    }}
                    className="w-full border border-gray-200 rounded-lg px-2 py-1 mt-1"
                  />
                </div>
                <button
                  onClick={() =>
                    update(
                      'pfumvudza.stats',
                      data.pfumvudza.stats.filter((_: any, idx: number) => idx !== i)
                    )
                  }
                  className="text-red-500 text-sm"
                >
                  ✕
                </button>
              </div>
            ))}
            <button
              onClick={() =>
                update('pfumvudza.stats', [
                  ...data.pfumvudza.stats,
                  { value: '', label: 'New stat' },
                ])
              }
              className="text-sm text-emerald-green font-medium hover:text-deep-forest inline-flex items-center gap-1"
            >
              <span>+</span> Add Stat
            </button>
          </div>
        );

      // ================= IMPACT =================
      case 'impact':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Heading</label>
              <input
                value={data.impact.heading}
                onChange={(e) => update('impact.heading', e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2"
              />
            </div>
            <h3 className="font-display font-bold text-lg text-deep-forest">Stats</h3>
            {data.impact.stats.map((stat: any, i: number) => (
              <div key={i} className="flex gap-3 items-end mb-3">
                <div className="flex-1">
                  <label className="text-xs text-gray-500">Value</label>
                  <input
                    value={stat.value}
                    onChange={(e) => {
                      const s = [...data.impact.stats];
                      s[i].value = e.target.value;
                      update('impact.stats', s);
                    }}
                    className="w-full border border-gray-200 rounded-lg px-2 py-1 mt-1"
                  />
                </div>
                <div className="flex-1">
                  <label className="text-xs text-gray-500">Label</label>
                  <input
                    value={stat.label}
                    onChange={(e) => {
                      const s = [...data.impact.stats];
                      s[i].label = e.target.value;
                      update('impact.stats', s);
                    }}
                    className="w-full border border-gray-200 rounded-lg px-2 py-1 mt-1"
                  />
                </div>
                <button
                  onClick={() =>
                    update(
                      'impact.stats',
                      data.impact.stats.filter((_: any, idx: number) => idx !== i)
                    )
                  }
                  className="text-red-500 text-sm"
                >
                  ✕
                </button>
              </div>
            ))}
            <button
              onClick={() =>
                update('impact.stats', [...data.impact.stats, { value: '', label: '' }])
              }
              className="text-sm text-emerald-green"
            >
              + Add Stat
            </button>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Note</label>
              <textarea
                value={data.impact.note}
                onChange={(e) => update('impact.note', e.target.value)}
                rows={3}
                className="w-full border border-gray-200 rounded-lg px-3 py-2"
              />
            </div>
          </div>
        );

      // ================= TRAINING =================
      case 'training':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Heading</label>
              <input
                value={data.training.heading}
                onChange={(e) => update('training.heading', e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Intro</label>
              <input
                value={data.training.intro}
                onChange={(e) => update('training.intro', e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2"
              />
            </div>
            <h3 className="font-display font-bold text-lg text-deep-forest">Modules</h3>
            {data.training.modules.map((module: string, i: number) => (
              <div key={i} className="flex gap-2 items-center mb-2">
                <input
                  value={module}
                  onChange={(e) => {
                    const m = [...data.training.modules];
                    m[i] = e.target.value;
                    update('training.modules', m);
                  }}
                  className="flex-1 border border-gray-200 rounded-lg px-3 py-2"
                />
                <button
                  onClick={() =>
                    update('training.modules', data.training.modules.filter((_: any, idx: number) => idx !== i))
                  }
                  className="text-red-500"
                >
                  ✕
                </button>
              </div>
            ))}
            <button
              onClick={() => update('training.modules', [...data.training.modules, ''])}
              className="text-sm text-emerald-green"
            >
              + Add Module
            </button>
          </div>
        );

      // ================= CONTACT =================
      case 'contact':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Heading</label>
              <input
                value={data.contact.heading}
                onChange={(e) => update('contact.heading', e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Text</label>
              <textarea
                value={data.contact.text}
                onChange={(e) => update('contact.text', e.target.value)}
                rows={4}
                className="w-full border border-gray-200 rounded-lg px-3 py-2"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  value={data.contact.email}
                  onChange={(e) => update('contact.email', e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  value={data.contact.phone}
                  onChange={(e) => update('contact.phone', e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <textarea
                value={data.contact.address}
                onChange={(e) => update('contact.address', e.target.value)}
                rows={3}
                className="w-full border border-gray-200 rounded-lg px-3 py-2"
              />
            </div>
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
          <h2 className="font-display font-bold text-lg text-deep-forest mb-4">EFSS Sections</h2>
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
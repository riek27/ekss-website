// @ts-nocheck
'use client';

import { useState, useEffect, useRef } from 'react';
import FileUploadField from '@/components/FileUploadField';
import { savePageData } from '@/app/actions';

type SectionKey =
  | 'hero'
  | 'stats'
  | 'challenge'
  | 'approach'
  | 'currentWork'
  | 'results'
  | 'projects'
  | 'partners'
  | 'resources'
  | 'gallery'
  | 'cta';

const sectionNames: { key: SectionKey; label: string }[] = [
  { key: 'hero', label: 'Hero' },
  { key: 'stats', label: 'Stats' },
  { key: 'challenge', label: 'Challenge' },
  { key: 'approach', label: 'Our Approach' },
  { key: 'currentWork', label: 'What We Are Doing' },
  { key: 'results', label: 'Results' },
  { key: 'projects', label: 'Projects' },
  { key: 'partners', label: 'Partners & Donors' },
  { key: 'resources', label: 'Resources' },
  { key: 'gallery', label: 'Gallery' },
  { key: 'cta', label: 'Call to Action' },
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
      case 'hero':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Tagline</label>
              <input value={data.hero.tagline} onChange={(e) => update('hero.tagline', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <div>
              <label className="block text-sm font-medium">Title</label>
              <input value={data.hero.title} onChange={(e) => update('hero.title', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <div>
              <label className="block text-sm font-medium">Subtitle</label>
              <textarea value={data.hero.subtitle} onChange={(e) => update('hero.subtitle', e.target.value)} rows={2} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <div>
              <label className="block text-sm font-medium">Background Image</label>
              <FileUploadField currentValue={data.hero.image} onChange={(url) => update('hero.image', url)} accept="image/*" />
            </div>
          </div>
        );

      case 'stats':
        return (
          <div>
            {data.stats.map((stat: any, i: number) => (
              <div key={i} className="flex gap-3 items-end mb-3">
                <div className="flex-1">
                  <label className="text-xs">Value</label>
                  <input value={stat.value} onChange={(e) => { const s = [...data.stats]; s[i].value = e.target.value; update('stats', s); }} className="w-full border rounded-lg px-2 py-1 mt-1" />
                </div>
                <div className="flex-1">
                  <label className="text-xs">Label</label>
                  <input value={stat.label} onChange={(e) => { const s = [...data.stats]; s[i].label = e.target.value; update('stats', s); }} className="w-full border rounded-lg px-2 py-1 mt-1" />
                </div>
                <button onClick={() => update('stats', data.stats.filter((_: any, idx: number) => idx !== i))} className="text-red-500 text-sm">✕</button>
              </div>
            ))}
            <button onClick={() => update('stats', [...data.stats, { value: '', label: 'New stat' }])} className="text-sm text-emerald-green">+ Add Stat</button>
          </div>
        );

      case 'challenge':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Heading</label>
              <input value={data.challenge.heading} onChange={(e) => update('challenge.heading', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <div>
              <label className="block text-sm font-medium">Text</label>
              <textarea value={data.challenge.text} onChange={(e) => update('challenge.text', e.target.value)} rows={4} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
          </div>
        );

      case 'approach':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Heading</label>
              <input value={data.approach.heading} onChange={(e) => update('approach.heading', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <h3 className="font-semibold">Items</h3>
            {data.approach.items.map((item: any, i: number) => (
              <div key={i} className="border rounded p-3 mb-2">
                <input value={item.title} onChange={(e) => { const a = [...data.approach.items]; a[i].title = e.target.value; update('approach.items', a); }} className="w-full border rounded px-2 py-1 mb-1" placeholder="Title" />
                <input value={item.description} onChange={(e) => { const a = [...data.approach.items]; a[i].description = e.target.value; update('approach.items', a); }} className="w-full border rounded px-2 py-1" placeholder="Description" />
                <button onClick={() => update('approach.items', data.approach.items.filter((_: any, idx: number) => idx !== i))} className="text-red-500 text-sm">Remove</button>
              </div>
            ))}
            <button onClick={() => update('approach.items', [...data.approach.items, { title: '', description: '' }])} className="text-sm text-emerald-green">+ Add Item</button>
          </div>
        );

      case 'currentWork':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Heading</label>
              <input value={data.currentWork.heading} onChange={(e) => update('currentWork.heading', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <h3 className="font-semibold">Items</h3>
            {data.currentWork.items.map((item: string, i: number) => (
              <div key={i} className="flex gap-2 mb-2">
                <input value={item} onChange={(e) => { const c = [...data.currentWork.items]; c[i] = e.target.value; update('currentWork.items', c); }} className="flex-1 border rounded px-3 py-2" />
                <button onClick={() => update('currentWork.items', data.currentWork.items.filter((_: any, idx: number) => idx !== i))} className="text-red-500">✕</button>
              </div>
            ))}
            <button onClick={() => update('currentWork.items', [...data.currentWork.items, ''])} className="text-sm text-emerald-green">+ Add Item</button>
          </div>
        );

      case 'results':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Heading</label>
              <input value={data.results.heading} onChange={(e) => update('results.heading', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <h3 className="font-semibold">Rows</h3>
            {data.results.rows.map((row: any, i: number) => (
              <div key={i} className="border rounded p-3 mb-2">
                <input value={row.metric} onChange={(e) => { const r = [...data.results.rows]; r[i].metric = e.target.value; update('results.rows', r); }} className="w-full border rounded px-2 py-1 mb-1" placeholder="Metric" />
                <input value={row.outcome} onChange={(e) => { const r = [...data.results.rows]; r[i].outcome = e.target.value; update('results.rows', r); }} className="w-full border rounded px-2 py-1 mb-1" placeholder="Outcome" />
                <input value={row.verification} onChange={(e) => { const r = [...data.results.rows]; r[i].verification = e.target.value; update('results.rows', r); }} className="w-full border rounded px-2 py-1" placeholder="Verification" />
                <button onClick={() => update('results.rows', data.results.rows.filter((_: any, idx: number) => idx !== i))} className="text-red-500 text-sm">Remove</button>
              </div>
            ))}
            <button onClick={() => update('results.rows', [...data.results.rows, { metric: '', outcome: '', verification: '' }])} className="text-sm text-emerald-green">+ Add Row</button>
          </div>
        );

      case 'projects':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Heading</label>
              <input value={data.projects.heading} onChange={(e) => update('projects.heading', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <h3 className="font-semibold">Projects</h3>
            {data.projects.items.map((project: any, i: number) => (
              <div key={i} className="border rounded p-3 mb-2">
                <input value={project.icon} onChange={(e) => { const p = [...data.projects.items]; p[i].icon = e.target.value; update('projects.items', p); }} className="w-full border rounded px-2 py-1 mb-1" placeholder="Icon (emoji)" />
                <input value={project.title} onChange={(e) => { const p = [...data.projects.items]; p[i].title = e.target.value; update('projects.items', p); }} className="w-full border rounded px-2 py-1 mb-1" placeholder="Title" />
                <textarea value={project.description} onChange={(e) => { const p = [...data.projects.items]; p[i].description = e.target.value; update('projects.items', p); }} rows={2} className="w-full border rounded px-2 py-1" placeholder="Description" />
                <button onClick={() => update('projects.items', data.projects.items.filter((_: any, idx: number) => idx !== i))} className="text-red-500 text-sm">Remove</button>
              </div>
            ))}
            <button onClick={() => update('projects.items', [...data.projects.items, { icon: '', title: '', description: '' }])} className="text-sm text-emerald-green">+ Add Project</button>
          </div>
        );

      case 'partners':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Heading</label>
              <input value={data.partners.heading} onChange={(e) => update('partners.heading', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <div>
              <label className="block text-sm font-medium">Text</label>
              <textarea value={data.partners.text} onChange={(e) => update('partners.text', e.target.value)} rows={3} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
          </div>
        );

      case 'resources':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Heading</label>
              <input value={data.resources.heading} onChange={(e) => update('resources.heading', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <div>
              <label className="block text-sm font-medium">Text</label>
              <textarea value={data.resources.text} onChange={(e) => update('resources.text', e.target.value)} rows={3} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <div>
              <label className="block text-sm font-medium">Link</label>
              <input value={data.resources.link} onChange={(e) => update('resources.link', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
          </div>
        );

      case 'gallery':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Heading</label>
              <input value={data.gallery.heading} onChange={(e) => update('gallery.heading', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <h3 className="font-semibold">Images</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {data.gallery.images.map((img: string, i: number) => (
  <div key={i} className="border rounded-lg p-3">
    {img ? (
      <img src={img} alt="" className="h-32 w-full object-cover rounded mb-2" />
    ) : (
      <div className="h-32 w-full flex items-center justify-center bg-gray-100 rounded mb-2 text-gray-400 text-sm">
        No image
      </div>
    )}
    <FileUploadField currentValue={img} onChange={(url) => { const g = [...data.gallery.images]; g[i] = url; update('gallery.images', g); }} accept="image/*" />
    <button onClick={() => update('gallery.images', data.gallery.images.filter((_: any, idx: number) => idx !== i))} className="text-red-500 text-sm mt-1">Remove</button>
  </div>
))}
            </div>
            <button onClick={() => update('gallery.images', [...data.gallery.images, ''])} className="text-sm text-emerald-green">+ Add Image</button>
          </div>
        );

      case 'cta':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Heading</label>
              <input value={data.cta.heading} onChange={(e) => update('cta.heading', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <div>
              <label className="block text-sm font-medium">Text</label>
              <textarea value={data.cta.text} onChange={(e) => update('cta.text', e.target.value)} rows={2} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium">Button Text</label>
                <input value={data.cta.buttonText} onChange={(e) => update('cta.buttonText', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
              </div>
              <div>
                <label className="block text-sm font-medium">Button Link</label>
                <input value={data.cta.buttonLink} onChange={(e) => update('cta.buttonLink', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
              </div>
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
      <nav className="w-56 flex-shrink-0">
        <div className="bg-white rounded-2xl shadow-sm border p-4 sticky top-20">
          <h2 className="font-display font-bold text-lg text-deep-forest mb-4">Empower Farmers Sections</h2>
          <div className="flex flex-col gap-1">
            {sectionNames.map((sec) => (
              <button
                key={sec.key}
                onClick={() => setActiveSection(sec.key)}
                className={`text-left px-3 py-2 rounded-xl text-sm font-medium transition-all ${activeSection === sec.key ? 'bg-emerald-green text-white shadow-md' : 'text-gray-600 hover:bg-soft-bg hover:text-deep-forest'}`}
              >
                {sec.label}
              </button>
            ))}
          </div>
        </div>
      </nav>
      <div className="flex-1">
        <div className="bg-white rounded-2xl shadow-sm border p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-display font-bold text-deep-forest">
              {sectionNames.find((s) => s.key === activeSection)?.label}
            </h1>
            <button onClick={handleSave} className="bg-emerald-green text-white px-6 py-2.5 rounded-full font-semibold hover:bg-deep-forest transition shadow-lg">Save All Changes</button>
          </div>
          {renderSection()}
          {saveMessage && <p className="mt-4 text-sm text-emerald-green">{saveMessage}</p>}
        </div>
      </div>
    </div>
  );
}
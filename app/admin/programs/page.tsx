'use client';

import { useState, useRef } from 'react';
import { savePageData, uploadFile } from '@/app/actions';
import initialData from '@/data/programs.json';
import FileUploadField from '@/components/FileUploadField';



type SectionKey = 'hero' | 'overview' | 'featured' | 'results' | 'partners' | 'cta';

const sectionNames: { key: SectionKey; label: string }[] = [
  { key: 'hero', label: 'Hero' },
  { key: 'overview', label: 'Overview Cards' },
  { key: 'featured', label: 'Featured Program' },
  { key: 'results', label: 'Results' },
  { key: 'partners', label: 'Partners' },
  { key: 'cta', label: 'Call to Action' },
];

export default function AdminPrograms() {
  const [data, setData] = useState(() => JSON.parse(JSON.stringify(initialData)));
  const [activeSection, setActiveSection] = useState<SectionKey>('hero');
  const [saveMessage, setSaveMessage] = useState('');

  const handleSave = async () => {
    const result = await savePageData('programs', data);
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
    switch (activeSection) {
      case 'hero':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Title</label>
              <input value={data.hero.title} onChange={(e) => update('hero.title', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <div>
              <label className="block text-sm font-medium">Subtitle</label>
              <textarea value={data.hero.subtitle} onChange={(e) => update('hero.subtitle', e.target.value)} rows={3} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <div>
              <label className="block text-sm font-medium">Background Image</label>
              <FileUploadField currentValue={data.hero.image} onChange={(url) => update('hero.image', url)} accept="image/*" />
            </div>
          </div>
        );

      case 'overview':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium">Heading</label>
              <input value={data.overview.heading} onChange={(e) => update('overview.heading', e.target.value)} className="w-full border rounded-lg px-3 py-2" />
            </div>
            <h3 className="font-semibold">Cards</h3>
            {data.overview.cards.map((card: any, i: number) => (
              <div key={i} className="border rounded-xl p-4 bg-gray-50 space-y-3 mb-3">
                <input value={card.icon} onChange={(e) => { const c = [...data.overview.cards]; c[i].icon = e.target.value; update('overview.cards', c); }} className="w-full border rounded px-2 py-1" placeholder="Icon (emoji)" />
                <input value={card.title} onChange={(e) => { const c = [...data.overview.cards]; c[i].title = e.target.value; update('overview.cards', c); }} className="w-full border rounded px-2 py-1" placeholder="Title" />
                <textarea value={card.description} onChange={(e) => { const c = [...data.overview.cards]; c[i].description = e.target.value; update('overview.cards', c); }} rows={2} className="w-full border rounded px-2 py-1" placeholder="Description" />
                <label className="text-xs">Results (one per line)</label>
                <textarea value={card.results.join('\n')} onChange={(e) => { const c = [...data.overview.cards]; c[i].results = e.target.value.split('\n'); update('overview.cards', c); }} rows={2} className="w-full border rounded px-2 py-1" placeholder="✓ result" />
                <button onClick={() => update('overview.cards', data.overview.cards.filter((_: any, idx: number) => idx !== i))} className="text-red-500 text-sm">Remove</button>
              </div>
            ))}
            <button onClick={() => update('overview.cards', [...data.overview.cards, { icon: '', title: '', description: '', results: [] }])} className="text-sm text-emerald-green">+ Add Card</button>
          </div>
        );

      case 'featured':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Heading (small label above title)</label>
              <input value={data.featured.heading} onChange={(e) => update('featured.heading', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <div>
              <label className="block text-sm font-medium">Title</label>
              <input value={data.featured.title} onChange={(e) => update('featured.title', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <div>
              <label className="block text-sm font-medium">Description</label>
              <textarea value={data.featured.description} onChange={(e) => update('featured.description', e.target.value)} rows={4} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <div>
              <label className="block text-sm font-medium">Image</label>
              <FileUploadField currentValue={data.featured.image} onChange={(url) => update('featured.image', url)} accept="image/*" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium">Button Text</label>
                <input value={data.featured.buttonText} onChange={(e) => update('featured.buttonText', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
              </div>
              <div>
                <label className="block text-sm font-medium">Button Link</label>
                <input value={data.featured.buttonLink} onChange={(e) => update('featured.buttonLink', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
              </div>
            </div>
          </div>
        );

      case 'results':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Heading</label>
              <input value={data.results.heading} onChange={(e) => update('results.heading', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <h3 className="font-semibold">Stats</h3>
            {data.results.stats.map((stat: any, i: number) => (
              <div key={i} className="flex gap-2 items-end mb-2">
                <div className="flex-1">
                  <label className="text-xs">Value</label>
                  <input type="number" value={stat.value} onChange={(e) => { const s = [...data.results.stats]; s[i].value = Number(e.target.value); update('results.stats', s); }} className="w-full border rounded px-2 py-1 mt-1" />
                </div>
                <div className="flex-1">
                  <label className="text-xs">Label</label>
                  <input value={stat.label} onChange={(e) => { const s = [...data.results.stats]; s[i].label = e.target.value; update('results.stats', s); }} className="w-full border rounded px-2 py-1 mt-1" />
                </div>
                <button onClick={() => update('results.stats', data.results.stats.filter((_: any, idx: number) => idx !== i))} className="text-red-500 text-sm">✕</button>
              </div>
            ))}
            <button onClick={() => update('results.stats', [...data.results.stats, { value: 0, label: 'New stat' }])} className="text-sm text-emerald-green">+ Add Stat</button>
          </div>
        );

      case 'partners':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Heading</label>
              <input value={data.partners.heading} onChange={(e) => update('partners.heading', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <h3 className="font-semibold">Partner List</h3>
            {data.partners.list.map((p: any, i: number) => (
              <div key={i} className="flex gap-2 mb-2">
                <input value={p.name} onChange={(e) => { const l = [...data.partners.list]; l[i].name = e.target.value; update('partners.list', l); }} className="flex-1 border rounded px-2 py-1" placeholder="Name" />
                <input value={p.label} onChange={(e) => { const l = [...data.partners.list]; l[i].label = e.target.value; update('partners.list', l); }} className="flex-1 border rounded px-2 py-1" placeholder="Label" />
                <button onClick={() => update('partners.list', data.partners.list.filter((_: any, idx: number) => idx !== i))} className="text-red-500">✕</button>
              </div>
            ))}
            <button onClick={() => update('partners.list', [...data.partners.list, { name: '', label: '' }])} className="text-sm text-emerald-green">+ Add Partner</button>
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
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium">Donate Text</label>
                <input value={data.cta.buttons.donate.text} onChange={(e) => update('cta.buttons.donate.text', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
                <label className="block text-sm font-medium mt-1">Donate Link</label>
                <input value={data.cta.buttons.donate.link} onChange={(e) => update('cta.buttons.donate.link', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
              </div>
              <div>
                <label className="block text-sm font-medium">Partner Text</label>
                <input value={data.cta.buttons.partner.text} onChange={(e) => update('cta.buttons.partner.text', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
                <label className="block text-sm font-medium mt-1">Partner Link</label>
                <input value={data.cta.buttons.partner.link} onChange={(e) => update('cta.buttons.partner.link', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
              </div>
              <div>
                <label className="block text-sm font-medium">Get Involved Text</label>
                <input value={data.cta.buttons.getInvolved.text} onChange={(e) => update('cta.buttons.getInvolved.text', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
                <label className="block text-sm font-medium mt-1">Get Involved Link</label>
                <input value={data.cta.buttons.getInvolved.link} onChange={(e) => update('cta.buttons.getInvolved.link', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
              </div>
            </div>
          </div>
        );

      default:
        return <div className="text-center py-20 text-gray-500">Select a section</div>;
    }
  };

  return (
    <div className="flex gap-6">
      <nav className="w-56 flex-shrink-0">
        <div className="bg-white rounded-2xl shadow-sm border p-4 sticky top-20">
          <h2 className="font-display font-bold text-lg text-deep-forest mb-4">Program Sections</h2>
          <div className="flex flex-col gap-1">
            {sectionNames.map((sec) => (
              <button
                key={sec.key}
                onClick={() => setActiveSection(sec.key)}
                className={`text-left px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                  activeSection === sec.key
                    ? 'bg-emerald-green text-white shadow-md'
                    : 'text-gray-600 hover:bg-soft-bg hover:text-deep-forest'
                }`}
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
            <button onClick={handleSave} className="bg-emerald-green text-white px-6 py-2.5 rounded-full font-semibold hover:bg-deep-forest transition shadow-lg">
              Save All Changes
            </button>
          </div>
          {renderSection()}
          {saveMessage && <p className="mt-4 text-sm text-emerald-green">{saveMessage}</p>}
        </div>
      </div>
    </div>
  );
}
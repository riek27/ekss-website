// @ts-nocheck
'use client';

import { useState, useEffect, useRef } from 'react';
import FileUploadField from '@/components/FileUploadField';
import { savePageData } from '@/app/actions';

type SectionKey =
  | 'hero'
  | 'programme'
  | 'youthInAction'
  | 'pathway'
  | 'impact'
  | 'featuredInitiative'
  | 'leadershipMentorship'
  | 'connectedPathways'
  | 'partnersDonors'
  | 'gallery'
  | 'supportCta'
  | 'footerCta';

const sectionNames: { key: SectionKey; label: string }[] = [
  { key: 'hero', label: 'Hero' },
  { key: 'programme', label: 'Programme' },
  { key: 'youthInAction', label: 'Youth in Action' },
  { key: 'pathway', label: 'Pathway' },
  { key: 'impact', label: 'Impact' },
  { key: 'featuredInitiative', label: 'Featured Initiative' },
  { key: 'leadershipMentorship', label: 'Leadership & Mentorship' },
  { key: 'connectedPathways', label: 'Connected Pathways' },
  { key: 'partnersDonors', label: 'Partners & Donors' },
  { key: 'gallery', label: 'Gallery' },
  { key: 'supportCta', label: 'Support CTA' },
  { key: 'footerCta', label: 'Footer CTA' },
];

export default function AdminYouth() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState<SectionKey>('hero');
  const [saveMessage, setSaveMessage] = useState('');

  useEffect(() => {
    fetch('/api/page-data?page=youth')
      .then(res => res.json())
      .then(json => {
        if (json && json.hero) setData(json);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    const result = await savePageData('youth', data);
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
              <label className="block text-sm font-medium">Tagline</label>
              <input value={data.hero.tagline} onChange={(e) => update('hero.tagline', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
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
            <h3 className="font-semibold mt-4">Buttons</h3>
            {data.hero.buttons.map((btn: any, i: number) => (
              <div key={i} className="flex gap-2 mb-2">
                <input value={btn.text} onChange={(e) => { const b = [...data.hero.buttons]; b[i].text = e.target.value; update('hero.buttons', b); }} className="flex-1 border rounded px-3 py-2" placeholder="Text" />
                <input value={btn.link} onChange={(e) => { const b = [...data.hero.buttons]; b[i].link = e.target.value; update('hero.buttons', b); }} className="flex-1 border rounded px-3 py-2" placeholder="Link" />
                <button onClick={() => update('hero.buttons', data.hero.buttons.filter((_: any, idx: number) => idx !== i))} className="text-red-500">✕</button>
              </div>
            ))}
            <button onClick={() => update('hero.buttons', [...data.hero.buttons, { text: '', link: '' }])} className="text-sm text-emerald-green">+ Add Button</button>
          </div>
        );

      // ================= PROGRAMME =================
      case 'programme':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Heading</label>
              <input value={data.programme.heading} onChange={(e) => update('programme.heading', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <div>
              <label className="block text-sm font-medium">Intro</label>
              <input value={data.programme.intro} onChange={(e) => update('programme.intro', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <div>
              <label className="block text-sm font-medium">Text 1</label>
              <textarea value={data.programme.text1} onChange={(e) => update('programme.text1', e.target.value)} rows={3} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <div>
              <label className="block text-sm font-medium">Text 2</label>
              <textarea value={data.programme.text2} onChange={(e) => update('programme.text2', e.target.value)} rows={3} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <div>
              <label className="block text-sm font-medium">Text 3</label>
              <textarea value={data.programme.text3} onChange={(e) => update('programme.text3', e.target.value)} rows={3} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
          </div>
        );

      // ================= YOUTH IN ACTION =================
      case 'youthInAction':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Heading</label>
              <input value={data.youthInAction.heading} onChange={(e) => update('youthInAction.heading', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <div>
              <label className="block text-sm font-medium">Intro</label>
              <input value={data.youthInAction.intro} onChange={(e) => update('youthInAction.intro', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <h3 className="font-semibold">Cards</h3>
            {data.youthInAction.cards.map((card: any, i: number) => (
              <div key={i} className="border rounded p-3 mb-2 space-y-2">
                <input value={card.icon} onChange={(e) => { const c = [...data.youthInAction.cards]; c[i].icon = e.target.value; update('youthInAction.cards', c); }} className="w-full border rounded px-2 py-1" placeholder="Icon" />
                <input value={card.title} onChange={(e) => { const c = [...data.youthInAction.cards]; c[i].title = e.target.value; update('youthInAction.cards', c); }} className="w-full border rounded px-2 py-1" placeholder="Title" />
                <textarea value={card.description} onChange={(e) => { const c = [...data.youthInAction.cards]; c[i].description = e.target.value; update('youthInAction.cards', c); }} rows={2} className="w-full border rounded px-2 py-1" placeholder="Description" />
                <label className="text-xs">Tags (comma separated)</label>
                <input value={card.tags.join(', ')} onChange={(e) => { const c = [...data.youthInAction.cards]; c[i].tags = e.target.value.split(',').map((t: string) => t.trim()); update('youthInAction.cards', c); }} className="w-full border rounded px-2 py-1" />
                <input value={card.link} onChange={(e) => { const c = [...data.youthInAction.cards]; c[i].link = e.target.value; update('youthInAction.cards', c); }} className="w-full border rounded px-2 py-1" placeholder="Link" />
                <button onClick={() => update('youthInAction.cards', data.youthInAction.cards.filter((_: any, idx: number) => idx !== i))} className="text-red-500 text-sm">Remove</button>
              </div>
            ))}
            <button onClick={() => update('youthInAction.cards', [...data.youthInAction.cards, { icon: '', title: '', description: '', tags: [], link: '' }])} className="text-sm text-emerald-green">+ Add Card</button>
          </div>
        );

      // ================= PATHWAY =================
      case 'pathway':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Heading</label>
              <input value={data.pathway.heading} onChange={(e) => update('pathway.heading', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <div>
              <label className="block text-sm font-medium">Intro</label>
              <input value={data.pathway.intro} onChange={(e) => update('pathway.intro', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <h3 className="font-semibold">Steps</h3>
            {data.pathway.steps.map((step: any, i: number) => (
              <div key={i} className="border rounded p-3 mb-2 space-y-2">
                <input value={step.number} onChange={(e) => { const s = [...data.pathway.steps]; s[i].number = e.target.value; update('pathway.steps', s); }} className="w-full border rounded px-2 py-1" placeholder="Number" />
                <input value={step.title} onChange={(e) => { const s = [...data.pathway.steps]; s[i].title = e.target.value; update('pathway.steps', s); }} className="w-full border rounded px-2 py-1" placeholder="Title" />
                <textarea value={step.description} onChange={(e) => { const s = [...data.pathway.steps]; s[i].description = e.target.value; update('pathway.steps', s); }} rows={2} className="w-full border rounded px-2 py-1" placeholder="Description" />
                <button onClick={() => update('pathway.steps', data.pathway.steps.filter((_: any, idx: number) => idx !== i))} className="text-red-500 text-sm">Remove</button>
              </div>
            ))}
            <button onClick={() => update('pathway.steps', [...data.pathway.steps, { number: '', title: '', description: '' }])} className="text-sm text-emerald-green">+ Add Step</button>
          </div>
        );

      // ================= IMPACT =================
      case 'impact':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Heading</label>
              <input value={data.impact.heading} onChange={(e) => update('impact.heading', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <div>
              <label className="block text-sm font-medium">Intro</label>
              <input value={data.impact.intro} onChange={(e) => update('impact.intro', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <h3 className="font-semibold">Stats</h3>
            {data.impact.stats.map((stat: any, i: number) => (
              <div key={i} className="flex gap-2 items-end mb-2">
                <div className="flex-1">
                  <label className="text-xs">Value</label>
                  <input value={stat.value} onChange={(e) => { const s = [...data.impact.stats]; s[i].value = e.target.value; update('impact.stats', s); }} className="w-full border rounded px-2 py-1" />
                </div>
                <div className="flex-1">
                  <label className="text-xs">Label</label>
                  <input value={stat.label} onChange={(e) => { const s = [...data.impact.stats]; s[i].label = e.target.value; update('impact.stats', s); }} className="w-full border rounded px-2 py-1" />
                </div>
                <button onClick={() => update('impact.stats', data.impact.stats.filter((_: any, idx: number) => idx !== i))} className="text-red-500">✕</button>
              </div>
            ))}
            <button onClick={() => update('impact.stats', [...data.impact.stats, { value: '', label: '' }])} className="text-sm text-emerald-green">+ Add Stat</button>

            <h3 className="font-semibold mt-4">Results Table</h3>
            {data.impact.resultsRows.map((row: any, i: number) => (
              <div key={i} className="border rounded p-3 mb-2">
                <input value={row.metric} onChange={(e) => { const r = [...data.impact.resultsRows]; r[i].metric = e.target.value; update('impact.resultsRows', r); }} className="w-full border rounded px-2 py-1 mb-1" placeholder="Metric" />
                <input value={row.outcome} onChange={(e) => { const r = [...data.impact.resultsRows]; r[i].outcome = e.target.value; update('impact.resultsRows', r); }} className="w-full border rounded px-2 py-1 mb-1" placeholder="Outcome" />
                <input value={row.verification} onChange={(e) => { const r = [...data.impact.resultsRows]; r[i].verification = e.target.value; update('impact.resultsRows', r); }} className="w-full border rounded px-2 py-1" placeholder="Verification" />
                <button onClick={() => update('impact.resultsRows', data.impact.resultsRows.filter((_: any, idx: number) => idx !== i))} className="text-red-500 text-sm">Remove</button>
              </div>
            ))}
            <button onClick={() => update('impact.resultsRows', [...data.impact.resultsRows, { metric: '', outcome: '', verification: '' }])} className="text-sm text-emerald-green">+ Add Row</button>

            <div>
              <label className="block text-sm font-medium">Results Note</label>
              <textarea value={data.impact.resultsNote} onChange={(e) => update('impact.resultsNote', e.target.value)} rows={2} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
          </div>
        );

      // ================= FEATURED INITIATIVE =================
      case 'featuredInitiative':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Title</label>
              <input value={data.featuredInitiative.title} onChange={(e) => update('featuredInitiative.title', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <div>
              <label className="block text-sm font-medium">Subtitle</label>
              <input value={data.featuredInitiative.subtitle} onChange={(e) => update('featuredInitiative.subtitle', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <div>
              <label className="block text-sm font-medium">Description</label>
              <textarea value={data.featuredInitiative.description} onChange={(e) => update('featuredInitiative.description', e.target.value)} rows={4} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <div>
              <label className="block text-sm font-medium">Image</label>
              <FileUploadField currentValue={data.featuredInitiative.image} onChange={(url) => update('featuredInitiative.image', url)} accept="image/*" />
            </div>
            <h3 className="font-semibold">Points</h3>
            {data.featuredInitiative.points.map((point: any, i: number) => (
              <div key={i} className="border rounded p-3 mb-2">
                <input value={point.title} onChange={(e) => { const p = [...data.featuredInitiative.points]; p[i].title = e.target.value; update('featuredInitiative.points', p); }} className="w-full border rounded px-2 py-1 mb-1" placeholder="Title" />
                <input value={point.description} onChange={(e) => { const p = [...data.featuredInitiative.points]; p[i].description = e.target.value; update('featuredInitiative.points', p); }} className="w-full border rounded px-2 py-1" placeholder="Description" />
                <button onClick={() => update('featuredInitiative.points', data.featuredInitiative.points.filter((_: any, idx: number) => idx !== i))} className="text-red-500 text-sm">Remove</button>
              </div>
            ))}
            <button onClick={() => update('featuredInitiative.points', [...data.featuredInitiative.points, { title: '', description: '' }])} className="text-sm text-emerald-green">+ Add Point</button>

            <h3 className="font-semibold mt-4">Reach Stats</h3>
            {data.featuredInitiative.reachStats.map((stat: any, i: number) => (
              <div key={i} className="flex gap-2 items-end mb-2">
                <input value={stat.value} onChange={(e) => { const s = [...data.featuredInitiative.reachStats]; s[i].value = e.target.value; update('featuredInitiative.reachStats', s); }} className="flex-1 border rounded px-2 py-1" placeholder="Value" />
                <input value={stat.label} onChange={(e) => { const s = [...data.featuredInitiative.reachStats]; s[i].label = e.target.value; update('featuredInitiative.reachStats', s); }} className="flex-1 border rounded px-2 py-1" placeholder="Label" />
                <button onClick={() => update('featuredInitiative.reachStats', data.featuredInitiative.reachStats.filter((_: any, idx: number) => idx !== i))} className="text-red-500">✕</button>
              </div>
            ))}
            <button onClick={() => update('featuredInitiative.reachStats', [...data.featuredInitiative.reachStats, { value: '', label: '' }])} className="text-sm text-emerald-green">+ Add Stat</button>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-sm font-medium">CTA Text</label>
                <input value={data.featuredInitiative.ctaText} onChange={(e) => update('featuredInitiative.ctaText', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
              </div>
              <div>
                <label className="block text-sm font-medium">CTA Link</label>
                <input value={data.featuredInitiative.ctaLink} onChange={(e) => update('featuredInitiative.ctaLink', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
              </div>
            </div>
          </div>
        );

      // ================= LEADERSHIP & MENTORSHIP =================
      case 'leadershipMentorship':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Heading</label>
              <input value={data.leadershipMentorship.heading} onChange={(e) => update('leadershipMentorship.heading', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <div>
              <label className="block text-sm font-medium">Intro</label>
              <input value={data.leadershipMentorship.intro} onChange={(e) => update('leadershipMentorship.intro', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <h3 className="font-semibold">Items</h3>
            {data.leadershipMentorship.items.map((item: any, i: number) => (
              <div key={i} className="border rounded p-3 mb-2">
                <input value={item.title} onChange={(e) => { const l = [...data.leadershipMentorship.items]; l[i].title = e.target.value; update('leadershipMentorship.items', l); }} className="w-full border rounded px-2 py-1 mb-1" placeholder="Title" />
                <input value={item.description} onChange={(e) => { const l = [...data.leadershipMentorship.items]; l[i].description = e.target.value; update('leadershipMentorship.items', l); }} className="w-full border rounded px-2 py-1" placeholder="Description" />
                <button onClick={() => update('leadershipMentorship.items', data.leadershipMentorship.items.filter((_: any, idx: number) => idx !== i))} className="text-red-500 text-sm">Remove</button>
              </div>
            ))}
            <button onClick={() => update('leadershipMentorship.items', [...data.leadershipMentorship.items, { title: '', description: '' }])} className="text-sm text-emerald-green">+ Add Item</button>
          </div>
        );

      // ================= CONNECTED PATHWAYS =================
      case 'connectedPathways':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Heading</label>
              <input value={data.connectedPathways.heading} onChange={(e) => update('connectedPathways.heading', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <div>
              <label className="block text-sm font-medium">Intro</label>
              <input value={data.connectedPathways.intro} onChange={(e) => update('connectedPathways.intro', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <h3 className="font-semibold">Cards</h3>
            {data.connectedPathways.cards.map((card: any, i: number) => (
              <div key={i} className="border rounded p-3 mb-2">
                <input value={card.icon} onChange={(e) => { const c = [...data.connectedPathways.cards]; c[i].icon = e.target.value; update('connectedPathways.cards', c); }} className="w-full border rounded px-2 py-1 mb-1" placeholder="Icon" />
                <input value={card.title} onChange={(e) => { const c = [...data.connectedPathways.cards]; c[i].title = e.target.value; update('connectedPathways.cards', c); }} className="w-full border rounded px-2 py-1 mb-1" placeholder="Title" />
                <textarea value={card.description} onChange={(e) => { const c = [...data.connectedPathways.cards]; c[i].description = e.target.value; update('connectedPathways.cards', c); }} rows={2} className="w-full border rounded px-2 py-1 mb-1" placeholder="Description" />
                <input value={card.link} onChange={(e) => { const c = [...data.connectedPathways.cards]; c[i].link = e.target.value; update('connectedPathways.cards', c); }} className="w-full border rounded px-2 py-1 mb-1" placeholder="Link" />
                <input value={card.linkText} onChange={(e) => { const c = [...data.connectedPathways.cards]; c[i].linkText = e.target.value; update('connectedPathways.cards', c); }} className="w-full border rounded px-2 py-1" placeholder="Link Text" />
                <button onClick={() => update('connectedPathways.cards', data.connectedPathways.cards.filter((_: any, idx: number) => idx !== i))} className="text-red-500 text-sm">Remove</button>
              </div>
            ))}
            <button onClick={() => update('connectedPathways.cards', [...data.connectedPathways.cards, { icon: '', title: '', description: '', link: '', linkText: '' }])} className="text-sm text-emerald-green">+ Add Card</button>
          </div>
        );

      // ================= PARTNERS & DONORS =================
      case 'partnersDonors':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Heading</label>
              <input value={data.partnersDonors.heading} onChange={(e) => update('partnersDonors.heading', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <div>
              <label className="block text-sm font-medium">Intro</label>
              <input value={data.partnersDonors.intro} onChange={(e) => update('partnersDonors.intro', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <h3 className="font-semibold">Opportunities</h3>
            {data.partnersDonors.opportunities.map((item: any, i: number) => (
              <div key={i} className="border rounded p-3 mb-2">
                <input value={item.title} onChange={(e) => { const p = [...data.partnersDonors.opportunities]; p[i].title = e.target.value; update('partnersDonors.opportunities', p); }} className="w-full border rounded px-2 py-1 mb-1" placeholder="Title" />
                <input value={item.description} onChange={(e) => { const p = [...data.partnersDonors.opportunities]; p[i].description = e.target.value; update('partnersDonors.opportunities', p); }} className="w-full border rounded px-2 py-1" placeholder="Description" />
                <button onClick={() => update('partnersDonors.opportunities', data.partnersDonors.opportunities.filter((_: any, idx: number) => idx !== i))} className="text-red-500 text-sm">Remove</button>
              </div>
            ))}
            <button onClick={() => update('partnersDonors.opportunities', [...data.partnersDonors.opportunities, { title: '', description: '' }])} className="text-sm text-emerald-green">+ Add Opportunity</button>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-sm font-medium">CTA Text</label>
                <input value={data.partnersDonors.ctaText} onChange={(e) => update('partnersDonors.ctaText', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
              </div>
              <div>
                <label className="block text-sm font-medium">CTA Link</label>
                <input value={data.partnersDonors.ctaLink} onChange={(e) => update('partnersDonors.ctaLink', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
              </div>
            </div>
          </div>
        );

      // ================= GALLERY =================
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
                    <div className="h-32 w-full flex items-center justify-center bg-gray-100 rounded mb-2 text-gray-400 text-sm">No image</div>
                  )}
                  <FileUploadField currentValue={img} onChange={(url) => { const g = [...data.gallery.images]; g[i] = url; update('gallery.images', g); }} accept="image/*" />
                  <button onClick={() => update('gallery.images', data.gallery.images.filter((_: any, idx: number) => idx !== i))} className="text-red-500 text-sm mt-1">Remove</button>
                </div>
              ))}
            </div>
            <button onClick={() => update('gallery.images', [...data.gallery.images, ''])} className="text-sm text-emerald-green">+ Add Image</button>
          </div>
        );

      // ================= SUPPORT CTA =================
      case 'supportCta':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Heading</label>
              <input value={data.supportCta.heading} onChange={(e) => update('supportCta.heading', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <div>
              <label className="block text-sm font-medium">Text</label>
              <textarea value={data.supportCta.text} onChange={(e) => update('supportCta.text', e.target.value)} rows={3} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <h3 className="font-semibold">Ways</h3>
            {data.supportCta.ways.map((way: any, i: number) => (
              <div key={i} className="border rounded p-3 mb-2">
                <input value={way.title} onChange={(e) => { const w = [...data.supportCta.ways]; w[i].title = e.target.value; update('supportCta.ways', w); }} className="w-full border rounded px-2 py-1 mb-1" placeholder="Title" />
                <input value={way.description} onChange={(e) => { const w = [...data.supportCta.ways]; w[i].description = e.target.value; update('supportCta.ways', w); }} className="w-full border rounded px-2 py-1" placeholder="Description" />
                <button onClick={() => update('supportCta.ways', data.supportCta.ways.filter((_: any, idx: number) => idx !== i))} className="text-red-500 text-sm">Remove</button>
              </div>
            ))}
            <button onClick={() => update('supportCta.ways', [...data.supportCta.ways, { title: '', description: '' }])} className="text-sm text-emerald-green">+ Add Way</button>
            <h3 className="font-semibold mt-4">Buttons</h3>
            {data.supportCta.buttons.map((btn: any, i: number) => (
              <div key={i} className="flex gap-2 mb-2">
                <input value={btn.text} onChange={(e) => { const b = [...data.supportCta.buttons]; b[i].text = e.target.value; update('supportCta.buttons', b); }} className="flex-1 border rounded px-2 py-1" placeholder="Text" />
                <input value={btn.link} onChange={(e) => { const b = [...data.supportCta.buttons]; b[i].link = e.target.value; update('supportCta.buttons', b); }} className="flex-1 border rounded px-2 py-1" placeholder="Link" />
                <button onClick={() => update('supportCta.buttons', data.supportCta.buttons.filter((_: any, idx: number) => idx !== i))} className="text-red-500">✕</button>
              </div>
            ))}
            <button onClick={() => update('supportCta.buttons', [...data.supportCta.buttons, { text: '', link: '' }])} className="text-sm text-emerald-green">+ Add Button</button>
          </div>
        );

      // ================= FOOTER CTA =================
      case 'footerCta':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Heading</label>
              <input value={data.footerCta.heading} onChange={(e) => update('footerCta.heading', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <div>
              <label className="block text-sm font-medium">Text</label>
              <textarea value={data.footerCta.text} onChange={(e) => update('footerCta.text', e.target.value)} rows={2} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <h3 className="font-semibold">Buttons</h3>
            {data.footerCta.buttons.map((btn: any, i: number) => (
              <div key={i} className="flex gap-2 mb-2">
                <input value={btn.text} onChange={(e) => { const b = [...data.footerCta.buttons]; b[i].text = e.target.value; update('footerCta.buttons', b); }} className="flex-1 border rounded px-2 py-1" placeholder="Text" />
                <input value={btn.link} onChange={(e) => { const b = [...data.footerCta.buttons]; b[i].link = e.target.value; update('footerCta.buttons', b); }} className="flex-1 border rounded px-2 py-1" placeholder="Link" />
                <button onClick={() => update('footerCta.buttons', data.footerCta.buttons.filter((_: any, idx: number) => idx !== i))} className="text-red-500">✕</button>
              </div>
            ))}
            <button onClick={() => update('footerCta.buttons', [...data.footerCta.buttons, { text: '', link: '' }])} className="text-sm text-emerald-green">+ Add Button</button>
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
          <h2 className="font-display font-bold text-lg text-deep-forest mb-4">Youth Sections</h2>
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
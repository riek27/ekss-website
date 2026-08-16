// @ts-nocheck
'use client';

import { useState, useEffect, useRef } from 'react';
import FileUploadField from '@/components/FileUploadField';
import { savePageData } from '@/app/actions';

type SectionKey =
  | 'hero'
  | 'glance'
  | 'mission'
  | 'challenge'
  | 'future'
  | 'philosophy'
  | 'strategy'
  | 'methods'
  | 'pfumvudza'
  | 'demonstrationFarming'
  | 'pfumvudzaPractice'
  | 'impact'
  | 'sequentialTraining'
  | 'trainTheTrainer'
  | 'nationalAdoption'
  | 'agroforestry'
  | 'focusAreas'
  | 'fieldToMarket'
  | 'youthAgriculture'
  | 'efssInAction'
  | 'efssModel'
  | 'supervisionQuality'
  | 'partnersEngagement'
  | 'resources'
  | 'latestFromField'
  | 'journey'
  | 'whyConservationAg'
  | 'vision'
  | 'contactEfss'
  | 'supportFarming'
  | 'finalCta';

const sectionNames: { key: SectionKey; label: string }[] = [
  { key: 'hero', label: 'Hero' },
  { key: 'glance', label: 'At a Glance' },
  { key: 'mission', label: 'Mission' },
  { key: 'challenge', label: 'Challenge' },
  { key: 'future', label: 'Future' },
  { key: 'philosophy', label: 'Philosophy' },
  { key: 'strategy', label: 'Strategy' },
  { key: 'methods', label: 'Methods (FfF)' },
  { key: 'pfumvudza', label: 'Pfumvudza' },
  { key: 'demonstrationFarming', label: 'Demonstration Farming' },
  { key: 'pfumvudzaPractice', label: 'Pfumvudza Practice' },
  { key: 'impact', label: 'Impact' },
  { key: 'sequentialTraining', label: 'Sequential Training' },
  { key: 'trainTheTrainer', label: 'Train-the-Trainer' },
  { key: 'nationalAdoption', label: 'National Adoption' },
  { key: 'agroforestry', label: 'Agroforestry & Climate' },
  { key: 'focusAreas', label: 'Focus Areas' },
  { key: 'fieldToMarket', label: 'Field to Market' },
  { key: 'youthAgriculture', label: 'Youth & Agriculture' },
  { key: 'efssInAction', label: 'EFSS in Action' },
  { key: 'efssModel', label: 'EFSS Model' },
  { key: 'supervisionQuality', label: 'Supervision & Quality' },
  { key: 'partnersEngagement', label: 'Partners Engagement' },
  { key: 'resources', label: 'Resources' },
  { key: 'latestFromField', label: 'Latest From Field' },
  { key: 'journey', label: 'Journey' },
  { key: 'whyConservationAg', label: 'Why Conservation Ag' },
  { key: 'vision', label: 'Vision' },
  { key: 'contactEfss', label: 'Contact EFSS' },
  { key: 'supportFarming', label: 'Support Farming' },
  { key: 'finalCta', label: 'Final CTA' },
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
      // ========== HERO ==========
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
            <div>
              <label className="block text-sm font-medium">Logo</label>
              <FileUploadField currentValue={data.hero.logo || ''} onChange={(url) => update('hero.logo', url)} accept="image/*" />
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

      // ========== GLANCE ==========
      case 'glance':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Heading</label>
              <input value={data.glance.heading} onChange={(e) => update('glance.heading', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <div>
              <label className="block text-sm font-medium">Intro</label>
              <input value={data.glance.intro} onChange={(e) => update('glance.intro', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <h3 className="font-semibold">Stats</h3>
            {data.glance.stats.map((stat: any, i: number) => (
              <div key={i} className="flex gap-2 items-end mb-2">
                <div className="flex-1">
                  <label className="text-xs">Value</label>
                  <input value={stat.value} onChange={(e) => { const s = [...data.glance.stats]; s[i].value = e.target.value; update('glance.stats', s); }} className="w-full border rounded px-2 py-1" />
                </div>
                <div className="flex-1">
                  <label className="text-xs">Label</label>
                  <input value={stat.label} onChange={(e) => { const s = [...data.glance.stats]; s[i].label = e.target.value; update('glance.stats', s); }} className="w-full border rounded px-2 py-1" />
                </div>
                <button onClick={() => update('glance.stats', data.glance.stats.filter((_: any, idx: number) => idx !== i))} className="text-red-500">✕</button>
              </div>
            ))}
            <button onClick={() => update('glance.stats', [...data.glance.stats, { value: '', label: '' }])} className="text-sm text-emerald-green">+ Add Stat</button>
          </div>
        );

      // ========== MISSION ==========
      case 'mission':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Heading</label>
              <input value={data.mission.heading} onChange={(e) => update('mission.heading', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <div>
              <label className="block text-sm font-medium">Intro</label>
              <input value={data.mission.intro} onChange={(e) => update('mission.intro', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <div>
              <label className="block text-sm font-medium">Text 1</label>
              <textarea value={data.mission.text1} onChange={(e) => update('mission.text1', e.target.value)} rows={3} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <div>
              <label className="block text-sm font-medium">Text 2</label>
              <textarea value={data.mission.text2} onChange={(e) => update('mission.text2', e.target.value)} rows={3} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <div>
              <label className="block text-sm font-medium">Text 3</label>
              <textarea value={data.mission.text3} onChange={(e) => update('mission.text3', e.target.value)} rows={3} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
          </div>
        );

      // ========== CHALLENGE ==========
      case 'challenge':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Heading</label>
              <input value={data.challenge.heading} onChange={(e) => update('challenge.heading', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <div>
              <label className="block text-sm font-medium">Intro</label>
              <input value={data.challenge.intro} onChange={(e) => update('challenge.intro', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <div>
              <label className="block text-sm font-medium">Text</label>
              <textarea value={data.challenge.text} onChange={(e) => update('challenge.text', e.target.value)} rows={4} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <h3 className="font-semibold">Bullets</h3>
            {data.challenge.bullets.map((bullet: string, i: number) => (
              <div key={i} className="flex gap-2 mb-2">
                <input value={bullet} onChange={(e) => { const b = [...data.challenge.bullets]; b[i] = e.target.value; update('challenge.bullets', b); }} className="flex-1 border rounded px-3 py-2" />
                <button onClick={() => update('challenge.bullets', data.challenge.bullets.filter((_: any, idx: number) => idx !== i))} className="text-red-500">✕</button>
              </div>
            ))}
            <button onClick={() => update('challenge.bullets', [...data.challenge.bullets, ''])} className="text-sm text-emerald-green">+ Add Bullet</button>
            <div>
              <label className="block text-sm font-medium">Conclusion</label>
              <input value={data.challenge.conclusion} onChange={(e) => update('challenge.conclusion', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
          </div>
        );

      // ========== FUTURE ==========
      case 'future':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Heading</label>
              <input value={data.future.heading} onChange={(e) => update('future.heading', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <div>
              <label className="block text-sm font-medium">Intro</label>
              <input value={data.future.intro} onChange={(e) => update('future.intro', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <h3 className="font-semibold">Items</h3>
            {data.future.items.map((item: any, i: number) => (
              <div key={i} className="border rounded p-3 mb-2 space-y-2">
                <input value={item.icon} onChange={(e) => { const f = [...data.future.items]; f[i].icon = e.target.value; update('future.items', f); }} className="w-full border rounded px-2 py-1" placeholder="Icon" />
                <input value={item.title} onChange={(e) => { const f = [...data.future.items]; f[i].title = e.target.value; update('future.items', f); }} className="w-full border rounded px-2 py-1" placeholder="Title" />
                <textarea value={item.description} onChange={(e) => { const f = [...data.future.items]; f[i].description = e.target.value; update('future.items', f); }} rows={2} className="w-full border rounded px-2 py-1" placeholder="Description" />
                <button onClick={() => update('future.items', data.future.items.filter((_: any, idx: number) => idx !== i))} className="text-red-500 text-sm">Remove</button>
              </div>
            ))}
            <button onClick={() => update('future.items', [...data.future.items, { icon: '', title: '', description: '' }])} className="text-sm text-emerald-green">+ Add Item</button>
          </div>
        );

      // ========== PHILOSOPHY ==========
      case 'philosophy':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Heading</label>
              <input value={data.philosophy.heading} onChange={(e) => update('philosophy.heading', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <div>
              <label className="block text-sm font-medium">Intro</label>
              <input value={data.philosophy.intro} onChange={(e) => update('philosophy.intro', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <h3 className="font-semibold">Items</h3>
            {data.philosophy.items.map((item: any, i: number) => (
              <div key={i} className="border rounded p-3 mb-2 space-y-2">
                <input value={item.icon} onChange={(e) => { const p = [...data.philosophy.items]; p[i].icon = e.target.value; update('philosophy.items', p); }} className="w-full border rounded px-2 py-1" placeholder="Icon" />
                <input value={item.title} onChange={(e) => { const p = [...data.philosophy.items]; p[i].title = e.target.value; update('philosophy.items', p); }} className="w-full border rounded px-2 py-1" placeholder="Title" />
                <textarea value={item.description} onChange={(e) => { const p = [...data.philosophy.items]; p[i].description = e.target.value; update('philosophy.items', p); }} rows={2} className="w-full border rounded px-2 py-1" placeholder="Description" />
                <button onClick={() => update('philosophy.items', data.philosophy.items.filter((_: any, idx: number) => idx !== i))} className="text-red-500 text-sm">Remove</button>
              </div>
            ))}
            <button onClick={() => update('philosophy.items', [...data.philosophy.items, { icon: '', title: '', description: '' }])} className="text-sm text-emerald-green">+ Add Item</button>
          </div>
        );

      // ========== STRATEGY ==========
      case 'strategy':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Heading</label>
              <input value={data.strategy.heading} onChange={(e) => update('strategy.heading', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <div>
              <label className="block text-sm font-medium">Intro</label>
              <input value={data.strategy.intro} onChange={(e) => update('strategy.intro', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <h3 className="font-semibold">Strategies</h3>
            {data.strategy.items.map((item: any, i: number) => (
              <div key={i} className="border rounded p-3 mb-2 space-y-2">
                <input value={item.number} onChange={(e) => { const s = [...data.strategy.items]; s[i].number = e.target.value; update('strategy.items', s); }} className="w-full border rounded px-2 py-1" placeholder="Number" />
                <input value={item.title} onChange={(e) => { const s = [...data.strategy.items]; s[i].title = e.target.value; update('strategy.items', s); }} className="w-full border rounded px-2 py-1" placeholder="Title" />
                <input value={item.subtitle} onChange={(e) => { const s = [...data.strategy.items]; s[i].subtitle = e.target.value; update('strategy.items', s); }} className="w-full border rounded px-2 py-1" placeholder="Subtitle" />
                <textarea value={item.description} onChange={(e) => { const s = [...data.strategy.items]; s[i].description = e.target.value; update('strategy.items', s); }} rows={3} className="w-full border rounded px-2 py-1" placeholder="Description" />
                <label className="text-xs">Bullets (one per line)</label>
                <textarea value={item.bullets.join('\n')} onChange={(e) => { const s = [...data.strategy.items]; s[i].bullets = e.target.value.split('\n'); update('strategy.items', s); }} rows={3} className="w-full border rounded px-2 py-1" />
                <input value={item.ctaText} onChange={(e) => { const s = [...data.strategy.items]; s[i].ctaText = e.target.value; update('strategy.items', s); }} className="w-full border rounded px-2 py-1" placeholder="CTA Text" />
                <input value={item.ctaLink} onChange={(e) => { const s = [...data.strategy.items]; s[i].ctaLink = e.target.value; update('strategy.items', s); }} className="w-full border rounded px-2 py-1" placeholder="CTA Link" />
                <button onClick={() => update('strategy.items', data.strategy.items.filter((_: any, idx: number) => idx !== i))} className="text-red-500 text-sm">Remove</button>
              </div>
            ))}
            <button onClick={() => update('strategy.items', [...data.strategy.items, { number: '', title: '', subtitle: '', description: '', bullets: [], ctaText: '', ctaLink: '' }])} className="text-sm text-emerald-green">+ Add Strategy</button>
          </div>
        );

      // ========== METHODS ==========
      case 'methods':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Heading</label>
              <input value={data.methods.heading} onChange={(e) => update('methods.heading', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <div>
              <label className="block text-sm font-medium">Intro</label>
              <input value={data.methods.intro} onChange={(e) => update('methods.intro', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <h3 className="font-semibold">Principles</h3>
            {data.methods.principles.map((principle: any, i: number) => (
              <div key={i} className="border rounded p-3 mb-2 space-y-2">
                <input value={principle.title} onChange={(e) => { const p = [...data.methods.principles]; p[i].title = e.target.value; update('methods.principles', p); }} className="w-full border rounded px-2 py-1" placeholder="Title" />
                <textarea value={principle.description} onChange={(e) => { const p = [...data.methods.principles]; p[i].description = e.target.value; update('methods.principles', p); }} rows={2} className="w-full border rounded px-2 py-1" placeholder="Description" />
                <button onClick={() => update('methods.principles', data.methods.principles.filter((_: any, idx: number) => idx !== i))} className="text-red-500 text-sm">Remove</button>
              </div>
            ))}
            <button onClick={() => update('methods.principles', [...data.methods.principles, { title: '', description: '' }])} className="text-sm text-emerald-green">+ Add Principle</button>
          </div>
        );

      // ========== PFUMVUDZA ==========
      case 'pfumvudza':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Heading</label>
              <input value={data.pfumvudza.heading} onChange={(e) => update('pfumvudza.heading', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <div>
              <label className="block text-sm font-medium">Intro</label>
              <input value={data.pfumvudza.intro} onChange={(e) => update('pfumvudza.intro', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <div>
              <label className="block text-sm font-medium">Text</label>
              <textarea value={data.pfumvudza.text} onChange={(e) => update('pfumvudza.text', e.target.value)} rows={4} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <h3 className="font-semibold">Stats</h3>
            {data.pfumvudza.stats.map((stat: any, i: number) => (
              <div key={i} className="flex gap-2 items-end mb-2">
                <div className="flex-1">
                  <label className="text-xs">Value</label>
                  <input value={stat.value} onChange={(e) => { const s = [...data.pfumvudza.stats]; s[i].value = e.target.value; update('pfumvudza.stats', s); }} className="w-full border rounded px-2 py-1" />
                </div>
                <div className="flex-1">
                  <label className="text-xs">Label</label>
                  <input value={stat.label} onChange={(e) => { const s = [...data.pfumvudza.stats]; s[i].label = e.target.value; update('pfumvudza.stats', s); }} className="w-full border rounded px-2 py-1" />
                </div>
                <button onClick={() => update('pfumvudza.stats', data.pfumvudza.stats.filter((_: any, idx: number) => idx !== i))} className="text-red-500">✕</button>
              </div>
            ))}
            <button onClick={() => update('pfumvudza.stats', [...data.pfumvudza.stats, { value: '', label: '' }])} className="text-sm text-emerald-green">+ Add Stat</button>
          </div>
        );

      // ========== DEMONSTRATION FARMING ==========
      case 'demonstrationFarming':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Heading</label>
              <input value={data.demonstrationFarming.heading} onChange={(e) => update('demonstrationFarming.heading', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <div>
              <label className="block text-sm font-medium">Intro</label>
              <input value={data.demonstrationFarming.intro} onChange={(e) => update('demonstrationFarming.intro', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <div>
              <label className="block text-sm font-medium">Text</label>
              <textarea value={data.demonstrationFarming.text} onChange={(e) => update('demonstrationFarming.text', e.target.value)} rows={4} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <h3 className="font-semibold">What We Do</h3>
            {data.demonstrationFarming.whatWeDo.map((item: any, i: number) => (
              <div key={i} className="border rounded p-3 mb-2 space-y-2">
                <input value={item.title} onChange={(e) => { const d = [...data.demonstrationFarming.whatWeDo]; d[i].title = e.target.value; update('demonstrationFarming.whatWeDo', d); }} className="w-full border rounded px-2 py-1" placeholder="Title" />
                <textarea value={item.description} onChange={(e) => { const d = [...data.demonstrationFarming.whatWeDo]; d[i].description = e.target.value; update('demonstrationFarming.whatWeDo', d); }} rows={2} className="w-full border rounded px-2 py-1" placeholder="Description" />
                <button onClick={() => update('demonstrationFarming.whatWeDo', data.demonstrationFarming.whatWeDo.filter((_: any, idx: number) => idx !== i))} className="text-red-500 text-sm">Remove</button>
              </div>
            ))}
            <button onClick={() => update('demonstrationFarming.whatWeDo', [...data.demonstrationFarming.whatWeDo, { title: '', description: '' }])} className="text-sm text-emerald-green">+ Add Item</button>
            <div>
              <label className="block text-sm font-medium">Why It Matters</label>
              <textarea value={data.demonstrationFarming.whyItMatters} onChange={(e) => update('demonstrationFarming.whyItMatters', e.target.value)} rows={3} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <div>
              <label className="block text-sm font-medium">Image</label>
              <FileUploadField currentValue={data.demonstrationFarming.image || ''} onChange={(url) => update('demonstrationFarming.image', url)} accept="image/*" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium">CTA Text</label>
                <input value={data.demonstrationFarming.ctaText} onChange={(e) => update('demonstrationFarming.ctaText', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
              </div>
              <div>
                <label className="block text-sm font-medium">CTA Link</label>
                <input value={data.demonstrationFarming.ctaLink} onChange={(e) => update('demonstrationFarming.ctaLink', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
              </div>
            </div>
          </div>
        );

      // ========== PFUMVUDZA PRACTICE ==========
      case 'pfumvudzaPractice':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Heading</label>
              <input value={data.pfumvudzaPractice.heading} onChange={(e) => update('pfumvudzaPractice.heading', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <div>
              <label className="block text-sm font-medium">Intro</label>
              <input value={data.pfumvudzaPractice.intro} onChange={(e) => update('pfumvudzaPractice.intro', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <h3 className="font-semibold">Steps</h3>
            {data.pfumvudzaPractice.steps.map((step: any, i: number) => (
              <div key={i} className="border rounded p-3 mb-2 space-y-2">
                <input value={step.number} onChange={(e) => { const s = [...data.pfumvudzaPractice.steps]; s[i].number = e.target.value; update('pfumvudzaPractice.steps', s); }} className="w-full border rounded px-2 py-1" placeholder="Number" />
                <input value={step.title} onChange={(e) => { const s = [...data.pfumvudzaPractice.steps]; s[i].title = e.target.value; update('pfumvudzaPractice.steps', s); }} className="w-full border rounded px-2 py-1" placeholder="Title" />
                <textarea value={step.description} onChange={(e) => { const s = [...data.pfumvudzaPractice.steps]; s[i].description = e.target.value; update('pfumvudzaPractice.steps', s); }} rows={2} className="w-full border rounded px-2 py-1" placeholder="Description" />
                <button onClick={() => update('pfumvudzaPractice.steps', data.pfumvudzaPractice.steps.filter((_: any, idx: number) => idx !== i))} className="text-red-500 text-sm">Remove</button>
              </div>
            ))}
            <button onClick={() => update('pfumvudzaPractice.steps', [...data.pfumvudzaPractice.steps, { number: '', title: '', description: '' }])} className="text-sm text-emerald-green">+ Add Step</button>
          </div>
        );

      // ========== IMPACT ==========
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
            <div>
              <label className="block text-sm font-medium">From Pilot to Scale</label>
              <textarea value={data.impact.fromPilotToScale} onChange={(e) => update('impact.fromPilotToScale', e.target.value)} rows={3} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
          </div>
        );

      // ========== SEQUENTIAL TRAINING ==========
      case 'sequentialTraining':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Heading</label>
              <input value={data.sequentialTraining.heading} onChange={(e) => update('sequentialTraining.heading', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <div>
              <label className="block text-sm font-medium">Intro</label>
              <input value={data.sequentialTraining.intro} onChange={(e) => update('sequentialTraining.intro', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <h3 className="font-semibold">Steps</h3>
            {data.sequentialTraining.steps.map((step: any, i: number) => (
              <div key={i} className="border rounded p-3 mb-2 space-y-2">
                <input value={step.number} onChange={(e) => { const s = [...data.sequentialTraining.steps]; s[i].number = e.target.value; update('sequentialTraining.steps', s); }} className="w-full border rounded px-2 py-1" placeholder="Number" />
                <input value={step.title} onChange={(e) => { const s = [...data.sequentialTraining.steps]; s[i].title = e.target.value; update('sequentialTraining.steps', s); }} className="w-full border rounded px-2 py-1" placeholder="Title" />
                <textarea value={step.description} onChange={(e) => { const s = [...data.sequentialTraining.steps]; s[i].description = e.target.value; update('sequentialTraining.steps', s); }} rows={2} className="w-full border rounded px-2 py-1" placeholder="Description" />
                <button onClick={() => update('sequentialTraining.steps', data.sequentialTraining.steps.filter((_: any, idx: number) => idx !== i))} className="text-red-500 text-sm">Remove</button>
              </div>
            ))}
            <button onClick={() => update('sequentialTraining.steps', [...data.sequentialTraining.steps, { number: '', title: '', description: '' }])} className="text-sm text-emerald-green">+ Add Step</button>
          </div>
        );

      // ========== TRAIN-THE-TRAINER ==========
      case 'trainTheTrainer':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Heading</label>
              <input value={data.trainTheTrainer.heading} onChange={(e) => update('trainTheTrainer.heading', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <div>
              <label className="block text-sm font-medium">Intro</label>
              <input value={data.trainTheTrainer.intro} onChange={(e) => update('trainTheTrainer.intro', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <div>
              <label className="block text-sm font-medium">Text</label>
              <textarea value={data.trainTheTrainer.text} onChange={(e) => update('trainTheTrainer.text', e.target.value)} rows={3} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <h3 className="font-semibold">What We Do</h3>
            {data.trainTheTrainer.whatWeDo.map((item: any, i: number) => (
              <div key={i} className="border rounded p-3 mb-2 space-y-2">
                <input value={item.title} onChange={(e) => { const t = [...data.trainTheTrainer.whatWeDo]; t[i].title = e.target.value; update('trainTheTrainer.whatWeDo', t); }} className="w-full border rounded px-2 py-1" placeholder="Title" />
                <textarea value={item.description} onChange={(e) => { const t = [...data.trainTheTrainer.whatWeDo]; t[i].description = e.target.value; update('trainTheTrainer.whatWeDo', t); }} rows={2} className="w-full border rounded px-2 py-1" placeholder="Description" />
                <button onClick={() => update('trainTheTrainer.whatWeDo', data.trainTheTrainer.whatWeDo.filter((_: any, idx: number) => idx !== i))} className="text-red-500 text-sm">Remove</button>
              </div>
            ))}
            <button onClick={() => update('trainTheTrainer.whatWeDo', [...data.trainTheTrainer.whatWeDo, { title: '', description: '' }])} className="text-sm text-emerald-green">+ Add Item</button>
            <div>
              <label className="block text-sm font-medium">Why It Matters</label>
              <textarea value={data.trainTheTrainer.whyItMatters} onChange={(e) => update('trainTheTrainer.whyItMatters', e.target.value)} rows={3} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <div>
              <label className="block text-sm font-medium">Image</label>
              <FileUploadField currentValue={data.trainTheTrainer.image || ''} onChange={(url) => update('trainTheTrainer.image', url)} accept="image/*" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium">CTA Text</label>
                <input value={data.trainTheTrainer.ctaText} onChange={(e) => update('trainTheTrainer.ctaText', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
              </div>
              <div>
                <label className="block text-sm font-medium">CTA Link</label>
                <input value={data.trainTheTrainer.ctaLink} onChange={(e) => update('trainTheTrainer.ctaLink', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
              </div>
            </div>
          </div>
        );

      // ========== NATIONAL ADOPTION ==========
      case 'nationalAdoption':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Heading</label>
              <input value={data.nationalAdoption.heading} onChange={(e) => update('nationalAdoption.heading', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <div>
              <label className="block text-sm font-medium">Intro</label>
              <input value={data.nationalAdoption.intro} onChange={(e) => update('nationalAdoption.intro', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <div>
              <label className="block text-sm font-medium">Text</label>
              <textarea value={data.nationalAdoption.text} onChange={(e) => update('nationalAdoption.text', e.target.value)} rows={3} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <h3 className="font-semibold">What We Do</h3>
            {data.nationalAdoption.whatWeDo.map((item: any, i: number) => (
              <div key={i} className="border rounded p-3 mb-2 space-y-2">
                <input value={item.title} onChange={(e) => { const n = [...data.nationalAdoption.whatWeDo]; n[i].title = e.target.value; update('nationalAdoption.whatWeDo', n); }} className="w-full border rounded px-2 py-1" placeholder="Title" />
                <textarea value={item.description} onChange={(e) => { const n = [...data.nationalAdoption.whatWeDo]; n[i].description = e.target.value; update('nationalAdoption.whatWeDo', n); }} rows={2} className="w-full border rounded px-2 py-1" placeholder="Description" />
                <button onClick={() => update('nationalAdoption.whatWeDo', data.nationalAdoption.whatWeDo.filter((_: any, idx: number) => idx !== i))} className="text-red-500 text-sm">Remove</button>
              </div>
            ))}
            <button onClick={() => update('nationalAdoption.whatWeDo', [...data.nationalAdoption.whatWeDo, { title: '', description: '' }])} className="text-sm text-emerald-green">+ Add Item</button>
            <div>
              <label className="block text-sm font-medium">Why It Matters</label>
              <textarea value={data.nationalAdoption.whyItMatters} onChange={(e) => update('nationalAdoption.whyItMatters', e.target.value)} rows={3} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium">CTA Text</label>
                <input value={data.nationalAdoption.ctaText} onChange={(e) => update('nationalAdoption.ctaText', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
              </div>
              <div>
                <label className="block text-sm font-medium">CTA Link</label>
                <input value={data.nationalAdoption.ctaLink} onChange={(e) => update('nationalAdoption.ctaLink', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
              </div>
            </div>
          </div>
        );

      // ========== AGROFORESTRY & CLIMATE ==========
      case 'agroforestry':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Heading</label>
              <input value={data.agroforestry.heading} onChange={(e) => update('agroforestry.heading', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <div>
              <label className="block text-sm font-medium">Intro</label>
              <input value={data.agroforestry.intro} onChange={(e) => update('agroforestry.intro', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <div>
              <label className="block text-sm font-medium">Text</label>
              <textarea value={data.agroforestry.text} onChange={(e) => update('agroforestry.text', e.target.value)} rows={3} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <h3 className="font-semibold">What We Do</h3>
            {data.agroforestry.whatWeDo.map((item: any, i: number) => (
              <div key={i} className="border rounded p-3 mb-2 space-y-2">
                <input value={item.title} onChange={(e) => { const a = [...data.agroforestry.whatWeDo]; a[i].title = e.target.value; update('agroforestry.whatWeDo', a); }} className="w-full border rounded px-2 py-1" placeholder="Title" />
                <textarea value={item.description} onChange={(e) => { const a = [...data.agroforestry.whatWeDo]; a[i].description = e.target.value; update('agroforestry.whatWeDo', a); }} rows={2} className="w-full border rounded px-2 py-1" placeholder="Description" />
                <button onClick={() => update('agroforestry.whatWeDo', data.agroforestry.whatWeDo.filter((_: any, idx: number) => idx !== i))} className="text-red-500 text-sm">Remove</button>
              </div>
            ))}
            <button onClick={() => update('agroforestry.whatWeDo', [...data.agroforestry.whatWeDo, { title: '', description: '' }])} className="text-sm text-emerald-green">+ Add Item</button>
            <div>
              <label className="block text-sm font-medium">Why It Matters</label>
              <textarea value={data.agroforestry.whyItMatters} onChange={(e) => update('agroforestry.whyItMatters', e.target.value)} rows={3} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <div>
              <label className="block text-sm font-medium">Image</label>
              <FileUploadField currentValue={data.agroforestry.image || ''} onChange={(url) => update('agroforestry.image', url)} accept="image/*" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium">CTA Text</label>
                <input value={data.agroforestry.ctaText} onChange={(e) => update('agroforestry.ctaText', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
              </div>
              <div>
                <label className="block text-sm font-medium">CTA Link</label>
                <input value={data.agroforestry.ctaLink} onChange={(e) => update('agroforestry.ctaLink', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
              </div>
            </div>
          </div>
        );

      // ========== FOCUS AREAS ==========
      case 'focusAreas':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Heading</label>
              <input value={data.focusAreas.heading} onChange={(e) => update('focusAreas.heading', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <div>
              <label className="block text-sm font-medium">Intro</label>
              <input value={data.focusAreas.intro} onChange={(e) => update('focusAreas.intro', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <h3 className="font-semibold">Items</h3>
            {data.focusAreas.items.map((item: any, i: number) => (
              <div key={i} className="border rounded p-3 mb-2 space-y-2">
                <input value={item.icon} onChange={(e) => { const f = [...data.focusAreas.items]; f[i].icon = e.target.value; update('focusAreas.items', f); }} className="w-full border rounded px-2 py-1" placeholder="Icon" />
                <input value={item.title} onChange={(e) => { const f = [...data.focusAreas.items]; f[i].title = e.target.value; update('focusAreas.items', f); }} className="w-full border rounded px-2 py-1" placeholder="Title" />
                <textarea value={item.description} onChange={(e) => { const f = [...data.focusAreas.items]; f[i].description = e.target.value; update('focusAreas.items', f); }} rows={2} className="w-full border rounded px-2 py-1" placeholder="Description" />
                <input value={item.linkText} onChange={(e) => { const f = [...data.focusAreas.items]; f[i].linkText = e.target.value; update('focusAreas.items', f); }} className="w-full border rounded px-2 py-1" placeholder="Link Text" />
                <input value={item.link} onChange={(e) => { const f = [...data.focusAreas.items]; f[i].link = e.target.value; update('focusAreas.items', f); }} className="w-full border rounded px-2 py-1" placeholder="Link" />
                <button onClick={() => update('focusAreas.items', data.focusAreas.items.filter((_: any, idx: number) => idx !== i))} className="text-red-500 text-sm">Remove</button>
              </div>
            ))}
            <button onClick={() => update('focusAreas.items', [...data.focusAreas.items, { icon: '', title: '', description: '', linkText: '', link: '' }])} className="text-sm text-emerald-green">+ Add Item</button>
          </div>
        );

      // ========== FIELD TO MARKET ==========
      case 'fieldToMarket':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Heading</label>
              <input value={data.fieldToMarket.heading} onChange={(e) => update('fieldToMarket.heading', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <div>
              <label className="block text-sm font-medium">Intro</label>
              <input value={data.fieldToMarket.intro} onChange={(e) => update('fieldToMarket.intro', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <div>
              <label className="block text-sm font-medium">Text</label>
              <textarea value={data.fieldToMarket.text} onChange={(e) => update('fieldToMarket.text', e.target.value)} rows={3} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <h3 className="font-semibold">Items</h3>
            {data.fieldToMarket.items.map((item: any, i: number) => (
              <div key={i} className="border rounded p-3 mb-2 space-y-2">
                <input value={item.title} onChange={(e) => { const f = [...data.fieldToMarket.items]; f[i].title = e.target.value; update('fieldToMarket.items', f); }} className="w-full border rounded px-2 py-1" placeholder="Title" />
                <textarea value={item.description} onChange={(e) => { const f = [...data.fieldToMarket.items]; f[i].description = e.target.value; update('fieldToMarket.items', f); }} rows={2} className="w-full border rounded px-2 py-1" placeholder="Description" />
                <button onClick={() => update('fieldToMarket.items', data.fieldToMarket.items.filter((_: any, idx: number) => idx !== i))} className="text-red-500 text-sm">Remove</button>
              </div>
            ))}
            <button onClick={() => update('fieldToMarket.items', [...data.fieldToMarket.items, { title: '', description: '' }])} className="text-sm text-emerald-green">+ Add Item</button>
          </div>
        );

      // ========== YOUTH & AGRICULTURE ==========
      case 'youthAgriculture':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Heading</label>
              <input value={data.youthAgriculture.heading} onChange={(e) => update('youthAgriculture.heading', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <div>
              <label className="block text-sm font-medium">Intro</label>
              <input value={data.youthAgriculture.intro} onChange={(e) => update('youthAgriculture.intro', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <div>
              <label className="block text-sm font-medium">Text</label>
              <textarea value={data.youthAgriculture.text} onChange={(e) => update('youthAgriculture.text', e.target.value)} rows={3} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <h3 className="font-semibold">Items</h3>
            {data.youthAgriculture.items.map((item: any, i: number) => (
              <div key={i} className="border rounded p-3 mb-2 space-y-2">
                <input value={item.title} onChange={(e) => { const y = [...data.youthAgriculture.items]; y[i].title = e.target.value; update('youthAgriculture.items', y); }} className="w-full border rounded px-2 py-1" placeholder="Title" />
                <textarea value={item.description} onChange={(e) => { const y = [...data.youthAgriculture.items]; y[i].description = e.target.value; update('youthAgriculture.items', y); }} rows={2} className="w-full border rounded px-2 py-1" placeholder="Description" />
                <button onClick={() => update('youthAgriculture.items', data.youthAgriculture.items.filter((_: any, idx: number) => idx !== i))} className="text-red-500 text-sm">Remove</button>
              </div>
            ))}
            <button onClick={() => update('youthAgriculture.items', [...data.youthAgriculture.items, { title: '', description: '' }])} className="text-sm text-emerald-green">+ Add Item</button>
          </div>
        );

      // ========== EFSS IN ACTION ==========
      case 'efssInAction':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Heading</label>
              <input value={data.efssInAction.heading} onChange={(e) => update('efssInAction.heading', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <div>
              <label className="block text-sm font-medium">Intro</label>
              <input value={data.efssInAction.intro} onChange={(e) => update('efssInAction.intro', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <div>
              <label className="block text-sm font-medium">Featured Image</label>
              <FileUploadField currentValue={data.efssInAction.featuredImage} onChange={(url) => update('efssInAction.featuredImage', url)} accept="image/*" />
            </div>
            <div>
              <label className="block text-sm font-medium">Featured Caption</label>
              <input value={data.efssInAction.featuredCaption} onChange={(e) => update('efssInAction.featuredCaption', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <div>
              <label className="block text-sm font-medium">Featured Text</label>
              <textarea value={data.efssInAction.featuredText} onChange={(e) => update('efssInAction.featuredText', e.target.value)} rows={3} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <h3 className="font-semibold">Gallery</h3>
            {data.efssInAction.gallery.map((item: any, i: number) => (
              <div key={i} className="border rounded p-3 mb-2 space-y-2">
                <div>
                  <label className="text-xs">Image</label>
                  <FileUploadField currentValue={item.image} onChange={(url) => { const g = [...data.efssInAction.gallery]; g[i].image = url; update('efssInAction.gallery', g); }} accept="image/*" />
                </div>
                <input value={item.caption} onChange={(e) => { const g = [...data.efssInAction.gallery]; g[i].caption = e.target.value; update('efssInAction.gallery', g); }} className="w-full border rounded px-2 py-1" placeholder="Caption" />
                <button onClick={() => update('efssInAction.gallery', data.efssInAction.gallery.filter((_: any, idx: number) => idx !== i))} className="text-red-500 text-sm">Remove</button>
              </div>
            ))}
            <button onClick={() => update('efssInAction.gallery', [...data.efssInAction.gallery, { image: '', caption: '' }])} className="text-sm text-emerald-green">+ Add Image</button>
          </div>
        );

      // ========== EFSS MODEL ==========
      case 'efssModel':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Heading</label>
              <input value={data.efssModel.heading} onChange={(e) => update('efssModel.heading', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <div>
              <label className="block text-sm font-medium">Intro</label>
              <input value={data.efssModel.intro} onChange={(e) => update('efssModel.intro', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <h3 className="font-semibold">Steps</h3>
            {data.efssModel.steps.map((step: any, i: number) => (
              <div key={i} className="border rounded p-3 mb-2 space-y-2">
                <input value={step.title} onChange={(e) => { const s = [...data.efssModel.steps]; s[i].title = e.target.value; update('efssModel.steps', s); }} className="w-full border rounded px-2 py-1" placeholder="Title" />
                <textarea value={step.description} onChange={(e) => { const s = [...data.efssModel.steps]; s[i].description = e.target.value; update('efssModel.steps', s); }} rows={2} className="w-full border rounded px-2 py-1" placeholder="Description" />
                <button onClick={() => update('efssModel.steps', data.efssModel.steps.filter((_: any, idx: number) => idx !== i))} className="text-red-500 text-sm">Remove</button>
              </div>
            ))}
            <button onClick={() => update('efssModel.steps', [...data.efssModel.steps, { title: '', description: '' }])} className="text-sm text-emerald-green">+ Add Step</button>
          </div>
        );

      // ========== SUPERVISION & QUALITY ==========
      case 'supervisionQuality':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Heading</label>
              <input value={data.supervisionQuality.heading} onChange={(e) => update('supervisionQuality.heading', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <div>
              <label className="block text-sm font-medium">Intro</label>
              <input value={data.supervisionQuality.intro} onChange={(e) => update('supervisionQuality.intro', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <div>
              <label className="block text-sm font-medium">Text</label>
              <textarea value={data.supervisionQuality.text} onChange={(e) => update('supervisionQuality.text', e.target.value)} rows={3} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <h3 className="font-semibold">Items</h3>
            {data.supervisionQuality.items.map((item: any, i: number) => (
              <div key={i} className="border rounded p-3 mb-2 space-y-2">
                <input value={item.title} onChange={(e) => { const s = [...data.supervisionQuality.items]; s[i].title = e.target.value; update('supervisionQuality.items', s); }} className="w-full border rounded px-2 py-1" placeholder="Title" />
                <textarea value={item.description} onChange={(e) => { const s = [...data.supervisionQuality.items]; s[i].description = e.target.value; update('supervisionQuality.items', s); }} rows={2} className="w-full border rounded px-2 py-1" placeholder="Description" />
                <button onClick={() => update('supervisionQuality.items', data.supervisionQuality.items.filter((_: any, idx: number) => idx !== i))} className="text-red-500 text-sm">Remove</button>
              </div>
            ))}
            <button onClick={() => update('supervisionQuality.items', [...data.supervisionQuality.items, { title: '', description: '' }])} className="text-sm text-emerald-green">+ Add Item</button>
          </div>
        );

      // ========== PARTNERS ENGAGEMENT ==========
      case 'partnersEngagement':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Heading</label>
              <input value={data.partnersEngagement.heading} onChange={(e) => update('partnersEngagement.heading', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <div>
              <label className="block text-sm font-medium">Intro</label>
              <input value={data.partnersEngagement.intro} onChange={(e) => update('partnersEngagement.intro', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <div>
              <label className="block text-sm font-medium">Text</label>
              <textarea value={data.partnersEngagement.text} onChange={(e) => update('partnersEngagement.text', e.target.value)} rows={3} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <h3 className="font-semibold">Items</h3>
            {data.partnersEngagement.items.map((item: any, i: number) => (
              <div key={i} className="border rounded p-3 mb-2 space-y-2">
                <input value={item.title} onChange={(e) => { const p = [...data.partnersEngagement.items]; p[i].title = e.target.value; update('partnersEngagement.items', p); }} className="w-full border rounded px-2 py-1" placeholder="Title" />
                <textarea value={item.description} onChange={(e) => { const p = [...data.partnersEngagement.items]; p[i].description = e.target.value; update('partnersEngagement.items', p); }} rows={2} className="w-full border rounded px-2 py-1" placeholder="Description" />
                <button onClick={() => update('partnersEngagement.items', data.partnersEngagement.items.filter((_: any, idx: number) => idx !== i))} className="text-red-500 text-sm">Remove</button>
              </div>
            ))}
            <button onClick={() => update('partnersEngagement.items', [...data.partnersEngagement.items, { title: '', description: '' }])} className="text-sm text-emerald-green">+ Add Item</button>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-sm font-medium">CTA Text</label>
                <input value={data.partnersEngagement.ctaText} onChange={(e) => update('partnersEngagement.ctaText', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
              </div>
              <div>
                <label className="block text-sm font-medium">CTA Link</label>
                <input value={data.partnersEngagement.ctaLink} onChange={(e) => update('partnersEngagement.ctaLink', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
              </div>
            </div>
          </div>
        );

      // ========== RESOURCES ==========
      case 'resources':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Heading</label>
              <input value={data.resources.heading} onChange={(e) => update('resources.heading', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <div>
              <label className="block text-sm font-medium">Intro</label>
              <input value={data.resources.intro} onChange={(e) => update('resources.intro', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <h3 className="font-semibold">Items</h3>
            {data.resources.items.map((item: any, i: number) => (
              <div key={i} className="border rounded p-3 mb-2 space-y-2">
                <input value={item.title} onChange={(e) => { const r = [...data.resources.items]; r[i].title = e.target.value; update('resources.items', r); }} className="w-full border rounded px-2 py-1" placeholder="Title" />
                <textarea value={item.description} onChange={(e) => { const r = [...data.resources.items]; r[i].description = e.target.value; update('resources.items', r); }} rows={2} className="w-full border rounded px-2 py-1" placeholder="Description" />
                <button onClick={() => update('resources.items', data.resources.items.filter((_: any, idx: number) => idx !== i))} className="text-red-500 text-sm">Remove</button>
              </div>
            ))}
            <button onClick={() => update('resources.items', [...data.resources.items, { title: '', description: '' }])} className="text-sm text-emerald-green">+ Add Item</button>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-sm font-medium">CTA Text</label>
                <input value={data.resources.ctaText} onChange={(e) => update('resources.ctaText', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
              </div>
              <div>
                <label className="block text-sm font-medium">CTA Link</label>
                <input value={data.resources.ctaLink} onChange={(e) => update('resources.ctaLink', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
              </div>
            </div>
          </div>
        );

      // ========== LATEST FROM FIELD ==========
      case 'latestFromField':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Heading</label>
              <input value={data.latestFromField.heading} onChange={(e) => update('latestFromField.heading', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <div>
              <label className="block text-sm font-medium">Intro</label>
              <input value={data.latestFromField.intro} onChange={(e) => update('latestFromField.intro', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <h3 className="font-semibold">Cards</h3>
            {data.latestFromField.cards.map((card: any, i: number) => (
              <div key={i} className="border rounded p-3 mb-2 space-y-2">
                <input value={card.title} onChange={(e) => { const c = [...data.latestFromField.cards]; c[i].title = e.target.value; update('latestFromField.cards', c); }} className="w-full border rounded px-2 py-1" placeholder="Title" />
                <textarea value={card.description} onChange={(e) => { const c = [...data.latestFromField.cards]; c[i].description = e.target.value; update('latestFromField.cards', c); }} rows={2} className="w-full border rounded px-2 py-1" placeholder="Description" />
                <input value={card.link} onChange={(e) => { const c = [...data.latestFromField.cards]; c[i].link = e.target.value; update('latestFromField.cards', c); }} className="w-full border rounded px-2 py-1" placeholder="Link" />
                <button onClick={() => update('latestFromField.cards', data.latestFromField.cards.filter((_: any, idx: number) => idx !== i))} className="text-red-500 text-sm">Remove</button>
              </div>
            ))}
            <button onClick={() => update('latestFromField.cards', [...data.latestFromField.cards, { title: '', description: '', link: '' }])} className="text-sm text-emerald-green">+ Add Card</button>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-sm font-medium">View All Text</label>
                <input value={data.latestFromField.viewAllText} onChange={(e) => update('latestFromField.viewAllText', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
              </div>
              <div>
                <label className="block text-sm font-medium">View All Link</label>
                <input value={data.latestFromField.viewAllLink} onChange={(e) => update('latestFromField.viewAllLink', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
              </div>
            </div>
          </div>
        );

      // ========== JOURNEY ==========
      case 'journey':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Heading</label>
              <input value={data.journey.heading} onChange={(e) => update('journey.heading', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <div>
              <label className="block text-sm font-medium">Intro</label>
              <input value={data.journey.intro} onChange={(e) => update('journey.intro', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <h3 className="font-semibold">Timeline</h3>
            {data.journey.timeline.map((item: any, i: number) => (
              <div key={i} className="border rounded p-3 mb-2 space-y-2">
                <input value={item.year} onChange={(e) => { const t = [...data.journey.timeline]; t[i].year = e.target.value; update('journey.timeline', t); }} className="w-full border rounded px-2 py-1" placeholder="Year" />
                <input value={item.title} onChange={(e) => { const t = [...data.journey.timeline]; t[i].title = e.target.value; update('journey.timeline', t); }} className="w-full border rounded px-2 py-1" placeholder="Title" />
                <textarea value={item.description} onChange={(e) => { const t = [...data.journey.timeline]; t[i].description = e.target.value; update('journey.timeline', t); }} rows={2} className="w-full border rounded px-2 py-1" placeholder="Description" />
                <button onClick={() => update('journey.timeline', data.journey.timeline.filter((_: any, idx: number) => idx !== i))} className="text-red-500 text-sm">Remove</button>
              </div>
            ))}
            <button onClick={() => update('journey.timeline', [...data.journey.timeline, { year: '', title: '', description: '' }])} className="text-sm text-emerald-green">+ Add Event</button>
          </div>
        );

      // ========== WHY CONSERVATION AG ==========
      case 'whyConservationAg':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Heading</label>
              <input value={data.whyConservationAg.heading} onChange={(e) => update('whyConservationAg.heading', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <div>
              <label className="block text-sm font-medium">Intro</label>
              <input value={data.whyConservationAg.intro} onChange={(e) => update('whyConservationAg.intro', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <h3 className="font-semibold">Items</h3>
            {data.whyConservationAg.items.map((item: any, i: number) => (
              <div key={i} className="border rounded p-3 mb-2 space-y-2">
                <input value={item.title} onChange={(e) => { const w = [...data.whyConservationAg.items]; w[i].title = e.target.value; update('whyConservationAg.items', w); }} className="w-full border rounded px-2 py-1" placeholder="Title" />
                <textarea value={item.description} onChange={(e) => { const w = [...data.whyConservationAg.items]; w[i].description = e.target.value; update('whyConservationAg.items', w); }} rows={2} className="w-full border rounded px-2 py-1" placeholder="Description" />
                <button onClick={() => update('whyConservationAg.items', data.whyConservationAg.items.filter((_: any, idx: number) => idx !== i))} className="text-red-500 text-sm">Remove</button>
              </div>
            ))}
            <button onClick={() => update('whyConservationAg.items', [...data.whyConservationAg.items, { title: '', description: '' }])} className="text-sm text-emerald-green">+ Add Item</button>
          </div>
        );

      // ========== VISION ==========
      case 'vision':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Heading</label>
              <input value={data.vision.heading} onChange={(e) => update('vision.heading', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <div>
              <label className="block text-sm font-medium">Intro</label>
              <input value={data.vision.intro} onChange={(e) => update('vision.intro', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <div>
              <label className="block text-sm font-medium">Text</label>
              <textarea value={data.vision.text} onChange={(e) => update('vision.text', e.target.value)} rows={3} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <h3 className="font-semibold">Items</h3>
            {data.vision.items.map((item: string, i: number) => (
              <div key={i} className="flex gap-2 mb-2">
                <input value={item} onChange={(e) => { const v = [...data.vision.items]; v[i] = e.target.value; update('vision.items', v); }} className="flex-1 border rounded px-3 py-2" />
                <button onClick={() => update('vision.items', data.vision.items.filter((_: any, idx: number) => idx !== i))} className="text-red-500">✕</button>
              </div>
            ))}
            <button onClick={() => update('vision.items', [...data.vision.items, ''])} className="text-sm text-emerald-green">+ Add Item</button>
          </div>
        );

      // ========== CONTACT EFSS ==========
      case 'contactEfss':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Heading</label>
              <input value={data.contactEfss.heading} onChange={(e) => update('contactEfss.heading', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <div>
              <label className="block text-sm font-medium">Intro</label>
              <input value={data.contactEfss.intro} onChange={(e) => update('contactEfss.intro', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <div>
              <label className="block text-sm font-medium">Text</label>
              <textarea value={data.contactEfss.text} onChange={(e) => update('contactEfss.text', e.target.value)} rows={3} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <h3 className="font-semibold">Audiences</h3>
            {data.contactEfss.audiences.map((aud: any, i: number) => (
              <div key={i} className="border rounded p-3 mb-2 space-y-2">
                <input value={aud.title} onChange={(e) => { const a = [...data.contactEfss.audiences]; a[i].title = e.target.value; update('contactEfss.audiences', a); }} className="w-full border rounded px-2 py-1" placeholder="Title" />
                <textarea value={aud.description} onChange={(e) => { const a = [...data.contactEfss.audiences]; a[i].description = e.target.value; update('contactEfss.audiences', a); }} rows={2} className="w-full border rounded px-2 py-1" placeholder="Description" />
                <button onClick={() => update('contactEfss.audiences', data.contactEfss.audiences.filter((_: any, idx: number) => idx !== i))} className="text-red-500 text-sm">Remove</button>
              </div>
            ))}
            <button onClick={() => update('contactEfss.audiences', [...data.contactEfss.audiences, { title: '', description: '' }])} className="text-sm text-emerald-green">+ Add Audience</button>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-sm font-medium">Email</label>
                <input value={data.contactEfss.email} onChange={(e) => update('contactEfss.email', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
              </div>
              <div>
                <label className="block text-sm font-medium">Phone</label>
                <input value={data.contactEfss.phone} onChange={(e) => update('contactEfss.phone', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium">Address</label>
              <textarea value={data.contactEfss.address} onChange={(e) => update('contactEfss.address', e.target.value)} rows={3} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium">CTA Text</label>
                <input value={data.contactEfss.ctaText} onChange={(e) => update('contactEfss.ctaText', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
              </div>
              <div>
                <label className="block text-sm font-medium">CTA Link</label>
                <input value={data.contactEfss.ctaLink} onChange={(e) => update('contactEfss.ctaLink', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
              </div>
            </div>
          </div>
        );

      // ========== SUPPORT FARMING ==========
      case 'supportFarming':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Heading</label>
              <input value={data.supportFarming.heading} onChange={(e) => update('supportFarming.heading', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <div>
              <label className="block text-sm font-medium">Intro</label>
              <input value={data.supportFarming.intro} onChange={(e) => update('supportFarming.intro', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <div>
              <label className="block text-sm font-medium">Text</label>
              <textarea value={data.supportFarming.text} onChange={(e) => update('supportFarming.text', e.target.value)} rows={3} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <h3 className="font-semibold">Ways</h3>
            {data.supportFarming.ways.map((way: any, i: number) => (
              <div key={i} className="border rounded p-3 mb-2 space-y-2">
                <input value={way.title} onChange={(e) => { const w = [...data.supportFarming.ways]; w[i].title = e.target.value; update('supportFarming.ways', w); }} className="w-full border rounded px-2 py-1" placeholder="Title" />
                <textarea value={way.description} onChange={(e) => { const w = [...data.supportFarming.ways]; w[i].description = e.target.value; update('supportFarming.ways', w); }} rows={2} className="w-full border rounded px-2 py-1" placeholder="Description" />
                <button onClick={() => update('supportFarming.ways', data.supportFarming.ways.filter((_: any, idx: number) => idx !== i))} className="text-red-500 text-sm">Remove</button>
              </div>
            ))}
            <button onClick={() => update('supportFarming.ways', [...data.supportFarming.ways, { title: '', description: '' }])} className="text-sm text-emerald-green">+ Add Way</button>
            <h3 className="font-semibold mt-4">Buttons</h3>
            {data.supportFarming.buttons.map((btn: any, i: number) => (
              <div key={i} className="flex gap-2 mb-2">
                <input value={btn.text} onChange={(e) => { const b = [...data.supportFarming.buttons]; b[i].text = e.target.value; update('supportFarming.buttons', b); }} className="flex-1 border rounded px-2 py-1" placeholder="Text" />
                <input value={btn.link} onChange={(e) => { const b = [...data.supportFarming.buttons]; b[i].link = e.target.value; update('supportFarming.buttons', b); }} className="flex-1 border rounded px-2 py-1" placeholder="Link" />
                <button onClick={() => update('supportFarming.buttons', data.supportFarming.buttons.filter((_: any, idx: number) => idx !== i))} className="text-red-500">✕</button>
              </div>
            ))}
            <button onClick={() => update('supportFarming.buttons', [...data.supportFarming.buttons, { text: '', link: '' }])} className="text-sm text-emerald-green">+ Add Button</button>
          </div>
        );

      // ========== FINAL CTA ==========
      case 'finalCta':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Heading</label>
              <input value={data.finalCta.heading} onChange={(e) => update('finalCta.heading', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <div>
              <label className="block text-sm font-medium">Text</label>
              <textarea value={data.finalCta.text} onChange={(e) => update('finalCta.text', e.target.value)} rows={2} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <div>
              <label className="block text-sm font-medium">Subtext</label>
              <input value={data.finalCta.subtext} onChange={(e) => update('finalCta.subtext', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <h3 className="font-semibold">Buttons</h3>
            {data.finalCta.buttons.map((btn: any, i: number) => (
              <div key={i} className="flex gap-2 mb-2">
                <input value={btn.text} onChange={(e) => { const b = [...data.finalCta.buttons]; b[i].text = e.target.value; update('finalCta.buttons', b); }} className="flex-1 border rounded px-2 py-1" placeholder="Text" />
                <input value={btn.link} onChange={(e) => { const b = [...data.finalCta.buttons]; b[i].link = e.target.value; update('finalCta.buttons', b); }} className="flex-1 border rounded px-2 py-1" placeholder="Link" />
                <button onClick={() => update('finalCta.buttons', data.finalCta.buttons.filter((_: any, idx: number) => idx !== i))} className="text-red-500">✕</button>
              </div>
            ))}
            <button onClick={() => update('finalCta.buttons', [...data.finalCta.buttons, { text: '', link: '' }])} className="text-sm text-emerald-green">+ Add Button</button>
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
          <h2 className="font-display font-bold text-lg text-deep-forest mb-4">EFSS Sections</h2>
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
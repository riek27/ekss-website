// @ts-nocheck
'use client';

import { useState, useEffect, useRef } from 'react';
import FileUploadField from '@/components/FileUploadField';
import { savePageData } from '@/app/actions';

type SectionKey =
  | 'hero'
  | 'glance'
  | 'challenge'
  | 'approach'
  | 'programme'
  | 'educationInAction'
  | 'accessToOpportunity'
  | 'impact'
  | 'featuredProgramme'
  | 'teacherDevelopment'
  | 'poweringLearning'
  | 'inclusiveEducation'
  | 'educationCommunity'
  | 'connectedPathways'
  | 'partnersDonors'
  | 'gallery'
  | 'latestUpdates'
  | 'resources'
  | 'supportCta'
  | 'footerCta';

const sectionNames: { key: SectionKey; label: string }[] = [
  { key: 'hero', label: 'Hero' },
  { key: 'glance', label: 'At a Glance' },
  { key: 'challenge', label: 'Challenge' },
  { key: 'approach', label: 'Approach' },
  { key: 'programme', label: 'Programme' },
  { key: 'educationInAction', label: 'Education in Action' },
  { key: 'accessToOpportunity', label: 'From Access to Opportunity' },
  { key: 'impact', label: 'Impact' },
  { key: 'featuredProgramme', label: 'Featured Programme' },
  { key: 'teacherDevelopment', label: 'Teacher Development' },
  { key: 'poweringLearning', label: 'Powering Learning' },
  { key: 'inclusiveEducation', label: 'Inclusive Education' },
  { key: 'educationCommunity', label: 'Education & Community' },
  { key: 'connectedPathways', label: 'Connected Pathways' },
  { key: 'partnersDonors', label: 'Partners & Donors' },
  { key: 'gallery', label: 'Gallery' },
  { key: 'latestUpdates', label: 'Latest Updates' },
  { key: 'resources', label: 'Resources' },
  { key: 'supportCta', label: 'Support CTA' },
  { key: 'footerCta', label: 'Footer CTA' },
];

export default function AdminEducation() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState<SectionKey>('hero');
  const [saveMessage, setSaveMessage] = useState('');

  useEffect(() => {
    fetch('/api/page-data?page=education')
      .then(res => res.json())
      .then(json => {
        if (json && json.hero) setData(json);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    const result = await savePageData('education', data);
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

      // ================= AT A GLANCE =================
      case 'glance':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Heading</label>
              <input value={data.glance.heading} onChange={(e) => update('glance.heading', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
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

      // ================= CHALLENGE =================
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

      // ================= APPROACH =================
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

      // ================= EDUCATION IN ACTION =================
      case 'educationInAction':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Heading</label>
              <input value={data.educationInAction.heading} onChange={(e) => update('educationInAction.heading', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <div>
              <label className="block text-sm font-medium">Intro</label>
              <input value={data.educationInAction.intro} onChange={(e) => update('educationInAction.intro', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <h3 className="font-semibold">Cards</h3>
            {data.educationInAction.cards.map((card: any, i: number) => (
              <div key={i} className="border rounded p-3 mb-2 space-y-2">
                <input value={card.icon} onChange={(e) => { const c = [...data.educationInAction.cards]; c[i].icon = e.target.value; update('educationInAction.cards', c); }} className="w-full border rounded px-2 py-1" placeholder="Icon" />
                <input value={card.title} onChange={(e) => { const c = [...data.educationInAction.cards]; c[i].title = e.target.value; update('educationInAction.cards', c); }} className="w-full border rounded px-2 py-1" placeholder="Title" />
                <textarea value={card.description} onChange={(e) => { const c = [...data.educationInAction.cards]; c[i].description = e.target.value; update('educationInAction.cards', c); }} rows={2} className="w-full border rounded px-2 py-1" placeholder="Description" />
                <label className="text-xs">Tags (comma separated)</label>
                <input value={card.tags.join(', ')} onChange={(e) => { const c = [...data.educationInAction.cards]; c[i].tags = e.target.value.split(',').map((t: string) => t.trim()); update('educationInAction.cards', c); }} className="w-full border rounded px-2 py-1" />
                <input value={card.link} onChange={(e) => { const c = [...data.educationInAction.cards]; c[i].link = e.target.value; update('educationInAction.cards', c); }} className="w-full border rounded px-2 py-1" placeholder="Link" />
                <button onClick={() => update('educationInAction.cards', data.educationInAction.cards.filter((_: any, idx: number) => idx !== i))} className="text-red-500 text-sm">Remove</button>
              </div>
            ))}
            <button onClick={() => update('educationInAction.cards', [...data.educationInAction.cards, { icon: '', title: '', description: '', tags: [], link: '' }])} className="text-sm text-emerald-green">+ Add Card</button>
          </div>
        );

      // ================= FROM ACCESS TO OPPORTUNITY =================
      case 'accessToOpportunity':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Heading</label>
              <input value={data.accessToOpportunity.heading} onChange={(e) => update('accessToOpportunity.heading', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <div>
              <label className="block text-sm font-medium">Intro</label>
              <input value={data.accessToOpportunity.intro} onChange={(e) => update('accessToOpportunity.intro', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <h3 className="font-semibold">Steps</h3>
            {data.accessToOpportunity.steps.map((step: any, i: number) => (
              <div key={i} className="border rounded p-3 mb-2 space-y-2">
                <input value={step.number} onChange={(e) => { const s = [...data.accessToOpportunity.steps]; s[i].number = e.target.value; update('accessToOpportunity.steps', s); }} className="w-full border rounded px-2 py-1" placeholder="Number" />
                <input value={step.title} onChange={(e) => { const s = [...data.accessToOpportunity.steps]; s[i].title = e.target.value; update('accessToOpportunity.steps', s); }} className="w-full border rounded px-2 py-1" placeholder="Title" />
                <textarea value={step.description} onChange={(e) => { const s = [...data.accessToOpportunity.steps]; s[i].description = e.target.value; update('accessToOpportunity.steps', s); }} rows={2} className="w-full border rounded px-2 py-1" placeholder="Description" />
                <button onClick={() => update('accessToOpportunity.steps', data.accessToOpportunity.steps.filter((_: any, idx: number) => idx !== i))} className="text-red-500 text-sm">Remove</button>
              </div>
            ))}
            <button onClick={() => update('accessToOpportunity.steps', [...data.accessToOpportunity.steps, { number: '', title: '', description: '' }])} className="text-sm text-emerald-green">+ Add Step</button>
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

      // ================= FEATURED PROGRAMME =================
      case 'featuredProgramme':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Title</label>
              <input value={data.featuredProgramme.title} onChange={(e) => update('featuredProgramme.title', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <div>
              <label className="block text-sm font-medium">Subtitle</label>
              <input value={data.featuredProgramme.subtitle} onChange={(e) => update('featuredProgramme.subtitle', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <div>
              <label className="block text-sm font-medium">Description</label>
              <textarea value={data.featuredProgramme.description} onChange={(e) => update('featuredProgramme.description', e.target.value)} rows={4} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <div>
              <label className="block text-sm font-medium">Image</label>
              <FileUploadField currentValue={data.featuredProgramme.image} onChange={(url) => update('featuredProgramme.image', url)} accept="image/*" />
            </div>
            <h3 className="font-semibold">Points</h3>
            {data.featuredProgramme.points.map((point: any, i: number) => (
              <div key={i} className="border rounded p-3 mb-2">
                <input value={point.title} onChange={(e) => { const p = [...data.featuredProgramme.points]; p[i].title = e.target.value; update('featuredProgramme.points', p); }} className="w-full border rounded px-2 py-1 mb-1" placeholder="Title" />
                <input value={point.description} onChange={(e) => { const p = [...data.featuredProgramme.points]; p[i].description = e.target.value; update('featuredProgramme.points', p); }} className="w-full border rounded px-2 py-1" placeholder="Description" />
                <button onClick={() => update('featuredProgramme.points', data.featuredProgramme.points.filter((_: any, idx: number) => idx !== i))} className="text-red-500 text-sm">Remove</button>
              </div>
            ))}
            <button onClick={() => update('featuredProgramme.points', [...data.featuredProgramme.points, { title: '', description: '' }])} className="text-sm text-emerald-green">+ Add Point</button>

            <h3 className="font-semibold mt-4">Reach Stats</h3>
            {data.featuredProgramme.reachStats.map((stat: any, i: number) => (
              <div key={i} className="flex gap-2 items-end mb-2">
                <input value={stat.value} onChange={(e) => { const s = [...data.featuredProgramme.reachStats]; s[i].value = e.target.value; update('featuredProgramme.reachStats', s); }} className="flex-1 border rounded px-2 py-1" placeholder="Value" />
                <input value={stat.label} onChange={(e) => { const s = [...data.featuredProgramme.reachStats]; s[i].label = e.target.value; update('featuredProgramme.reachStats', s); }} className="flex-1 border rounded px-2 py-1" placeholder="Label" />
                <button onClick={() => update('featuredProgramme.reachStats', data.featuredProgramme.reachStats.filter((_: any, idx: number) => idx !== i))} className="text-red-500">✕</button>
              </div>
            ))}
            <button onClick={() => update('featuredProgramme.reachStats', [...data.featuredProgramme.reachStats, { value: '', label: '' }])} className="text-sm text-emerald-green">+ Add Stat</button>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-sm font-medium">CTA Text</label>
                <input value={data.featuredProgramme.ctaText} onChange={(e) => update('featuredProgramme.ctaText', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
              </div>
              <div>
                <label className="block text-sm font-medium">CTA Link</label>
                <input value={data.featuredProgramme.ctaLink} onChange={(e) => update('featuredProgramme.ctaLink', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
              </div>
            </div>
          </div>
        );

      // ================= TEACHER DEVELOPMENT =================
      case 'teacherDevelopment':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Heading</label>
              <input value={data.teacherDevelopment.heading} onChange={(e) => update('teacherDevelopment.heading', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <div>
              <label className="block text-sm font-medium">Intro</label>
              <input value={data.teacherDevelopment.intro} onChange={(e) => update('teacherDevelopment.intro', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <div>
              <label className="block text-sm font-medium">Text</label>
              <textarea value={data.teacherDevelopment.text} onChange={(e) => update('teacherDevelopment.text', e.target.value)} rows={3} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <h3 className="font-semibold">Stats</h3>
            {data.teacherDevelopment.stats.map((stat: any, i: number) => (
              <div key={i} className="flex gap-2 items-end mb-2">
                <div className="flex-1">
                  <label className="text-xs">Value</label>
                  <input value={stat.value} onChange={(e) => { const s = [...data.teacherDevelopment.stats]; s[i].value = e.target.value; update('teacherDevelopment.stats', s); }} className="w-full border rounded px-2 py-1" />
                </div>
                <div className="flex-1">
                  <label className="text-xs">Label</label>
                  <input value={stat.label} onChange={(e) => { const s = [...data.teacherDevelopment.stats]; s[i].label = e.target.value; update('teacherDevelopment.stats', s); }} className="w-full border rounded px-2 py-1" />
                </div>
                <button onClick={() => update('teacherDevelopment.stats', data.teacherDevelopment.stats.filter((_: any, idx: number) => idx !== i))} className="text-red-500">✕</button>
              </div>
            ))}
            <button onClick={() => update('teacherDevelopment.stats', [...data.teacherDevelopment.stats, { value: '', label: '' }])} className="text-sm text-emerald-green">+ Add Stat</button>
          </div>
        );

      // ================= POWERING LEARNING =================
      case 'poweringLearning':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Heading</label>
              <input value={data.poweringLearning.heading} onChange={(e) => update('poweringLearning.heading', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <div>
              <label className="block text-sm font-medium">Intro</label>
              <input value={data.poweringLearning.intro} onChange={(e) => update('poweringLearning.intro', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <div>
              <label className="block text-sm font-medium">Text</label>
              <textarea value={data.poweringLearning.text} onChange={(e) => update('poweringLearning.text', e.target.value)} rows={3} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <h3 className="font-semibold">Schools</h3>
            {data.poweringLearning.schools.map((school: any, i: number) => (
              <div key={i} className="border rounded p-3 mb-2 space-y-2">
                <input value={school.name} onChange={(e) => { const s = [...data.poweringLearning.schools]; s[i].name = e.target.value; update('poweringLearning.schools', s); }} className="w-full border rounded px-2 py-1" placeholder="Name" />
                <textarea value={school.description} onChange={(e) => { const s = [...data.poweringLearning.schools]; s[i].description = e.target.value; update('poweringLearning.schools', s); }} rows={2} className="w-full border rounded px-2 py-1" placeholder="Description" />
                <button onClick={() => update('poweringLearning.schools', data.poweringLearning.schools.filter((_: any, idx: number) => idx !== i))} className="text-red-500 text-sm">Remove</button>
              </div>
            ))}
            <button onClick={() => update('poweringLearning.schools', [...data.poweringLearning.schools, { name: '', description: '' }])} className="text-sm text-emerald-green">+ Add School</button>
            <h3 className="font-semibold mt-4">Tags</h3>
            {data.poweringLearning.tags.map((tag: string, i: number) => (
              <div key={i} className="flex gap-2 mb-2">
                <input value={tag} onChange={(e) => { const t = [...data.poweringLearning.tags]; t[i] = e.target.value; update('poweringLearning.tags', t); }} className="flex-1 border rounded px-3 py-2" />
                <button onClick={() => update('poweringLearning.tags', data.poweringLearning.tags.filter((_: any, idx: number) => idx !== i))} className="text-red-500">✕</button>
              </div>
            ))}
            <button onClick={() => update('poweringLearning.tags', [...data.poweringLearning.tags, ''])} className="text-sm text-emerald-green">+ Add Tag</button>
          </div>
        );

      // ================= INCLUSIVE EDUCATION =================
      case 'inclusiveEducation':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Heading</label>
              <input value={data.inclusiveEducation.heading} onChange={(e) => update('inclusiveEducation.heading', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <div>
              <label className="block text-sm font-medium">Intro</label>
              <input value={data.inclusiveEducation.intro} onChange={(e) => update('inclusiveEducation.intro', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <h3 className="font-semibold">Items</h3>
            {data.inclusiveEducation.items.map((item: any, i: number) => (
              <div key={i} className="border rounded p-3 mb-2 space-y-2">
                <input value={item.title} onChange={(e) => { const l = [...data.inclusiveEducation.items]; l[i].title = e.target.value; update('inclusiveEducation.items', l); }} className="w-full border rounded px-2 py-1" placeholder="Title" />
                <textarea value={item.description} onChange={(e) => { const l = [...data.inclusiveEducation.items]; l[i].description = e.target.value; update('inclusiveEducation.items', l); }} rows={2} className="w-full border rounded px-2 py-1" placeholder="Description" />
                <button onClick={() => update('inclusiveEducation.items', data.inclusiveEducation.items.filter((_: any, idx: number) => idx !== i))} className="text-red-500 text-sm">Remove</button>
              </div>
            ))}
            <button onClick={() => update('inclusiveEducation.items', [...data.inclusiveEducation.items, { title: '', description: '' }])} className="text-sm text-emerald-green">+ Add Item</button>
          </div>
        );

      // ================= EDUCATION & COMMUNITY =================
      case 'educationCommunity':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Heading</label>
              <input value={data.educationCommunity.heading} onChange={(e) => update('educationCommunity.heading', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <div>
              <label className="block text-sm font-medium">Intro</label>
              <input value={data.educationCommunity.intro} onChange={(e) => update('educationCommunity.intro', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <div>
              <label className="block text-sm font-medium">Text</label>
              <textarea value={data.educationCommunity.text} onChange={(e) => update('educationCommunity.text', e.target.value)} rows={3} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <h3 className="font-semibold">Items</h3>
            {data.educationCommunity.items.map((item: any, i: number) => (
              <div key={i} className="border rounded p-3 mb-2 space-y-2">
                <input value={item.title} onChange={(e) => { const c = [...data.educationCommunity.items]; c[i].title = e.target.value; update('educationCommunity.items', c); }} className="w-full border rounded px-2 py-1" placeholder="Title" />
                <textarea value={item.description} onChange={(e) => { const c = [...data.educationCommunity.items]; c[i].description = e.target.value; update('educationCommunity.items', c); }} rows={2} className="w-full border rounded px-2 py-1" placeholder="Description" />
                <button onClick={() => update('educationCommunity.items', data.educationCommunity.items.filter((_: any, idx: number) => idx !== i))} className="text-red-500 text-sm">Remove</button>
              </div>
            ))}
            <button onClick={() => update('educationCommunity.items', [...data.educationCommunity.items, { title: '', description: '' }])} className="text-sm text-emerald-green">+ Add Item</button>
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
              <div key={i} className="border rounded p-3 mb-2 space-y-2">
                <input value={card.icon} onChange={(e) => { const c = [...data.connectedPathways.cards]; c[i].icon = e.target.value; update('connectedPathways.cards', c); }} className="w-full border rounded px-2 py-1" placeholder="Icon" />
                <input value={card.title} onChange={(e) => { const c = [...data.connectedPathways.cards]; c[i].title = e.target.value; update('connectedPathways.cards', c); }} className="w-full border rounded px-2 py-1" placeholder="Title" />
                <textarea value={card.description} onChange={(e) => { const c = [...data.connectedPathways.cards]; c[i].description = e.target.value; update('connectedPathways.cards', c); }} rows={2} className="w-full border rounded px-2 py-1" placeholder="Description" />
                <input value={card.link} onChange={(e) => { const c = [...data.connectedPathways.cards]; c[i].link = e.target.value; update('connectedPathways.cards', c); }} className="w-full border rounded px-2 py-1" placeholder="Link" />
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
            <h3 className="font-semibold">Items</h3>
            {data.partnersDonors.items.map((item: any, i: number) => (
              <div key={i} className="border rounded p-3 mb-2 space-y-2">
                <input value={item.title} onChange={(e) => { const p = [...data.partnersDonors.items]; p[i].title = e.target.value; update('partnersDonors.items', p); }} className="w-full border rounded px-2 py-1" placeholder="Title" />
                <textarea value={item.description} onChange={(e) => { const p = [...data.partnersDonors.items]; p[i].description = e.target.value; update('partnersDonors.items', p); }} rows={2} className="w-full border rounded px-2 py-1" placeholder="Description" />
                <button onClick={() => update('partnersDonors.items', data.partnersDonors.items.filter((_: any, idx: number) => idx !== i))} className="text-red-500 text-sm">Remove</button>
              </div>
            ))}
            <button onClick={() => update('partnersDonors.items', [...data.partnersDonors.items, { title: '', description: '' }])} className="text-sm text-emerald-green">+ Add Item</button>
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

      // ================= LATEST UPDATES =================
      case 'latestUpdates':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Heading</label>
              <input value={data.latestUpdates.heading} onChange={(e) => update('latestUpdates.heading', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <div>
              <label className="block text-sm font-medium">Intro</label>
              <input value={data.latestUpdates.intro} onChange={(e) => update('latestUpdates.intro', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <h3 className="font-semibold">Cards</h3>
            {data.latestUpdates.cards.map((card: any, i: number) => (
              <div key={i} className="border rounded p-3 mb-2 space-y-2">
                <input value={card.title} onChange={(e) => { const c = [...data.latestUpdates.cards]; c[i].title = e.target.value; update('latestUpdates.cards', c); }} className="w-full border rounded px-2 py-1" placeholder="Title" />
                <textarea value={card.description} onChange={(e) => { const c = [...data.latestUpdates.cards]; c[i].description = e.target.value; update('latestUpdates.cards', c); }} rows={2} className="w-full border rounded px-2 py-1" placeholder="Description" />
                <input value={card.link} onChange={(e) => { const c = [...data.latestUpdates.cards]; c[i].link = e.target.value; update('latestUpdates.cards', c); }} className="w-full border rounded px-2 py-1" placeholder="Link" />
                <button onClick={() => update('latestUpdates.cards', data.latestUpdates.cards.filter((_: any, idx: number) => idx !== i))} className="text-red-500 text-sm">Remove</button>
              </div>
            ))}
            <button onClick={() => update('latestUpdates.cards', [...data.latestUpdates.cards, { title: '', description: '', link: '' }])} className="text-sm text-emerald-green">+ Add Card</button>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-sm font-medium">View All Text</label>
                <input value={data.latestUpdates.viewAllText} onChange={(e) => update('latestUpdates.viewAllText', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
              </div>
              <div>
                <label className="block text-sm font-medium">View All Link</label>
                <input value={data.latestUpdates.viewAllLink} onChange={(e) => update('latestUpdates.viewAllLink', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
              </div>
            </div>
          </div>
        );

      // ================= RESOURCES =================
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
              <div key={i} className="border rounded p-3 mb-2 space-y-2">
                <input value={way.title} onChange={(e) => { const w = [...data.supportCta.ways]; w[i].title = e.target.value; update('supportCta.ways', w); }} className="w-full border rounded px-2 py-1" placeholder="Title" />
                <textarea value={way.description} onChange={(e) => { const w = [...data.supportCta.ways]; w[i].description = e.target.value; update('supportCta.ways', w); }} rows={2} className="w-full border rounded px-2 py-1" placeholder="Description" />
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
          <h2 className="font-display font-bold text-lg text-deep-forest mb-4">Education Sections</h2>
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
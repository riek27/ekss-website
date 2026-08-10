'use client';

import { useState, useRef } from 'react';
import { savePageData, uploadFile } from '@/app/actions';
import initialData from '@/data/getInvolved.json';
import FileUploadField from '@/components/FileUploadField';


type SectionKey = 'hero' | 'ways' | 'programs' | 'organizations' | 'whyGetInvolved' | 'stories' | 'form' | 'faq' | 'finalCta';

const sectionNames: { key: SectionKey; label: string }[] = [
  { key: 'hero', label: 'Hero' },
  { key: 'ways', label: 'Ways to Get Involved' },
  { key: 'programs', label: 'Support a Program' },
  { key: 'organizations', label: 'For Organizations' },
  { key: 'whyGetInvolved', label: 'Why Get Involved' },
  { key: 'stories', label: 'Stories' },
  { key: 'form', label: 'Interest Form' },
  { key: 'faq', label: 'FAQ' },
  { key: 'finalCta', label: 'Final CTA' },
];

export default function AdminGetInvolved() {
  const [data, setData] = useState(() => JSON.parse(JSON.stringify(initialData)));
  const [activeSection, setActiveSection] = useState<SectionKey>('hero');
  const [saveMessage, setSaveMessage] = useState('');

  const handleSave = async () => {
    const result = await savePageData('getInvolved', data);
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
              <textarea value={data.hero.subtitle} onChange={(e) => update('hero.subtitle', e.target.value)} rows={2} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <div>
              <label className="block text-sm font-medium">Background Image</label>
              <FileUploadField currentValue={data.hero.image} onChange={(url) => update('hero.image', url)} accept="image/*" />
            </div>
            <h3 className="font-semibold">Buttons</h3>
            {data.hero.buttons.map((btn: any, i: number) => (
              <div key={i} className="flex gap-2 mb-2">
                <input value={btn.text} onChange={(e) => { const b = [...data.hero.buttons]; b[i].text = e.target.value; update('hero.buttons', b); }} className="flex-1 border rounded px-2 py-1" placeholder="Text" />
                <input value={btn.link} onChange={(e) => { const b = [...data.hero.buttons]; b[i].link = e.target.value; update('hero.buttons', b); }} className="flex-1 border rounded px-2 py-1" placeholder="Link" />
                <button onClick={() => update('hero.buttons', data.hero.buttons.filter((_: any, idx: number) => idx !== i))} className="text-red-500">✕</button>
              </div>
            ))}
            <button onClick={() => update('hero.buttons', [...data.hero.buttons, { text: '', link: '' }])} className="text-sm text-emerald-green">+ Add Button</button>
          </div>
        );

      case 'ways':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium">Heading</label>
              <input value={data.ways.heading} onChange={(e) => update('ways.heading', e.target.value)} className="w-full border rounded-lg px-3 py-2" />
            </div>
            <h3 className="font-semibold">Cards</h3>
            {data.ways.cards.map((card: any, i: number) => (
              <div key={i} className="border rounded-xl p-4 bg-gray-50 space-y-3 mb-3">
                <input value={card.icon} onChange={(e) => { const c = [...data.ways.cards]; c[i].icon = e.target.value; update('ways.cards', c); }} className="w-full border rounded px-2 py-1" placeholder="Icon (emoji)" />
                <input value={card.title} onChange={(e) => { const c = [...data.ways.cards]; c[i].title = e.target.value; update('ways.cards', c); }} className="w-full border rounded px-2 py-1" placeholder="Title" />
                <textarea value={card.description} onChange={(e) => { const c = [...data.ways.cards]; c[i].description = e.target.value; update('ways.cards', c); }} rows={2} className="w-full border rounded px-2 py-1" placeholder="Description" />
                <input value={card.ctaText} onChange={(e) => { const c = [...data.ways.cards]; c[i].ctaText = e.target.value; update('ways.cards', c); }} className="w-full border rounded px-2 py-1" placeholder="CTA Text" />
                <input value={card.ctaLink} onChange={(e) => { const c = [...data.ways.cards]; c[i].ctaLink = e.target.value; update('ways.cards', c); }} className="w-full border rounded px-2 py-1" placeholder="CTA Link" />
                <button onClick={() => update('ways.cards', data.ways.cards.filter((_: any, idx: number) => idx !== i))} className="text-red-500 text-sm">Remove</button>
              </div>
            ))}
            <button onClick={() => update('ways.cards', [...data.ways.cards, { icon: '', title: '', description: '', ctaText: '', ctaLink: '' }])} className="text-sm text-emerald-green">+ Add Card</button>
          </div>
        );

      case 'programs':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium">Heading</label>
              <input value={data.programs.heading} onChange={(e) => update('programs.heading', e.target.value)} className="w-full border rounded-lg px-3 py-2" />
            </div>
            <h3 className="font-semibold">Cards</h3>
            {data.programs.cards.map((card: any, i: number) => (
              <div key={i} className="border rounded-xl p-4 bg-gray-50 space-y-3 mb-3">
                <input value={card.icon} onChange={(e) => { const c = [...data.programs.cards]; c[i].icon = e.target.value; update('programs.cards', c); }} className="w-full border rounded px-2 py-1" placeholder="Icon (emoji)" />
                <input value={card.title} onChange={(e) => { const c = [...data.programs.cards]; c[i].title = e.target.value; update('programs.cards', c); }} className="w-full border rounded px-2 py-1" placeholder="Title" />
                <textarea value={card.description} onChange={(e) => { const c = [...data.programs.cards]; c[i].description = e.target.value; update('programs.cards', c); }} rows={2} className="w-full border rounded px-2 py-1" placeholder="Description" />
                <input value={card.link} onChange={(e) => { const c = [...data.programs.cards]; c[i].link = e.target.value; update('programs.cards', c); }} className="w-full border rounded px-2 py-1" placeholder="Link" />
                <button onClick={() => update('programs.cards', data.programs.cards.filter((_: any, idx: number) => idx !== i))} className="text-red-500 text-sm">Remove</button>
              </div>
            ))}
            <button onClick={() => update('programs.cards', [...data.programs.cards, { icon: '', title: '', description: '', link: '' }])} className="text-sm text-emerald-green">+ Add Card</button>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium">CTA Text</label>
                <input value={data.programs.ctaText} onChange={(e) => update('programs.ctaText', e.target.value)} className="w-full border rounded-lg px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium">CTA Link</label>
                <input value={data.programs.ctaLink} onChange={(e) => update('programs.ctaLink', e.target.value)} className="w-full border rounded-lg px-3 py-2" />
              </div>
            </div>
          </div>
        );

      case 'organizations':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Heading</label>
              <input value={data.organizations.heading} onChange={(e) => update('organizations.heading', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <div>
              <label className="block text-sm font-medium">Text</label>
              <textarea value={data.organizations.text} onChange={(e) => update('organizations.text', e.target.value)} rows={3} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <h3 className="font-semibold">Areas</h3>
            {data.organizations.areas.map((area: any, i: number) => (
              <div key={i} className="flex gap-2 mb-2">
                <input value={area.title} onChange={(e) => { const a = [...data.organizations.areas]; a[i].title = e.target.value; update('organizations.areas', a); }} className="flex-1 border rounded px-2 py-1" placeholder="Title" />
                <input value={area.description} onChange={(e) => { const a = [...data.organizations.areas]; a[i].description = e.target.value; update('organizations.areas', a); }} className="flex-1 border rounded px-2 py-1" placeholder="Description" />
                <button onClick={() => update('organizations.areas', data.organizations.areas.filter((_: any, idx: number) => idx !== i))} className="text-red-500">✕</button>
              </div>
            ))}
            <button onClick={() => update('organizations.areas', [...data.organizations.areas, { title: '', description: '' }])} className="text-sm text-emerald-green">+ Add Area</button>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-sm font-medium">CTA Text</label>
                <input value={data.organizations.ctaText} onChange={(e) => update('organizations.ctaText', e.target.value)} className="w-full border rounded-lg px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium">CTA Link</label>
                <input value={data.organizations.ctaLink} onChange={(e) => update('organizations.ctaLink', e.target.value)} className="w-full border rounded-lg px-3 py-2" />
              </div>
            </div>
          </div>
        );

      // ... rest of sections (whyGetInvolved, stories, form, faq, finalCta) follow the same patterns.
      // I'll summarize a few but you can easily extend.

      case 'whyGetInvolved':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Heading</label>
              <input value={data.whyGetInvolved.heading} onChange={(e) => update('whyGetInvolved.heading', e.target.value)} className="w-full border rounded-lg px-3 py-2" />
            </div>
            <h3 className="font-semibold">Stats</h3>
            {data.whyGetInvolved.stats.map((stat: any, i: number) => (
              <div key={i} className="flex gap-2 items-end mb-2">
                <div className="flex-1">
                  <label className="text-xs">Value</label>
                  <input type="number" value={stat.value} onChange={(e) => { const s = [...data.whyGetInvolved.stats]; s[i].value = Number(e.target.value); update('whyGetInvolved.stats', s); }} className="w-full border rounded px-2 py-1 mt-1" />
                </div>
                <div className="flex-1">
                  <label className="text-xs">Label</label>
                  <input value={stat.label} onChange={(e) => { const s = [...data.whyGetInvolved.stats]; s[i].label = e.target.value; update('whyGetInvolved.stats', s); }} className="w-full border rounded px-2 py-1 mt-1" />
                </div>
                <button onClick={() => update('whyGetInvolved.stats', data.whyGetInvolved.stats.filter((_: any, idx: number) => idx !== i))} className="text-red-500 text-sm">✕</button>
              </div>
            ))}
            <button onClick={() => update('whyGetInvolved.stats', [...data.whyGetInvolved.stats, { value: 0, label: 'New stat' }])} className="text-sm text-emerald-green">+ Add Stat</button>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-sm font-medium">CTA Text</label>
                <input value={data.whyGetInvolved.ctaText} onChange={(e) => update('whyGetInvolved.ctaText', e.target.value)} className="w-full border rounded-lg px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium">CTA Link</label>
                <input value={data.whyGetInvolved.ctaLink} onChange={(e) => update('whyGetInvolved.ctaLink', e.target.value)} className="w-full border rounded-lg px-3 py-2" />
              </div>
            </div>
          </div>
        );

      case 'stories':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium">Heading</label>
              <input value={data.stories.heading} onChange={(e) => update('stories.heading', e.target.value)} className="w-full border rounded-lg px-3 py-2" />
            </div>
            <h3 className="font-semibold">Story Cards</h3>
            {data.stories.list.map((story: any, i: number) => (
              <div key={i} className="border rounded-xl p-4 bg-gray-50 space-y-3 mb-3">
                <div>
                  <label className="text-xs">Image</label>
                  <FileUploadField currentValue={story.image} onChange={(url) => { const s = [...data.stories.list]; s[i].image = url; update('stories.list', s); }} accept="image/*" />
                </div>
                <input value={story.title} onChange={(e) => { const s = [...data.stories.list]; s[i].title = e.target.value; update('stories.list', s); }} className="w-full border rounded px-2 py-1" placeholder="Title" />
                <textarea value={story.excerpt} onChange={(e) => { const s = [...data.stories.list]; s[i].excerpt = e.target.value; update('stories.list', s); }} rows={2} className="w-full border rounded px-2 py-1" placeholder="Excerpt" />
                <input value={story.link} onChange={(e) => { const s = [...data.stories.list]; s[i].link = e.target.value; update('stories.list', s); }} className="w-full border rounded px-2 py-1" placeholder="Link" />
                <button onClick={() => update('stories.list', data.stories.list.filter((_: any, idx: number) => idx !== i))} className="text-red-500 text-sm">Remove</button>
              </div>
            ))}
            <button onClick={() => update('stories.list', [...data.stories.list, { image: '', title: '', excerpt: '', link: '' }])} className="text-sm text-emerald-green">+ Add Story</button>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-sm font-medium">CTA Text</label>
                <input value={data.stories.ctaText} onChange={(e) => update('stories.ctaText', e.target.value)} className="w-full border rounded-lg px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium">CTA Link</label>
                <input value={data.stories.ctaLink} onChange={(e) => update('stories.ctaLink', e.target.value)} className="w-full border rounded-lg px-3 py-2" />
              </div>
            </div>
          </div>
        );

      case 'form':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Heading</label>
              <input value={data.form.heading} onChange={(e) => update('form.heading', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <div>
              <label className="block text-sm font-medium">Success Message</label>
              <input value={data.form.successMessage} onChange={(e) => update('form.successMessage', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            {/* note: form submission is handled by browser mailto/action; the submitUrl is just informational */}
            <div>
              <label className="block text-sm font-medium">Submit URL (optional)</label>
              <input value={data.form.submitUrl} onChange={(e) => update('form.submitUrl', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
          </div>
        );

      case 'faq':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Heading</label>
              <input value={data.faq.heading} onChange={(e) => update('faq.heading', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <h3 className="font-semibold">Questions</h3>
            {data.faq.questions.map((item: any, i: number) => (
              <div key={i} className="border rounded-xl p-4 bg-gray-50 space-y-3 mb-3">
                <input value={item.q} onChange={(e) => { const q = [...data.faq.questions]; q[i].q = e.target.value; update('faq.questions', q); }} className="w-full border rounded px-2 py-1" placeholder="Question" />
                <textarea value={item.a} onChange={(e) => { const q = [...data.faq.questions]; q[i].a = e.target.value; update('faq.questions', q); }} rows={2} className="w-full border rounded px-2 py-1" placeholder="Answer" />
                <button onClick={() => update('faq.questions', data.faq.questions.filter((_: any, idx: number) => idx !== i))} className="text-red-500 text-sm">Remove</button>
              </div>
            ))}
            <button onClick={() => update('faq.questions', [...data.faq.questions, { q: '', a: '' }])} className="text-sm text-emerald-green">+ Add Question</button>
          </div>
        );

      case 'finalCta':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Text</label>
              <input value={data.finalCta.text} onChange={(e) => update('finalCta.text', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
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

  return (
    <div className="flex gap-6">
      <nav className="w-56 flex-shrink-0">
        <div className="bg-white rounded-2xl shadow-sm border p-4 sticky top-20">
          <h2 className="font-display font-bold text-lg text-deep-forest mb-4">Get Involved Sections</h2>
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
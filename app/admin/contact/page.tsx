'use client';

import { useState, useRef } from 'react';
import { savePageData, uploadFile } from '@/app/actions';
import initialData from '@/data/contact.json';
import FileUploadField from '@/components/FileUploadField';

type SectionKey = 'hero' | 'contactInfo' | 'form' | 'map' | 'helpCards' | 'faq' | 'finalCta';

const sectionNames: { key: SectionKey; label: string }[] = [
  { key: 'hero', label: 'Hero' },
  { key: 'contactInfo', label: 'Contact Information' },
  { key: 'form', label: 'Contact Form' },
  { key: 'map', label: 'Map & Directions' },
  { key: 'helpCards', label: 'Help Cards' },
  { key: 'faq', label: 'FAQ' },
  { key: 'finalCta', label: 'Final CTA' },
];

export default function AdminContact() {
  const [data, setData] = useState(() => JSON.parse(JSON.stringify(initialData)));
  const [activeSection, setActiveSection] = useState<SectionKey>('hero');
  const [saveMessage, setSaveMessage] = useState('');

  const handleSave = async () => {
    const result = await savePageData('contact', data);
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
          </div>
        );

      case 'contactInfo':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Heading</label>
              <input value={data.contactInfo.heading} onChange={(e) => update('contactInfo.heading', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <div>
              <label className="block text-sm font-medium">Address (line breaks allowed)</label>
              <textarea value={data.contactInfo.address} onChange={(e) => update('contactInfo.address', e.target.value)} rows={3} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <div>
              <label className="block text-sm font-medium">Email</label>
              <input value={data.contactInfo.email} onChange={(e) => update('contactInfo.email', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <div>
              <label className="block text-sm font-medium">Phone</label>
              <input value={data.contactInfo.phone} onChange={(e) => update('contactInfo.phone', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <div className="border-t pt-4 mt-4">
              <h3 className="font-semibold">Executive Director</h3>
              <input value={data.contactInfo.executive.name} onChange={(e) => update('contactInfo.executive.name', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" placeholder="Name" />
              <input value={data.contactInfo.executive.title} onChange={(e) => update('contactInfo.executive.title', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-2" placeholder="Title" />
              <input value={data.contactInfo.executive.email} onChange={(e) => update('contactInfo.executive.email', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-2" placeholder="Email" />
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
            <div>
              <label className="block text-sm font-medium">Subject Options (comma-separated)</label>
              <input
                value={data.form.subjectOptions.join(', ')}
                onChange={(e) => update('form.subjectOptions', e.target.value.split(',').map((s: string) => s.trim()))}
                className="w-full border rounded-lg px-3 py-2 mt-1"
              />
            </div>
          </div>
        );

      case 'map':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Heading</label>
              <input value={data.map.heading} onChange={(e) => update('map.heading', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <div>
              <label className="block text-sm font-medium">Description</label>
              <textarea value={data.map.description} onChange={(e) => update('map.description', e.target.value)} rows={3} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <div>
              <label className="block text-sm font-medium">Map Embed URL</label>
              <input value={data.map.mapUrl} onChange={(e) => update('map.mapUrl', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <div>
              <label className="block text-sm font-medium">Directions Link</label>
              <input value={data.map.directionLink} onChange={(e) => update('map.directionLink', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
          </div>
        );

      case 'helpCards':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium">Heading</label>
              <input value={data.helpCards.heading} onChange={(e) => update('helpCards.heading', e.target.value)} className="w-full border rounded-lg px-3 py-2" />
            </div>
            <h3 className="font-semibold">Cards</h3>
            {data.helpCards.cards.map((card: any, i: number) => (
              <div key={i} className="border rounded-xl p-4 bg-gray-50 space-y-3 mb-3">
                <input value={card.icon} onChange={(e) => { const c = [...data.helpCards.cards]; c[i].icon = e.target.value; update('helpCards.cards', c); }} className="w-full border rounded px-2 py-1" placeholder="Icon (emoji)" />
                <input value={card.title} onChange={(e) => { const c = [...data.helpCards.cards]; c[i].title = e.target.value; update('helpCards.cards', c); }} className="w-full border rounded px-2 py-1" placeholder="Title" />
                <textarea value={card.description} onChange={(e) => { const c = [...data.helpCards.cards]; c[i].description = e.target.value; update('helpCards.cards', c); }} rows={2} className="w-full border rounded px-2 py-1" placeholder="Description" />
                <input value={card.link} onChange={(e) => { const c = [...data.helpCards.cards]; c[i].link = e.target.value; update('helpCards.cards', c); }} className="w-full border rounded px-2 py-1" placeholder="Link" />
                <button onClick={() => update('helpCards.cards', data.helpCards.cards.filter((_: any, idx: number) => idx !== i))} className="text-red-500 text-sm">Remove</button>
              </div>
            ))}
            <button onClick={() => update('helpCards.cards', [...data.helpCards.cards, { icon: '', title: '', description: '', link: '' }])} className="text-sm text-emerald-green">+ Add Card</button>
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
              <label className="block text-sm font-medium">Heading</label>
              <input value={data.finalCta.heading} onChange={(e) => update('finalCta.heading', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <div>
              <label className="block text-sm font-medium">Text</label>
              <textarea value={data.finalCta.text} onChange={(e) => update('finalCta.text', e.target.value)} rows={3} className="w-full border rounded-lg px-3 py-2 mt-1" />
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
          <h2 className="font-display font-bold text-lg text-deep-forest mb-4">Contact Sections</h2>
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
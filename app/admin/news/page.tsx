// @ts-nocheck
'use client';

import { useState, useEffect, useRef } from 'react';
import FileUploadField from '@/components/FileUploadField';
import { savePageData } from '@/app/actions';

type SectionKey = 'hero' | 'featured' | 'items' | 'cta';

const sectionNames: { key: SectionKey; label: string }[] = [
  { key: 'hero', label: 'Hero' },
  { key: 'featured', label: 'Featured Story' },
  { key: 'items', label: 'All News Items' },
  { key: 'cta', label: 'Call to Action' },
];

export default function AdminNews() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState<SectionKey>('hero');
  const [saveMessage, setSaveMessage] = useState('');

  useEffect(() => {
    fetch('/api/page-data?page=news')
      .then(res => res.json())
      .then(json => {
        if (json) setData(json);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    const result = await savePageData('news', data);
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
          </div>
        );

      // ================= FEATURED STORY =================
      case 'featured':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <input
                value={data.featured.date}
                onChange={(e) => update('featured.date', e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                value={data.featured.title}
                onChange={(e) => update('featured.title', e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Excerpt</label>
              <textarea
                value={data.featured.excerpt}
                onChange={(e) => update('featured.excerpt', e.target.value)}
                rows={2}
                className="w-full border border-gray-200 rounded-lg px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Content</label>
              <textarea
                value={data.featured.content}
                onChange={(e) => update('featured.content', e.target.value)}
                rows={5}
                className="w-full border border-gray-200 rounded-lg px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
              <FileUploadField
                currentValue={data.featured.image}
                onChange={(url) => update('featured.image', url)}
                accept="image/*"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ID (use same as in items list)</label>
              <input
                type="number"
                value={data.featured.id}
                onChange={(e) => update('featured.id', Number(e.target.value))}
                className="w-full border border-gray-200 rounded-lg px-3 py-2"
              />
            </div>
          </div>
        );

      // ================= ALL NEWS ITEMS =================
      case 'items':
        return (
          <div className="space-y-6">
            {data.items.map((item: any, i: number) => (
              <div key={item.id} className="border border-gray-200 rounded-xl p-4 bg-gray-50 space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-gray-500">Date</label>
                    <input
                      value={item.date}
                      onChange={(e) => {
                        const items = [...data.items];
                        items[i].date = e.target.value;
                        update('items', items);
                      }}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2"
                      placeholder="e.g., September 9, 2025"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500">ID (unique number)</label>
                    <input
                      type="number"
                      value={item.id}
                      onChange={(e) => {
                        const items = [...data.items];
                        items[i].id = Number(e.target.value);
                        update('items', items);
                      }}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-gray-500">Title</label>
                  <input
                    value={item.title}
                    onChange={(e) => {
                      const items = [...data.items];
                      items[i].title = e.target.value;
                      update('items', items);
                    }}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2"
                    placeholder="News title"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500">Excerpt (short summary for collapsed view)</label>
                  <textarea
                    value={item.excerpt}
                    onChange={(e) => {
                      const items = [...data.items];
                      items[i].excerpt = e.target.value;
                      update('items', items);
                    }}
                    rows={2}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500">Full Content</label>
                  <textarea
                    value={item.content}
                    onChange={(e) => {
                      const items = [...data.items];
                      items[i].content = e.target.value;
                      update('items', items);
                    }}
                    rows={6}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500">Image</label>
                  <FileUploadField
                    currentValue={item.image}
                    onChange={(url) => {
                      const items = [...data.items];
                      items[i].image = url;
                      update('items', items);
                    }}
                    accept="image/*"
                  />
                </div>
                <button
                  onClick={() => {
                    const items = data.items.filter((_: any, idx: number) => idx !== i);
                    update('items', items);
                  }}
                  className="text-red-500 text-sm hover:text-red-700"
                >
                  Remove this news item
                </button>
              </div>
            ))}
            <button
              onClick={() => {
                const maxId = data.items.reduce(
                  (max: number, item: any) => Math.max(max, item.id || 0),
                  0
                );
                const newItem = {
                  id: maxId + 1,
                  date: '',
                  title: '',
                  excerpt: '',
                  content: '',
                  image: '',
                };
                const items = [...data.items, newItem];
                update('items', items);
              }}
              className="text-sm text-emerald-green font-medium hover:text-deep-forest inline-flex items-center gap-1"
            >
              <span>+</span> Add News Item
            </button>
          </div>
        );

      // ================= CALL TO ACTION =================
      case 'cta':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Heading</label>
              <input
                value={data.cta.heading}
                onChange={(e) => update('cta.heading', e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Text</label>
              <textarea
                value={data.cta.text}
                onChange={(e) => update('cta.text', e.target.value)}
                rows={2}
                className="w-full border border-gray-200 rounded-lg px-3 py-2"
              />
            </div>
            <h3 className="font-display font-bold text-lg text-deep-forest">Buttons</h3>
            {data.cta.buttons.map((btn: any, i: number) => (
              <div key={i} className="flex gap-2 mb-2">
                <input
                  value={btn.text}
                  onChange={(e) => {
                    const b = [...data.cta.buttons];
                    b[i].text = e.target.value;
                    update('cta.buttons', b);
                  }}
                  className="flex-1 border border-gray-200 rounded-lg px-3 py-2"
                  placeholder="Button text"
                />
                <input
                  value={btn.link}
                  onChange={(e) => {
                    const b = [...data.cta.buttons];
                    b[i].link = e.target.value;
                    update('cta.buttons', b);
                  }}
                  className="flex-1 border border-gray-200 rounded-lg px-3 py-2"
                  placeholder="Link"
                />
                <button
                  onClick={() =>
                    update(
                      'cta.buttons',
                      data.cta.buttons.filter((_: any, idx: number) => idx !== i)
                    )
                  }
                  className="text-red-500"
                >
                  ✕
                </button>
              </div>
            ))}
            <button
              onClick={() =>
                update('cta.buttons', [...data.cta.buttons, { text: '', link: '' }])
              }
              className="text-sm text-emerald-green"
            >
              + Add Button
            </button>
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
          <h2 className="font-display font-bold text-lg text-deep-forest mb-4">News Sections</h2>
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
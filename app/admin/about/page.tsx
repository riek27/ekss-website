// @ts-nocheck
'use client';

import { useState, useEffect, useRef } from 'react';
import FileUploadField from '@/components/FileUploadField';
import { savePageData } from '@/app/actions';

type SectionKey =
  | 'hero'
  | 'whoWeAre'
  | 'coreValues'
  | 'missionVision'
  | 'whatWeDo'
  | 'background'
  | 'impact'
  | 'whereWeWork'
  | 'transparency'
  | 'partners'
  | 'governance';

const sectionNames: { key: SectionKey; label: string }[] = [
  { key: 'hero', label: 'Hero' },
  { key: 'whoWeAre', label: 'Who We Are' },
  { key: 'coreValues', label: 'Core Values' },
  { key: 'missionVision', label: 'Mission & Vision' },
  { key: 'whatWeDo', label: 'What We Do' },
  { key: 'background', label: 'Background / Timeline' },
  { key: 'impact', label: 'Impact' },
  { key: 'whereWeWork', label: 'Where We Work' },
  { key: 'transparency', label: 'Transparency & Accountability' },
  { key: 'partners', label: 'Our Partners' },
  { key: 'governance', label: 'Governance & Leadership' },
];

export default function AdminAbout() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState<SectionKey>('hero');
  const [saveMessage, setSaveMessage] = useState('');

  useEffect(() => {
    fetch('/api/page-data?page=about')
      .then(res => res.json())
      .then(json => {
        if (json) setData(json);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    const result = await savePageData('about', data);
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
              <input
                value={data.hero.subtitle}
                onChange={(e) => update('hero.subtitle', e.target.value)}
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

      case 'whoWeAre':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Heading (use \n for line break)</label>
              <textarea
                value={data.whoWeAre.heading}
                onChange={(e) => update('whoWeAre.heading', e.target.value)}
                rows={2}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-green focus:border-emerald-green outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description 1</label>
              <textarea
                value={data.whoWeAre.description1}
                onChange={(e) => update('whoWeAre.description1', e.target.value)}
                rows={4}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-green focus:border-emerald-green outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description 2</label>
              <textarea
                value={data.whoWeAre.description2}
                onChange={(e) => update('whoWeAre.description2', e.target.value)}
                rows={3}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-green focus:border-emerald-green outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
              <FileUploadField
                currentValue={data.whoWeAre.image}
                onChange={(url) => update('whoWeAre.image', url)}
                accept="image/*"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">CTA Text</label>
              <input
                value={data.whoWeAre.ctaText}
                onChange={(e) => update('whoWeAre.ctaText', e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-green focus:border-emerald-green outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">CTA Link</label>
              <input
                value={data.whoWeAre.ctaLink}
                onChange={(e) => update('whoWeAre.ctaLink', e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-green focus:border-emerald-green outline-none"
              />
            </div>
          </div>
        );

      case 'coreValues':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Heading</label>
              <input
                value={data.coreValues.heading}
                onChange={(e) => update('coreValues.heading', e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-green focus:border-emerald-green outline-none"
              />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-deep-forest mb-4">Values</h3>
              {data.coreValues.list.map((value: any, i: number) => (
                <div key={i} className="border border-gray-200 rounded-xl p-4 bg-gray-50 space-y-3 mb-3">
                  <input
                    value={value.icon}
                    onChange={(e) => {
                      const v = [...data.coreValues.list];
                      v[i].icon = e.target.value;
                      update('coreValues.list', v);
                    }}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2"
                    placeholder="Icon (emoji)"
                  />
                  <input
                    value={value.title}
                    onChange={(e) => {
                      const v = [...data.coreValues.list];
                      v[i].title = e.target.value;
                      update('coreValues.list', v);
                    }}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2"
                    placeholder="Title"
                  />
                  <textarea
                    value={value.description}
                    onChange={(e) => {
                      const v = [...data.coreValues.list];
                      v[i].description = e.target.value;
                      update('coreValues.list', v);
                    }}
                    rows={2}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2"
                    placeholder="Description"
                  />
                  <button
                    onClick={() =>
                      update(
                        'coreValues.list',
                        data.coreValues.list.filter((_: any, idx: number) => idx !== i)
                      )
                    }
                    className="text-red-500 text-sm hover:text-red-700"
                  >
                    Remove value
                  </button>
                </div>
              ))}
              <button
                onClick={() =>
                  update('coreValues.list', [
                    ...data.coreValues.list,
                    { icon: '', title: '', description: '' },
                  ])
                }
                className="text-sm text-emerald-green font-medium hover:text-deep-forest inline-flex items-center gap-1"
              >
                <span>+</span> Add Value
              </button>
            </div>
          </div>
        );

      case 'missionVision':
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mission</label>
              <textarea
                value={data.missionVision.mission}
                onChange={(e) => update('missionVision.mission', e.target.value)}
                rows={5}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-green focus:border-emerald-green outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Vision</label>
              <textarea
                value={data.missionVision.vision}
                onChange={(e) => update('missionVision.vision', e.target.value)}
                rows={5}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-green focus:border-emerald-green outline-none"
              />
            </div>
          </div>
        );

      case 'whatWeDo':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Heading</label>
              <input
                value={data.whatWeDo.heading}
                onChange={(e) => update('whatWeDo.heading', e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-green focus:border-emerald-green outline-none"
              />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-deep-forest mb-4">Cards</h3>
              {data.whatWeDo.cards.map((card: any, i: number) => (
                <div key={i} className="border border-gray-200 rounded-xl p-4 bg-gray-50 space-y-3 mb-3">
                  <input
                    value={card.icon}
                    onChange={(e) => {
                      const c = [...data.whatWeDo.cards];
                      c[i].icon = e.target.value;
                      update('whatWeDo.cards', c);
                    }}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2"
                    placeholder="Icon (emoji)"
                  />
                  <input
                    value={card.title}
                    onChange={(e) => {
                      const c = [...data.whatWeDo.cards];
                      c[i].title = e.target.value;
                      update('whatWeDo.cards', c);
                    }}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2"
                    placeholder="Title"
                  />
                  <textarea
                    value={card.description}
                    onChange={(e) => {
                      const c = [...data.whatWeDo.cards];
                      c[i].description = e.target.value;
                      update('whatWeDo.cards', c);
                    }}
                    rows={2}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2"
                    placeholder="Description"
                  />
                  <button
                    onClick={() =>
                      update(
                        'whatWeDo.cards',
                        data.whatWeDo.cards.filter((_: any, idx: number) => idx !== i)
                      )
                    }
                    className="text-red-500 text-sm hover:text-red-700"
                  >
                    Remove card
                  </button>
                </div>
              ))}
              <button
                onClick={() =>
                  update('whatWeDo.cards', [
                    ...data.whatWeDo.cards,
                    { icon: '', title: '', description: '' },
                  ])
                }
                className="text-sm text-emerald-green font-medium hover:text-deep-forest inline-flex items-center gap-1"
              >
                <span>+</span> Add Card
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">CTA Text</label>
                <input
                  value={data.whatWeDo.ctaText}
                  onChange={(e) => update('whatWeDo.ctaText', e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">CTA Link</label>
                <input
                  value={data.whatWeDo.ctaLink}
                  onChange={(e) => update('whatWeDo.ctaLink', e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2"
                />
              </div>
            </div>
          </div>
        );

      case 'background':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Heading</label>
              <input
                value={data.background.heading}
                onChange={(e) => update('background.heading', e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-green focus:border-emerald-green outline-none"
              />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-deep-forest mb-4">Timeline Events</h3>
              {data.background.timeline.map((item: any, i: number) => (
                <div key={i} className="border border-gray-200 rounded-xl p-4 bg-gray-50 space-y-3 mb-3">
                  <input
                    value={item.year}
                    onChange={(e) => {
                      const t = [...data.background.timeline];
                      t[i].year = e.target.value;
                      update('background.timeline', t);
                    }}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2"
                    placeholder="Year (e.g., 2014)"
                  />
                  <input
                    value={item.title}
                    onChange={(e) => {
                      const t = [...data.background.timeline];
                      t[i].title = e.target.value;
                      update('background.timeline', t);
                    }}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2"
                    placeholder="Title"
                  />
                  <textarea
                    value={item.description}
                    onChange={(e) => {
                      const t = [...data.background.timeline];
                      t[i].description = e.target.value;
                      update('background.timeline', t);
                    }}
                    rows={2}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2"
                    placeholder="Description"
                  />
                  <button
                    onClick={() =>
                      update(
                        'background.timeline',
                        data.background.timeline.filter((_: any, idx: number) => idx !== i)
                      )
                    }
                    className="text-red-500 text-sm hover:text-red-700"
                  >
                    Remove event
                  </button>
                </div>
              ))}
              <button
                onClick={() =>
                  update('background.timeline', [
                    ...data.background.timeline,
                    { year: '', title: '', description: '' },
                  ])
                }
                className="text-sm text-emerald-green font-medium hover:text-deep-forest inline-flex items-center gap-1"
              >
                <span>+</span> Add Event
              </button>
            </div>
          </div>
        );

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
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
              <input
                value={data.impact.subtitle || ''}
                onChange={(e) => update('impact.subtitle', e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2"
              />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-deep-forest mb-4">Stats</h3>
              {data.impact.stats.map((stat: any, i: number) => (
                <div key={i} className="flex gap-3 items-end mb-3">
                  <div className="flex-1">
                    <label className="text-xs text-gray-500">Value</label>
                    <input
                      type="number"
                      value={stat.value}
                      onChange={(e) => {
                        const s = [...data.impact.stats];
                        s[i].value = Number(e.target.value);
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
                    className="text-red-500 text-sm hover:text-red-700 mb-1"
                  >
                    ✕
                  </button>
                </div>
              ))}
              <button
                onClick={() =>
                  update('impact.stats', [...data.impact.stats, { value: 0, label: 'New stat' }])
                }
                className="text-sm text-emerald-green font-medium hover:text-deep-forest inline-flex items-center gap-1"
              >
                <span>+</span> Add Stat
              </button>
            </div>
          </div>
        );

      case 'whereWeWork':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Heading</label>
              <input
                value={data.whereWeWork.heading}
                onChange={(e) => update('whereWeWork.heading', e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2"
              />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-deep-forest mb-4">Locations</h3>
              {data.whereWeWork.locations.map((loc: any, i: number) => (
                <div key={i} className="border border-gray-200 rounded-xl p-4 bg-gray-50 space-y-3 mb-3">
                  <input
                    value={loc.name}
                    onChange={(e) => {
                      const l = [...data.whereWeWork.locations];
                      l[i].name = e.target.value;
                      update('whereWeWork.locations', l);
                    }}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2"
                    placeholder="Location name"
                  />
                  <input
                    value={loc.description}
                    onChange={(e) => {
                      const l = [...data.whereWeWork.locations];
                      l[i].description = e.target.value;
                      update('whereWeWork.locations', l);
                    }}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2"
                    placeholder="Description"
                  />
                  <button
                    onClick={() =>
                      update(
                        'whereWeWork.locations',
                        data.whereWeWork.locations.filter((_: any, idx: number) => idx !== i)
                      )
                    }
                    className="text-red-500 text-sm hover:text-red-700"
                  >
                    Remove location
                  </button>
                </div>
              ))}
              <button
                onClick={() =>
                  update('whereWeWork.locations', [
                    ...data.whereWeWork.locations,
                    { name: '', description: '' },
                  ])
                }
                className="text-sm text-emerald-green font-medium hover:text-deep-forest inline-flex items-center gap-1"
              >
                <span>+</span> Add Location
              </button>
            </div>
          </div>
        );

      case 'transparency':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Heading</label>
              <input
                value={data.transparency.heading}
                onChange={(e) => update('transparency.heading', e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2"
              />
            </div>
            <h3 className="font-display font-bold text-lg text-deep-forest mb-4">Items</h3>
            {data.transparency.items.map((item: any, i: number) => (
              <div key={i} className="border border-gray-200 rounded-xl p-4 bg-gray-50 space-y-3 mb-3">
                <input
                  value={item.title}
                  onChange={(e) => {
                    const items = [...data.transparency.items];
                    items[i].title = e.target.value;
                    update('transparency.items', items);
                  }}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2"
                  placeholder="Title"
                />
                <input
                  value={item.description}
                  onChange={(e) => {
                    const items = [...data.transparency.items];
                    items[i].description = e.target.value;
                    update('transparency.items', items);
                  }}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2"
                  placeholder="Description"
                />
                <button
                  onClick={() =>
                    update(
                      'transparency.items',
                      data.transparency.items.filter((_: any, idx: number) => idx !== i)
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
                update('transparency.items', [
                  ...data.transparency.items,
                  { title: '', description: '' },
                ])
              }
              className="text-sm text-emerald-green font-medium hover:text-deep-forest inline-flex items-center gap-1"
            >
              <span>+</span> Add Item
            </button>
          </div>
        );

      case 'partners':
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Heading</label>
        <input
          value={data.partners.heading}
          onChange={(e) => update('partners.heading', e.target.value)}
          className="w-full border border-gray-200 rounded-lg px-3 py-2"
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

      case 'governance':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Heading</label>
              <input
                value={data.governance.heading}
                onChange={(e) => update('governance.heading', e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                value={data.governance.description}
                onChange={(e) => update('governance.description', e.target.value)}
                rows={3}
                className="w-full border border-gray-200 rounded-lg px-3 py-2"
              />
            </div>

            <h3 className="font-display font-bold text-lg text-deep-forest mt-4">Governance Columns</h3>
            {data.governance.columns.map((col: any, i: number) => (
              <div key={i} className="border border-gray-200 rounded-xl p-4 bg-gray-50 space-y-3 mb-3">
                <input
                  value={col.title}
                  onChange={(e) => {
                    const c = [...data.governance.columns];
                    c[i].title = e.target.value;
                    update('governance.columns', c);
                  }}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2"
                  placeholder="Title"
                />
                <input
                  value={col.description}
                  onChange={(e) => {
                    const c = [...data.governance.columns];
                    c[i].description = e.target.value;
                    update('governance.columns', c);
                  }}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2"
                  placeholder="Description"
                />
                <input
                  value={col.icon}
                  onChange={(e) => {
                    const c = [...data.governance.columns];
                    c[i].icon = e.target.value;
                    update('governance.columns', c);
                  }}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2"
                  placeholder="Icon (user-group, user, light-bulb)"
                />
                <label className="inline-flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={col.highlight}
                    onChange={(e) => {
                      const c = [...data.governance.columns];
                      c[i].highlight = e.target.checked;
                      update('governance.columns', c);
                    }}
                    className="rounded"
                  />
                  <span className="text-sm">Highlight this column?</span>
                </label>
                <button
                  onClick={() =>
                    update(
                      'governance.columns',
                      data.governance.columns.filter((_: any, idx: number) => idx !== i)
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
                update('governance.columns', [
                  ...data.governance.columns,
                  { title: '', description: '', icon: 'user-group', highlight: false },
                ])
              }
              className="text-sm text-emerald-green font-medium hover:text-deep-forest inline-flex items-center gap-1"
            >
              <span>+</span> Add Column
            </button>

            <h3 className="font-display font-bold text-lg text-deep-forest mt-6">Executive Director</h3>
            <div className="space-y-3">
              <input
                value={data.governance.executive.name}
                onChange={(e) => update('governance.executive.name', e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2"
                placeholder="Full Name"
              />
              <input
                value={data.governance.executive.title}
                onChange={(e) => update('governance.executive.title', e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2"
                placeholder="Job Title"
              />
              <label className="block text-sm font-medium text-gray-700">Photo</label>
              <FileUploadField
                currentValue={data.governance.executive.image}
                onChange={(url) => update('governance.executive.image', url)}
                accept="image/*"
              />
              <textarea
                value={data.governance.executive.bio1}
                onChange={(e) => update('governance.executive.bio1', e.target.value)}
                rows={3}
                className="w-full border border-gray-200 rounded-lg px-3 py-2"
                placeholder="Bio paragraph 1"
              />
              <textarea
                value={data.governance.executive.bio2}
                onChange={(e) => update('governance.executive.bio2', e.target.value)}
                rows={2}
                className="w-full border border-gray-200 rounded-lg px-3 py-2"
                placeholder="Bio paragraph 2"
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  value={data.governance.executive.email}
                  onChange={(e) => update('governance.executive.email', e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2"
                  placeholder="Email"
                />
                <input
                  value={data.governance.executive.phone}
                  onChange={(e) => update('governance.executive.phone', e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2"
                  placeholder="Phone"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Team CTA Text</label>
                <input
                  value={data.governance.teamCta.text}
                  onChange={(e) => update('governance.teamCta.text', e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Team CTA Link</label>
                <input
                  value={data.governance.teamCta.link}
                  onChange={(e) => update('governance.teamCta.link', e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2"
                />
              </div>
            </div>
          </div>
        );

      default:
        return <div className="text-center text-gray-500 py-20">Select a section from the sidebar</div>;
    }
  };

  if (loading) return <div className="p-8 text-center">Loading editor...</div>;
  if (!data) return <div className="p-8 text-center">No data found. Please seed the database.</div>;

  return (
    <div className="flex gap-6">
      {/* ---- Section Sidebar ---- */}
      <nav className="w-56 flex-shrink-0">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sticky top-20">
          <h2 className="font-display font-bold text-lg text-deep-forest mb-4">About Sections</h2>
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
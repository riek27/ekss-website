'use client';

import { useState, useRef } from 'react';
import { savePageData, uploadFile } from '@/app/actions';
import initialData from '@/data/resources.json';
import FileUploadField from '@/components/FileUploadField';



type SectionKey =
  | 'hero'
  | 'featured'
  | 'categories'
  | 'donorsPartners'
  | 'requestDocument'
  | 'transparency';

const sectionNames: { key: SectionKey; label: string }[] = [
  { key: 'hero', label: 'Hero' },
  { key: 'featured', label: 'Featured Resource' },
  { key: 'categories', label: 'Categories & Documents' },
  { key: 'donorsPartners', label: 'Donors & Partners' },
  { key: 'requestDocument', label: 'Request a Document' },
  { key: 'transparency', label: 'Transparency Statement' },
];

export default function AdminResources() {
  const [data, setData] = useState(() => JSON.parse(JSON.stringify(initialData)));
  const [activeSection, setActiveSection] = useState<SectionKey>('hero');
  const [saveMessage, setSaveMessage] = useState('');

  const handleSave = async () => {
    const result = await savePageData('resources', data);
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

      case 'featured':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Title</label>
              <input value={data.featured.title} onChange={(e) => update('featured.title', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <div>
              <label className="block text-sm font-medium">Description</label>
              <textarea value={data.featured.description} onChange={(e) => update('featured.description', e.target.value)} rows={3} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <div>
              <label className="block text-sm font-medium">Image</label>
              <FileUploadField currentValue={data.featured.image} onChange={(url) => update('featured.image', url)} accept="image/*" />
            </div>
            <div>
              <label className="block text-sm font-medium">Link (file path)</label>
              <FileUploadField currentValue={data.featured.link} onChange={(url) => update('featured.link', url)} accept=".pdf" />
            </div>
            <div>
              <label className="block text-sm font-medium">Link Text</label>
              <input value={data.featured.linkText} onChange={(e) => update('featured.linkText', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
          </div>
        );

      case 'categories':
        return (
          <div className="space-y-6">
            {data.categories.map((category: any, catIdx: number) => (
              <div key={catIdx} className="border border-gray-200 rounded-xl p-4 bg-gray-50">
                <div className="flex items-center gap-2 mb-4">
                  <input
                    value={category.title}
                    onChange={(e) => {
                      const c = [...data.categories];
                      c[catIdx].title = e.target.value;
                      update('categories', c);
                    }}
                    className="flex-1 font-semibold border rounded-lg px-3 py-2"
                    placeholder="Category Title"
                  />
                  <button
                    onClick={() => {
                      const c = data.categories.filter((_: any, idx: number) => idx !== catIdx);
                      update('categories', c);
                    }}
                    className="text-red-500 text-sm"
                  >
                    Remove Category
                  </button>
                </div>
                <h4 className="font-medium text-sm mb-2">Documents</h4>
                {category.documents.map((doc: any, docIdx: number) => (
                  <div key={docIdx} className="border rounded-lg p-3 mb-2 bg-white">
                    <input
                      value={doc.title}
                      onChange={(e) => {
                        const c = [...data.categories];
                        c[catIdx].documents[docIdx].title = e.target.value;
                        update('categories', c);
                      }}
                      className="w-full border rounded px-2 py-1 mb-1"
                      placeholder="Document Title"
                    />
                    <textarea
                      value={doc.description}
                      onChange={(e) => {
                        const c = [...data.categories];
                        c[catIdx].documents[docIdx].description = e.target.value;
                        update('categories', c);
                      }}
                      rows={2}
                      className="w-full border rounded px-2 py-1 mb-1"
                      placeholder="Description"
                    />
                    <div className="grid grid-cols-2 gap-2 mb-1">
                      <input
                        value={doc.year}
                        onChange={(e) => {
                          const c = [...data.categories];
                          c[catIdx].documents[docIdx].year = e.target.value;
                          update('categories', c);
                        }}
                        className="border rounded px-2 py-1"
                        placeholder="Year"
                      />
                      <input
                        value={doc.type}
                        onChange={(e) => {
                          const c = [...data.categories];
                          c[catIdx].documents[docIdx].type = e.target.value;
                          update('categories', c);
                        }}
                        className="border rounded px-2 py-1"
                        placeholder="Type (e.g., Annual Report)"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2 mb-1">
                      <input
                        value={doc.fileSize}
                        onChange={(e) => {
                          const c = [...data.categories];
                          c[catIdx].documents[docIdx].fileSize = e.target.value;
                          update('categories', c);
                        }}
                        className="border rounded px-2 py-1"
                        placeholder="File size (e.g., 2.1 MB)"
                      />
                      <div>
                        <label className="text-xs">File</label>
                        <FileUploadField
                          currentValue={doc.file}
                          onChange={(url) => {
                            const c = [...data.categories];
                            c[catIdx].documents[docIdx].file = url;
                            update('categories', c);
                          }}
                          accept=".pdf,.doc,.docx"
                        />
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        const c = [...data.categories];
                        c[catIdx].documents = c[catIdx].documents.filter((_: any, idx: number) => idx !== docIdx);
                        update('categories', c);
                      }}
                      className="text-red-500 text-sm"
                    >
                      Remove Document
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => {
                    const c = [...data.categories];
                    c[catIdx].documents.push({
                      title: '',
                      description: '',
                      year: '',
                      type: '',
                      file: '',
                      fileSize: '',
                    });
                    update('categories', c);
                  }}
                  className="text-sm text-emerald-green"
                >
                  + Add Document
                </button>
              </div>
            ))}
            <button
              onClick={() => {
                const c = [...data.categories, { title: '', documents: [] }];
                update('categories', c);
              }}
              className="text-sm text-emerald-green font-medium"
            >
              + Add Category
            </button>
          </div>
        );

      case 'donorsPartners':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Heading</label>
              <input value={data.donorsPartners.heading} onChange={(e) => update('donorsPartners.heading', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <div>
              <label className="block text-sm font-medium">Text</label>
              <textarea value={data.donorsPartners.text} onChange={(e) => update('donorsPartners.text', e.target.value)} rows={3} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <h3 className="font-semibold">Buttons</h3>
            {data.donorsPartners.buttons.map((btn: any, i: number) => (
              <div key={i} className="flex gap-2 mb-2">
                <input
                  value={btn.text}
                  onChange={(e) => {
                    const b = [...data.donorsPartners.buttons];
                    b[i].text = e.target.value;
                    update('donorsPartners.buttons', b);
                  }}
                  className="flex-1 border rounded px-2 py-1"
                  placeholder="Button text"
                />
                <input
                  value={btn.link}
                  onChange={(e) => {
                    const b = [...data.donorsPartners.buttons];
                    b[i].link = e.target.value;
                    update('donorsPartners.buttons', b);
                  }}
                  className="flex-1 border rounded px-2 py-1"
                  placeholder="Link"
                />
                <button
                  onClick={() =>
                    update(
                      'donorsPartners.buttons',
                      data.donorsPartners.buttons.filter((_: any, idx: number) => idx !== i)
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
                update('donorsPartners.buttons', [...data.donorsPartners.buttons, { text: '', link: '' }])
              }
              className="text-sm text-emerald-green"
            >
              + Add Button
            </button>
          </div>
        );

      case 'requestDocument':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Heading</label>
              <input value={data.requestDocument.heading} onChange={(e) => update('requestDocument.heading', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <div>
              <label className="block text-sm font-medium">Text</label>
              <textarea value={data.requestDocument.text} onChange={(e) => update('requestDocument.text', e.target.value)} rows={3} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium">Button Text</label>
                <input value={data.requestDocument.buttonText} onChange={(e) => update('requestDocument.buttonText', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
              </div>
              <div>
                <label className="block text-sm font-medium">Button Link</label>
                <input value={data.requestDocument.buttonLink} onChange={(e) => update('requestDocument.buttonLink', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
              </div>
            </div>
          </div>
        );

      case 'transparency':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Heading</label>
              <input value={data.transparency.heading} onChange={(e) => update('transparency.heading', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <div>
              <label className="block text-sm font-medium">Text</label>
              <textarea value={data.transparency.text} onChange={(e) => update('transparency.text', e.target.value)} rows={3} className="w-full border rounded-lg px-3 py-2 mt-1" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium">CTA Text</label>
                <input value={data.transparency.ctaText} onChange={(e) => update('transparency.ctaText', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
              </div>
              <div>
                <label className="block text-sm font-medium">CTA Link</label>
                <input value={data.transparency.ctaLink} onChange={(e) => update('transparency.ctaLink', e.target.value)} className="w-full border rounded-lg px-3 py-2 mt-1" />
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
          <h2 className="font-display font-bold text-lg text-deep-forest mb-4">Resource Sections</h2>
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
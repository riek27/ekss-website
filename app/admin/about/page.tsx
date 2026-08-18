'use client';

import { useState, useEffect } from 'react';
import FileUploadField from '@/components/FileUploadField';
import { savePageData } from '@/app/actions';

type SectionKey = 'hero' | 'whoWeAre' | 'governance' | 'journey' | 'partners' | 'transparency';

const sectionNames: { key: SectionKey; label: string }[] = [
  { key: 'hero', label: 'Hero' },
  { key: 'whoWeAre', label: 'Who We Are' },
  { key: 'governance', label: 'Governance & Leadership' },
  { key: 'journey', label: 'Our Journey' },
  { key: 'partners', label: 'Our Partners' },
  { key: 'transparency', label: 'Transparency' },
];

// ---------- Reusable input components (defined outside) ----------
function TextInput({ label, value, onChange, placeholder }: any) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-green focus:border-emerald-green outline-none"
      />
    </div>
  );
}

function TextArea({ label, value, onChange, rows = 3, placeholder }: any) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        placeholder={placeholder}
        className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-green focus:border-emerald-green outline-none"
      />
    </div>
  );
}

function ImageUpload({ label, value, onChange }: any) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <FileUploadField currentValue={value} onChange={onChange} accept="image/*" />
    </div>
  );
}

export default function AdminAbout() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState<SectionKey>('hero');
  const [saveMessage, setSaveMessage] = useState('');

  useEffect(() => {
    fetch('/api/page-data?page=about')
      .then((res) => res.json())
      .then((json) => {
        if (json) setData(json);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    try {
      const result = await savePageData('about', data);
      if (result.success) {
        setSaveMessage('✅ All changes saved!');
        setTimeout(() => setSaveMessage(''), 4000);
      } else {
        setSaveMessage('❌ Error: ' + result.error);
      }
    } catch (err: any) {
      setSaveMessage('❌ Error: ' + err.message);
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

  // Helper to update an array item
  const updateArrayItem = (arrayPath: string, index: number, field: string, value: any) => {
    const keys = arrayPath.split('.');
    setData((prev: any) => {
      const newData = JSON.parse(JSON.stringify(prev));
      let arr = newData;
      // Traverse to the array
      for (let i = 0; i < keys.length; i++) arr = arr[keys[i]];
      // Now arr is the array, update the item
      arr[index][field] = value;
      return newData;
    });
  };

  // Helper to add an item to an array
  const addArrayItem = (arrayPath: string, newItem: any) => {
    const keys = arrayPath.split('.');
    setData((prev: any) => {
      const newData = JSON.parse(JSON.stringify(prev));
      let arr = newData;
      // Traverse to the array's parent object, then push
      for (let i = 0; i < keys.length; i++) arr = arr[keys[i]];
      arr.push(newItem);
      return newData;
    });
  };

  // Helper to remove an item from an array
  const removeArrayItem = (arrayPath: string, index: number) => {
    const keys = arrayPath.split('.');
    setData((prev: any) => {
      const newData = JSON.parse(JSON.stringify(prev));
      let arr = newData;
      // Traverse to the array
      for (let i = 0; i < keys.length; i++) arr = arr[keys[i]];
      arr.splice(index, 1);
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
            <TextInput label="Title" value={data.hero.title} onChange={(v: string) => update('hero.title', v)} />
            <TextInput label="Subtitle" value={data.hero.subtitle} onChange={(v: string) => update('hero.subtitle', v)} />
            <ImageUpload label="Background Image" value={data.hero.image} onChange={(url: string) => update('hero.image', url)} />
          </div>
        );

      case 'whoWeAre':
        return (
          <div className="space-y-6">
            <TextArea label="Heading (use \n for line break)" value={data.whoWeAre.heading} onChange={(v: string) => update('whoWeAre.heading', v)} rows={2} />
            <TextArea label="Description 1" value={data.whoWeAre.description1} onChange={(v: string) => update('whoWeAre.description1', v)} rows={4} />
            <TextArea label="Description 2" value={data.whoWeAre.description2} onChange={(v: string) => update('whoWeAre.description2', v)} rows={3} />
            <TextArea label="Mission Statement (one sentence)" value={data.whoWeAre.missionStatement} onChange={(v: string) => update('whoWeAre.missionStatement', v)} rows={2} />
            <TextArea label="Vision Statement (one sentence)" value={data.whoWeAre.visionStatement} onChange={(v: string) => update('whoWeAre.visionStatement', v)} rows={2} />
            <TextArea label="Where We Work Statement (one sentence)" value={data.whoWeAre.whereWeWorkStatement} onChange={(v: string) => update('whoWeAre.whereWeWorkStatement', v)} rows={2} />
            <ImageUpload label="Image" value={data.whoWeAre.image} onChange={(url: string) => update('whoWeAre.image', url)} />
            <div className="grid grid-cols-2 gap-4">
              <TextInput label="CTA Text" value={data.whoWeAre.ctaText} onChange={(v: string) => update('whoWeAre.ctaText', v)} />
              <TextInput label="CTA Link" value={data.whoWeAre.ctaLink} onChange={(v: string) => update('whoWeAre.ctaLink', v)} />
            </div>
          </div>
        );

      case 'governance':
        return (
          <div className="space-y-8">
            <TextInput label="Heading" value={data.governance.heading} onChange={(v: string) => update('governance.heading', v)} />
            <TextArea label="Description" value={data.governance.description} onChange={(v: string) => update('governance.description', v)} rows={3} />

            {/* Executive Director */}
            <div className="border-t pt-6">
              <h3 className="font-bold text-lg text-deep-forest mb-4">Executive Director</h3>
              <div className="space-y-3">
                <TextInput label="Name" value={data.governance.executiveDirector.name} onChange={(v: string) => update('governance.executiveDirector.name', v)} />
                <TextInput label="Title" value={data.governance.executiveDirector.title} onChange={(v: string) => update('governance.executiveDirector.title', v)} />
                <ImageUpload label="Photo" value={data.governance.executiveDirector.image} onChange={(url: string) => update('governance.executiveDirector.image', url)} />
                <TextArea label="Bio" value={data.governance.executiveDirector.bio} onChange={(v: string) => update('governance.executiveDirector.bio', v)} rows={4} />
                <div className="grid grid-cols-2 gap-4">
                  <TextInput label="Email" value={data.governance.executiveDirector.email} onChange={(v: string) => update('governance.executiveDirector.email', v)} />
                  <TextInput label="Phone" value={data.governance.executiveDirector.phone} onChange={(v: string) => update('governance.executiveDirector.phone', v)} />
                </div>
              </div>
            </div>

            {/* Board of Directors */}
            <div className="border-t pt-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg text-deep-forest">Board of Directors</h3>
                <button
                  onClick={() => addArrayItem('governance.board', { name: '', title: '', image: '', bio: '' })}
                  className="text-sm text-emerald-green font-medium hover:text-deep-forest"
                >
                  + Add Member
                </button>
              </div>
              {data.governance.board.map((member: any, i: number) => (
                <div key={i} className="border border-gray-200 rounded-xl p-4 bg-gray-50 space-y-3 mb-3">
                  <TextInput label="Name" value={member.name} onChange={(v: string) => updateArrayItem('governance.board', i, 'name', v)} />
                  <TextInput label="Title" value={member.title} onChange={(v: string) => updateArrayItem('governance.board', i, 'title', v)} />
                  <ImageUpload label="Photo" value={member.image} onChange={(url: string) => updateArrayItem('governance.board', i, 'image', url)} />
                  <TextArea label="Bio" value={member.bio} onChange={(v: string) => updateArrayItem('governance.board', i, 'bio', v)} rows={2} />
                  <button onClick={() => removeArrayItem('governance.board', i)} className="text-red-500 text-sm hover:text-red-700">
                    Remove Member
                  </button>
                </div>
              ))}
            </div>

            {/* Leadership Team */}
            <div className="border-t pt-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg text-deep-forest">Leadership Team</h3>
                <button
                  onClick={() => addArrayItem('governance.leadershipTeam', { name: '', title: '', image: '', bio: '' })}
                  className="text-sm text-emerald-green font-medium hover:text-deep-forest"
                >
                  + Add Member
                </button>
              </div>
              {data.governance.leadershipTeam.map((member: any, i: number) => (
                <div key={i} className="border border-gray-200 rounded-xl p-4 bg-gray-50 space-y-3 mb-3">
                  <TextInput label="Name" value={member.name} onChange={(v: string) => updateArrayItem('governance.leadershipTeam', i, 'name', v)} />
                  <TextInput label="Title" value={member.title} onChange={(v: string) => updateArrayItem('governance.leadershipTeam', i, 'title', v)} />
                  <ImageUpload label="Photo" value={member.image} onChange={(url: string) => updateArrayItem('governance.leadershipTeam', i, 'image', url)} />
                  <TextArea label="Bio" value={member.bio} onChange={(v: string) => updateArrayItem('governance.leadershipTeam', i, 'bio', v)} rows={2} />
                  <button onClick={() => removeArrayItem('governance.leadershipTeam', i)} className="text-red-500 text-sm hover:text-red-700">
                    Remove Member
                  </button>
                </div>
              ))}
            </div>

            {/* Advisory Committee */}
            <div className="border-t pt-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg text-deep-forest">Advisory Committee</h3>
                <button
                  onClick={() => addArrayItem('governance.advisory', { name: '', title: '', image: '', bio: '' })}
                  className="text-sm text-emerald-green font-medium hover:text-deep-forest"
                >
                  + Add Member
                </button>
              </div>
              {data.governance.advisory.map((member: any, i: number) => (
                <div key={i} className="border border-gray-200 rounded-xl p-4 bg-gray-50 space-y-3 mb-3">
                  <TextInput label="Name" value={member.name} onChange={(v: string) => updateArrayItem('governance.advisory', i, 'name', v)} />
                  <TextInput label="Title" value={member.title} onChange={(v: string) => updateArrayItem('governance.advisory', i, 'title', v)} />
                  <ImageUpload label="Photo" value={member.image} onChange={(url: string) => updateArrayItem('governance.advisory', i, 'image', url)} />
                  <TextArea label="Bio" value={member.bio} onChange={(v: string) => updateArrayItem('governance.advisory', i, 'bio', v)} rows={2} />
                  <button onClick={() => removeArrayItem('governance.advisory', i)} className="text-red-500 text-sm hover:text-red-700">
                    Remove Member
                  </button>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="grid grid-cols-2 gap-4 border-t pt-6">
              <TextInput label="Team CTA Text" value={data.governance.teamCta.text} onChange={(v: string) => update('governance.teamCta.text', v)} />
              <TextInput label="Team CTA Link" value={data.governance.teamCta.link} onChange={(v: string) => update('governance.teamCta.link', v)} />
            </div>
          </div>
        );

      case 'journey':
        return (
          <div className="space-y-6">
            <TextInput label="Heading" value={data.journey.heading} onChange={(v: string) => update('journey.heading', v)} />
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg text-deep-forest">Timeline Events</h3>
                <button
                  onClick={() => addArrayItem('journey.timeline', { year: '', title: '', description: '' })}
                  className="text-sm text-emerald-green font-medium hover:text-deep-forest"
                >
                  + Add Event
                </button>
              </div>
              {data.journey.timeline.map((item: any, i: number) => (
                <div key={i} className="border border-gray-200 rounded-xl p-4 bg-gray-50 space-y-3 mb-3">
                  <TextInput label="Year" value={item.year} onChange={(v: string) => updateArrayItem('journey.timeline', i, 'year', v)} />
                  <TextInput label="Title" value={item.title} onChange={(v: string) => updateArrayItem('journey.timeline', i, 'title', v)} />
                  <TextArea label="Description" value={item.description} onChange={(v: string) => updateArrayItem('journey.timeline', i, 'description', v)} rows={2} />
                  <button onClick={() => removeArrayItem('journey.timeline', i)} className="text-red-500 text-sm hover:text-red-700">
                    Remove Event
                  </button>
                </div>
              ))}
            </div>
          </div>
        );

      case 'partners':
        return (
          <div className="space-y-6">
            <TextInput label="Heading" value={data.partners.heading} onChange={(v: string) => update('partners.heading', v)} />
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg text-deep-forest">Partner List</h3>
                <button
                  onClick={() => addArrayItem('partners.list', { name: '', label: '', image: '' })}
                  className="text-sm text-emerald-green font-medium hover:text-deep-forest"
                >
                  + Add Partner
                </button>
              </div>
              {data.partners.list.map((partner: any, i: number) => (
                <div key={i} className="border border-gray-200 rounded-xl p-4 bg-gray-50 space-y-3 mb-3">
                  <div className="grid grid-cols-2 gap-3">
                    <TextInput label="Name" value={partner.name} onChange={(v: string) => updateArrayItem('partners.list', i, 'name', v)} />
                    <TextInput label="Label" value={partner.label} onChange={(v: string) => updateArrayItem('partners.list', i, 'label', v)} />
                  </div>
                  <ImageUpload label="Logo" value={partner.image} onChange={(url: string) => updateArrayItem('partners.list', i, 'image', url)} />
                  <button onClick={() => removeArrayItem('partners.list', i)} className="text-red-500 text-sm hover:text-red-700">
                    Remove Partner
                  </button>
                </div>
              ))}
            </div>
          </div>
        );

      case 'transparency':
        return (
          <div className="space-y-6">
            <TextInput label="Heading" value={data.transparency.heading} onChange={(v: string) => update('transparency.heading', v)} />
            <TextArea label="Introduction" value={data.transparency.intro} onChange={(v: string) => update('transparency.intro', v)} rows={3} />
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg text-deep-forest">Items</h3>
                <button
                  onClick={() => addArrayItem('transparency.items', { title: '', description: '' })}
                  className="text-sm text-emerald-green font-medium hover:text-deep-forest"
                >
                  + Add Item
                </button>
              </div>
              {data.transparency.items.map((item: any, i: number) => (
                <div key={i} className="border border-gray-200 rounded-xl p-4 bg-gray-50 space-y-3 mb-3">
                  <TextInput label="Title" value={item.title} onChange={(v: string) => updateArrayItem('transparency.items', i, 'title', v)} />
                  <TextInput label="Description" value={item.description} onChange={(v: string) => updateArrayItem('transparency.items', i, 'description', v)} />
                  <button onClick={() => removeArrayItem('transparency.items', i)} className="text-red-500 text-sm hover:text-red-700">
                    Remove Item
                  </button>
                </div>
              ))}
            </div>
            <TextArea label="Records Note" value={data.transparency.recordsNote} onChange={(v: string) => update('transparency.recordsNote', v)} rows={4} />
            <div className="grid grid-cols-2 gap-4">
              <TextInput label="Documents Link Text" value={data.transparency.documentsLinkText} onChange={(v: string) => update('transparency.documentsLinkText', v)} />
              <TextInput label="Documents Link URL" value={data.transparency.documentsLinkUrl} onChange={(v: string) => update('transparency.documentsLinkUrl', v)} />
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
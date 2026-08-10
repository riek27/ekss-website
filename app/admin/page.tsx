import Link from 'next/link';

const pages = [
  { title: 'Home', slug: 'home' },
  { title: 'Programs', slug: 'programs' },
  { title: 'News', slug: 'news' },
  { title: 'Resources', slug: 'resources' },
  { title: 'Contact', slug: 'contact' },
];

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-deep-forest mb-6">Content Management</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {pages.map((page) => (
          <Link
            key={page.slug}
            href={`/admin/${page.slug}`}
            className="bg-white rounded-xl p-6 shadow-sm border hover:shadow-md transition-shadow"
          >
            <h2 className="font-semibold text-lg text-deep-forest">{page.title}</h2>
            <p className="text-sm text-gray-500 mt-1">Edit {page.title.toLowerCase()} page content</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
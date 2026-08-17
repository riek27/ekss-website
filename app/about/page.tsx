// app/about/page.tsx
import { getPageData } from '@/app/actions';
import AboutPageClient from '@/components/AboutPageClient';

export default async function AboutPage() {
  const aboutData = await getPageData('about');

  if (!aboutData || !aboutData.hero) {
    return <div className="text-center py-20">Content not available</div>;
  }

  return <AboutPageClient data={aboutData} />;
}
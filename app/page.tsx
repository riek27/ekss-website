// app/page.tsx
import { getPageData } from '@/app/actions';
import HomePageClient from '@/components/HomePageClient';

export default async function HomePage() {
  const homeData = await getPageData('home');

  if (!homeData || !homeData.hero) {
    return <div className="text-center py-20">Content not available</div>;
  }

  return <HomePageClient data={homeData} />;
}
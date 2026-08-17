// app/advocacy/page.tsx
import { getPageData } from '@/app/actions';
import AdvocacyPageClient from '@/components/AdvocacyPageClient';

export default async function AdvocacyPage() {
  const advocacyData = await getPageData('advocacy');

  if (!advocacyData || !advocacyData.hero) {
    return <div className="text-center py-20">Content not available</div>;
  }

  return <AdvocacyPageClient data={advocacyData} />;
}
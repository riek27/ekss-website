 // app/youth/page.tsx
import { getPageData } from '@/app/actions';
import YouthPageClient from '@/components/YouthPageClient';

export default async function YouthPage() {
  const youthData = await getPageData('youth');

  if (!youthData || !youthData.hero) {
    return <div className="text-center py-20">Content not available</div>;
  }

  return <YouthPageClient data={youthData} />;
}
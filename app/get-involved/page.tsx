// app/get-involved/page.tsx
import { getPageData } from '@/app/actions';
import GetInvolvedPageClient from '@/components/GetInvolvedPageClient';

export default async function GetInvolvedPage() {
  const getInvolvedData = await getPageData('getInvolved');

  if (!getInvolvedData || !getInvolvedData.hero) {
    return <div className="text-center py-20">Content not available</div>;
  }

  return <GetInvolvedPageClient data={getInvolvedData} />;
}
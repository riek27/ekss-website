// app/empower-farmers/page.tsx
import { getPageData } from '@/app/actions';
import EmpowerFarmersPageClient from '@/components/EmpowerFarmersPageClient';

export default async function EmpowerFarmersPage() {
  const efssData = await getPageData('empower-farmers');

  if (!efssData || !efssData.hero) {
    return <div className="text-center py-20">Content not available</div>;
  }

  return <EmpowerFarmersPageClient data={efssData} />;
}
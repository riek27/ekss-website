// app/resources/page.tsx
import { getPageData } from '@/app/actions';
import ResourcesPageClient from '@/components/ResourcesPageClient';

export default async function ResourcesPage() {
  const resourcesData = await getPageData('resources');

  if (!resourcesData || !resourcesData.hero) {
    return <div className="text-center py-20">Content not available</div>;
  }

  return <ResourcesPageClient data={resourcesData} />;
}
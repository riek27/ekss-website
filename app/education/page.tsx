// app/education/page.tsx
import { getPageData } from '@/app/actions';
import EducationPageClient from '@/components/EducationPageClient';

export default async function EducationPage() {
  const educationData = await getPageData('education');

  if (!educationData || !educationData.hero) {
    return <div className="text-center py-20">Content not available</div>;
  }

  return <EducationPageClient data={educationData} />;
}
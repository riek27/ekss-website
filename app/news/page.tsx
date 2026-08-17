// app/news/page.tsx
import { getPageData } from '@/app/actions';
import NewsPageClient from '@/components/NewsPageClient';

export default async function NewsPage() {
  const newsData = await getPageData('news');

  if (!newsData || !newsData.hero) {
    return <div className="text-center py-20">Content not available</div>;
  }

  return <NewsPageClient data={newsData} />;
}
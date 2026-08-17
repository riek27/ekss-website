// app/contact/page.tsx
import { getPageData } from '@/app/actions';
import ContactPageClient from '@/components/ContactPageClient';

export default async function ContactPage() {
  const contactData = await getPageData('contact');

  if (!contactData || !contactData.hero) {
    return <div className="text-center py-20">Content not available</div>;
  }

  return <ContactPageClient data={contactData} />;
}
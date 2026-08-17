import './globals.css'
import type { Metadata, Viewport } from 'next'

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'EmpowerKids–South Sudan',
  alternateName: 'EKSS',
  url: 'https://ekss.org',
  logo: 'https://ekss.org/images/eksslogo.png',
  image: 'https://ekss.org/images/eksslogo.png',
  description:
    'Non-governmental organisation working in education, conservation agriculture, youth empowerment and civic engagement in Juba, Central Equatoria, South Sudan. Registered NGO, CAF America validated.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Gudele West, Block 4, Plot 477',
    addressLocality: 'Juba',
    addressRegion: 'Central Equatoria',
    addressCountry: 'SS',
  },
  telephone: '+211926133777',
  email: 'info@ekss.org',
  sameAs: [
    'https://www.facebook.com/empowerkidssouthsudan',
    'https://www.linkedin.com/company/empowerkids-south-sudan/',
    'https://x.com/empowerkidsss',
    'https://www.tiktok.com/@empower.farmers.s',
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL('https://ekss.org'),
  title: {
    default: 'EmpowerKids–South Sudan | Verified Results for Children & Communities',
    template: '%s | EmpowerKids–South Sudan',
  },
  description:
    'EmpowerKids–South Sudan works in education, conservation agriculture, youth empowerment and civic engagement in Juba, Central Equatoria. Registered NGO, CAF America validated.',
  openGraph: {
    type: 'website',
    url: 'https://ekss.org',
    title: 'EmpowerKids–South Sudan | Verified Results for Children & Communities',
    description:
      'We train, we teach, we plant — and we count every result. Education, agriculture, youth empowerment and civic engagement.',
    siteName: 'EmpowerKids–South Sudan',
    images: [
      {
        url: 'https://ekss.org/images/eksslogo.png',
        width: 1200,
        height: 630,
        alt: 'EmpowerKids–South Sudan',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EmpowerKids–South Sudan | Verified Results for Children & Communities',
    description:
      'We train, we teach, we plant — and we count every result.',
    images: ['https://ekss.org/images/eksslogo.png'],
  },
  icons: {
    icon: '/images/eksslogo.png',
    apple: '/images/eksslogo.png',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0B3D2E',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-800 antialiased">
        {/* Organization structured data – appears on every page */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
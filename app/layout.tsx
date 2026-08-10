import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'EmpowerKids-South Sudan | Verified Results for Children & Communities',
  description: 'We train, we teach, we plant — and we count every result.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,500&family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-white text-gray-800 antialiased">{children}</body>
    </html>
  )
}
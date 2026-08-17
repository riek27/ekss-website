import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Force www (primary domain)
      {
        source: '/((?!www).*)',
        has: [{ type: 'host', value: 'ekss.org' }],
        destination: 'https://www.ekss.org/:path*',
        permanent: true,
      },

      // Old URLs → new pages (no /programs)
      { source: '/about-us-empowerkids-south-sudan', destination: 'https://www.ekss.org/about', permanent: true },
      { source: '/index.html', destination: 'https://www.ekss.org/', permanent: true },
      { source: '/home.html', destination: 'https://www.ekss.org/', permanent: true },
      { source: '/education.html', destination: 'https://www.ekss.org/education', permanent: true },
      { source: '/efss.html', destination: 'https://www.ekss.org/empower-farmers', permanent: true },
      { source: '/empower-farmers.html', destination: 'https://www.ekss.org/empower-farmers', permanent: true },
      { source: '/youth.html', destination: 'https://www.ekss.org/youth', permanent: true },
      { source: '/advocacy.html', destination: 'https://www.ekss.org/advocacy', permanent: true },
      { source: '/about.html', destination: 'https://www.ekss.org/about', permanent: true },
      { source: '/news.html', destination: 'https://www.ekss.org/news', permanent: true },
      { source: '/resources.html', destination: 'https://www.ekss.org/resources', permanent: true },
      { source: '/get-involved.html', destination: 'https://www.ekss.org/get-involved', permanent: true },
      { source: '/contact.html', destination: 'https://www.ekss.org/contact', permanent: true },
    ]
  },
}

export default nextConfig
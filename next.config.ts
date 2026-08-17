import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Specific old URLs → new pages
      { source: '/about-us-empowerkids-south-sudan', destination: '/about', permanent: true },
      { source: '/index.html', destination: '/', permanent: true },
      { source: '/home.html', destination: '/', permanent: true },
      { source: '/education.html', destination: '/education', permanent: true },
      { source: '/efss.html', destination: '/empower-farmers', permanent: true },
      { source: '/empower-farmers.html', destination: '/empower-farmers', permanent: true },
      { source: '/youth.html', destination: '/youth', permanent: true },
      { source: '/advocacy.html', destination: '/advocacy', permanent: true },
      { source: '/about.html', destination: '/about', permanent: true },
      { source: '/programs.html', destination: '/programs', permanent: true },
      { source: '/programmes.html', destination: '/programs', permanent: true },
      { source: '/news.html', destination: '/news', permanent: true },
      { source: '/resources.html', destination: '/resources', permanent: true },
      { source: '/get-involved.html', destination: '/get-involved', permanent: true },
      { source: '/contact.html', destination: '/contact', permanent: true },

      // Optional: force www → non‑www (only if you want apex domain)
      // {
      //   source: '/(.*)',
      //   has: [{ type: 'host', value: 'www.ekss.org' }],
      //   destination: 'https://ekss.org/:path*',
      //   permanent: true,
      // },
    ]
  },
}

export default nextConfig
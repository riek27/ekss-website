import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Known old URLs that might still be indexed
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

      // Known malformed slugs (placeholders – replace with actual ones from client if known)
      { source: '/aboutus-empowerkids', destination: '/about', permanent: true },
      { source: '/empower-kids-south-sudan', destination: '/', permanent: true },
      { source: '/ekks-about', destination: '/about', permanent: true },
      { source: '/south-sudan-empowerkids', destination: '/', permanent: true },

      // Catch-all: redirect any other unknown path to home, except admin, API, and static assets
      {
        source: '/((?!admin|api|_next|images|favicon.ico|icon.png|icon-192.png|apple-icon.png|robots.txt|sitemap.xml).*)',
        destination: '/',
        permanent: false,
      },
    ]
  },
}

export default nextConfig
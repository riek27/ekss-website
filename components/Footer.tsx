import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      href: 'https://www.facebook.com/empowerkidssouthsudan',
      label: 'Facebook',
      icon: (
        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
    },
    {
      href: 'https://www.linkedin.com/company/empowerkids-south-sudan/',
      label: 'LinkedIn',
      icon: (
        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
    },
    {
      href: 'https://x.com/empowerkidsss',
      label: 'X (Twitter)',
      icon: (
        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      ),
    },
    {
      href: 'https://www.tiktok.com/@empower.farmers.s',
      label: 'TikTok',
      icon: (
        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
        </svg>
      ),
    },
  ];

  return (
    <footer className="bg-footer-dark text-white pt-20 pb-10 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-warm-gold to-transparent opacity-40"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-warm-gold rounded-full flex items-center justify-center flex-shrink-0 shadow-lg shadow-warm-gold/20">
                <span className="text-white font-display font-bold text-lg">EK</span>
              </div>
              <div>
                <span className="font-display font-semibold text-white text-base leading-tight block">EmpowerKids–South Sudan</span>
                <span className="text-gray-400 text-xs tracking-wide">Non‑Governmental Organisation</span>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-sm">
              Building a brighter future for kids. Registered with the Relief and Rehabilitation Commission under the NGO Act 2016.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon w-9 h-9 bg-white/10 hover:bg-[#1877F2] rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Programmes */}
          <div className="lg:col-span-2">
            <h4 className="font-display font-bold text-white text-lg mb-5 relative inline-block after:content-[''] after:absolute after:left-0 after:bottom-[-6px] after:w-8 after:h-0.5 after:bg-warm-gold">
              Programmes
            </h4>
            <ul className="space-y-3">
              <li><Link href="/education" className="footer-link text-gray-400 hover:text-warm-gold text-sm">Education Support</Link></li>
              <li><Link href="/empower-farmers" className="footer-link text-gray-400 hover:text-warm-gold text-sm">Conservation Agriculture Programme</Link></li>
              <li><Link href="/youth" className="footer-link text-gray-400 hover:text-warm-gold text-sm">Youth Empowerment</Link></li>
              <li><Link href="/advocacy" className="footer-link text-gray-400 hover:text-warm-gold text-sm">Advocacy & Civic Engagement</Link></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="font-display font-bold text-white text-lg mb-5 relative inline-block after:content-[''] after:absolute after:left-0 after:bottom-[-6px] after:w-8 after:h-0.5 after:bg-warm-gold">
              Quick Links
            </h4>
            <ul className="space-y-3">
              <li><Link href="/" className="footer-link text-gray-400 hover:text-warm-gold text-sm">Home</Link></li>
              <li><Link href="/about" className="footer-link text-gray-400 hover:text-warm-gold text-sm">About</Link></li>
              <li><Link href="/resources" className="footer-link text-gray-400 hover:text-warm-gold text-sm">Resources</Link></li>
              <li><Link href="/news" className="footer-link text-gray-400 hover:text-warm-gold text-sm">News</Link></li>
              <li><Link href="/get-involved" className="footer-link text-gray-400 hover:text-warm-gold text-sm">Get Involved</Link></li>
              <li><Link href="/contact" className="footer-link text-gray-400 hover:text-warm-gold text-sm">Contact</Link></li>
            </ul>
          </div>

          {/* Organisation */}
          <div className="lg:col-span-2">
            <h4 className="font-display font-bold text-white text-lg mb-5 relative inline-block after:content-[''] after:absolute after:left-0 after:bottom-[-6px] after:w-8 after:h-0.5 after:bg-warm-gold">
              Organisation
            </h4>
            <ul className="space-y-3">
              <li><Link href="/about#impact" className="footer-link text-gray-400 hover:text-warm-gold text-sm">Results</Link></li>
              <li><Link href="/resources#documents" className="footer-link text-gray-400 hover:text-warm-gold text-sm">Governance & policies</Link></li>
              <li><Link href="/about#partners" className="footer-link text-gray-400 hover:text-warm-gold text-sm">Partners</Link></li>
              <li><Link href="/about#governance" className="footer-link text-gray-400 hover:text-warm-gold text-sm">Board & leadership</Link></li>
              <li><Link href="/news" className="footer-link text-gray-400 hover:text-warm-gold text-sm">News</Link></li>
            </ul>
          </div>

          {/* Find Us */}
          <div className="lg:col-span-2">
            <h4 className="font-display font-bold text-white text-lg mb-5 relative inline-block after:content-[''] after:absolute after:left-0 after:bottom-[-6px] after:w-8 after:h-0.5 after:bg-warm-gold">
              Find Us
            </h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 text-warm-gold flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/></svg>
                <span>Gudele West, Block 4, Plot 477<br />Luri Payam, Juba County<br />Central Equatoria State, South Sudan</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 text-warm-gold flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                <a href="mailto:info@ekss.org" className="hover:text-warm-gold transition-colors">info@ekss.org</a>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-4 h-4 text-warm-gold flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                <a href="tel:+211926133777" className="hover:text-warm-gold transition-colors">+211 926 133 777</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-xs text-center sm:text-left">
            &copy; {currentYear} EmpowerKids–South Sudan. All rights reserved. 
            <span className="hidden sm:inline">|</span>
            <Link href="/privacy" className="hover:text-gray-300 transition-colors">Privacy Policy</Link>
...
<Link href="/terms" className="hover:text-gray-300 transition-colors">Terms of Service</Link>
          </p>
          <p className="text-gray-600 text-xs flex items-center gap-2">
            <span>RRC Reg. No. 169</span>
            <span className="w-1 h-1 bg-gray-600 rounded-full hidden sm:inline-block"></span>
            <span>CAF America validated</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
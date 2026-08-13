'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import TopBar from './TopBar';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  // Offset nav below top bar
  useEffect(() => {
    const adjustNav = () => {
      const topBar = document.getElementById('top-bar');
      if (topBar && navRef.current) {
        const topBarVisible = window.getComputedStyle(topBar).display !== 'none';
        navRef.current.style.top = topBarVisible ? `${topBar.offsetHeight}px` : '0px';
      }
    };
    adjustNav();
    window.addEventListener('resize', adjustNav);
    return () => window.removeEventListener('resize', adjustNav);
  }, []);

  // Scroll effect for glass
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Body scroll lock when mobile menu open
  useEffect(() => {
    document.body.classList.toggle('menu-open', mobileOpen);
  }, [mobileOpen]);

  // Mobile accordion logic
  useEffect(() => {
    const buttons = document.querySelectorAll('.mobile-accordion-btn');
    const handler = (e: Event) => {
      const btn = e.currentTarget as HTMLElement;
      const targetId = btn.getAttribute('data-target');
      if (!targetId) return;
      const target = document.getElementById(targetId);
      if (!target) return;
      btn.parentElement?.querySelectorAll('.mobile-accordion-content.open').forEach((el) => {
        if (el !== target) {
          el.classList.remove('open');
          (el.previousElementSibling as HTMLElement)?.classList.remove('active');
        }
      });
      const isOpen = target.classList.contains('open');
      target.classList.toggle('open', !isOpen);
      btn.classList.toggle('active', !isOpen);
    };
    buttons.forEach((btn) => btn.addEventListener('click', handler));
    return () => buttons.forEach((btn) => btn.removeEventListener('click', handler));
  }, [mobileOpen]);

  return (
    <>
      <TopBar />

      <nav
        ref={navRef}
        className={`glass-nav fixed left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'scrolled' : ''}`}
        style={{ top: '0px' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <Link href="/" className="flex items-center gap-2 flex-shrink-0">
              <img src="/images/eksslogo.jpg" alt="EmpowerKids logo" className="h-16 w-auto rounded-full object-contain" />
              <span className="font-display font-semibold text-deep-forest text-sm sm:text-base leading-tight hidden sm:block">
  EmpowerKids–South Sudan
</span>
              <span className="font-display font-semibold text-deep-forest text-sm sm:hidden">EK-SS</span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              <Link href="/" className="px-3 py-2 text-sm font-medium text-deep-forest hover:text-emerald-green transition-colors rounded-lg hover:bg-soft-bg">
                Home
              </Link>

              {/* About Dropdown */}
              <div className="relative group">
                <button className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-emerald-green transition-colors rounded-lg hover:bg-soft-bg flex items-center gap-1">
                  About <svg className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/></svg>
                </button>
                <div className="absolute top-full left-0 mt-1 w-60 bg-white rounded-2xl shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 py-2">
                  <Link href="/about" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-soft-bg hover:text-emerald-green">Our Story</Link>
                  <Link href="/about#governance" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-soft-bg hover:text-emerald-green">Board & Leadership</Link>
                  <Link href="/about#partners" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-soft-bg hover:text-emerald-green">Partners</Link>
                </div>
              </div>

              {/* Programs Dropdown */}
              <div className="relative group">
                <button className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-emerald-green transition-colors rounded-lg hover:bg-soft-bg flex items-center gap-1">
                  Programs <svg className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/></svg>
                </button>
                <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 py-2">
                  <Link href="/education" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-soft-bg hover:text-emerald-green">Education</Link>
                  <Link href="/empower-farmers" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-soft-bg hover:text-emerald-green">Conservation Agriculture</Link>
                  <Link href="/youth" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-soft-bg hover:text-emerald-green">Youth Empowerment</Link>
                  <Link href="/advocacy" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-soft-bg hover:text-emerald-green">Advocacy & Civic Engagement</Link>
                </div>
              </div>

              {/* Resources Dropdown */}
              <div className="relative group">
                <button className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-emerald-green transition-colors rounded-lg hover:bg-soft-bg flex items-center gap-1">
                  Resources <svg className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/></svg>
                </button>
                <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 py-2">
                  <Link href="/resources#annual-reports" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-soft-bg hover:text-emerald-green">Annual Reports</Link>
                  <Link href="/resources#programme-reports" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-soft-bg hover:text-emerald-green">Programme Reports</Link>
                  <Link href="/resources#research-assessments" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-soft-bg hover:text-emerald-green">Research & Assessments</Link>
                  <Link href="/resources#governance-legal" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-soft-bg hover:text-emerald-green">Governance & Legal</Link>
                  <Link href="/resources#policies" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-soft-bg hover:text-emerald-green">Policies & Strategic Documents</Link>
                </div>
              </div>

              <Link href="/news" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-emerald-green rounded-lg hover:bg-soft-bg">News</Link>
              <Link href="/get-involved" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-emerald-green rounded-lg hover:bg-soft-bg">Get Involved</Link>
              <Link href="/contact" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-emerald-green rounded-lg hover:bg-soft-bg">Contact</Link>
            </div>

            <div className="hidden lg:block">
              <Link href="/get-involved" className="btn-gold-pulse inline-flex items-center px-5 py-2.5 bg-warm-gold text-white font-semibold text-sm rounded-full shadow-lg hover:bg-yellow-600 transition">
                Donate
              </Link>
            </div>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-soft-bg transition-colors z-[10000] relative"
              aria-label="Toggle menu" aria-expanded={mobileOpen}
            >
              {mobileOpen ? (
                <svg className="w-6 h-6 text-deep-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
              ) : (
                <svg className="w-6 h-6 text-deep-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <div id="mobile-menu" className={`lg:hidden ${mobileOpen ? 'open' : ''}`}>
        <div className="pt-28 px-6 pb-8">
          <div className="flex flex-col gap-1">
            <Link href="/" className="mobile-link" onClick={() => setMobileOpen(false)}>Home</Link>

            <button className="mobile-accordion-btn" data-target="aboutMobile">
              About <svg className="accordion-arrow w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/></svg>
            </button>
            <div id="aboutMobile" className="mobile-accordion-content">
              <Link href="/about" className="mobile-link-sub" onClick={() => setMobileOpen(false)}>Our Story</Link>
              <Link href="/about#governance" className="mobile-link-sub" onClick={() => setMobileOpen(false)}>Board & Leadership</Link>
              <Link href="/about#partners" className="mobile-link-sub" onClick={() => setMobileOpen(false)}>Partners</Link>
            </div>

            <button className="mobile-accordion-btn" data-target="programsMobile">
              Programs <svg className="accordion-arrow w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/></svg>
            </button>
            <div id="programsMobile" className="mobile-accordion-content">
              <Link href="/education" className="mobile-link-sub" onClick={() => setMobileOpen(false)}>Education</Link>
              <Link href="/empower-farmers" className="mobile-link-sub" onClick={() => setMobileOpen(false)}>Conservation Agriculture</Link>
              <Link href="/youth" className="mobile-link-sub" onClick={() => setMobileOpen(false)}>Youth Empowerment</Link>
              <Link href="/advocacy" className="mobile-link-sub" onClick={() => setMobileOpen(false)}>Advocacy & Civic Engagement</Link>
            </div>

            <button className="mobile-accordion-btn" data-target="resourcesMobile">
              Resources <svg className="accordion-arrow w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/></svg>
            </button>
            <div id="resourcesMobile" className="mobile-accordion-content">
              <Link href="/resources#annual-reports" className="mobile-link-sub" onClick={() => setMobileOpen(false)}>Annual Reports</Link>
              <Link href="/resources#programme-reports" className="mobile-link-sub" onClick={() => setMobileOpen(false)}>Programme Reports</Link>
              <Link href="/resources#research-assessments" className="mobile-link-sub" onClick={() => setMobileOpen(false)}>Research & Assessments</Link>
              <Link href="/resources#governance-legal" className="mobile-link-sub" onClick={() => setMobileOpen(false)}>Governance & Legal</Link>
              <Link href="/resources#policies" className="mobile-link-sub" onClick={() => setMobileOpen(false)}>Policies & Strategic Documents</Link>
            </div>

            <Link href="/news" className="mobile-link" onClick={() => setMobileOpen(false)}>News</Link>
            <Link href="/get-involved" className="mobile-link" onClick={() => setMobileOpen(false)}>Get Involved</Link>
            <Link href="/contact" className="mobile-link" onClick={() => setMobileOpen(false)}>Contact</Link>
          </div>
          <div className="mt-6">
            <Link href="/get-involved" className="btn-gold-pulse block text-center px-5 py-3 bg-warm-gold text-white font-semibold rounded-full" onClick={() => setMobileOpen(false)}>
              Donate
            </Link>
          </div>
        </div>
      </div>
      <div id="mobile-overlay" className={`${mobileOpen ? 'visible' : ''}`} onClick={() => setMobileOpen(false)}></div>
    </>
  );
}
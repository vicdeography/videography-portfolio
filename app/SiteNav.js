'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { categories } from './categories';
import wordmarkImage from '../public/name-wordmark-light.png';

export default function SiteNav() {
  const navRef = useRef(null);
  // The page being viewed: 'home' for /, otherwise the first part of the path (a category slug or 'about').
  const pathname = usePathname();
  const activeKey = pathname.split('/')[1] || 'home';
  // The subtabs grouped under "Services" in the desktop menu.
  const onServicePage = categories.some((category) => category.slug === activeKey);
  const router = useRouter();
  const [hoverKey, setHoverKey] = useState(null);
  // A hover underline that slides between hovered items and fades out where it is when the
  // pointer leaves the menu.
  const [line, setLine] = useState({ x: 0, y: 0, width: 0, visible: false, slide: false });
  const visibleRef = useRef(false);
  // Phones show a menu button instead of the row of links; this is whether its dropdown is open.
  const [menuOpen, setMenuOpen] = useState(false);
  // Whether the Services dropdown was opened by a tap or click (hovering opens it without this),
  // and whether the Services group in the phone menu is expanded.
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(onServicePage);
  const headerRef = useRef(null);
  // If the logo image ever fails to load, show the name as text instead of a broken-image box.
  const [wordmarkFailed, setWordmarkFailed] = useState(false);

  const measure = useCallback((key) => {
    const nav = navRef.current;
    const link = nav?.querySelector(`[data-nav-key="${key}"]`);
    if (!link) return null;
    const navBox = nav.getBoundingClientRect();
    const box = link.getBoundingClientRect();
    return { x: box.left - navBox.left, y: box.bottom - navBox.top - 1, width: box.width };
  }, []);

  useEffect(() => {
    if (!hoverKey) {
      visibleRef.current = false;
      setLine((previous) => ({ ...previous, visible: false }));
      return;
    }
    const box = measure(hoverKey);
    if (!box) return;
    // Slide only when moving between items; appearing from nothing happens in place.
    setLine({ ...box, visible: true, slide: visibleRef.current });
    visibleRef.current = true;
  }, [hoverKey, measure]);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const onKey = (event) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    const onPointer = (event) => {
      if (!headerRef.current?.contains(event.target)) setMenuOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointer);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPointer);
    };
  }, [menuOpen]);

  // Load every page ahead of time. Links are normally preloaded when they scroll into view, which
  // never happens for the phone menu's links while it is closed, so a tap there had to wait for
  // the page to download.
  useEffect(() => {
    ['/', ...categories.map((c) => `/${c.slug}`), '/about'].forEach((href) => router.prefetch(href));
  }, [router]);

  // Close the phone menu once the new page is showing, rather than on tap, so the old page is never
  // briefly uncovered while the new one loads.
  useEffect(() => {
    setMenuOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  // A tapped-open Services dropdown closes on a tap elsewhere or the Escape key.
  useEffect(() => {
    if (!servicesOpen) return undefined;
    const onKey = (event) => {
      if (event.key === 'Escape') setServicesOpen(false);
    };
    const onPointer = (event) => {
      if (!event.target.closest?.('.nav-services')) setServicesOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointer);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPointer);
    };
  }, [servicesOpen]);

  useEffect(() => {
    const onResize = () => setLine((previous) => ({ ...previous, visible: false }));
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const item = (key, href, label) => (
    <Link
      href={href}
      data-nav-key={key}
      className={activeKey === key ? 'active' : undefined}
      onMouseEnter={() => setHoverKey(key)}
      onFocus={() => setHoverKey(key)}
      onBlur={() => setHoverKey(null)}
    >
      {label}
    </Link>
  );

  const mobileLink = (key, href, label) => (
    <Link
      key={key}
      href={href}
      className={activeKey === key ? 'active' : undefined}
      onClick={() => {
        if (key === activeKey) setMenuOpen(false);
      }}
    >
      {label}
    </Link>
  );

  return (
    <header ref={headerRef} className="site-header">
      <button
        type="button"
        className={`menu-button${menuOpen ? ' open' : ''}`}
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={menuOpen}
        aria-controls="mobile-menu"
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span />
        <span />
        <span />
      </button>
      <Link href="/" className="brand" aria-label="Victor Pereira-Leite, home">
        {/* Bundled with the site's own static files (like its CSS and scripts) and served as-is rather
            than through Vercel's image resizer. */}
        {wordmarkFailed ? (
          <span className="wordmark-text">Victor Pereira-Leite</span>
        ) : (
          <Image
            className="wordmark"
            src={wordmarkImage}
            alt="Victor Pereira-Leite"
            priority
            unoptimized
            onError={() => setWordmarkFailed(true)}
          />
        )}
        <span className="tagline">Cinematography - Videography</span>
      </Link>
      <nav
        ref={navRef}
        className={`site-nav${hoverKey ? ' is-hovering' : ''}`}
        aria-label="Site"
        onMouseLeave={() => setHoverKey(null)}
      >
        {item('home', '/', 'Home')}
        {/* "Services" opens a dropdown of the video subtabs on hover, keyboard focus, or a tap
            (touch screens have no hover). */}
        <div
          className={`nav-services${servicesOpen ? ' open' : ''}`}
          onMouseEnter={() => setHoverKey('services')}
          // Only a real mouse leaving closes it: touch screens send a stray "leave" right after a tap.
          onPointerLeave={(event) => {
            if (event.pointerType === 'mouse') setServicesOpen(false);
          }}
        >
          <button
            type="button"
            data-nav-key="services"
            className={`nav-services-label${onServicePage ? ' active' : ''}`}
            aria-haspopup="true"
            aria-expanded={servicesOpen}
            onClick={() => setServicesOpen((open) => !open)}
            onFocus={() => setHoverKey('services')}
            onBlur={() => setHoverKey(null)}
          >
            Services
          </button>
          <div className="nav-dropdown">
            <div className="nav-dropdown-list">
              {categories.map((category) => (
                <Link
                  key={category.slug}
                  href={`/${category.slug}`}
                  className={activeKey === category.slug ? 'active' : undefined}
                >
                  {category.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
        {item('about', '/about', 'About Me')}
        <span
          className={`nav-underline${line.slide ? ' slide' : ''}`}
          aria-hidden="true"
          style={{
            width: line.width,
            transform: `translate(${line.x}px, ${line.y}px)`,
            opacity: line.visible ? 1 : 0,
          }}
        />
      </nav>
      <nav id="mobile-menu" className={`mobile-menu${menuOpen ? ' open' : ''}`} aria-label="Site" hidden={!menuOpen}>
        {mobileLink('home', '/', 'Home')}
        {/* Tapping Services shows or hides the video subtabs underneath it. */}
        <button
          type="button"
          className={`mobile-services${onServicePage ? ' active' : ''}${mobileServicesOpen ? ' open' : ''}`}
          aria-expanded={mobileServicesOpen}
          aria-controls="mobile-services-list"
          onClick={() => setMobileServicesOpen((open) => !open)}
        >
          Services
          <span className="mobile-services-icon" aria-hidden="true" />
        </button>
        <div id="mobile-services-list" className="mobile-services-list" hidden={!mobileServicesOpen}>
          {categories.map((category) => mobileLink(category.slug, `/${category.slug}`, category.title))}
        </div>
        {mobileLink('about', '/about', 'About Me')}
      </nav>
    </header>
  );
}

'use client';

import { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { categories } from './categories';

// On phones the menu splits into two rows after this category.
const MOBILE_BREAK_AFTER = 'sports';

export default function SiteNav({ current }) {
  const navRef = useRef(null);
  const activeKey = current ?? 'home';
  const [hoverKey, setHoverKey] = useState(null);
  // A hover underline that slides between hovered items and fades out where it is when the
  // pointer leaves the menu.
  const [line, setLine] = useState({ x: 0, y: 0, width: 0, visible: false, slide: false });
  const visibleRef = useRef(false);

  const measure = useCallback((key) => {
    const link = navRef.current?.querySelector(`[data-nav-key="${key}"]`);
    if (!link) return null;
    return { x: link.offsetLeft, y: link.offsetTop + link.offsetHeight - 1, width: link.offsetWidth };
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

  return (
    <header className="site-header">
      <Link href="/" className="brand" aria-label="Victor Pereira-Leite, home">
        <Image className="wordmark" src="/name-wordmark-light.png" alt="Victor Pereira-Leite" width={1600} height={121} priority />
        <span className="tagline">Cinematographer - Videographer</span>
      </Link>
      <nav
        ref={navRef}
        className={`site-nav${hoverKey ? ' is-hovering' : ''}`}
        aria-label="Site"
        onMouseLeave={() => setHoverKey(null)}
      >
        {item('home', '/', 'Home')}
        {categories.map((category) => (
          <Fragment key={category.slug}>
            {item(category.slug, `/${category.slug}`, category.title)}
            {category.slug === MOBILE_BREAK_AFTER && <span className="nav-break" aria-hidden="true" />}
          </Fragment>
        ))}
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
    </header>
  );
}

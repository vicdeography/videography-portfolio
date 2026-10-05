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
  // The underline slides between items; it only animates once it has been placed the first time.
  const [line, setLine] = useState({ x: 0, y: 0, width: 0, ready: false, animate: false });

  const place = useCallback(
    (key, animate) => {
      const link = navRef.current?.querySelector(`[data-nav-key="${key}"]`);
      if (!link) return;
      setLine({
        x: link.offsetLeft,
        y: link.offsetTop + link.offsetHeight - 1,
        width: link.offsetWidth,
        ready: true,
        animate,
      });
    },
    [],
  );

  // The item the underline should sit under right now, kept in a ref for the resize handler.
  const targetRef = useRef(activeKey);
  targetRef.current = hoverKey ?? activeKey;

  useEffect(() => {
    place(targetRef.current, line.ready);
    // line.ready only matters for the very first placement.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hoverKey, activeKey, place]);

  useEffect(() => {
    const onResize = () => place(targetRef.current, false);
    window.addEventListener('resize', onResize);
    // Re-measure once web fonts have loaded, since they change the width of each item.
    document.fonts?.ready.then(onResize).catch(() => {});
    return () => window.removeEventListener('resize', onResize);
  }, [place]);

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
          className={`nav-underline${line.animate ? ' animate' : ''}`}
          aria-hidden="true"
          style={{
            width: line.width,
            transform: `translate(${line.x}px, ${line.y}px)`,
            opacity: line.ready ? 1 : 0,
          }}
        />
      </nav>
    </header>
  );
}

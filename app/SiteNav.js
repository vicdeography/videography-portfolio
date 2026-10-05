import { Fragment } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { categories } from './categories';

// On phones the menu splits into two rows after this category.
const MOBILE_BREAK_AFTER = 'sports';

export default function SiteNav({ current }) {
  return (
    <header className="site-header">
      <Link href="/" className="brand" aria-label="Victor Pereira-Leite, home">
        <Image className="wordmark" src="/name-wordmark-light.png" alt="Victor Pereira-Leite" width={1600} height={121} priority />
        <span className="tagline">Cinematographer - Videographer</span>
      </Link>
      <nav className="site-nav" aria-label="Site">
        <Link href="/" className={current ? undefined : 'active'}>Home</Link>
        {categories.map((category) => (
          <Fragment key={category.slug}>
            <Link href={`/${category.slug}`} className={current === category.slug ? 'active' : undefined}>
              {category.title}
            </Link>
            {category.slug === MOBILE_BREAK_AFTER && <span className="nav-break" aria-hidden="true" />}
          </Fragment>
        ))}
        <Link href="/about" className={current === 'about' ? 'active' : undefined}>About Me</Link>
      </nav>
    </header>
  );
}

import Image from 'next/image';
import Link from 'next/link';
import { categories } from './categories';

export default function SiteNav({ current }) {
  return (
    <header className="site-header">
      <Link href="/" className="brand" aria-label="Victor Pereira-Leite, home">
        <Image className="wordmark" src="/name-wordmark.png" alt="Victor Pereira-Leite" width={1600} height={121} priority />
        <span className="tagline">Cinematographer - Videographer</span>
      </Link>
      <nav className="site-nav" aria-label="Site">
        <Link href="/" className={current ? undefined : 'active'}>Home</Link>
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/${category.slug}`}
            className={current === category.slug ? 'active' : undefined}
          >
            {category.title}
          </Link>
        ))}
        <Link href="/about" className={current === 'about' ? 'active' : undefined}>About Me</Link>
      </nav>
    </header>
  );
}

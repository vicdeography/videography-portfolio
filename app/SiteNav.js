import Image from 'next/image';
import Link from 'next/link';
import { categories } from './categories';

export default function SiteNav({ current }) {
  return (
    <header className="site-header">
      <Link href="/" className="wordmark-link" aria-label="Vicdeography home">
        <Image className="wordmark" src="/wordmark.png" alt="Vicdeography" width={1400} height={144} priority />
      </Link>
      <nav className="site-nav" aria-label="Work categories">
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
        <Link href="/#about">About Me</Link>
      </nav>
    </header>
  );
}

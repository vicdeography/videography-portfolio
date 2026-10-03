import Link from 'next/link';
import { categories } from './categories';

export default function SiteNav({ current }) {
  return (
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
  );
}

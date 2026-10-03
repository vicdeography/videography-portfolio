import Link from 'next/link';
import { notFound } from 'next/navigation';
import SiteNav from '../SiteNav';
import { categories, getCategory } from '../categories';

export const dynamicParams = false;

export function generateStaticParams() {
  return categories.map((category) => ({ category: category.slug }));
}

export function generateMetadata({ params }) {
  const category = getCategory(params.category);
  return { title: `${category.title} | Vic Deography` };
}

export default function CategoryPage({ params }) {
  const category = getCategory(params.category);
  if (!category) notFound();

  const projects = [1, 2, 3, 4];

  return (
    <main className="page-shell">
      <p className="credit">A Project by Victor Pereira-Leite</p>
      <SiteNav current={category.slug} />

      <section className="category-header">
        <p className="eyebrow">Work</p>
        <h2>{category.title}</h2>
        <p className="lede">{category.blurb}</p>
      </section>

      <section className="reel-block">
        <div className="hero-panel">
          <div className="placeholder-box">{category.title} reel</div>
        </div>
      </section>

      <section className="content-block">
        <p className="eyebrow">Projects</p>
        <div className="project-grid">
          {projects.map((number) => (
            <article key={number} className="card">
              <div className="card-image">{number}</div>
              <h3>Project title</h3>
            </article>
          ))}
        </div>
      </section>

      <p className="back-link">
        <Link href="/">&larr; Back to home</Link>
      </p>
    </main>
  );
}

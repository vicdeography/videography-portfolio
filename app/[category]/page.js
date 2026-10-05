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
    <main className="dark-layout">
      <div className="page-shell header-shell">
        <SiteNav current={category.slug} />
      </div>

      <div className="dark-page">
        <div className="page-shell">
          <section className="category-header">
            <h2>{category.title}</h2>
          </section>

          <section className="content-block projects-block">
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
        </div>
      </div>
    </main>
  );
}

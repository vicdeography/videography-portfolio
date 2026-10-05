import Link from 'next/link';
import { notFound } from 'next/navigation';
import SiteNav from '../SiteNav';
import { categories, getCategory } from '../categories';
import { getProjects } from '../projects';
import ProjectVideo from '../ProjectVideo';
import Reveal from '../Reveal';

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

  const projects = getProjects(category.slug);

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
            <div className="project-list">
              {projects.map((project, index) => (
                <Reveal as="article" key={index} className="project-row">
                  {project.video ? (
                    <ProjectVideo src={project.video} poster={project.poster} title={project.title} />
                  ) : (
                    <div className="project-media" aria-hidden="true" />
                  )}
                  <div className="project-text">
                    {project.placeholder ? (
                      <>
                        <h3>Project Title</h3>
                        <p>
                          Placeholder description for this project. It will briefly cover what the
                          project was, who it was made for and the idea behind it. A sentence or two
                          can note the role played, the gear used or how it was shot. This text
                          will be replaced with the real description.
                        </p>
                      </>
                    ) : (
                      <>
                        {project.title && <h3>{project.title}</h3>}
                        {project.description && <p>{project.description}</p>}
                      </>
                    )}
                  </div>
                </Reveal>
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

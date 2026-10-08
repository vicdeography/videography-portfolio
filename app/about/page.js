
export const metadata = { title: 'About Me | Vic Deography' };

export default function AboutPage() {
  return (
    <main className="dark-layout">
      <div className="dark-page">
        <div className="page-shell">
          <section className="category-header">
            <p className="eyebrow">About</p>
            <h2>About Me</h2>
          </section>

          <section className="about-body">
            <p>
              This is a simple rough draft of the portfolio site. The goal is to get a working page
              live, then refine it visually in future iterations.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}

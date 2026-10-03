import SiteNav from './SiteNav';

export default function HomePage() {
  return (
    <main className="page-shell">
      <SiteNav />

      <section className="reel-block">
        <div className="hero-panel">
          <div className="placeholder-box">Preview reel</div>
        </div>
        <p className="credit">A Project by Victor Pereira-Leite</p>
      </section>

      <section id="about" className="content-block">
        <p className="eyebrow">About</p>
        <p>
          This is a simple rough draft of the portfolio site. The goal is to get a working page live,
          then refine it visually in future iterations.
        </p>
      </section>

      <section id="contact" className="content-block">
        <p className="eyebrow">Contact</p>
        <div className="contact-box">
          <p>Email</p>
          <a href="mailto:hello@vicdeography.com">hello@vicdeography.com</a>
        </div>
      </section>
    </main>
  );
}

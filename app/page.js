import SiteNav from './SiteNav';

// Direct link to the demo reel video file (MP4). Leave empty to show the placeholder.
const REEL_URL = '';

export default function HomePage() {
  return (
    <main>
      <div className="page-shell header-shell">
        <SiteNav />
      </div>

      <section className="demo-reel">
        {REEL_URL ? (
          <video className="reel-video" src={REEL_URL} autoPlay muted loop playsInline preload="auto" />
        ) : (
          <div className="placeholder-box">Preview reel</div>
        )}
      </section>

      <div className="page-shell">
        <p className="credit reel-credit">A Project by Victor Pereira-Leite</p>

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
      </div>
    </main>
  );
}

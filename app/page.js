import SiteNav from './SiteNav';

// Direct link to the demo reel video file (H.264, MP4 or MOV). Leave empty to show the placeholder.
const REEL_URL = 'https://yruexne8z4cwufst.public.blob.vercel-storage.com/Main%20Reel.mov';

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

        <section id="contact" className="content-block contact-block">
          <p className="eyebrow">Contact</p>
          <div className="contact-grid">
            <div className="contact-box">
              <p>Email</p>
              <a href="mailto:hello@vicdeography.com">hello@vicdeography.com</a>
            </div>
            <div className="contact-box">
              <p>Phone</p>
              <a href="tel:+15555555555">(555) 555-5555</a>
            </div>
            <div className="contact-box">
              <p>Instagram</p>
              <a href="https://instagram.com/vicdeography">@vicdeography</a>
            </div>
            <div className="contact-box">
              <p>Based in</p>
              <span>City, State</span>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

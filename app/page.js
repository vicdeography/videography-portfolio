import Link from 'next/link';
import ReelVideo from './ReelVideo';
import SiteNav from './SiteNav';

// The demo reel: a 1080p H.264 MP4 with its index at the front ("fast start") so it can begin
// playing before it has fully downloaded, plus its first frame to show while it loads.
// Leave REEL_URL empty to show the placeholder.
const REEL_URL = '/reel/reel-1080.mp4';
const REEL_POSTER = '/reel/reel-poster.jpg';

export default function HomePage() {
  return (
    <main>
      <div className="page-shell header-shell">
        <SiteNav />
      </div>

      <section className="demo-reel">
        {REEL_URL ? (
          <ReelVideo src={REEL_URL} poster={REEL_POSTER} />
        ) : (
          <div className="placeholder-box">Preview reel</div>
        )}
      </section>

      <div className="page-shell">
        <p className="credit reel-credit">A Project by Victor Pereira-Leite</p>

        <section id="contact" className="content-block contact-block">
          <div className="intro-grid">
            <div>
              <p className="eyebrow">Contact</p>
              <div className="contact-list">
                <div className="contact-box">
                  <p>Email</p>
                  <a href="mailto:vicdeography1@gmail.com">vicdeography1@gmail.com</a>
                </div>
                <div className="contact-box">
                  <p>Phone</p>
                  <a href="tel:+15044507511">(504) 450-7511</a>
                </div>
                <div className="contact-box">
                  <p className="with-icon">
                    <InstagramIcon />
                    Instagram
                  </p>
                  <a href="https://instagram.com/vicdeography">@vicdeography</a>
                </div>
                <div className="contact-box">
                  <p>Based in</p>
                  <span>Chicago, IL</span>
                </div>
              </div>
            </div>

            <div className="about-teaser">
              <div className="portrait-placeholder">Photo</div>
              <p>
                I&rsquo;m Victor Pereira-Leite, a cinematographer and videographer based in Chicago. I
                shoot brand videos, sports and short films, with a focus on honest storytelling and
                strong visual rhythm. For more details, visit <Link href="/about">About Me</Link>.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function InstagramIcon() {
  return (
    <svg className="icon" viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
    </svg>
  );
}

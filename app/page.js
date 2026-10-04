import Link from 'next/link';
import ReelVideo from './ReelVideo';
import SiteNav from './SiteNav';

// Direct link to the demo reel video file (H.264, MP4 or MOV). Leave empty to show the placeholder.
const REEL_URL = 'https://yruexne8z4cwufst.public.blob.vercel-storage.com/4k%20Reel%20h264.mov';

export default function HomePage() {
  return (
    <main>
      <div className="page-shell header-shell">
        <SiteNav />
      </div>

      <section className="demo-reel">
        {REEL_URL ? (
          <ReelVideo src={REEL_URL} />
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

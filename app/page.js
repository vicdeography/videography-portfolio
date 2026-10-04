import Link from 'next/link';
import ContactForm from './ContactForm';
import ReelVideo from './ReelVideo';
import SiteNav from './SiteNav';

// The demo reel: a 1080p H.264 MP4 with its index at the front ("fast start") so it can begin
// playing before it has fully downloaded, plus its first frame to show while it loads.
// Leave REEL_URL empty to show the placeholder.
const REEL_URL = '/reel/reel-1080.mp4';
const REEL_POSTER = '/reel/reel-poster.jpg';

export default function HomePage() {
  return (
    <main className="dark-layout">
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

      <div className="dark-page">
        <div className="page-shell">
          <section id="contact" className="contact-bar">
            <h2 className="contact-heading">Contact Information</h2>
            <div className="contact-row">
              <div className="contact-box">
                <p>Email</p>
                <a href="mailto:vicdeography1@gmail.com">
                  vicdeography1<wbr />@gmail.com
                </a>
              </div>
              <div className="contact-box">
                <p>Phone</p>
                <a href="tel:+15044507511">(504) 450-7511</a>
              </div>
              <div className="contact-box">
                <p>Instagram</p>
                <a href="https://instagram.com/vicdeography">@vicdeography</a>
              </div>
              <div className="contact-box">
                <p>Based in</p>
                <span>Chicago, IL</span>
              </div>
            </div>
          </section>

          <section className="content-block about-section">
            <div className="intro-grid">
              <div className="about-teaser">
                <div className="portrait-placeholder">Photo</div>
                <p>
                  I&rsquo;m Victor Pereira-Leite, a cinematographer and videographer based in Chicago. I
                  shoot brand videos, sports and short films, with a focus on honest storytelling and
                  strong visual rhythm. For more details, visit <Link href="/about">About Me</Link>.
                </p>
              </div>

              <div className="get-in-touch">
                <h2 className="contact-heading">Get in Touch</h2>
                <ContactForm />
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

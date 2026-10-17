import Link from 'next/link';
import ContactForm from './ContactForm';
import ReelVideo from './ReelVideo';
import Reveal from './Reveal';
import portraitImage from '../public/about/portrait.jpg';
import reelPoster from '../public/reel/reel-poster.jpg';
import reelVideo from '../public/reel/reel-1080.mp4';

// The demo reel: a 1080p H.264 MP4 with its index at the front ("fast start") so it can begin
// playing before it has fully downloaded, plus its first frame to show while it loads.
// Leave REEL_URL empty to show the placeholder.
const REEL_URL = reelVideo;
const REEL_POSTER = reelPoster.src;

// Tells search engines who the site belongs to, so it can show up when someone searches the name.
const STRUCTURED_DATA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      name: 'Vicdeography',
      alternateName: 'Victor Pereira-Leite',
      url: 'https://www.vicdeography.com/',
    },
    {
      '@type': 'Person',
      name: 'Victor Pereira-Leite',
      jobTitle: 'Videographer and Cinematographer',
      url: 'https://www.vicdeography.com/',
      address: { '@type': 'PostalAddress', addressLocality: 'Chicago', addressRegion: 'IL' },
      sameAs: [
        'https://www.instagram.com/vicdeography/',
        'https://www.linkedin.com/in/victor-pereira-leite-8055542a4/',
      ],
    },
  ],
};

export default function HomePage() {
  return (
    <main className="dark-layout">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(STRUCTURED_DATA) }} />
      <section className="demo-reel">
        {REEL_URL ? (
          <ReelVideo src={REEL_URL} poster={REEL_POSTER} />
        ) : (
          <div className="placeholder-box">Preview reel</div>
        )}
      </section>

      <div className="dark-page">
        <div className="page-shell">
          <Reveal as="section" id="contact" className="contact-bar">
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
                <a href="https://www.instagram.com/vicdeography/" target="_blank" rel="noopener noreferrer">
                  @vicdeography
                </a>
              </div>
              <div className="contact-box">
                <p>LinkedIn</p>
                <a
                  href="https://www.linkedin.com/in/victor-pereira-leite-8055542a4/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Victor Pereira-Leite
                </a>
              </div>
              <div className="contact-box">
                <p>Based in</p>
                <span>Rogers Park - Chicago, IL</span>
              </div>
            </div>
          </Reveal>

          <section className="content-block about-section">
            <div className="intro-grid">
              <Reveal className="get-in-touch">
                <h2 className="contact-heading">Get in Touch</h2>
                <ContactForm />
              </Reveal>

              <Reveal className="about-teaser">
                <img className="about-portrait" src={portraitImage.src} alt="Victor Pereira-Leite" />
                <p>
                  My name is Victor Pereira-Leite, and I am a videographer and cinematographer based in
                  Rogers Park, Chicago. I have been making videos for over fifteen years and can produce
                  brand videos, sporting events, live events, short films, documentaries, and more. For
                  more information, visit <Link href="/about">About Me</Link>.
                </p>
              </Reveal>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

'use client';

import { useEffect, useRef, useState } from 'react';

const featuredWork = [
  {
    title: 'Sports',
    label: 'High-energy action',
    accent: '01',
    category: 'sports',
  },
  {
    title: 'Promotional',
    label: 'Brand stories',
    accent: '02',
    category: 'promotional',
  },
  {
    title: 'Short Film',
    label: 'Narrative direction',
    accent: '03',
    category: 'short-film',
  },
  {
    title: 'Miscellaneous',
    label: 'Creative experiments',
    accent: '04',
    category: 'miscellaneous',
  },
];

const quotes = [
  '"We needed someone who could make everything feel cinematic without forcing it."',
  '"Every frame felt intentional — from the pacing to the emotion."',
  '"The final edit didn\'t just capture the moment; it elevated it."',
];

const brands = ['AER', 'MONARCH', 'NEXUS', 'KOVA', 'LUNE', 'MIRAGE'];

export default function HomePage() {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.15 }
    );

    const elements = document.querySelectorAll('.reveal');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const handleFullscreen = async () => {
    if (!videoRef.current) return;

    if (!document.fullscreenElement) {
      await videoRef.current.requestFullscreen();
    } else {
      await document.exitFullscreen();
    }
  };

  return (
    <main className="page-shell">
      <header className="topbar reveal">
        <div className="brand-block">
          <div className="brand-mark">V</div>
          <div>
            <p className="eyebrow">VIDEOGRAPHY</p>
            <h1>VIC DEOGRAPHY</h1>
          </div>
        </div>

        <nav className="main-nav" aria-label="Main navigation">
          <a href="#work">Work</a>
          <a href="#about">About</a>
          <a href="#clients">Clients</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <section className="hero reveal">
        <div className="hero-copy">
          <p className="eyebrow">CINEMATOGRAPHY / EDITING / STORY</p>
          <h2>Crafting visuals that move people.</h2>
          <p className="lede">
            Documentary-led, cinematic storytelling for sport, brand, and culture.
          </p>
          <div className="hero-actions">
            <a href="#work" className="button primary">View work</a>
            <a href="#contact" className="button secondary">Get in touch</a>
          </div>
        </div>

        <div className="hero-visual">
          <div className="logo-panel">
            <div className="logo-orb" aria-label="Animated placeholder logo" />
            <span>Animated Logo</span>
          </div>
          <div
            className="showreel-panel"
            onClick={() => setSelectedVideo({ title: 'Showreel', type: 'showreel' })}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && setSelectedVideo({ title: 'Showreel', type: 'showreel' })}
          >
            <div className="play-badge">▶</div>
            <div className="showreel-meta">
              <p>Showreel</p>
              <strong>00:30</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="quote-strip reveal" aria-label="Client quotes">
        {quotes.map((quote) => (
          <blockquote key={quote}>{quote}</blockquote>
        ))}
      </section>

      <section id="work" className="work-section reveal">
        <div className="section-heading">
          <p className="eyebrow">Selected work</p>
          <h3>Stories shaped through motion.</h3>
        </div>

        <div className="work-grid">
          {featuredWork.map((item) => (
            <article
              key={item.title}
              className="portfolio-card"
              onClick={() => setSelectedVideo(item)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && setSelectedVideo(item)}
            >
              <div className="video-thumb" aria-label={`${item.title} thumbnail`}>
                <span className="video-number">{item.accent}</span>
                <div className="play-circle">▶</div>
              </div>
              <div className="card-copy">
                <p>{item.label}</p>
                <h4>{item.title}</h4>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="about" className="about-section reveal">
        <div className="about-image">
          <div className="portrait-placeholder">
            <span>Portrait</span>
          </div>
        </div>

        <div className="about-copy">
          <p className="eyebrow">About me</p>
          <h3>Calm direction, honest storytelling, and a sharp eye for detail.</h3>
          <p>
            I'm a videographer and cinematographer focused on creating work that feels immersive,
            grounded, and emotionally resonant. My approach blends clean composition with natural movement,
            so every frame carries intention.
          </p>
          <p>
            From fast-paced sports coverage to brand storytelling and intimate narrative work, I build
            visual experiences that feel premium, human, and distinctly yours.
          </p>
        </div>
      </section>

      <section id="clients" className="clients-section reveal">
        <div className="section-heading narrow">
          <p className="eyebrow">Collaborations</p>
          <h3>Trusted by ambitious teams and brands.</h3>
        </div>

        <div className="brand-grid" aria-label="Brand partners">
          {brands.map((brand) => (
            <div key={brand} className="brand-pill">{brand}</div>
          ))}
        </div>
      </section>

      <section id="contact" className="contact-section reveal">
        <div className="section-heading narrow">
          <p className="eyebrow">Contact</p>
          <h3>Let's build something memorable.</h3>
        </div>

        <div className="contact-panel">
          <div>
            <p>Email</p>
            <a href="mailto:hello@vicdeography.com">hello@vicdeography.com</a>
          </div>
          <div>
            <p>Instagram</p>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">@vicdeography</a>
          </div>
          <div>
            <p>Location</p>
            <span>Available worldwide</span>
          </div>
        </div>
      </section>

      {selectedVideo && (
        <div className="video-modal" aria-modal="true" role="dialog">
          <div className="modal-backdrop" onClick={() => setSelectedVideo(null)} />
          <div className="modal-card" ref={videoRef}>
            <button className="close-button" onClick={() => setSelectedVideo(null)} aria-label="Close video">
              ×
            </button>

            <div className="modal-video-placeholder">
              <div className="modal-video-frame">
                <div className="play-circle large">▶</div>
                <p>{selectedVideo.title}</p>
                <span>Video preview placeholder</span>
              </div>
            </div>

            <div className="modal-controls">
              <div>
                <p className="eyebrow">Preview</p>
                <h4>{selectedVideo.title}</h4>
              </div>
              <button className="button secondary" onClick={handleFullscreen}>
                {isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

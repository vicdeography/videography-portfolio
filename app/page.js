import Image from 'next/image';
import Link from 'next/link';
import SiteNav from './SiteNav';
import { categories } from './categories';

export default function HomePage() {
  return (
    <main className="page-shell">
      <p className="credit">A Project by Victor Pereira-Leite</p>
      <SiteNav />

      <section className="reel-block">
        <div className="hero-panel">
          <div className="placeholder-box">Preview reel</div>
        </div>
        <Image className="logo" src="/logo.png" alt="Vic Deography logo" width={1200} height={575} priority />
      </section>

      <section className="hero">
        <div>
          <h2>Crafting visuals that move people.</h2>
          <p className="lede">
            Rough draft portfolio for sports, lifestyle, and brand storytelling.
          </p>
          <div className="cta-row">
            <a className="button primary" href="#work">View work</a>
            <a className="button secondary" href="#contact">Contact</a>
          </div>
        </div>
      </section>

      <section id="work" className="content-block">
        <p className="eyebrow">Selected work</p>
        <div className="card-grid">
          {categories.map((category, index) => (
            <Link key={category.slug} href={`/${category.slug}`} className="card">
              <div className="card-image">{index + 1}</div>
              <h3>{category.title}</h3>
            </Link>
          ))}
        </div>
      </section>

      <section id="about" className="content-block">
        <p className="eyebrow">About</p>
        <h3>Calm direction. Honest storytelling. Strong visual rhythm.</h3>
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

import Reveal from '../Reveal';

export const metadata = { title: 'About Me | Vic Deography' };

// Each section pairs a photo with a short block of text. The photo switches sides from one
// section to the next. Replace the placeholder titles, text and photos with the real ones.
const sections = [
  {
    title: 'Who I Am',
    text: 'Placeholder text for this section. It will introduce who I am and where I am based. A sentence or two can cover what drew me to filmmaking in the first place. It can close with what I hope people feel when they watch my work.',
  },
  {
    title: 'How I Got Started',
    text: 'Placeholder text for this section. It will tell the story of the first projects I picked up a camera for. It can mention the people, classes or moments that shaped how I shoot. A final line can bring the story up to where I am today.',
  },
  {
    title: 'My Approach',
    text: 'Placeholder text for this section. It will describe how I work with clients from the first conversation to the final cut. It can cover how I plan a shoot, how I like to light and frame a scene and how I keep things relaxed on set. It can end with what clients can expect when they work with me.',
  },
  {
    title: 'Beyond the Camera',
    text: 'Placeholder text for this section. It will share a little about life outside of filmmaking. It can mention hobbies, places I love to travel or what keeps me inspired. A closing line can invite people to reach out and say hello.',
  },
];

export default function AboutPage() {
  return (
    <main className="dark-layout">
      <div className="dark-page">
        <div className="page-shell">
          <section className="category-header">
            <h2>About Me</h2>
          </section>

          <div className="about-sections">
            {sections.map((section, index) => (
              <Reveal
                as="section"
                key={section.title}
                className={`about-row${index % 2 === 1 ? ' about-row-flipped' : ''}`}
              >
                <div className="about-photo-column">
                  <div className="portrait-placeholder">Photo</div>
                </div>
                <div className="about-text-box">
                  <h3>{section.title}</h3>
                  <p>{section.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

import Reveal from '../Reveal';

export const metadata = { title: 'About Me | Vic Deography' };

// Each section pairs a photo with a short block of text. The photo switches sides from one
// section to the next. Replace the placeholder text and photos with the real ones.
const sections = [
  {
    key: 'intro',
    text: 'Placeholder text for this section. It will introduce who I am and where I am based. A sentence or two can cover what drew me to filmmaking in the first place. It can also mention the kind of stories I enjoy telling the most. Another line can describe the feeling I chase when I am behind the camera. It can touch on the places and people that inspire my work. A sentence here can share what I value in every project I take on. A line here can mention the kinds of clients and communities I love working with. It can share how growing up shaped the way I see the world through a lens. Another sentence can explain why I believe every person and place has a story worth telling. It can close with what I hope people feel when they watch my work.',
  },
  {
    key: 'start',
    text: 'Placeholder text for this section. It will tell the story of the first projects I picked up a camera for. It can describe the first camera I owned and what I learned from it. A sentence or two can mention the people, classes or moments that shaped how I shoot. It can share an early project that taught me something important. Another line can cover how my style has grown since then. It can mention the jump from personal projects to working with clients. A sentence can describe the first time someone paid me to film something. It can touch on the mistakes that taught me the most. Another line can mention the gear and techniques I picked up along the way. It can also name a project I am especially proud of. A final line can bring the story up to where I am today.',
  },
  {
    key: 'approach',
    text: 'Placeholder text for this section. It will describe how I work with clients from the first conversation to the final cut. It can explain how I learn what a client wants to say and who they want to reach. A sentence can cover how I plan a shoot and scout locations. It can describe how I like to light and frame a scene. Another line can cover how I keep things relaxed and natural on set. It can mention how I handle editing, color and sound. A sentence here can talk about keeping clients involved along the way. It can share how I adapt to tight timelines and changing plans. A line can describe how I make people comfortable on camera. Another sentence can explain how I deliver files and versions for different platforms. It can end with what clients can expect when they work with me.',
  },
  {
    key: 'beyond',
    text: 'Placeholder text for this section. It will share a little about life outside of filmmaking. It can mention hobbies that keep me creative. A sentence or two can cover places I love to travel and what I bring back from them. It can touch on the music, films or photographers that inspire me. Another line can share something people might not expect about me. It can mention what I am excited to work on next. A sentence can share a favorite place I have filmed and why it stuck with me. It can mention the communities and causes I care about. Another line can describe what a perfect day off looks like. It can also mention a skill I am learning right now. A closing line can invite people to reach out and say hello.',
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
                key={section.key}
                className={`about-row${index % 2 === 1 ? ' about-row-flipped' : ''}`}
              >
                <div className="about-photo-column">
                  <div className="portrait-placeholder">Photo</div>
                </div>
                <p className="about-text">{section.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

import Reveal from '../Reveal';
import rigPhoto from '../../public/about/about-1-rig.jpg';
import shootingPhoto from '../../public/about/about-2-shooting.jpg';
import newspaperPhoto from '../../public/about/about-3-newspaper.jpg';
import cameraPhoto from '../../public/about/about-4-camera.jpg';

export const metadata = { title: 'About Me | Vic Deography' };

// Each section pairs a photo with a short block of text. The photo switches sides from one
// section to the next. Replace the placeholder text with the real text.
const sections = [
  {
    key: 'intro',
    photo: rigPhoto,
    alt: 'Victor holding a rigged camera while filming on a city sidewalk',
    text:
      "My name is Victor Pereira-Leite, and I am a videographer and cinematographer from New Orleans currently living in Chicago since 2023. I am currently in my senior year of college at Loyola University Chicago, majoring in Film/Digital Media and minoring in Political Science. When I was six years old, I stole my Mom’s old camcorder to film videos of mock-documentaries with plastic dinosaur toys laying around the house. Ever since then, I haven’t looked back. Being behind the camera has been a passion of mine for as long as I can remember, no matter the type of video. Whether it be big sporting events, small gatherings, or anything in between, I always want to make moments live forever in the best form possible.",
  },
  {
    key: 'start',
    photo: shootingPhoto,
    alt: 'Victor taking a photo with his camera above a Chicago street',
    text: 'Placeholder text for this section. It will tell the story of the first projects I picked up a camera for. It can describe the first camera I owned and what I learned from it. A sentence or two can mention the people, classes or moments that shaped how I shoot. It can share an early project that taught me something important. Another line can cover how my style has grown since then. It can mention the jump from personal projects to working with clients. A sentence can describe the first time someone paid me to film something. It can touch on the mistakes that taught me the most. Another line can mention the gear and techniques I picked up along the way. It can also name a project I am especially proud of. A final line can bring the story up to where I am today.',
  },
  {
    key: 'approach',
    photo: newspaperPhoto,
    alt: 'School newspaper feature naming Victor Pereira-Leite Blue Jay of the Month',
    text: 'Placeholder text for this section. It will describe how I work with clients from the first conversation to the final cut. It can explain how I learn what a client wants to say and who they want to reach. A sentence can cover how I plan a shoot and scout locations. It can describe how I like to light and frame a scene. Another line can cover how I keep things relaxed and natural on set. It can mention how I handle editing, color and sound. A sentence here can talk about keeping clients involved along the way. It can share how I adapt to tight timelines and changing plans. A line can describe how I make people comfortable on camera. Another sentence can explain how I deliver files and versions for different platforms. It can end with what clients can expect when they work with me.',
  },
  {
    key: 'beyond',
    photo: cameraPhoto,
    alt: "Victor's rigged Lumix camera with monitor and microphone in an alley",
    text:
      'My personal camera is the Panasonic LUMIX G85; however, I have used the SONY FX30, Canon XA75, Canon T7i, GoPro Action Camera, and more. I also own both RODE and DJI Wireless and shotgun mics, a K&F Concept ND2-400 Lens Filter, a TORJIM 100w Sofbox lighting kit, and an OSEE Monitor.',
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
                  <img className="about-photo" src={section.photo.src} alt={section.alt} />
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

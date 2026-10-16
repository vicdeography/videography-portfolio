import Reveal from '../Reveal';
import rigPhoto from '../../public/about/about-1-rig.jpg';
import shootingPhoto from '../../public/about/about-2-shooting.jpg';
import newspaperPhoto from '../../public/about/about-3-newspaper.jpg';
import cameraPhoto from '../../public/about/about-4-camera.jpg';

export const metadata = { title: 'About Me | Victor Pereira-Leite' };

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
    text:
      "Throughout my four years as an undergraduate at Loyola, I have had many different media experiences. I have worked in the School of Communication’s Technology Rental Lab, managing camera gear, audio gear, lighting gear, and more to lend out to students. I have also worked for Loyola Athletics for both Men’s and Women’s Basketball and Volleyball as a video board operator. During my time in high school, I was a part of student council. I was responsible for producing promotional videos for the student body and working on logistics and live coordination of pep rallies. My combination of soft skills, camera knowledge, and adaptability on-the-fly, make me well equipped to handle many different types of shoots.",
  },
  {
    key: 'approach',
    photo: newspaperPhoto,
    alt: 'School newspaper feature naming Victor Pereira-Leite Blue Jay of the Month',
    text:
      "Outside of school-related work, I work as a cameraman for the Nice & Cozy Podcast, which is a one-of-a kind mobile podcast that blends casual conversation with personal reflection throughout the city of Chicago. I am also working as a director of photography and editor for multiple short-films and documentaries set to come out in mid-2027. As of October 2026, I have worked with the following companies, brands, and artists: Nice & Cozy Podcast, Reckless Records, Chicago Music Exchange, Meals on Wheels Northeastern Illinois, Lakeside Brazilian Jiu-Jitsu, Anti-Cruelty Animal Shelter, TrafficTech, NEEQ, J.Onyx, Leo & Friends, Osagiemuse, and others.",
  },
  {
    key: 'beyond',
    photo: cameraPhoto,
    alt: "Victor's rigged Lumix camera with monitor and microphone in an alley",
    text:
      'My personal camera is the Panasonic LUMIX G85; however, I have used the SONY FX30, Canon XA75, Canon T7i, GoPro Action Camera, and more. I also own both RODE and DJI Wireless and shotgun mics, a K&F Concept ND2-400 Lens Filter, a TORJIM 100w Sofbox lighting kit, and an OSEE Monitor. I am proficient in both Final Cut Pro and CapCut.',
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

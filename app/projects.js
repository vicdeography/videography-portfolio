import lakesideBjjPoster from '../public/projects/lakeside-bjj.jpg';
import mealsOnWheelsPoster from '../public/projects/meals-on-wheels.jpg';
import leoAndFriendsPoster from '../public/projects/leo-and-friends.jpg';
import staringContestPoster from '../public/projects/the-staring-contest.jpg';
import lisbonAtDuskPoster from '../public/projects/lisbon-at-dusk.jpg';
import lucSoccerPoster from '../public/projects/luc-soccer-huddle.jpg';

// Real projects for each subtab, in display order. Each one can have:
//   video:       URL of the video file (an MP4 or H.264 .mov in the public Vercel Blob store)
//   poster:      cover image shown in the box, saved in public/projects/
//   title:       project name (leave out to show the video on its own)
//   description: a few sentences shown under the title
// Each subtab shows exactly the projects listed here; add an entry to add a row.

export const projects = {
  'brand-videos': [
    {
      video: 'https://yruexne8z4cwufst.public.blob.vercel-storage.com/Lakeside%20BJJ%20Promo.mov',
      poster: lakesideBjjPoster.src,
      title: 'Lakeside Brazilian Jiu-Jitsu',
      description:
        'A promotional short for Lakeside Brazilian Jiu-Jitsu, which offers an introduction to the martial art of BJJ as well as the history of the Lakeside Gym. This video was shot with a Panasonic LUMIX G85 and Rode Wireless GO Microphones.',
    },
    {
      video: 'https://yruexne8z4cwufst.public.blob.vercel-storage.com/MOW%20Intro%20Video%20for%20site.mov',
      poster: mealsOnWheelsPoster.src,
      title: 'Meals on Wheels',
      description:
        'A two-minute promotional short for Meals on Wheels Northeastern Illinois, a nonprofit organization that provides food to elderly adults. This video was shot with a Panasonic LUMIX G85, Zoom H6N, Audio-Technica AT835b Shotgun Mic, and Rode Wireless GO Mics.',
    },
  ],
  events: [
    {
      video: 'https://yruexne8z4cwufst.public.blob.vercel-storage.com/Leo%20and%20Friend%20Show.mov',
      poster: leoAndFriendsPoster.src,
      title: 'Leo & Friends at Carrollton Station',
      description:
        'A short recap video of live music played by Leo & Friends at Carrollton Station, a bar in New Orleans. This video was shot with a Panasonic LUMIX G85 and features original music from lead singer, Leo Oliveira.',
    },
  ],
  'short-films': [
    {
      video: 'https://yruexne8z4cwufst.public.blob.vercel-storage.com/The%20Staring%20Contest%20264.mov',
      poster: staringContestPoster.src,
      title: 'The Staring Contest',
      description:
        'When two rivals engage in an intense staring contest, who will come out on top? This film was my one-minute final project for my Cinematography I class. This film was shot with a Canon XA75 and lit with the Lowel Blender 2-Light LED Kit.',
    },
  ],
  miscellaneous: [
    {
      video: 'https://yruexne8z4cwufst.public.blob.vercel-storage.com/Lisbon%20video.mov',
      poster: lisbonAtDuskPoster.src,
      title: 'Lisbon at Dusk',
      description:
        'A short atmospheric video taken on my June 2026 trip to Lisbon, Portugal at sunset.',
    },
  ],
  sports: [
    {
      video: 'https://yruexne8z4cwufst.public.blob.vercel-storage.com/LUC%20Club%20Soccer%20vs%20UofI%20final%20264.mov',
      title: 'Loyola Club Soccer vs University of Illinois',
      description:
        'A two-minute recap video of an intense grudge match between the Loyola University Chicago and the University of Illinois club soccer teams. This video was shot with a Panasonic LUMIX G85 in primarily a run-and-gun style, with a zoom lens used to capture the in-game footage.',
      poster: lucSoccerPoster.src,
    },
  ],
};

export function getProjects(slug) {
  return projects[slug] ?? [];
}

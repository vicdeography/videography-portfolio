import lakesideBjjPoster from '../public/projects/lakeside-bjj.jpg';
import mealsOnWheelsPoster from '../public/projects/meals-on-wheels.jpg';
import leoAndFriendsPoster from '../public/projects/leo-and-friends.jpg';
import staringContestPoster from '../public/projects/the-staring-contest.jpg';
import lisbonAtDuskPoster from '../public/projects/lisbon-at-dusk.jpg';
import lucSoccerPoster from '../public/projects/luc-soccer-huddle.jpg';
import loyolaWcsPoster from '../public/projects/loyola-wcs-vs-northwestern.jpg';
import takedaPoster from '../public/projects/takeda-impact-deliveries.jpg';
import phiSigPoster from '../public/projects/phi-sigma-sigma-recruitment.jpg';
import loyolaMcsNorthwesternPoster from '../public/projects/loyola-mcs-vs-northwestern.jpg';
import loyolaMcsUChicagoPoster from '../public/projects/loyola-mcs-vs-uchicago.jpg';

// Real projects for each subtab, in display order. Each one can have:
//   video:       URL of the video file (an MP4 or H.264 .mov in the public Vercel Blob store)
//   poster:      cover image shown in the box, saved in public/projects/
//   title:       project name (leave out to show the video on its own)
//   description: a few sentences shown under the title
// Each subtab shows exactly the projects listed here; add an entry to add a row.

export const projects = {
  'brand-videos': [
    {
      video: 'https://yruexne8z4cwufst.public.blob.vercel-storage.com/Takeda%20Video%20h264.mov',
      poster: takedaPoster.src,
      title: 'Takeda Impact Deliveries',
    },
    {
      video: 'https://yruexne8z4cwufst.public.blob.vercel-storage.com/Phi%20Sig%20Recruitment%20Vid%20h264.mov',
      poster: phiSigPoster.src,
      title: 'Phi Sigma Sigma 2027 Recruitment Video',
    },
    {
      video: 'https://yruexne8z4cwufst.public.blob.vercel-storage.com/Lakeside%20BJJ%20Promo.mov',
      poster: lakesideBjjPoster.src,
      title: 'Lakeside Brazilian Jiu-Jitsu',
    },
    {
      video: 'https://yruexne8z4cwufst.public.blob.vercel-storage.com/MOW%20Intro%20Video%20for%20site.mov',
      poster: mealsOnWheelsPoster.src,
      title: 'Meals on Wheels',
    },
    {
      video: 'https://yruexne8z4cwufst.public.blob.vercel-storage.com/Leo%20and%20Friend%20Show.mov',
      poster: leoAndFriendsPoster.src,
      title: 'Leo & Friends at Carrollton Station',
    },
  ],
  miscellaneous: [
    {
      video: 'https://yruexne8z4cwufst.public.blob.vercel-storage.com/Lisbon%20video.mov',
      poster: lisbonAtDuskPoster.src,
      title: 'Lisbon at Dusk',
    },
    {
      video: 'https://yruexne8z4cwufst.public.blob.vercel-storage.com/The%20Staring%20Contest%20264.mov',
      poster: staringContestPoster.src,
      title: 'The Staring Contest',
    },
  ],
  sports: [
    {
      video: 'https://yruexne8z4cwufst.public.blob.vercel-storage.com/Mens%20Club%20Soccer%20vs%20Nwestern%20h264.mov',
      poster: loyolaMcsNorthwesternPoster.src,
      title: "Loyola Men's Club Soccer vs Northwestern University",
    },
    {
      video: 'https://yruexne8z4cwufst.public.blob.vercel-storage.com/LUC%20Club%20Soccer%20vs%20UChicago%20h264.mov',
      poster: loyolaMcsUChicagoPoster.src,
      title: "Loyola Men's Club Soccer vs University of Chicago",
    },
    {
      video: 'https://yruexne8z4cwufst.public.blob.vercel-storage.com/WCS%20vs%20Nwestern%20h264.mov',
      poster: loyolaWcsPoster.src,
      title: "Loyola Women's Club Soccer vs Northwestern University",
    },
    {
      video: 'https://yruexne8z4cwufst.public.blob.vercel-storage.com/LUC%20Club%20Soccer%20vs%20UofI%20final%20264.mov',
      title: 'Loyola Club Soccer vs University of Illinois',
      poster: lucSoccerPoster.src,
    },
  ],
};

export function getProjects(slug) {
  return projects[slug] ?? [];
}

// Real projects for each subtab, in display order. Each one can have:
//   video:       URL of the video file (an MP4 or H.264 .mov in the public Vercel Blob store)
//   poster:      cover image shown in the box, saved in public/projects/
//   title:       project name (leave out to show the video on its own)
//   description: a few sentences shown under the title
// Subtabs are topped up with placeholder boxes so each one shows at least MIN_PROJECTS rows.
export const MIN_PROJECTS = 4;

export const projects = {
  sports: [
    {
      video: 'https://yruexne8z4cwufst.public.blob.vercel-storage.com/LUC%20Club%20Soccer%20vs%20UofI%20final%20264.mov',
      title: 'Loyola Club Soccer vs University of Illinois',
      description:
        'A two-minute recap video of an intense grudge match between the Loyola University Chicago and the University of Illinois club soccer teams. This video was shot with a Panasonic LUMIX G85 in primarily a run-and-gun style, with a zoom lens used to capture the in-game footage.',
      poster: '/projects/luc-soccer-huddle.jpg',
    },
  ],
};

export function getProjects(slug) {
  const real = projects[slug] ?? [];
  const placeholders = Array.from({ length: Math.max(0, MIN_PROJECTS - real.length) }, () => ({
    placeholder: true,
  }));
  return [...real, ...placeholders];
}

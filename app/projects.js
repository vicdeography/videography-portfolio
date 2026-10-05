// Real projects for each subtab, in display order. Each one can have:
//   video:       URL of the video file (an MP4 or H.264 .mov in the public Vercel Blob store)
//   title:       project name (leave out to show the video on its own)
//   description: a few sentences shown under the title
// Subtabs are topped up with placeholder boxes so each one shows at least MIN_PROJECTS rows.
export const MIN_PROJECTS = 4;

export const projects = {
  // First Sports video goes here once it is in the public Blob store: { video: 'https://...' }
  sports: [],
};

export function getProjects(slug) {
  const real = projects[slug] ?? [];
  const placeholders = Array.from({ length: Math.max(0, MIN_PROJECTS - real.length) }, () => ({
    placeholder: true,
  }));
  return [...real, ...placeholders];
}

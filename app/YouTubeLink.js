// A project's box for a video hosted on YouTube: shows the cover image with "Watch on YouTube" on
// hover, and opens the video on YouTube in a new tab when clicked.
export default function YouTubeLink({ href, poster, title }) {
  const id = new URL(href).searchParams.get('v');
  // YouTube's "hq" thumbnail exists for every video; it is 4:3 with black bars that the 16:9 box crops off.
  const cover = poster || `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;

  return (
    <a
      className="project-media project-video"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={title ? `Watch ${title} on YouTube` : 'Watch on YouTube'}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={cover} alt="" />
      <span className="play-label">Watch on YouTube</span>
    </a>
  );
}

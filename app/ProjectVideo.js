'use client';

import { useEffect, useRef, useState } from 'react';

// A project's video box: shows the first frame with "Play" on hover, and opens the video
// in a centered player over a dimmed page when clicked.
export default function ProjectVideo({ src, poster, title }) {
  const [open, setOpen] = useState(false);
  const [failed, setFailed] = useState(false);
  const playerRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    setFailed(false);
    // Start playback from the click; if the browser blocks it, the controls are there to press play.
    playerRef.current?.play().catch(() => {});
    const onKey = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <div className="project-media project-video">
        {poster ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={poster} alt="" loading="lazy" />
        ) : (
          <video src={`${src}#t=0.1`} preload="metadata" muted playsInline tabIndex={-1} />
        )}
        <button
          type="button"
          className="play-label"
          onClick={() => setOpen(true)}
          aria-label={title ? `Play ${title}` : 'Play video'}
        >
          Play
        </button>
      </div>

      {open && (
        <div className="video-modal" role="dialog" aria-modal="true" onClick={() => setOpen(false)}>
          <button type="button" className="video-modal-close" aria-label="Close video">
            &times;
          </button>
          {failed ? (
            <p className="video-modal-error" onClick={(event) => event.stopPropagation()}>
              Sorry, this video can&rsquo;t play in this browser. Try Safari or Chrome.
            </p>
          ) : (
            <video
              ref={playerRef}
              className="video-modal-player"
              src={src}
              poster={poster}
              controls
              autoPlay
              playsInline
              onError={() => setFailed(true)}
              onClick={(event) => event.stopPropagation()}
            />
          )}
        </div>
      )}
    </>
  );
}

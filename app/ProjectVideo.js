'use client';

import { useEffect, useRef, useState } from 'react';

// A project's video box: shows the first frame with "Play" on hover, and opens the video
// in a centered player over a dimmed page when clicked.
export default function ProjectVideo({ src, title }) {
  const [open, setOpen] = useState(false);
  const playerRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
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
      <button
        type="button"
        className="project-media project-video"
        onClick={() => setOpen(true)}
        aria-label={title ? `Play ${title}` : 'Play video'}
      >
        <video src={`${src}#t=0.1`} preload="metadata" muted playsInline tabIndex={-1} />
        <span className="play-label">Play</span>
      </button>

      {open && (
        <div className="video-modal" role="dialog" aria-modal="true" onClick={() => setOpen(false)}>
          <button type="button" className="video-modal-close" aria-label="Close video">
            &times;
          </button>
          <video
            ref={playerRef}
            className="video-modal-player"
            src={src}
            controls
            autoPlay
            playsInline
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}

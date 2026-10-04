'use client';

import { useEffect, useRef } from 'react';

// How long (in seconds) the end of the reel crossfades into the start. 0 is a hard cut.
const FADE_SECONDS = 0;
// How early to hand over before the end: enough to finish the fade, or a couple of frames for a cut.
const SWITCH_AHEAD = FADE_SECONDS > 0 ? FADE_SECONDS + 0.15 : 0.05;

// Plays the reel on a seamless loop. The browser's built-in `loop` pauses briefly at the end
// while it seeks back and re-buffers the start, which is noticeable on large 4K files. Instead,
// a second copy waits at the first frame and takes over just before the active one ends.
export default function ReelVideo({ src }) {
  const firstRef = useRef(null);
  const secondRef = useRef(null);

  useEffect(() => {
    const videos = [firstRef.current, secondRef.current];
    let active = 0;
    let switching = false;
    let frame;

    const show = (video, visible) => {
      video.style.opacity = visible ? '1' : '0';
    };

    const tick = () => {
      const current = videos[active];
      const next = videos[1 - active];
      const remaining = current.duration - current.currentTime;

      if (!switching && Number.isFinite(remaining) && remaining <= SWITCH_AHEAD) {
        switching = true;
        if (next.currentTime > 0.01) next.currentTime = 0;
        next.play().catch(() => {});
        show(next, true);
        show(current, false);

        window.setTimeout(() => {
          current.pause();
          current.currentTime = 0;
          active = 1 - active;
          switching = false;
        }, FADE_SECONDS * 1000);
      }

      frame = window.requestAnimationFrame(tick);
    };

    show(videos[1], false);
    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="reel-video">
      <video
        ref={firstRef}
        className="reel-layer"
        src={src}
        style={{ transitionDuration: `${FADE_SECONDS}s` }}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />
      <video
        ref={secondRef}
        className="reel-layer"
        src={src}
        style={{ transitionDuration: `${FADE_SECONDS}s`, opacity: 0 }}
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
      />
    </div>
  );
}

'use client';

import { useEffect, useRef } from 'react';

// How long (in seconds) the end of the reel crossfades into the start. 0 is a hard cut.
const FADE_SECONDS = 0;
// How early to hand over before the end: enough to finish the fade, or a couple of frames for a cut.
const SWITCH_AHEAD = FADE_SECONDS > 0 ? FADE_SECONDS + 0.15 : 0.05;
// Start loading the standby copy once the visible one has played this long, so the two copies
// don't compete for bandwidth while the page is first loading.
const STANDBY_DELAY_MS = 4000;

// Plays the reel on a seamless loop. The browser's built-in `loop` pauses briefly at the end
// while it seeks back and re-buffers the start, which is noticeable on large 4K files. Instead,
// a second copy waits at the first frame and takes over just before the active one ends, as long
// as it has buffered enough to play. Otherwise the built-in loop is used for that pass.
export default function ReelVideo({ src, poster }) {
  const firstRef = useRef(null);
  const secondRef = useRef(null);

  useEffect(() => {
    const videos = [firstRef.current, secondRef.current];
    let active = 0;
    let switching = false;
    let standbyLoaded = false;
    let frame;
    let standbyTimer;

    const show = (video, visible) => {
      video.style.opacity = visible ? '1' : '0';
    };

    const tryPlay = (video) => {
      if (video.paused && document.visibilityState === 'visible') video.play().catch(() => {});
    };

    const loadStandby = () => {
      if (standbyLoaded) return;
      standbyLoaded = true;
      const standby = videos[1];
      standby.preload = 'auto';
      standby.src = src;
      standby.load();
    };

    const tick = () => {
      const current = videos[active];
      const next = videos[1 - active];
      const remaining = current.duration - current.currentTime;

      if (Number.isFinite(remaining) && remaining < 6) loadStandby();

      // HAVE_FUTURE_DATA (3): the standby can start playing without stalling on its first frame.
      if (!switching && Number.isFinite(remaining) && remaining <= SWITCH_AHEAD && next.readyState >= 3) {
        switching = true;
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

    const first = videos[0];
    const onPlaying = () => {
      window.clearTimeout(standbyTimer);
      standbyTimer = window.setTimeout(loadStandby, STANDBY_DELAY_MS);
    };
    const onCanPlay = () => tryPlay(videos[active]);
    // Some browsers (for example iOS in Low Power Mode) hold off autoplay until the visitor
    // interacts with the page, so start playback on the first tap, scroll or key press.
    const onInteract = () => tryPlay(videos[active]);
    const onVisible = () => tryPlay(videos[active]);
    // iOS only counts touchend and click as permission to start playback, so listen for those too.
    const interactions = ['pointerdown', 'touchstart', 'touchend', 'click', 'scroll', 'keydown'];

    first.addEventListener('playing', onPlaying, { once: true });
    first.addEventListener('canplay', onCanPlay);
    interactions.forEach((type) => window.addEventListener(type, onInteract, { passive: true }));
    document.addEventListener('visibilitychange', onVisible);

    // Mobile browsers only autoplay muted video; set it on the elements directly as well as in the
    // markup so it is in place before the first play attempt.
    videos.forEach((video) => {
      video.muted = true;
      video.defaultMuted = true;
    });

    show(videos[1], false);
    tryPlay(first);
    first.addEventListener('loadedmetadata', onCanPlay);
    frame = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(standbyTimer);
      first.removeEventListener('playing', onPlaying);
      first.removeEventListener('canplay', onCanPlay);
      first.removeEventListener('loadedmetadata', onCanPlay);
      interactions.forEach((type) => window.removeEventListener(type, onInteract));
      document.removeEventListener('visibilitychange', onVisible);
    };
  }, [src]);

  return (
    <div className="reel-video" style={poster ? { backgroundImage: `url(${poster})` } : undefined}>
      <video
        ref={firstRef}
        className="reel-layer"
        src={src}
        poster={poster}
        style={{ transitionDuration: `${FADE_SECONDS}s` }}
        autoPlay
        muted
        loop
        playsInline
        disablePictureInPicture
        disableRemotePlayback
        preload="auto"
      />
      <video
        ref={secondRef}
        className="reel-layer"
        style={{ transitionDuration: `${FADE_SECONDS}s`, opacity: 0 }}
        muted
        loop
        playsInline
        disablePictureInPicture
        disableRemotePlayback
        preload="none"
        aria-hidden="true"
      />
    </div>
  );
}

'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

// Cross-fades between pages. Just before the site changes page (a link click, or the browser's
// back and forward buttons), a copy of the current page is laid over the spot it occupies and
// faded out while the new page fades in underneath. It is done by hand rather than with the
// browser's view transitions so it behaves the same in every browser and on every click.
const FADE_MS = 600;

function snapshotPage() {
  const page = document.querySelector('.page-fade');
  if (!page) return;

  // Clear any copy left over from a page change still in progress.
  document.querySelectorAll('.page-ghost-layer').forEach((el) => el.remove());

  const rect = page.getBoundingClientRect();
  const pageTop = rect.top + window.scrollY;
  const ghost = page.cloneNode(true);

  // Swap videos for a still of their current frame, so the copy doesn't load or play them again.
  const videos = page.querySelectorAll('video');
  ghost.querySelectorAll('video').forEach((copy, index) => {
    const video = videos[index];
    const still = document.createElement('canvas');
    still.className = copy.className;
    still.setAttribute('style', copy.getAttribute('style') || '');
    try {
      still.width = video.videoWidth || 1;
      still.height = video.videoHeight || 1;
      still.getContext('2d').drawImage(video, 0, 0, still.width, still.height);
    } catch {
      // A frame that can't be copied just leaves the poster behind it showing.
    }
    copy.replaceWith(still);
  });
  ghost.querySelectorAll('[id]').forEach((el) => el.removeAttribute('id'));
  ghost.removeAttribute('id');
  ghost.classList.add('page-ghost');
  ghost.style.animation = 'none';
  ghost.setAttribute('aria-hidden', 'true');
  ghost.inert = true;
  ghost.style.width = `${rect.width}px`;
  ghost.style.left = `${rect.left}px`;

  // A fixed, screen-sized layer holds the copy so it never makes the page taller. The copy is
  // moved with scrolling so it stays lined up with where the page sits.
  const layer = document.createElement('div');
  layer.className = 'page-ghost-layer';
  layer.appendChild(ghost);
  const place = () => {
    ghost.style.transform = `translateY(${pageTop - window.scrollY}px)`;
  };
  place();
  window.addEventListener('scroll', place, { passive: true });
  document.body.appendChild(layer);

  // Start the fade on the next frame so the browser sees the starting opacity first.
  requestAnimationFrame(() => {
    requestAnimationFrame(() => layer.classList.add('fading'));
  });
  setTimeout(() => {
    window.removeEventListener('scroll', place);
    layer.remove();
  }, FADE_MS + 100);
}

export default function PageTransitions() {
  const pathname = usePathname();
  const pathRef = useRef(pathname);
  pathRef.current = pathname;

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const onClick = (event) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = event.target.closest?.('a[href]');
      if (!link || (link.target && link.target !== '_self') || link.hasAttribute('download')) return;
      const url = new URL(link.href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname === window.location.pathname) return;
      snapshotPage();
    };
    // By now the address has changed but the old page is still on screen.
    const onPopState = () => {
      if (window.location.pathname !== pathRef.current) snapshotPage();
    };

    // Capture phase, so the copy is taken before the link starts the page change.
    document.addEventListener('click', onClick, true);
    window.addEventListener('popstate', onPopState, true);
    return () => {
      document.removeEventListener('click', onClick, true);
      window.removeEventListener('popstate', onPopState, true);
    };
  }, []);

  return null;
}

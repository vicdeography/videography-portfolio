'use client';

import { useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';

// Cross-fades between pages when a link on the site is clicked: the old page fades out while the
// new one fades in. Browsers with view transitions blend the two directly; others fade the old
// page out and then the new page in.
const FADE_OUT_MS = 300;

export default function PageTransitions() {
  const router = useRouter();
  const pathname = usePathname();
  const finishRef = useRef(null);

  // The new page has rendered: let the cross-fade play, or clear the fade-out.
  useEffect(() => {
    finishRef.current?.();
    finishRef.current = null;
    document.documentElement.classList.remove('page-leaving');
  }, [pathname]);

  useEffect(() => {
    const onClick = (event) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = event.target.closest?.('a[href]');
      if (!link || (link.target && link.target !== '_self') || link.hasAttribute('download')) return;
      const url = new URL(link.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      if (url.pathname === window.location.pathname) return;

      event.preventDefault();
      const href = url.pathname + url.search + url.hash;
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (reduceMotion) {
        router.push(href);
      } else if (document.startViewTransition) {
        // The cross-fade does the fading, so the new page skips its own fade-in.
        document.documentElement.classList.add('view-fading');
        const transition = document.startViewTransition(
          () =>
            new Promise((resolve) => {
              finishRef.current = resolve;
              router.push(href);
              // Never leave the page frozen if the new page is slow to arrive.
              setTimeout(resolve, 3000);
            }),
        );
        transition.finished.finally(() => {
          // Keep the new page from replaying its fade-in once the class comes off.
          document.querySelectorAll('.page-fade').forEach((el) => {
            el.style.animation = 'none';
          });
          document.documentElement.classList.remove('view-fading');
        });
      } else {
        document.documentElement.classList.add('page-leaving');
        setTimeout(() => router.push(href), FADE_OUT_MS);
      }
    };

    // Capture phase, so this runs before the link's own handler and replaces it.
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, [router]);

  return null;
}

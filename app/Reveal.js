'use client';

import { useEffect, useRef, useState } from 'react';

// Fades its content in whenever it scrolls into view and back out when it leaves, so it fades in
// again on the way back. Anything already on screen when the page loads starts visible with no
// animation, and content stays visible if scripts have not run yet.
export default function Reveal({ as: Tag = 'div', className = '', children, ...props }) {
  const ref = useRef(null);
  const [state, setState] = useState('static'); // static | hidden | shown

  useEffect(() => {
    const element = ref.current;
    if (!element || typeof IntersectionObserver === 'undefined') return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setState((previous) => (previous === 'static' ? 'static' : 'shown'));
        } else {
          setState('hidden');
        }
      },
      { rootMargin: '0px 0px -8% 0px' },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const stateClass = state === 'static' ? '' : ` reveal reveal-${state}`;
  return (
    <Tag ref={ref} className={`${className}${stateClass}`.trim() || undefined} {...props}>
      {children}
    </Tag>
  );
}

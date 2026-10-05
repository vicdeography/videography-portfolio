'use client';

import { useEffect, useRef, useState } from 'react';

// Fades its content in the first time it scrolls into view. Anything already on screen when the
// page loads is left alone, and content stays visible if scripts have not run yet.
export default function Reveal({ as: Tag = 'div', className = '', children, ...props }) {
  const ref = useRef(null);
  const [state, setState] = useState('static'); // static | hidden | shown

  useEffect(() => {
    const element = ref.current;
    if (!element || typeof IntersectionObserver === 'undefined') return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    if (element.getBoundingClientRect().top < window.innerHeight) return undefined;

    setState('hidden');
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setState('shown');
        observer.disconnect();
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

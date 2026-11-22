'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

// The home page's sideways-scrolling row of recent projects, with arrow buttons on either side
// for mouse users (touch screens can also swipe). Each arrow moves by one video.
export default function RecentCarousel({ children }) {
  const rowRef = useRef(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  const update = useCallback(() => {
    const row = rowRef.current;
    if (!row) return;
    setEdges({
      start: row.scrollLeft <= 2,
      end: row.scrollLeft + row.clientWidth >= row.scrollWidth - 2,
    });
  }, []);

  useEffect(() => {
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [update]);

  const step = (direction) => {
    const row = rowRef.current;
    const item = row?.firstElementChild;
    if (!item) return;
    const gap = parseFloat(getComputedStyle(row).columnGap) || 0;
    row.scrollBy({ left: direction * (item.getBoundingClientRect().width + gap), behavior: 'smooth' });
  };

  return (
    <div className="recent-carousel">
      <button
        type="button"
        className="recent-arrow recent-arrow-prev"
        aria-label="Previous projects"
        onClick={() => step(-1)}
        disabled={edges.start}
      />
      <div ref={rowRef} className="recent-row" onScroll={update}>
        {children}
      </div>
      <button
        type="button"
        className="recent-arrow recent-arrow-next"
        aria-label="More projects"
        onClick={() => step(1)}
        disabled={edges.end}
      />
    </div>
  );
}

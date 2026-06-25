// src/hooks/useInView.js
// Intersection Observer hook for scroll-triggered animations

import { useEffect, useRef, useState } from 'react';

export default function useInView(options = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          // Once visible, stop observing (animate once)
          if (options.once !== false) {
            observer.unobserve(el);
          }
        } else if (options.once === false) {
          setInView(false);
        }
      },
      {
        threshold: options.threshold ?? 0.15,
        rootMargin: options.rootMargin ?? '0px',
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [options.threshold, options.rootMargin, options.once]);

  return [ref, inView];
}

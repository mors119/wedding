import { useEffect, useState } from 'react';

export function useInView(
  ref: React.RefObject<HTMLElement | null>,
  threshold = 0.1,
) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), {
      threshold,
    });
    io.observe(el);
    return () => io.disconnect();
  }, [ref, threshold]);
  return inView;
}

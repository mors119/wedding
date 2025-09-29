import { useEffect, useState } from 'react';

export function useImageReady(src: string, timeoutMs = 8000) {
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<null | Error>(null);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    let done = false;
    const img = new Image();

    const finish = () => {
      if (done) return;
      done = true;
      setReady(true);
    };

    img.onload = finish;
    img.onerror = () => {
      setError(new Error(`Failed to load: ${src}`));
      setComplete(true);
      finish();
    };
    img.src = src;

    if (img.complete) finish();

    const t = setTimeout(finish, timeoutMs);
    return () => clearTimeout(t);
  }, [src, timeoutMs]);

  return { ready, error, setComplete, complete };
}

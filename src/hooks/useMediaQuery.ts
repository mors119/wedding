import { useEffect, useState } from 'react';

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !('matchMedia' in window)) return;
    const mql = window.matchMedia(query);
    const onChange = (e: MediaQueryListEvent | MediaQueryList) =>
      setMatches('matches' in e ? e.matches : (e as MediaQueryList).matches);

    // 초기 설정
    setMatches(mql.matches);
    // 리스너 등록
    try {
      mql.addEventListener(
        'change',
        onChange as (e: MediaQueryListEvent) => void,
      );
    } catch {
      throw new Error('safari');
    }
    return () => {
      try {
        mql.removeEventListener(
          'change',
          onChange as (e: MediaQueryListEvent) => void,
        );
      } catch {
        throw new Error('safari');
      }
    };
  }, [query]);

  return matches;
}

import { useEffect, useState } from 'react';

declare global {
  interface Window {
    __NAVER_MAPS_LOADING__?: Promise<void>;
  }
}

const NAVER_MAPS_SRC = (clientId: string, submodules?: string[]) =>
  `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${clientId}${
    submodules?.length ? `&submodules=${submodules.join(',')}` : ''
  }`;

export function useNaverMaps(clientId: string, submodules: string[] = []) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState<Error | undefined>();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // 이미 로드 완료
    if (window.naver?.maps) {
      setLoaded(true);
      return;
    }

    // 로딩 중이라면 그 Promise 기다리기
    if (window.__NAVER_MAPS_LOADING__) {
      window.__NAVER_MAPS_LOADING__
        .then(() => setLoaded(true))
        .catch((e) => setError(e));
      return;
    }

    // 최초 로딩: 싱글톤 Promise 생성
    window.__NAVER_MAPS_LOADING__ = new Promise<void>((resolve, reject) => {
      const script = document.createElement('script');
      script.src = NAVER_MAPS_SRC(clientId, submodules);
      script.async = true;
      script.defer = true;
      script.onload = () => {
        if (window.naver?.maps) {
          resolve();
        } else {
          reject(
            new Error(
              'Naver Maps SDK loaded but window.naver.maps is undefined',
            ),
          );
        }
      };
      script.onerror = () => reject(new Error('Failed to load Naver Maps SDK'));
      document.head.appendChild(script);
    });

    window.__NAVER_MAPS_LOADING__
      .then(() => setLoaded(true))
      .catch((e) => setError(e));

    // ★ 언마운트에서 script 제거하지 않음 (중복 로드/StrictMode 문제 방지)
  }, [clientId, submodules.join(',')]);

  return { loaded, error };
}

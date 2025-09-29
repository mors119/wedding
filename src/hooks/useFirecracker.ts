// src/hooks/useFirecracker.ts
import { useCallback, useEffect, useRef } from 'react';

type Options = {
  volume?: number; // 기본 음량(0~1)
  minIntervalMs?: number; // 연속 재생 간 최소 간격(스로틀)
};

export function useFirecracker(src: string, opts: Options = {}) {
  const { volume = 0.4, minIntervalMs = 90 } = opts;

  const ctxRef = useRef<AudioContext | null>(null);
  const bufferRef = useRef<AudioBuffer | null>(null);
  const unlockedRef = useRef(false);
  const lastPlayRef = useRef(0);

  useEffect(() => {
    const Ctx = window.AudioContext;
    const ctx = new Ctx();
    ctxRef.current = ctx;

    // 첫 사용자 제스처에서 오디오 컨텍스트 언락
    const unlock = () => {
      if (!unlockedRef.current) {
        ctx.resume().catch(() => {});
        unlockedRef.current = true;
      }
    };
    window.addEventListener('pointerdown', unlock, {
      once: true,
      passive: true,
    });

    // 파일 로드 & 디코드
    let canceled = false;
    (async () => {
      const res = await fetch(src);
      const arr = await res.arrayBuffer();
      if (!canceled) {
        const buf = await ctx.decodeAudioData(arr);
        bufferRef.current = buf;
      }
    })();

    return () => {
      canceled = true;
      window.removeEventListener('pointerdown', unlock);
      // 필요 시 유지하고 싶으면 close 생략 가능
      ctx.close().catch(() => {});
      ctxRef.current = null;
      bufferRef.current = null;
    };
  }, [src]);

  const play = useCallback(
    (p?: { volume?: number; rate?: number }) => {
      const ctx = ctxRef.current;
      const buf = bufferRef.current;
      if (!ctx || !buf) return;

      // 너무 촘촘한 연속 재생 제한(과도한 중첩 방지)
      const now = performance.now();
      if (now - lastPlayRef.current < minIntervalMs) return;
      lastPlayRef.current = now;

      const srcNode = ctx.createBufferSource();
      srcNode.buffer = buf;

      // 재생 속도에 약간 변조(여러 발이 겹칠 때 더 자연스러움)
      srcNode.playbackRate.value = p?.rate ?? 0.95 + Math.random() * 0.1;

      const gain = ctx.createGain();
      gain.gain.value = p?.volume ?? volume;

      srcNode.connect(gain).connect(ctx.destination);
      try {
        srcNode.start();
      } catch {
        /* iOS 잠김 등은 무시 */
      }
    },
    [volume, minIntervalMs],
  );

  return { play };
}

import { useRef, useMemo } from 'react';
import { fontStyle } from '@/lib/fonts';
import { TextSplitter } from '@/components/TextSplitter'; // ← 파일/이름 확인!
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { cn } from '@/lib/utils';

gsap.registerPlugin(useGSAP);

interface Props {
  ready: boolean;
  error: Error | null;
  messages?: string[];
  hold?: number;
  fadeOutDuration?: number;
  onComplete?: () => void;
  className?: string;
}

export const Banner: React.FC<Props> = ({
  ready,
  error,
  messages = ['Please join us', 'as we begin', 'our new life together.'],
  onComplete,
  className,
}) => {
  const bannerRef = useRef<HTMLDivElement | null>(null);

  // 사용자 환경설정(접근성): 모션 감소 선호 여부
  const prefersReducedMotion = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return (
      window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false
    );
  }, []);

  useGSAP(
    () => {
      // ready 이전에는 실행하지 않음
      if (!ready) return;

      // SSR 환경 대비: DOM 없는 경우 방어
      const bannerEl = bannerRef.current;
      if (!bannerEl) return;

      // scope: banner 내부로 쿼리 한정
      const q = gsap.utils.selector(bannerEl);

      // 접근성 대비: reduce 모션이면 즉시 표시 후 바로 사라지도록
      if (prefersReducedMotion) {
        gsap.set(bannerEl, { opacity: 1 });
        gsap.to(bannerEl, {
          opacity: 0,
          duration: 0.01,
          onComplete,
        });
        return;
      }

      // 초기 상태 세팅
      const tl = gsap.timeline({
        defaults: { ease: 'power1.out' },
        onComplete, // 완료 콜백 전달(옵션)
      });

      tl.set(bannerEl, {
        opacity: 1,
        pointerEvents: 'none', // 클릭 막기
        zIndex: 50,
      });

      // 문자 등장 애니메이션
      tl.from(q('.split-char'), {
        // transform 관련 속성만 변경하여 페인트 최소화
        transformOrigin: '50% 80%',
        scale: 1.15,
        y: 32,
        rotate: -12,
        opacity: 0,
        duration: 0.4,
        stagger: 0.06,
        ease: 'back.out(3)',
        willChange: 'transform, opacity',
        force3D: true,
      });

      tl.to({}, { duration: 0.6 });

      // 전체 페이드아웃
      tl.to(bannerEl, {
        opacity: 0,
        duration: 0.5,
      });

      tl.set(bannerEl, { zIndex: -50 });
    },
    {
      // scope를 ref로 지정해 내부 선택자만 영향 받도록
      scope: bannerRef,
      // ready가 변할 때만 재실행
      dependencies: [ready],
      // 서버 렌더 안전
      revertOnUpdate: true,
    },
  );

  return (
    <div
      ref={bannerRef}
      role="img"
      aria-hidden="true"
      className={cn(
        'opacity-0 fixed inset-0 h-screen w-screen flex flex-col items-center justify-center select-none',
        error
          ? 'bg-rose-300 text-neutral-700'
          : 'bg-[url(/banner.jpg)] bg-cover bg-center text-rose-400',

        className,
      )}
      // 페인트 최적화(사파리 등 브라우저 스무딩)
      style={{
        backfaceVisibility: 'hidden',
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
      }}>
      <h1
        style={fontStyle.merriweather}
        className="text-h1 text-center text-4xl md:text-5xl leading-tight ">
        {messages.map((line, i) => (
          <span key={i} className="block mb-3 last:mb-0">
            <TextSplitter text={line} />
          </span>
        ))}
      </h1>
    </div>
  );
};

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Divider } from '@/components/Divider';
import { fontStyle } from '@/lib/fonts';
import { useActive } from '@/store/activeStore';
import { useMediaQuery } from '@/hooks/useMediaQuery';

export type PictureItem = {
  url: string;
  filename: string;
  title: string;
};

// 번들 타임 자동 수집 (Vite 전용)
const modules = import.meta.glob(
  '/src/assets/pictures/*.{png,jpg,jpeg,webp,gif,avif}',
  { eager: true, as: 'url' },
) as Record<string, string>;

const ITEMS: PictureItem[] = Object.entries(modules).map(([path, url]) => {
  const filename = path.split('/').pop()!;
  return {
    url,
    filename,
    title: filename.replace(/\.[^.]+$/, '').replace(/[-_]+/g, ' '),
  };
});

export const Gallery = () => {
  const active = useActive((s) => s.active);
  const open = useActive((s) => s.open);
  const close = useActive((s) => s.close);

  // md 이상 여부
  const isMdUp = useMediaQuery('(min-width: 768px)');
  // 뷰포트에 따라 초기 노출 개수 결정: md 미만 9, md 이상 12
  const initialCount = isMdUp ? 12 : 9;

  const [expanded, setExpanded] = useState(false);
  const topRef = useRef<HTMLDivElement | null>(null);

  // Esc로 라이트박스 닫기 (기존 버그 fix: close() 호출)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && active) close();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [active, close]);

  // 뷰포트가 바뀌면 접힌 상태일 때만 count를 재적용하고, 펼쳐진 상태면 유지
  useEffect(() => {
    // 접힌 상태일 때만 상단으로 살짝 스크롤(옵션)
    if (!expanded) {
      requestAnimationFrame(() => {
        topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }
  }, [isMdUp, expanded]);

  const visibleItems = expanded ? ITEMS : ITEMS.slice(0, initialCount);
  const remaining = Math.max(ITEMS.length - visibleItems.length, 0);
  const hasMore = remaining > 0;

  const handleExpand = () => {
    setExpanded(true);
    requestAnimationFrame(() => {
      topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  const handleCollapse = () => {
    setExpanded(false);
    requestAnimationFrame(() => {
      topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  if (ITEMS.length === 0) {
    return (
      <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-4 text-sm text-neutral-700">
        표시할 이미지가 없습니다. <code>src/assets/pictures</code>에 이미지를
        추가하세요.
      </div>
    );
  }

  return (
    <section className="w-full flex justify-center px-4 pt-8">
      <div
        className={cn(
          'max-w-2xl w-full',
          'bg-white/90 backdrop-blur-sm shadow-md shadow-amber-100/40 rounded-2xl',
          'border border-amber-100/60',
          'px-6 md:px-10 py-10 md:py-12',
        )}
        style={fontStyle.nanumGothic}>
        {/* 헤드라인 */}
        <h2
          id="info-heading"
          style={fontStyle.pacifico}
          className={cn(
            'text-center',
            'text-2xl md:text-3xl font-semibold tracking-wide',
            'bg-clip-text text-transparent bg-gradient-to-r from-amber-500 via-rose-500 to-amber-500 ',
            'drop-shadow-[0_1px_0_rgba(0,0,0,0.08)]',
          )}>
          Contact
        </h2>

        <Divider className="my-8" />

        {/* 스크롤 기준점 */}
        <div ref={topRef} />

        <div className="relative">
          {/* 그리드 */}
          <div
            className={cn(
              'grid grid-cols-3 md:grid-cols-4 gap-3',
              'place-items-stretch',
            )}>
            {visibleItems.map((it) => (
              <button
                key={it.url}
                onClick={() => open(it)}
                className={cn(
                  'group relative overflow-hidden rounded-xl',
                  'border border-amber-100/60 bg-white/70 backdrop-blur-[1px]',
                  'shadow-sm hover:shadow-md transition-shadow',
                )}
                aria-label={`Open ${it.title}`}>
                <div className="aspect-square w-full">
                  <img
                    src={it.url}
                    alt={it.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                </div>
              </button>
            ))}
          </div>

          {/* 접힌 상태에서만 페이드 */}
          {!expanded && hasMore && (
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-5 bg-gradient-to-t from-white to-transparent" />
          )}
        </div>

        {/* 액션 영역 */}
        {ITEMS.length > (isMdUp ? 12 : 9) && (
          <div className="mt-4 flex items-center justify-center gap-3">
            {!expanded ? (
              <Button
                onClick={handleExpand}
                aria-expanded={expanded}
                className="min-w-[120px]"
                variant="outline">
                더보기 ({remaining}장)
              </Button>
            ) : (
              <Button
                onClick={handleCollapse}
                aria-expanded={expanded}
                className="min-w-[120px]"
                variant="outline">
                접기
              </Button>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

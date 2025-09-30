import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Divider } from '@/components/Divider';
import { fontStyle } from '@/lib/fonts';
import { useActive } from '@/store/activeStore';

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

const INITIAL_COUNT = 9;

export const Gallery = () => {
  const active = useActive((s) => s.active);
  const open = useActive((s) => s.open);

  const [expanded, setExpanded] = useState(false);
  const topRef = useRef<HTMLDivElement | null>(null);

  // Esc로 라이트박스 닫기
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && active === null;
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [active]);

  const visibleItems = expanded ? ITEMS : ITEMS.slice(0, INITIAL_COUNT);
  const hasMore = ITEMS.length > INITIAL_COUNT;

  const handleExpand = () => {
    setExpanded(true);
    // 펼치고 나서 그리드 맨 위로 부드럽게 스크롤
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
        {/* 헤드라인: Invite와 동일 톤 */}
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

        {/* 장식 디바이더 (Invite와 동일 간격) */}
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
                <div className="aspect-[1/1] w-full">
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

          {/* 더보기 페이드 오버레이 (접힌 상태에서만) */}
          {!expanded && hasMore && (
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-5 bg-gradient-to-t from-white to-transparent" />
          )}
        </div>

        {/* 액션 영역 */}
        {hasMore && (
          <div className="mt-4 flex items-center justify-center gap-3">
            {!expanded ? (
              <Button
                onClick={handleExpand}
                aria-expanded={expanded}
                className="min-w-[120px]"
                variant="outline">
                더보기 ({ITEMS.length - INITIAL_COUNT}장)
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

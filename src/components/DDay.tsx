import { useDate } from '@/hooks/useDate';
import { cn } from '@/lib/utils';

export const DDay = () => {
  // 당일 카운트다운이 보이도록 1초마다 갱신
  const { dDayLabel, daysUntil, hours, minutes } = useDate();

  const showCountdown = daysUntil === 0; // 당일

  return (
    <div
      className={cn(
        'absolute left-1/2 -translate-x-1/2 top-24',
        'px-3 py-1.5 rounded-full',
        'shadow-sm',
        'text-sm font-semibold tracking-wide bg-neutral-100/80',
        '',
      )}
      aria-live="polite">
      <span>{}</span>
      <span className=" bg-clip-text text-transparent bg-gradient-to-r from-amber-500 via-rose-500 to-amber-500 ">
        {!showCountdown
          ? dDayLabel
          : `${hours > 0 ? hours + '시간' : ''} ${minutes}분 남았습니다`}
      </span>
    </div>
  );
};

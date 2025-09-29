import { data } from '@/constants';
import { useDate } from '@/hooks/useDate';
import { fontStyle } from '@/lib/fonts';
import { Divider } from '@/components/Divider';
import { MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

const Info = () => {
  const { formattedDate, formattedTime } = useDate();

  return (
    <section
      className={cn('w-full flex justify-center', 'px-4 py-8')}
      aria-labelledby="info-heading">
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
          Location
        </h2>

        {/* 장식 디바이더 (Invite와 동일 간격) */}
        <Divider className="my-8" />

        {/* 본문 블록: Invite의 본문 패딩/사이징과 톤 맞춤 */}
        <div className="text-center text-[17px] md:text-lg leading-relaxed text-neutral-700 px-16 space-y-1">
          {/* 날짜 */}
          <p className="font-bold tracking-wide">{formattedDate}</p>
          {/* 시간 */}
          <p className="font-bold tracking-wide">{formattedTime}</p>
        </div>

        {/* 얇은 구분선 (Invite와 동일 위치/느낌) */}
        <div className="flex justify-center my-8">
          <div className="border-t w-16" />
        </div>

        {/* 장소 */}
        <div className="text-center text-[17px] md:text-lg leading-relaxed text-neutral-700">
          <MapPin className="inline-block mr-1.5 -mt-0.5 size-5 text-amber-500" />
          <span className="font-medium tracking-wide">
            {data.c.location.tit}
          </span>
        </div>
      </div>
    </section>
  );
};

export default Info;

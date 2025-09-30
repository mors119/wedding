import { data } from '@/constants';
import { useDate } from '@/hooks/useDate';
import { fontStyle } from '@/lib/fonts';
import { Divider } from '@/components/Divider';
import { MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  googleDirections,
  kakaoToLink,
  naverSearch,
  tDirections,
} from '@/utils/mapLinks';
import { NaverMap } from './Map';
import { toast } from 'sonner';

const Location = () => {
  const { formattedDate, formattedTime } = useDate();
  const { name, lat, lng } = data.c.location;

  return (
    <section
      className={cn('w-full flex justify-center', 'px-4 pt-8')}
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

        {/* 장소 */}
        <div className="text-center text-[17px] mt-4 leading-relaxed text-neutral-700">
          <MapPin className="inline-block mr-1.5 -mt-0.5 size-5 text-amber-500" />
          <span className="font-medium tracking-wide">
            {data.c.location.tit}
          </span>
        </div>

        {/* 얇은 구분선 (Invite와 동일 위치/느낌) */}
        <div className="flex justify-center my-8">
          <div className="border-t w-16" />
        </div>

        {/* 지도 미리보기 */}
        <div className="mt-8">
          <div
            className={cn(
              'relative rounded-2xl overflow-hidden',
              'border border-amber-100/60 shadow-sm shadow-amber-100/30',
              'bg-white/70 backdrop-blur-[2px]',
            )}>
            {/* 상단 얇은 헤더 바(그라데이션) */}
            <div className="h-9 flex items-center gap-2 px-4 border-b border-amber-100/60 bg-gradient-to-r from-amber-50 via-rose-50 to-amber-50">
              <MapPin className="size-4 text-amber-500" />
              <span className="text-sm font-medium text-neutral-700">
                지도 미리보기
              </span>
              <span className="ml-auto text-xs text-neutral-500">{name}</span>
            </div>

            {/* 지도 영역: aspect 유지 + 라운드 하단만 살짝 */}
            <div className="relative">
              {/* 원하는 비율로 조정: 4:3 */}
              <div className="aspect-[4/3] md:aspect-auto w-full">
                <NaverMap
                  clientId={import.meta.env.VITE_NAVER_MAP_KEY}
                  center={{ lat, lng }}
                  zoom={16}
                  className="h-full w-full"
                />
              </div>

              {/* 가장자리 소프트 링(아주 은은한 입체감) */}
              <div className="pointer-events-none absolute inset-0 ring-1 ring-black/5 rounded-2xl" />
            </div>
          </div>
          {/* 지도 하단 캡션 */}
          <p className="mt-2 text-center text-xs text-neutral-500">
            정확한 길찾기는 위 버튼(카카오/구글/네이버/T맵)으로 여세요.
          </p>
        </div>

        {/* 길찾기 액션: 원형 아이콘 버튼 + 라벨 */}
        <div className="mt-6">
          <ul className="flex flex-wrap items-center justify-center gap-6 md:gap-12">
            {/* Google */}
            <li className="flex flex-col items-center">
              <Button
                asChild
                variant="outline"
                className="size-16 p-0 rounded-full border-2 border-neutral-200 hover:shadow-md transition-shadow">
                <a
                  href={googleDirections(lat, lng)}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open Google Maps for directions"
                  className="flex items-center overflow-hidden justify-center h-full w-full">
                  <img
                    src="/icons/googlemap.png"
                    alt="googlemap"
                    className="size-14 p-3 object-cover"
                    loading="lazy"
                  />
                </a>
              </Button>
              <span className="mt-2 text-xs font-medium text-neutral-600 dark:text-neutral-300">
                Google
              </span>
            </li>

            {/* Naver */}
            <li className="flex flex-col items-center">
              <Button
                asChild
                variant="outline"
                className="size-16 p-0 rounded-full border-neutral-200 hover:shadow-md transition-shadow">
                <a
                  href={naverSearch(name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open Naver Map search"
                  className="flex items-center justify-center h-full w-full">
                  <img
                    src="/icons/navermap.png"
                    alt="navermap"
                    className="size-14 object-cover"
                    loading="lazy"
                  />
                </a>
              </Button>
              <span className="mt-2 text-xs font-medium text-neutral-600 dark:text-neutral-300">
                Naver
              </span>
            </li>

            {/* T map */}
            <li className="flex flex-col items-center">
              <Button
                asChild
                variant="outline"
                className="size-16 p-0 rounded-full border-neutral-200  hover:shadow-md transition-shadow"
                onClick={(e) => {
                  const ua = navigator.userAgent.toLowerCase();
                  const isMobileOrTablet =
                    /iphone|ipad|ipod|android|windows phone|blackberry/.test(
                      ua,
                    );

                  if (!isMobileOrTablet) {
                    e.preventDefault();
                    toast('데스크탑에서는 이용할 수 없습니다.');
                  }
                }}>
                <a
                  href={tDirections(name, lat, lng)}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open T Map for directions"
                  className="flex items-center justify-center h-full w-full">
                  <img
                    src="/icons/tmap.png"
                    alt="tmap"
                    className="size-14 object-cover "
                    loading="lazy"
                  />
                </a>
              </Button>
              <span className="mt-2 text-xs font-medium text-neutral-600 dark:text-neutral-300">
                T map
              </span>
            </li>
            {/* Kakao */}
            <li className="flex flex-col items-center">
              <Button
                asChild
                variant="outline"
                className="size-16 p-0 rounded-full border-neutral-200 hover:shadow-md transition-shadow">
                <a
                  href={kakaoToLink(name, lat, lng)}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open Kakao Map for directions"
                  className="flex items-center justify-center h-full w-full">
                  <img
                    src="/icons/kakaomap.png"
                    alt="kakaomap"
                    className="size-14 object-cover"
                    loading="lazy"
                  />
                </a>
              </Button>
              <span className="mt-2 text-xs font-medium text-neutral-600 dark:text-neutral-300">
                Kakao
              </span>
            </li>
          </ul>
        </div>

        {/* 얇은 구분선 (Invite와 동일 위치/느낌) */}
        <div className="flex justify-center my-8">
          <div className="border-t w-16" />
        </div>

        <ul>
          <li className="flex flex-col justify-center items-start py-4 space-y-2">
            <strong>지하철 안내</strong>
            <span>{data.c.location.subway}</span>
          </li>
          <hr />
          <li className="flex flex-col justify-center items-start py-4 space-y-2">
            <strong>버스 안내</strong>
            <span>{data.c.location.bus}</span>
          </li>
          <hr />
          <li className="flex flex-col justify-center items-start py-4 space-y-2">
            <strong>주차 안내</strong>
            <span>{data.c.location.car}</span>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Location;

// components/NaverMap.tsx
import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { useNaverMaps } from '@/hooks/useNaverMap';

type Props = {
  clientId: string;
  center: { lat: number; lng: number };
  zoom?: number;
  className?: string; // ✅ 외부에서 높이/레이아웃 제어
};

export function NaverMap({ clientId, center, zoom = 10, className }: Props) {
  const { loaded, error } = useNaverMaps(clientId);
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<naver.maps.Map | null>(null);

  useEffect(() => {
    if (!loaded || !mapRef.current) return;
    if (!window.naver?.maps) return;

    if (mapInstanceRef.current) {
      mapInstanceRef.current.setCenter(
        new naver.maps.LatLng(center.lat, center.lng),
      );
      mapInstanceRef.current.setZoom(zoom);
      return;
    }

    mapInstanceRef.current = new naver.maps.Map(mapRef.current, {
      center: new naver.maps.LatLng(center.lat, center.lng),
      zoom,
    });

    new naver.maps.Marker({
      position: new naver.maps.LatLng(center.lat, center.lng),
      map: mapInstanceRef.current,
      title: '센터',
    });

    const onResize = () =>
      mapInstanceRef.current &&
      naver.maps.Event.trigger(mapInstanceRef.current, 'resize');
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [loaded, center.lat, center.lng, zoom]);

  if (error)
    return (
      <div className="text-sm text-red-600">
        지도를 불러오지 못했습니다: {error.message}
      </div>
    );
  if (!loaded)
    return (
      <div
        className={cn(
          'h-[320px] md:h-[380px] w-full animate-pulse rounded-xl bg-neutral-100',
          className,
        )}
      />
    );

  // ✅ 높이/레이아웃은 className으로 통일
  return (
    <div
      ref={mapRef}
      className={cn('h-[320px] md:h-[380px] w-full', className)}
    />
  );
}

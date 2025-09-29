import { useEffect, useMemo, useRef, useState } from 'react';
import { Button } from './ui/button';
import { HeadphoneOff, Headphones } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface Props {
  className?: string;
  loop?: boolean;
  volume?: number;
}

export const SoundButton: React.FC<Props> = ({
  className,
  loop = true,
  volume = 0.3,
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // on: 현재 재생 중인지
  const [on, setOn] = useState(false);

  // 브라우저가 reduce motion을 선호하면(민감 사용자), 기본 볼륨을 더 낮춤(선택)
  const adjustedVolume = useMemo(() => {
    if (typeof window === 'undefined') return volume;
    const reduce =
      window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false;
    return reduce ? Math.min(volume, 0.4) : volume;
  }, [volume]);

  // 오디오 엘리먼트 생성/초기화
  useEffect(() => {
    const a = new Audio();
    //! 음악 파일명 / 변경 전 크기 줄이기
    a.src = '/audio/teddyBearRises.mp3';
    a.loop = loop;
    a.preload = 'auto';
    a.volume = adjustedVolume;
    a.crossOrigin = 'anonymous'; // 외부 CDN을 쓸 수도 있으니 안전하게

    const onPlay = () => setOn(true);
    const onPause = () => setOn(false);
    const onEnded = () => setOn(false);

    a.addEventListener('play', onPlay);
    a.addEventListener('pause', onPause);
    a.addEventListener('ended', onEnded);

    audioRef.current = a;

    return () => {
      a.pause();
      a.removeEventListener('play', onPlay);
      a.removeEventListener('pause', onPause);
      a.removeEventListener('ended', onEnded);
      // a.src = '' // 필요 시 해제
      audioRef.current = null;
    };
  }, [loop, adjustedVolume]);

  // 탭 비활성화 시 살짝 줄였다 복귀
  useEffect(() => {
    const handleVis = () => {
      const a = audioRef.current;
      if (!a) return;
      if (document.visibilityState === 'hidden') {
        a.volume = Math.min(adjustedVolume, 0.1);
      } else {
        a.volume = adjustedVolume;
      }
    };
    document.addEventListener('visibilitychange', handleVis);
    return () => document.removeEventListener('visibilitychange', handleVis);
  }, [adjustedVolume]);

  const toggle = async () => {
    const a = audioRef.current;
    if (!a) return;

    // iOS/Safari 등에서 play()는 사용자 제스처 시에만 허용
    if (a.paused) {
      try {
        await a.play(); // Promise 반환: 실패하면 catch로
        // setOn(true)는 play 이벤트 리스너에서 처리
      } catch (err) {
        // 자동재생 정책, 포맷 미지원 등
        console.error('Audio play failed:', err);
      }
    } else {
      a.pause();
      // setOn(false)는 pause 이벤트 리스너에서 처리
    }
  };

  useEffect(() => {
    toast(on ? '음악을 재생합니다' : '음악을 정지했습니다', {
      duration: 1200,
    });
  }, [on]);

  return (
    <Button
      className={cn(
        'rounded-full bg-neutral-700/80 size-14 fixed right-4 top-4 z-50',
        className,
      )}
      variant="ghost"
      onClick={toggle}
      aria-pressed={on}
      aria-label={on ? 'Turn off music' : 'Turn on music'}
      title={
        on ? 'Music: On (click to turn off)' : 'Music: Off (click to turn on)'
      }>
      {on ? (
        <HeadphoneOff className="size-8" />
      ) : (
        <Headphones className="size-8" />
      )}
    </Button>
  );
};

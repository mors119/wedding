import { useRef } from 'react';
import { useInView } from '@/hooks/useInView';
import { SectionCanvas } from '@/components/SectionCanvas';
import { FireworksManager } from '@/components/Firecracker';
import { useDate } from '@/hooks/useDate';
import { fontStyle } from '@/lib/fonts';
import { data } from '@/constants';
import { DDay } from '@/components/DDay';

interface HeroProps {
  complete: boolean;
}

const Hero = ({ complete }: HeroProps) => {
  const { formatted } = useDate();
  const sectionRef = useRef<HTMLElement | null>(null);
  const inView = useInView(sectionRef, 0.1);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[url(/background.jpg)] bg-cover bg-repeat px-6 py-8">
      {/* 섹션 내용 */}
      <DDay />
      <div className="flex items-center justify-center p-6 pt-12 z-10 flex-col bg-white">
        <img
          src="/pictures/main.jpeg"
          className="mb-4 max-h-[700px] shadow-lg"
        />
        <div
          className="text-center text-2xl md:text-3xl flex flex-col gap-1 font-semibold tracking-wide
                        bg-clip-text text-transparent bg-gradient-to-r from-amber-500 via-rose-500 to-amber-500"
          style={fontStyle.pacifico}>
          <span>We are getting</span>
          <span>married</span>
        </div>
      </div>
      <div
        className="p-4 pb-6 mt-6 text-lg flex flex-col items-center gap-2 text-neutral-700 font-extrabold"
        style={fontStyle.nanumGothic}>
        <p>{formatted}</p>
        <p>{data.c.location.tit}</p>
      </div>

      <SectionCanvas
        active={inView}
        className="absolute inset-0 z-20 pointer-events-none">
        <FireworksManager complete={complete} />
      </SectionCanvas>
    </section>
  );
};
export default Hero;

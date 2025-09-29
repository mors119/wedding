import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';

type SectionCanvasProps = {
  active: boolean; // 섹션이 화면에 보이는지
  className?: string; // 보통 absolute inset-0
  children: React.ReactNode; // 해당 섹션 씬
};

export function SectionCanvas({
  active,
  className,
  children,
}: SectionCanvasProps) {
  // active=false면 아예 Canvas를 언마운트하여 컨텍스트 점유도 줄임
  if (!active) return null;

  return (
    <div className={className ?? 'absolute inset-0 pointer-events-none'}>
      <Canvas
        dpr={[1, 1.25]}
        gl={{
          antialias: true,
          powerPreference: 'high-performance',
        }}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        }}>
        <Suspense fallback={null}>{children}</Suspense>
      </Canvas>
    </div>
  );
}

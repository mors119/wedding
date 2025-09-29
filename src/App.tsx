import { useCallback, useEffect } from 'react';
import { Banner } from './components/Banner';
import { SoundButton } from './components/SoundButton';
import { useImageReady } from './hooks/useImageReady';
import Hero from './modules/hero/Hero';
import Invite from './modules/invite/Invite';
import Info from './modules/info/Info';

import { Contact } from './modules/contact/Contact';

function App() {
  const { error, ready, setComplete, complete } = useImageReady(
    '/banner.jpg',
    8000,
  );

  // 핸들러는 stable reference로 메모이즈 (쓸데없는 리렌더 방지)
  const handleComplete = useCallback(() => setComplete(true), [setComplete]);

  // 배너가 거의 끝나갈 때 코드 미리 받아두기 (전환 체감 속도↑)
  useEffect(() => {
    if (ready && !complete) {
      // 브라우저가 한가할 때 미리 로드
      const idle = (cb: () => void) =>
        'requestIdleCallback' in window
          ? window.requestIdleCallback(cb)
          : setTimeout(cb, 0);

      idle(() => {
        import('./components/SoundButton');
        import('./modules/hero/Hero');
        import('./modules/invite/Invite');
      });
    }
  }, [ready, complete]);

  return (
    <div className="page">
      <main className="w-full">
        {/* 첫 화면 */}
        <Banner ready={ready} error={error} onComplete={handleComplete} />
        {complete && (
          <div>
            <SoundButton />
            <Hero complete={complete} />
            <Invite />
            <Contact />
            <Info />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;

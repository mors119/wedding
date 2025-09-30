import { Divider } from '@/components/Divider';
import { data } from '@/constants';
import { fontStyle } from '@/lib/fonts';
import { cn } from '@/lib/utils';
import { PhoneBtn, SmsBtn } from './Btn';

export const Contact = () => {
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
          Contact
        </h2>

        {/* 장식 디바이더 (Invite와 동일 간격) */}
        <Divider className="my-8" />

        <div className="flex flex-col justify-center items-center gap-8">
          <div className="flex gap-4 justify-center items-center">
            <span>신랑에게 연락하기</span>
            <PhoneBtn number={data.m.self.phone} />
            <SmsBtn number={data.m.self.phone} body="결혼 축하드려요!" />
          </div>

          <div className="flex gap-4 justify-center items-center">
            <span>신부에게 연락하기</span>
            <PhoneBtn number={data.w.self.phone} />
            <SmsBtn number={data.w.self.phone} body="축하드립니다!" />
          </div>
        </div>

        <div className="flex justify-center my-8">
          <div className="border-t w-16" />
        </div>

        <div className="flex justify-center gap-16 md:gap-20">
          <div>
            <h5 className="text-center mb-4 text-blue-400 text-lg font-semibold">
              신랑 측 혼주
            </h5>
            <div className="flex gap-4 flex-col justify-center items-center mb-4">
              <p>
                아버지 <strong className="text-lg">{data.m.papa.name}</strong>
              </p>
              <div className="space-x-4">
                <PhoneBtn number={data.m.papa.phone} />
                <SmsBtn number={data.m.papa.phone} />
              </div>
            </div>
            <div className="flex gap-4 flex-col justify-center items-center mb-4">
              <p>
                어머니 <strong className="text-lg">{data.m.mama.name}</strong>
              </p>
              <div className="space-x-4">
                <PhoneBtn number={data.m.mama.phone} />
                <SmsBtn number={data.m.mama.phone} />
              </div>
            </div>
          </div>
          <div>
            <h5 className="text-center mb-4 text-rose-300 text-lg font-semibold">
              신부 측 혼주
            </h5>
            <div className="flex gap-4 flex-col justify-center items-center mb-4">
              <p>
                아버지 <strong className="text-lg">{data.w.papa.name}</strong>
              </p>
              <div className="space-x-4">
                <PhoneBtn number={data.w.papa.phone} />
                <SmsBtn number={data.w.papa.phone} />
              </div>
            </div>
            <div className="flex gap-4 flex-col justify-center items-center mb-4">
              <p>
                어머니 <strong className="text-lg">{data.w.mama.name}</strong>
              </p>
              <div className="space-x-4">
                <PhoneBtn number={data.w.mama.phone} />
                <SmsBtn number={data.w.mama.phone} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

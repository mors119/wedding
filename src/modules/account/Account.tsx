import { Divider } from '@/components/Divider';
import { data } from '@/constants';
import { fontStyle } from '@/lib/fonts';
import { cn } from '@/lib/utils';

type Props = {
  /** 카드 느낌으로 박스화(그림자+라운드)하고 싶으면 true */
  asCard?: boolean;
  className?: string;
};

const Account = ({ asCard = true, className }: Props) => {
  return (
    <section
      className={cn('w-full flex justify-center', 'px-4 py-8 ', className)}
      aria-labelledby="invite-heading">
      <div
        className={cn(
          'max-w-2xl w-full',
          asCard
            ? 'bg-white/90 backdrop-blur-sm shadow-md shadow-amber-100/40 rounded-2xl border border-amber-100/60'
            : '',
          'px-6 md:px-10 py-10 md:py-12',
        )}
        style={fontStyle.nanumGothic} // 기본 본문 폰트(가독성 위주)
      >
        {/* 헤드라인 */}
        <h2
          id="invite-heading"
          className={cn(
            'text-center',
            'text-2xl md:text-3xl font-semibold tracking-wide',
            'bg-clip-text text-transparent',
            'bg-gradient-to-r from-amber-500 via-rose-400 to-amber-500',
          )}
          style={fontStyle.pacifico}>
          Please join us
        </h2>

        {/* 장식 디바이더 */}
        <Divider className="my-8" />

        {/* 초대 문구 */}
        <div className="text-center text-[17px] md:text-lg leading-relaxed text-neutral-700 px-16 space-y-10">
          <p className="break-keep">{data.c.comment.main}</p>
          <p className="break-keep">{data.c.comment.sub}</p>
          {data.c.comment.sub2 && (
            <p className="break-keep">{data.c.comment.sub2}</p>
          )}
        </div>

        <div className="flex justify-center my-8">
          <div className="border-t w-16 " />
        </div>

        {/* 이름/가족 소개 */}
        <div className="mt-8 md:mt-10 text-center text-[17px] md:text-lg leading-8 text-neutral-800">
          {/* 신랑쪽 */}
          <p className="font-medium">
            <span className="text-neutral-500">{data.m.papa.name}</span>
            <span className="mx-1.5 text-neutral-400">·</span>
            <span className="text-neutral-500">{data.m.mama.name}</span>
            <span className="mx-2 text-sm text-neutral-400 tracking-[1px] align-middle">
              의 아들
            </span>
            <span className="ml-1.5  text-neutral-700">{data.m.self.name}</span>
          </p>
          {/* 신부쪽 */}
          <p className="font-medium">
            <span className="text-neutral-500">{data.w.papa.name}</span>
            <span className="mx-1.5 text-neutral-400">·</span>
            <span className="text-neutral-500">{data.w.mama.name}</span>
            <span className="mx-2 text-sm text-neutral-400 tracking-[5px] align-middle">
              의 딸
            </span>
            <span className="ml-1.5 text-neutral-700">{data.w.self.name}</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Account;

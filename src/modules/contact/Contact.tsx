import { CustomTooltip } from '@/components/CustomTooltip';
import { Divider } from '@/components/Divider';
import { Button } from '@/components/ui/button';
import { fontStyle } from '@/lib/fonts';
import { cn } from '@/lib/utils';
import { Mail, Phone } from 'lucide-react';

export const Contact = () => {
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
          Contact
        </h2>

        {/* 장식 디바이더 (Invite와 동일 간격) */}
        <Divider className="my-8" />

        <div className="flex flex-col justify-center items-center gap-5">
          <div className="flex gap-4 justify-center items-center">
            <span>신랑에게 연락하기</span>
            <CustomTooltip content="전화하기">
              <Button>
                <Phone />
              </Button>
            </CustomTooltip>
            <CustomTooltip content="메시지 보내기">
              <Button>
                <Mail />
              </Button>
            </CustomTooltip>
          </div>
          <div className="flex gap-4 justify-center items-center">
            <span>신부에게 연락하기</span>
            <CustomTooltip content="전화하기">
              <Button>
                <Phone />
              </Button>
            </CustomTooltip>
            <CustomTooltip content="메시지 보내기">
              <Button>
                <Mail />
              </Button>
            </CustomTooltip>
          </div>
        </div>

        <div className="flex justify-center my-8">
          <div className="border-t w-16" />
        </div>

        <div className="flex justify-center gap-10 ">
          <div>
            <div className="flex gap-4 justify-center items-center mb-4">
              <span>아버지</span>
              <CustomTooltip content="전화하기">
                <Button>
                  <Phone />
                </Button>
              </CustomTooltip>
              <CustomTooltip content="메시지 보내기">
                <Button>
                  <Mail />
                </Button>
              </CustomTooltip>
            </div>
            <div className="flex gap-4 justify-center items-center">
              <span>어머니</span>
              <CustomTooltip content="전화하기">
                <Button>
                  <Phone />
                </Button>
              </CustomTooltip>
              <CustomTooltip content="메시지 보내기">
                <Button>
                  <Mail />
                </Button>
              </CustomTooltip>
            </div>
          </div>
          <div>
            <div className="flex gap-4 justify-center items-center mb-4">
              <span>아버지</span>
              <CustomTooltip content="전화하기">
                <Button>
                  <Phone />
                </Button>
              </CustomTooltip>
              <CustomTooltip content="메시지 보내기">
                <Button>
                  <Mail />
                </Button>
              </CustomTooltip>
            </div>
            <div className="flex gap-4 justify-center items-center">
              <span>어머니</span>
              <CustomTooltip content="전화하기">
                <Button>
                  <Phone />
                </Button>
              </CustomTooltip>
              <CustomTooltip content="메시지 보내기">
                <Button>
                  <Mail />
                </Button>
              </CustomTooltip>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

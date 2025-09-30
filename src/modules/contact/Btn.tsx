import { Button } from '@/components/ui/button';
import { CustomTooltip } from '@/components/CustomTooltip';
import { Mail, Phone } from 'lucide-react';

import { telHref, smsHref, isMobile } from '@/utils/phone';
import { toast } from 'sonner'; // 사용중이면

export function PhoneBtn({ number }: { number: string }) {
  return (
    <CustomTooltip content="전화하기">
      <Button asChild>
        <a
          href={telHref(number)}
          onClick={(e) => {
            if (!isMobile()) {
              e.preventDefault();
              navigator.clipboard?.writeText(number);
              toast?.success?.('전화번호를 복사했습니다.'); // 옵션
            }
          }}>
          <Phone />
        </a>
      </Button>
    </CustomTooltip>
  );
}

export function SmsBtn({ number, body }: { number: string; body?: string }) {
  return (
    <CustomTooltip content="메시지 보내기">
      <Button asChild>
        <a href={smsHref(number, body)}>
          <Mail />
        </a>
      </Button>
    </CustomTooltip>
  );
}

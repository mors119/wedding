export const isIOS = () =>
  typeof navigator !== 'undefined' &&
  /iPad|iPhone|iPod/.test(navigator.userAgent);

export const isMobile = () =>
  typeof navigator !== 'undefined' &&
  /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

/** tel: 링크용 — 숫자/+만 남기기 */
export function telHref(num: string) {
  return `tel:${num.replace(/[^+\d]/g, '')}`;
}

/** sms: 링크용 — iOS는 ?body 대신 &body 규칙 */
export function smsHref(num: string, body?: string) {
  const n = num.replace(/[^+\d]/g, '');
  if (!body) return `sms:${n}`;
  const sep = isIOS() ? '&' : '?';
  return `sms:${n}${sep}body=${encodeURIComponent(body)}`;
}

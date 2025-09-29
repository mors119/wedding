import { data } from '@/constants';
import dayjs from 'dayjs';

export const useDate = () => {
  const month = data.c.time.month - 1;

  const event = dayjs(
    new Date(
      data.c.time.year,
      month,
      data.c.time.date,
      data.c.time.hour,
      data.c.time.minute,
    ),
  ).locale('ko');

  const formattedDate = event.format('YYYY년 M월 D일(ddd)'); // 예: 2025년 10월 18일(토)
  const formattedTime = event.format('A h시 mm분');
  const formatted = dayjs(event)
    .locale('ko')
    .format('YYYY년 M월 D일(ddd) A h시 mm분');

  // D-day (오늘 0시 기준 당일까지 남은 일수)
  const now = dayjs();
  const daysUntil = event.startOf('day').diff(now.startOf('day'), 'day'); // 음수면 지남

  // 이벤트 "시각"까지 남은 시간 상세
  const msLeft = event.diff(now); // < 0이면 이미 지남
  const totalMs = Math.max(0, msLeft);
  const hours = Math.floor((totalMs % 86_400_000) / 3_600_000);
  const minutes = Math.floor((totalMs % 3_600_000) / 60_000);

  const dDayLabel =
    daysUntil > 0
      ? `D-${daysUntil}`
      : daysUntil === 0
      ? `D-Day`
      : `D+${Math.abs(daysUntil)}`;

  return {
    formatted,
    formattedDate,
    formattedTime,
    dDayLabel,
    daysUntil,
    hours,
    minutes,
  };
};

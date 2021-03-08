import { useState, useEffect } from 'react';
import { differenceInDays, intervalToDuration, Duration } from 'date-fns';

export function useCountdown(date: Date, countdownInSeconds: boolean) {
  const [timeRemaining, setTimeRemaining] = useState(
    `${differenceInDays(date, new Date())} days`
  );

  useEffect(() => {
    const interval = setInterval(() => {
      if (countdownInSeconds) {
        const duration = intervalToDuration({
          start: new Date(),
          end: date,
        });
        const timeRemaining = formatDistance(duration);

        setTimeRemaining(timeRemaining);
      } else {
        setTimeRemaining(`${differenceInDays(date, new Date())} days`);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [date, countdownInSeconds, setTimeRemaining]);

  return timeRemaining;
}

function formatDistance(duration: Duration) {
  const { years, months, days, hours, minutes, seconds } = duration;
  const time = [];

  if (years) {
    time.push(formatTime(years, 'year'));
  }

  if (months) {
    time.push(formatTime(months, 'month'));
  }

  time.push(formatTime(days, 'day'));
  time.push(formatTime(hours, 'hour'));
  time.push(formatTime(minutes, 'minute'));
  time.push(formatTime(seconds, 'second'));

  return time.join(' ');
}

function formatTime(value: number | undefined, unit: string) {
  if (!value) {
    return `0 ${unit}s`;
  }

  const tail = value === 1 ? '' : 's';

  return `${value} ${unit}${tail}`;
}

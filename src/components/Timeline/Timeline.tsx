import * as React from 'react';
import classnames from 'classnames';
import { format } from 'date-fns';

import { ValidatedStep, ValidatedActivity } from '../../types';
import { useCountdown } from '../../hooks/useCountdown';
import styles from './Timeline.module.css';

interface TimelineProps {
  name: string;
  timeline: ValidatedStep[];
}

export function Timeline({ name, timeline }: TimelineProps) {
  return (
    <ol
      className={classnames(styles.steps, {
        [styles['steps--single']]: timeline.length === 1,
      })}
      aria-label={`Timeline of when restrictions will be eased in ${name}`}
    >
      {timeline.map((step, index) => (
        <TimelineStep key={step._id} countdown={index === 0} step={step} />
      ))}
    </ol>
  );
}

interface TimelineStepProps {
  countdown: boolean;
  step: ValidatedStep;
}

function TimelineStep({ step, countdown }: TimelineStepProps) {
  return (
    <li className={styles.step} data-testid="step">
      <section className={styles.content}>
        <Countdown
          key={`${step._id}:${step.date}`}
          countdownInSeconds={countdown}
          date={step.date}
        />
        <ul className={styles.activities}>
          {step.activities.map((activity) => (
            <ActivityItem key={activity._id} activity={activity} />
          ))}
        </ul>
      </section>
    </li>
  );
}

interface CountdownProps {
  date: string;
  countdownInSeconds: boolean;
}

function Countdown({ date, countdownInSeconds }: CountdownProps) {
  const _date = new Date(date);
  const timeRemaining = useCountdown(_date, countdownInSeconds);

  return (
    <header className={styles.countdown}>
      <h2 className={styles.time}>
        <span className="sr-only">In</span> {timeRemaining}
      </h2>
      <div className={styles.date}>{format(_date, 'do MMMM')}</div>
    </header>
  );
}

interface ActivityItemProps {
  activity: ValidatedActivity;
}

function ActivityItem({ activity }: ActivityItemProps) {
  return (
    <li className={styles.activity} data-testid="activity">
      <span className={styles.activity__icon} aria-hidden="true">
        {activity.emoji}
      </span>
      {activity.description}
    </li>
  );
}

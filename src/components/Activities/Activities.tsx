import * as React from 'react';

import { Activity } from '../../generated/graphql';

import styles from './Activities.module.css';

interface ActivitiesProps {
  activities: Activity[];
}

export function Activities({ activities }: ActivitiesProps) {
  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <header>
          <h2 className={styles.title}>What am I allowed to do now?</h2>
        </header>
        <ul className={styles.activities}>
          {activities.map((activity) => (
            <ActivityItem key={activity._id} activity={activity} />
          ))}
        </ul>
      </div>
    </section>
  );
}

interface ActivityProps {
  activity: Activity;
}

function ActivityItem({ activity }: ActivityProps) {
  return (
    <li key={activity._id} className={styles.activity}>
      <span className={styles.activity__icon} aria-hidden="true">
        {activity.emoji}
      </span>
      {activity.description}
    </li>
  );
}

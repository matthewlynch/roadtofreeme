import * as React from 'react';

import { Activity } from '../../generated/graphql';

import styles from './Activities.module.css';

interface ActivitiesProps {
  activities: Activity[];
  countryName: string;
}

export function Activities({ activities, countryName }: ActivitiesProps) {
  return (
    <section className={styles.container} data-testid="activities">
      <div className={styles.content}>
        <header>
          <h2 className={styles.title}>
            What am I allowed to do in {countryName} now?
          </h2>
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
    <li
      key={activity._id}
      className={styles.activity}
      data-testid="allowed-activity"
    >
      <span className={styles.activity__icon} aria-hidden="true">
        {activity.emoji}
      </span>
      {activity.description}
    </li>
  );
}

import * as React from 'react';

import styles from './Container.module.css';

interface ContainerProps {
  children: React.ReactNode;
}

export function Container({ children }: ContainerProps) {
  return <div className={styles.container}>{children}</div>;
}

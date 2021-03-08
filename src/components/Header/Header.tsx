import * as React from 'react';

import styles from './Header.module.css';

interface HeaderProps {
  heading: string;
  description: string;
}

export function Header({ heading, description }: HeaderProps) {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>{heading}</h1>
      <p className={styles.intro}>{description}</p>
    </header>
  );
}

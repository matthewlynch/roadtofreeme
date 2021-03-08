import * as React from 'react';

import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.copy}>
        This data has been gathered on a best effort basis from the BBC &
        devolved nation sites. It may not be 100% accurate. Please check the{' '}
        <ExternalLink
          href="https://www.gov.uk/guidance/national-lockdown-stay-at-home"
          target="_blank"
        >
          government website
        </ExternalLink>{' '}
        for more information.
      </div>
      <div className={styles.copy}>
        Made by{' '}
        <ExternalLink href="https://github.com/matthewlynch">
          Matt Lynch
        </ExternalLink>
        ,{' '}
        <ExternalLink href="https://www.linkedin.com/in/sharad-jalota/">
          Sharad Jalota
        </ExternalLink>{' '}
        &{' '}
        <ExternalLink href="https://www.linkedin.com/in/james-grant-b1867375/">
          James Grant
        </ExternalLink>
        .
      </div>
      <div className={styles.copy}>
        View source on{' '}
        <ExternalLink href="https://github.com/matthewlynch/roadtofreeme">
          GitHub
        </ExternalLink>
      </div>
      <div className={styles.copy}>
        Built with React & Next.js. Site hosted on{' '}
        <ExternalLink href="https://vercel.com/">Vercel</ExternalLink>. Content
        hosted on{' '}
        <ExternalLink href="https://www.sanity.io/">Sanity.io</ExternalLink>.
      </div>
    </footer>
  );
}

interface ExternalLinkProps {
  children: React.ReactNode;
  href: string;
  target?: string;
}

function ExternalLink({ children, href, target }: ExternalLinkProps) {
  const rel = target === '_blank' ? 'noopener noreferrer' : 'noopener';
  return (
    <a href={href} className={styles.link} rel={rel} target={target}>
      {children}
    </a>
  );
}

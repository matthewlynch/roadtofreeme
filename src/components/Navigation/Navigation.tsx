import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { NavigationLink } from '../../types';

import styles from './Navigation.module.css';

interface NavigationProps {
  links: NavigationLink[];
}

export function Navigation({ links }: NavigationProps) {
  return (
    <nav className={styles.container}>
      <h2 className="sr-only">See information for</h2>
      <ul className={styles.links}>
        {links.map((link) => (
          <CountryLink key={link._id} link={link} />
        ))}
      </ul>
    </nav>
  );
}

interface CountryLinkProps {
  link: NavigationLink;
}

function CountryLink({ link }: CountryLinkProps) {
  const { asPath } = useRouter();
  const href = link.indexPage ? '/' : `/${link.pathname}`;
  const isActive = asPath === href;

  return (
    <li className={styles.links__item}>
      <Link href={href}>
        <a className={styles.link} aria-current={isActive}>
          <span className={styles.link__icon} aria-hidden="true">
            {link.emoji}
          </span>
          {link.countryName}
        </a>
      </Link>
    </li>
  );
}

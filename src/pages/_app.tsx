import 'focus-visible';
import type { AppProps } from 'next/app';

import '../styles/focus-visible.css';
import '../styles/base.css';

export default function RoadToFreeMeApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

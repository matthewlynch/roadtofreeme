import * as React from 'react';
import { default as NextHead } from 'next/head';

interface HeadProps {
  title?: string;
  description?: string;
  url?: string;
  canonical?: string | null;
}

export function SEO({ title, description, url, canonical }: HeadProps) {
  return (
    <NextHead>
      {title && (
        <>
          <title>{title}</title>
          <meta property="og:heading" content={title} />
        </>
      )}
      {!!description && (
        <>
          <meta name="description" content={description} />
          <meta property="og:description" content={description} />
        </>
      )}
      {!!canonical && <link rel="canonical" href={canonical} />}
      <meta property="og:url" content={url} />
    </NextHead>
  );
}

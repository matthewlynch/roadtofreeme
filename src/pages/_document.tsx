import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document';

export default class RoadToFreeMeDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <link type="text/plain" rel="author" href="/humans.txt" />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/fav/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/fav/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/fav/favicon-16x16.png"
          />
          <link rel="manifest" href="/fav/site.webmanifest" />
          <link
            rel="mask-icon"
            href="/fav/safari-pinned-tab.svg"
            color="#273c75"
          />
          <link rel="shortcut icon" href="/fav/favicon.ico" />
          <meta name="msapplication-TileColor" content="#2b5797" />
          <meta name="msapplication-config" content="/fav/browserconfig.xml" />
          <meta name="theme-color" content="#ffffff" />
          <meta property="og:type" content="website" />
          <meta
            property="og:image"
            content="https://roadtofree.me/social-card.png"
          />
          <meta name="twitter:card" content="summary_large_image" />
          {process.env.NODE_ENV === 'production' && (
            <script
              src="https://cdn.usefathom.com/script.js"
              data-site={process.env.FATHOM_SITE_ID}
              data-spa="auto"
              defer
            />
          )}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital@0;1&family=Playfair+Display&display=swap"
          as="style"
          onLoad={function (
            /* eslint-disable no-unused-vars */ this: HTMLLinkElement /* eslint-enable no-unused-vars */,
          ) {
            this.onload = null;
            this.rel = "stylesheet";
          }}
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital@0;1&family=Playfair+Display&display=swap"
          rel="stylesheet"
        />
        <meta property="og:site_name" content="Aqiela & Syed" />
        <meta property="og:title" content="Aqiela & Syed" />
        <meta property="og:description" content="Aqiela & Syed's Invitation" />
        <meta property="og:url" content="https://aqielasyed.azushi.com/" />
        <meta property="og:type" content="website" />

        <meta
          property="og:image"
          content="https://aqielasyed.azushi.com/og-logo.png"
        />
        <meta
          property="og:image:secure_url"
          content="https://aqielasyed.azushi.com/og-logo.png"
        />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="100" />
        <meta property="og:image:height" content="100" />
        <meta property="og:image:alt" content="Aqiela & Syed's Logo" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

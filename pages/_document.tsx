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
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

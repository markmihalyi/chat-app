import { Head, Html, Main, NextScript } from "next/document";

import React from "react";

const Document = () => {
  return (
    <Html>
      <Head>
        <meta charSet="utf-8" />
        <meta name="robots" content="all" />
        <link rel="shortcut icon" href="/logos/logo.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/logos/logo_180.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/logos/logo_32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/logos/logo_16.png"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,200;1,300;1,400;1,500;1,600;1,700;1,800&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;

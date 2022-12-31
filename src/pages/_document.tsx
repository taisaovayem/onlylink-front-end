import { Html, Head, Main, NextScript } from 'next/document';
import * as React from 'react';

export default function Document() {
  return (
    <Html lang="vi">
      <Head>
        <link rel="shortcut icon" href="/favicon.png" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

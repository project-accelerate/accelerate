import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document'
import Theme from '../components/Theme'

export default class MyDocument extends Document {
  render() {
    return (
      <html lang="en">
        <Head>
          <style jsx global>
            {`
              [data-reactroot] {
                min-height: 100vh;
              }

              body {
                margin: 0;
              }
            `}
          </style>
          <Theme />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

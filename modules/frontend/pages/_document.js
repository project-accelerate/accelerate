/* eslint-disable react/no-danger */

import React from "react";
import Document, { Head, Main, NextScript } from "next/document";
import serializeConfig from "serialize-javascript";
import JssProvider from "react-jss/lib/JssProvider";
import { pick } from "lodash";
import getPageContext from "../lib/material-ui/getPageContext";
import { frontendEnvironment } from "../package.json";

const clientEnv = pick(process.env, frontendEnvironment);

class MyDocument extends Document {
  render() {
    const { pageContext } = this.props;

    return (
      <html lang="en" dir="ltr">
        <Head>
          <meta charSet="utf-8" />

          {/* Send configuration to client */}
          <script
            dangerouslySetInnerHTML={{
              __html: `window.ENV=${serializeConfig(clientEnv)}`
            }}
          />

          {/* Use minimum-scale=1 to enable GPU rasterization */}
          <meta
            name="viewport"
            content={
              "user-scalable=0, initial-scale=1, " +
              "minimum-scale=1, width=device-width, height=device-height"
            }
          />

          {/* PWA primary color */}
          <meta
            name="theme-color"
            content={pageContext.theme.palette.primary[500]}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

MyDocument.getInitialProps = ctx => {
  // Resolution order
  //
  // On the server:
  // 1. page.getInitialProps
  // 2. document.getInitialProps
  // 3. page.render
  // 4. document.render
  //
  // On the server with error:
  // 2. document.getInitialProps
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. page.getInitialProps
  // 3. page.render

  // Get the context of the page to collected side effects.
  const pageContext = getPageContext();
  const page = ctx.renderPage(Component => props => (
    <JssProvider
      registry={pageContext.sheetsRegistry}
      generateClassName={pageContext.generateClassName}
    >
      <Component pageContext={pageContext} {...props} />
    </JssProvider>
  ));

  return {
    ...page,
    pageContext,
    styles: (
      <style
        id="jss-server-side"
        dangerouslySetInnerHTML={{
          __html: pageContext.sheetsRegistry.toString()
        }}
      />
    )
  };
};

export default MyDocument;

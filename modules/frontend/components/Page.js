import React from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'

export default function PageWrapper({ children }) {
  return (
    <div>
      <Head>
        <meta name="viewport" content="width=device-width" />
      </Head>
        
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
      {children}
    </div>
  )
}

PageWrapper.propTypes = {
  children: PropTypes.node.isRequired
}

export function Theme() {
  return (
    <style jsx global>
      {`
        body {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
          font-size: 14px;
        }
      `}
    </style>
  )
}

import React from 'react'
import PropTypes from 'prop-types'
import withRoot from '../lib/material-ui/withRoot';

function PageWrapper({ children }) {
  return (
    <div>
      <style jsx global>
        {`
          [data-reactroot] {
            min-height: 100vh;
          }

          body {
            margin: 0;
            background-color: #303030;
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

export default withRoot(PageWrapper)

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

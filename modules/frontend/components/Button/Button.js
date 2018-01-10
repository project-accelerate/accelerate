import * as React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'

export function LinkButton({ children, href, prefetch, ...props }) {
  return (
    <Link href={href} prefetch={prefetch}>
      <a {...props}>
        <style jsx>
          {`
            a {
              display: inline-block;
              padding: calc((26px - 1rem) / 2) 16px;
            
              text-decoration: none;
              font-weight: 500;
              border-radius: 2px;
            }
            
            a, a:active, a:focus, a:visited {
              color: crimson;
            }
          
            a:focus, a:hover {
              outline: 0;
              box-shadow: 2px 2px 5px 2px rgba(0,0,0,0.1);
              background: none;
            }
          `}
        </style>
        {children}
      </a>
    </Link>
  )
}

LinkButton.propTypes = {
  children: PropTypes.node,
  prefetch: PropTypes.boolean,
  href: PropTypes.string
}

LinkButton.defaultProps = {
  children: '',
  prefetch: false,
  href: undefined
}

import React from 'react'
import PropTypes from 'prop-types'

export function CardListHeader({ children, ...props }) {
  return (
    <h3 {...props}>
      <style jsx>
        {`
          h3 {
            margin: 0;
            padding: 0.75rem 1rem;
            background-color: rgba(201, 27, 62, 0.5);
            color: white;
          }
        `}
      </style>
      {children}
    </h3>
  )
}

CardListHeader.propTypes = { children: PropTypes.node }
CardListHeader.defaultProps = { children: undefined }

export function Card({ children, ...props }) {
  return (
    <section className="root" {...props}>
      <style jsx>
        {`
          .root {
            padding: 1em;
          }

          .root:not(:last-of-type) {
            border-bottom: 1px solid lightgrey;
          }
        `}
      </style>
      {children}
    </section>
  )
}

Card.propTypes = { children: PropTypes.node }
Card.defaultProps = { children: undefined }

export function CardTitle({ children, ...props }) {
  return (
    <h4 {...props}>
      <style jsx>
        {`
          h4 {
            margin: 0;
            font-weight: 500;
            font-size: 1.75rem;
          }
        `}
      </style>
      {children}
    </h4>
  )
}

CardTitle.propTypes = { children: PropTypes.node }
CardTitle.defaultProps = { children: undefined }

export function CardContent({ children, ...props }) {
  return (
    <p {...props}>
      {children}
    </p>
  )
}

CardContent.propTypes = { children: PropTypes.node }
CardContent.defaultProps = { children: undefined }

export function CardFooter({ children, ...props }) {
  return (
    <div className="root" {...props}>
      <style jsx>
        {`
          .root {
            text-align: right;
          }
        `}
      </style>
      {children}
    </div>
  )
}

CardFooter.propTypes = { children: PropTypes.node }
CardFooter.defaultProps = { children: undefined }

export function CardFooterItem({ children, ...props }) {
  return (
    <div className="root" {...props}>
      <style jsx>
        {`
          .root {
            display: inline-block;
          }

          .root:not(:last-child) {
            margin-right: 1rem;
          }
        `}
      </style>
      {children}
    </div>
  )
}

CardFooterItem.propTypes = { children: PropTypes.node }
CardFooterItem.defaultProps = { children: undefined }

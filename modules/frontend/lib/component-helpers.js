import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

/**
 * Utility for defining a container component (one that has no layout logic and simply
 * applies a css class to a container.
 */
export function createWrapper(name, { type, baseClass }) {
  function CardComponent({ children, className }) {
    return React.createElement(
      type,
      { className: classnames(baseClass, className) },
      ...(Array.isArray(children) ? children : [children])
    )
  }

  CardComponent.displayName = name
  
  CardComponent.propTypes = {
    className: PropTypes.string,
    children: PropTypes.string,
  }

  CardComponent.defaultProps = {
    className: undefined,
    children: undefined
  }

  return CardComponent
}


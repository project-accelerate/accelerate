import React from 'react'
import PropTypes from 'prop-types'
import Theme from '../components/Theme'

export function StoryContaner({ children }) {
  return (
    <div>
      <Theme />
      {children}
    </div>
  )
}

StoryContaner.propTypes = {
  children: PropTypes.node.isRequired
}

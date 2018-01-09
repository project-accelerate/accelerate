import React from 'react'
import Theme from '../components/Theme'

export function StoryContaner({ children }) {
  return (
    <div>
      <Theme />
      {children}
    </div>
  )
}

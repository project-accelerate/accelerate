import * as React from 'react'
import { configure, addDecorator } from '@storybook/react';
import { Theme } from '../components/Page'

function loadStories() {
  const storyContext = require.context('../components', true, /\.stories\.js$/)
  storyContext.keys().forEach(storyContext)
}

addDecorator((storyFn) => (
  <div>
    <Theme />
    {storyFn()}
  </div>
))

configure(loadStories, module);

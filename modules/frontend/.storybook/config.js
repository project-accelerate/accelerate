import { configure } from '@storybook/react';

function loadStories() {
  const storyContext = require.context('../components', true, /\.stories\.js$/)
  storyContext.keys().forEach(storyContext)
}

configure(loadStories, module);

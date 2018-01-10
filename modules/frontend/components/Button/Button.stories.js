/* eslint-disable import/no-extraneous-dependencies */

import React from 'react'
import { storiesOf } from '@storybook/react'
import { LinkButton } from './Button'
import { StoryContaner } from '../../lib/StoryContainer';

storiesOf('Components/Controls/LinkButton', module)
  .add('standard', () => (
    <StoryContaner>
      <LinkButton href="/foo">Click Me</LinkButton>
    </StoryContaner>
  ))

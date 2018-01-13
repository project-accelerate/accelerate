/* eslint-disable import/no-extraneous-dependencies */

import React from 'react'
import { storiesOf } from '@storybook/react'
import { LinkButton } from './Button'

storiesOf('Components/Controls/LinkButton', module)
  .add('standard', () => (
    <LinkButton href="/foo">Click Me</LinkButton>
  ))

/* eslint-disable import/no-extraneous-dependencies */

import React from 'react'
import { storiesOf } from '@storybook/react'
import Hero from './Hero'
import { StoryContaner } from '../../lib/StoryContainer';

storiesOf('Components/Hero', module)
  .add('standard', () => (
    <StoryContaner>
      <Hero
        header="Get Involved"
        subheader="Find and join with people organising near you"
        controls={
          <div>
            Events happening on: <input type="date" />
          </div>
        }
      />
    </StoryContaner>
  ))

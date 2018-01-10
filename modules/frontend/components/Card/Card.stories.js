/* eslint-disable import/no-extraneous-dependencies */

import React from 'react'
import { storiesOf } from '@storybook/react'
import ipsum from 'lorem-ipsum'
import { Card, CardTitle, CardContent, CardFooter, CardFooterItem } from './Card'
import { StoryContaner } from '../../lib/StoryContainer'

storiesOf('Components/Card', module)
  .add('list', () => (
    <StoryContaner>
      <Card>
        <CardTitle>Card 1</CardTitle>
        <CardContent>
          {ipsum({ count: 5 })}
        </CardContent>
        <CardFooter>
          <CardFooterItem>Share</CardFooterItem>
          <CardFooterItem>Delete</CardFooterItem>
        </CardFooter>
      </Card>
      <Card>
        <CardTitle>Card 2</CardTitle>
        <CardContent>
          {ipsum({ count: 5 })}
        </CardContent>
        <CardFooter>
          <CardFooterItem>Share</CardFooterItem>
          <CardFooterItem>Delete</CardFooterItem>
        </CardFooter>
      </Card>
      <Card>
        <CardTitle>Card 3</CardTitle>
        <CardContent>
          {ipsum({ count: 5 })}
        </CardContent>
        <CardFooter>
          <CardFooterItem>Share</CardFooterItem>
          <CardFooterItem>Delete</CardFooterItem>
        </CardFooter>
      </Card>
    </StoryContaner>
  ))

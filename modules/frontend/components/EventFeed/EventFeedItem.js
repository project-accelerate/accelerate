import React from 'react'
import PropTypes from 'prop-types'
import { graphql, createFragmentContainer } from 'react-relay'
import { Card, CardTitle, CardContent, CardFooter, CardFooterItem } from '../Card/Card';
import { LinkButton } from '../Button/Button';

export function EventFeedItemView({ event }) {
  return (
    <Card>
      <CardTitle>{event.title}</CardTitle>
      <CardContent>{event.organiser}</CardContent>
      <CardContent>{event.postcode}</CardContent>
      <CardContent>{event.shortDescription}</CardContent>
      <CardFooter>
        <CardFooterItem>
          <LinkButton href={{ pathname: '/event', query: { id: event.id }}}>See More</LinkButton>
        </CardFooterItem>
      </CardFooter>
    </Card>
  )
}

EventFeedItemView.propTypes = {
  event: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    organiser: PropTypes.string.isRequired,
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
    shortDescription: PropTypes.string.isRequired,
    postcode: PropTypes.string.isRequired,
  }).isRequired
}

export default createFragmentContainer(EventFeedItemView, {
  event: graphql`
    fragment EventFeedItem_event on Event {
      id
      title
      organiser
      startDate
      endDate
      shortDescription
      postcode
    }
  `
})

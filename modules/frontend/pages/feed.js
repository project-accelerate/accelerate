import React from 'react'
import { graphql } from 'react-relay'
import withData from '../lib/withData'
import { fragment, urlInfo } from '../lib/types';
import EventFeed from '../components/EventFeed/EventFeed'
import Hero from '../components/Hero/Hero'
import PageWrapper from '../components/Page';

export function FeedPage({ eventFeed }) {
  return (
    <PageWrapper>
      <Hero
        header="Get Involved!"
        subheader="Find and join with people organising near you"
      />

      <EventFeed events={eventFeed} />
    </PageWrapper>
  )
}

FeedPage.propTypes = {
  eventFeed: fragment.isRequired
}

export default withData({
  query: graphql`
    query feed_Query($postcode: String!) {
      eventFeed(postcode: $postcode, distanceInKM: 10) {
        ...EventFeed_events
      }
    }
  `
})(FeedPage)

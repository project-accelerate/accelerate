import React from 'react'
import { graphql } from 'react-relay'
import withData from '../lib/withData'
import { fragment } from '../lib/types'
import EventFeed from '../components/EventFeed/EventFeed'
import Hero from '../components/Hero/Hero'

export function HomePage({ eventFeed }) {
  return (
    <div>
      <Hero
        header="Get Involved!"
        subheader="Find and join with people organising near you"
      />
      <EventFeed events={eventFeed} />
    </div>
  )
}

HomePage.propTypes = {
  eventFeed: fragment.isRequired
}

export default withData(HomePage, {
  query: graphql`
    query pages_homePageQuery {
      eventFeed(postcode: "BN2 9XE") {
        ...EventFeed_events
      }
    }
  `
})

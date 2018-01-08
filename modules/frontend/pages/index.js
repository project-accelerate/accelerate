import React from 'react'
import { graphql } from 'react-relay'
import withData from '../lib/withData'
import { fragment } from '../lib/types'
import EventFeed from '../components/EventFeed/EventFeed'

export function HomePage({ eventFeed }) {
  return (
    <div>
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

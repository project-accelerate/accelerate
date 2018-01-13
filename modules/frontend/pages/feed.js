import React from 'react'
import Router from 'next/router'
import { graphql } from 'react-relay'
import withData from '../lib/withData'
import { fragment, urlInfo } from '../lib/types';
import EventFeed from '../components/EventFeed/EventFeed'
import Hero from '../components/Hero/Hero'
import PageWrapper from '../components/Page'

export function FeedPage({ eventFeed, url }) {
  const handlePostcodeChange = (event) => {
    event.preventDefault()
    Router.replace({
      ...url,
      query: { postcode: event.currentTarget.querySelector('input').value }
    })
  }
  return (
    <PageWrapper>
      <Hero
        header="Get Involved!"
        subheader="Find and join with people organising near you"
        controls={
          <form onSubmit={handlePostcodeChange}>
            Showing events near: <input defaultValue={url.query.postcode} />
          </form>
        }
      />

      <EventFeed events={eventFeed} />
    </PageWrapper>
  )
}

FeedPage.propTypes = {
  eventFeed: fragment.isRequired,
  url: urlInfo.isRequired
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

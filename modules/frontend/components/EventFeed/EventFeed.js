import React from 'react'
import { graphql, createFragmentContainer } from 'react-relay'
import { connection, fragment } from '../../lib/types';
import EventFeedItem from './EventFeedItem'

export function EventFeedView({ events }) {
  return (
    <div>
      {
        events.edges.map(({ node }) => (
          <EventFeedItem key={node.id} event={node} />
        ))
      }
    </div>
  )
}

EventFeedView.propTypes = {
  events: connection(fragment).isRequired
}

export default createFragmentContainer(EventFeedView, {
  events: graphql`
    fragment EventFeed_events on EventFeed {
      edges {
        node {
          id
          ...EventFeedItem_event
        }
      }
    }
  `
})

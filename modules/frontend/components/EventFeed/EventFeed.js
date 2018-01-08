import React from 'react'
import PropTypes from 'prop-types'
import { graphql, createFragmentContainer } from 'react-relay'
import { connection } from '../../lib/types'

export function EventFeedView({ events }) {
  return (
    <div>
      {events.edges.map(e => <span>Node: {e.node.id}<br /></span>)}
    </div>
  )
}

EventFeedView.propTypes = {
  events: connection(
    PropTypes.shape({
      id: PropTypes.string.isRequired
    })
  ).isRequired
}

export default createFragmentContainer(EventFeedView, {
  events: graphql`
    fragment EventFeed_events on EventFeed {
      edges {
        node {
          id
        }
      }
    }
  `
})

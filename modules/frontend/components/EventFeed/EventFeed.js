import React from "react";
import PropTypes from "prop-types";
import { graphql, createFragmentContainer } from "react-relay";
import EventFeedItem from "./EventFeedItem";

export function EventFeedView({ events }) {
  return (
    <div>
      {events.edges.map(({ node }) => (
        <EventFeedItem key={node.id} event={node} />
      ))}
    </div>
  );
}

EventFeedView.propTypes = {
  events: PropTypes.object.isRequired
};

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
});

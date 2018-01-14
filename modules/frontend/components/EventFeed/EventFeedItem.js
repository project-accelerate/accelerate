import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { graphql, createFragmentContainer } from "react-relay";
import Card, { CardActions, CardContent } from "material-ui/Card";
import Button from "material-ui/Button";
import Typography from "material-ui/Typography";

export function EventFeedItemView({ event }) {
  return (
    <Card style={{ marginBottom: "1rem" }}>
      <CardContent>
        <Typography
          type="title"
          component="h3"
          style={{ marginBottom: "1rem" }}
        >
          {event.title}
        </Typography>
        <Typography
          type="subheading"
          component="p"
          style={{ marginBottom: "1rem" }}
        >
          {event.organiser}
        </Typography>
        <Typography component="p">{event.shortDescription}</Typography>
      </CardContent>
      <CardActions>
        <Link href={{ pathname: "/event", query: { id: event.id } }}>
          <Button dense>See More</Button>
        </Link>
      </CardActions>
    </Card>
  );
}

EventFeedItemView.propTypes = {
  event: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    organiser: PropTypes.string.isRequired,
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
    shortDescription: PropTypes.string.isRequired,
    postcode: PropTypes.string.isRequired
  }).isRequired
};

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
});

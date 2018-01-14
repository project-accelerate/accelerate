import React from "react";
import PropTypes from "prop-types";
import { graphql } from "react-relay";
import Typography from "material-ui/Typography";
import Button from "material-ui/Button/Button";
import Paper from "material-ui/Paper/Paper";
import withData from "../lib/withData";
import EventFeed from "../components/EventFeed/EventFeed";
import Hero from "../components/Hero/Hero";
import PageWrapper from "../components/Page";

export function FeedPage({ eventFeed }) {
  return (
    <PageWrapper>
      <Hero
        header="Get Involved"
        subheader="Meet people nearby who care about the same things as you"
        controls={
          <Paper
            square
            elevation={5}
            style={{
              whitespace: "nowrap",
              paddingLeft: "1rem",
              opacity: "0.8"
            }}
          >
            Showing meetups near <strong>BN2</strong> <Button>Change</Button>
          </Paper>
        }
      />
      <Typography type="headline" component="h3" style={{ margin: "1rem" }}>
        Happening Soon
      </Typography>
      <EventFeed events={eventFeed} />
    </PageWrapper>
  );
}

FeedPage.propTypes = {
  eventFeed: PropTypes.object.isRequired
};

export default withData({
  query: graphql`
    query feed_Query($postcode: String!) {
      eventFeed(postcode: $postcode, distanceInKM: 10) {
        ...EventFeed_events
      }
    }
  `
})(FeedPage);

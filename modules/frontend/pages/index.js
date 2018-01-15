import React from "react";
import PropTypes from "prop-types";
import { compose } from "recompose";
import { graphql } from "react-relay";
import Typography from "material-ui/Typography";
import Button from "material-ui/Button/Button";
import Paper from "material-ui/Paper/Paper";
import withData from "../lib/withData";
import EventFeed from "../components/EventFeed/EventFeed";
import Hero from "../components/Hero/Hero";
import PageWrapper from "../components/Page";
import lookupPostcode from "../lib/lookupPostcode";
import { withInitialProps } from "../lib/withInitialProps";

export function FeedPage({ eventFeed, postcode }) {
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
            Showing meetups near <strong>{postcode}</strong>{" "}
            <Button>Change</Button>
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
  eventFeed: PropTypes.object.isRequired,
  postcode: PropTypes.string.isRequired
};

export default compose(
  withData({
    query: graphql`
      query feed_Query($postcode: String!) {
        eventFeed(postcode: $postcode, distanceInKM: 10) {
          ...EventFeed_events
        }
      }
    `
  }),
  withInitialProps({
    postcode: async ({ req, query }) => {
      const FALLBACK = "E1 7RA";

      if (query.postcode) {
        return query.postcode;
      }

      if (!req || !req.geolocation) {
        return FALLBACK;
      }

      const [longitude, latitude] = req.geolocation;
      return (await lookupPostcode(longitude, latitude)) || FALLBACK;
    }
  })
)(FeedPage);

import React from "react";
import Router from "next/router";
import PropTypes from "prop-types";
import { compose, withStateHandlers } from "recompose";
import { graphql } from "react-relay";
import Postcode from "postcode";
import Typography from "material-ui/Typography";
import Button from "material-ui/Button/Button";
import Paper from "material-ui/Paper/Paper";
import EventFeed from "../components/EventFeed/EventFeed";
import EventSearchForm from "../components/EventSearchForm/EventSearchForm";
import Hero from "../components/Hero/Hero";
import { withInitialProps } from "../lib/withInitialProps";
import { lookupPostcode } from "../lib/lookupPostcode";
import { pageRoot } from "../lib/page/page";

function FeedPage({
  eventFeed,
  postcode,
  showSearch,
  hideSearch,
  searchVisible
}) {
  return (
    <div>
      <EventSearchForm
        open={searchVisible}
        defaultValue={postcode}
        onCancel={hideSearch}
        onCommit={nextPostcode => {
          if (!nextPostcode) {
            return;
          }

          hideSearch();
          Router.replace({
            pathname: "/feed",
            query: { postcode: nextPostcode }
          });
        }}
      />
      <Hero
        key="front"
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
            Showing meetups near{" "}
            <strong>{new Postcode(postcode).district()}</strong>{" "}
            <Button onClick={showSearch}>Change</Button>
          </Paper>
        }
      />
      <Typography type="headline" component="h3" style={{ margin: "1rem" }}>
        Happening Soon
      </Typography>
      <EventFeed events={eventFeed} />
    </div>
  );
}

FeedPage.propTypes = {
  eventFeed: PropTypes.object.isRequired,
  postcode: PropTypes.string.isRequired,
  showSearch: PropTypes.func.isRequired,
  hideSearch: PropTypes.func.isRequired,
  searchVisible: PropTypes.bool.isRequired
};

export default compose(
  pageRoot({
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

      // Check the url param first
      if (query.postcode) {
        return query.postcode;
      }

      // If we didin't get a geoip from the gateway, fall back to the default
      if (!req || !req.geolocation) {
        return FALLBACK;
      }

      // Otherwise use the geoip to look up a postcode and fall back to default if it fails
      const { longitude, latitude } = req.geolocation;
      return (await lookupPostcode({ longitude, latitude })) || FALLBACK;
    }
  }),
  withStateHandlers(
    { searchVisible: false },
    {
      showSearch: () => () => ({ searchVisible: true }),
      hideSearch: () => () => ({ searchVisible: false })
    }
  )
)(FeedPage);

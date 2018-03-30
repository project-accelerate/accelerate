import * as React from "react";
import { graphql } from "react-relay";
import PropTypes from "prop-types";
import { format } from "date-fns";
import Typography from "material-ui/Typography";
import withStyles from "material-ui/styles/withStyles";
import Card, { CardContent } from "material-ui/Card";
import { compose } from "recompose";
import { pageRoot } from "../lib/page/page";

const styles = theme => ({
  paragraph: {
    marginBottom: theme.spacing.unit
  },
  heading: {
    marginBottom: theme.spacing.unit
  },
  section: {
    marginTop: theme.spacing.unit * 2
  }
});

function EventPage({ event, classes }) {
  return (
    <Card>
      <CardContent>
        <Typography
          className={classes.heading}
          variant="headline"
          component="h1"
        >
          {event.title}
        </Typography>
        <Typography className={classes.heading} variant="body1" component="h2">
          Organised by <strong>{event.organiser}</strong>
        </Typography>
        <Typography className={classes.heading} variant="body1" component="h3">
          {getTimings(event)}
        </Typography>
        <Typography className={classes.heading} variant="body1" component="p">
          {event.address.split(`\n`).map(line => (
            <span>
              {line}
              <br />
            </span>
          ))}
          {event.postcode}
        </Typography>
        <section className={classes.section}>
          {event.longDescription.split("\n").map(paragraph => (
            <Typography
              className={classes.paragraph}
              variant="body2"
              component="p"
            >
              {paragraph}
            </Typography>
          ))}
        </section>
      </CardContent>
    </Card>
  );
}

function getTimings({ startDate, endDate }) {
  // XXX: Handle case where start date isn't equal to end date
  //      and add some nice things like checking if this is today

  return [
    format(startDate, "ddd Do MMM, h:mma"),
    "-",
    format(endDate, "h:mma")
  ].join(" ");
}

EventPage.propTypes = {
  event: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

export default compose(
  pageRoot({
    query: graphql`
      query event_Query($id: ID!) {
        event(id: $id) {
          title
          address
          organiser
          startDate
          endDate
          longDescription
          postcode
        }
      }
    `
  }),
  withStyles(styles)
)(EventPage);

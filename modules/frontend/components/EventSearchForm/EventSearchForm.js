import React, { Component } from "react";
import PropTypes from "prop-types";
import { compose } from "recompose";
import Grid from "material-ui/Grid";
import TextField from "material-ui/TextField";
import withStyles from "material-ui/styles/withStyles";
import Typography from "material-ui/Typography/Typography";
import Button from "material-ui/Button/Button";

const styles = theme => ({
  grid: {
    height: "100%",
    borderBottom: "2px solid red",
    padding: theme.spacing.unit * 2
  },
  field: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  postcode: {
    width: "6rem"
  }
});

class EventSearchForm extends Component {
  static propTypes = {
    classes: PropTypes.string.isRequired,
    value: PropTypes.object,
    onChange: PropTypes.func.isRequired
  };

  static defaultProps = {
    value: {}
  };

  setValue(key, value) {
    this.props.onChange({
      ...this.props.value,
      [key]: value
    });
  }

  handleChange = key => event => {
    this.setValue(key, event.target.value);
  };

  handleUseGeo = () => {
    navigator.geolocation.getCurrentPosition(
      async ({ coords: { longitude, latitude } }) => {
        const postcode = await (longitude, latitude);
        if (postcode) {
          this.setValue({ postcode });
        }
      }
    );
  };

  render() {
    const { classes, value } = this.props;

    return (
      <Grid container alignItems="center" justify="center">
        <Grid item>
          <Typography classNames={classes.row} type="display1" component="h1">
            Enter your location.
          </Typography>
        </Grid>
        <Grid item>
          <Typography classNames={classes.row} type="body2" component="p">
            Enter the first part of your postcode to find meetups, events and
            organisations near you.
          </Typography>
        </Grid>

        <Grid item>
          <TextField
            id="postcode"
            className={classes.postcode}
            value={value.postcode}
            onChange={this.handleChange("name")}
            margin="normal"
          />

          <Button onClick={this.handleUseGeo}>Use current location</Button>
        </Grid>
      </Grid>
    );
  }
}

export default compose(withStyles(styles))(EventSearchForm);

import React, { Component } from "react";
import PropTypes from "prop-types";
import TextField from "material-ui/TextField";
import { compose } from "recompose";
import withStyles from "material-ui/styles/withStyles";
import Typography from "material-ui/Typography/Typography";
import Button from "material-ui/Button/Button";

const style = {
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  }
};

class EventSearchForm extends Component {
  static propTypes = {
    classes: PropTypes.string.isRequired,
    value: PropTypes.object,
    onChange: PropTypes.func.isRequired
  };

  static defaultProps = {
    value: {}
  };

  handleChange = key => value => {
    this.props.onChange({
      ...this.props.value,
      [key]: value
    });
  };

  handleUseGeo = () => {
    navigator.geolocation.getCurrentPosition(
      async ({ coords: { longitude, latitude } }) => {
        const result = await fetch(
          `http://api.postcodes.io/postcodes?lon=${longitude}&lat=${latitude}`
        );
        if (!result.ok) {
          return;
        }

        const { result: [hit] } = await result.json();

        if (hit) {
          const changePostcode = this.handleChange("postcode");
          changePostcode(`hit.postcode`);
        }
      }
    );
  };

  render() {
    const { classes, value } = this.props;

    return (
      <form className={classes.form} noValidate autoComplete="off">
        <Typography type="body1" component="p">
          Enter the first part of your postcode to find meetups, events and
          unions happening near you.
        </Typography>

        <TextField
          id="postcode"
          label="Name"
          className={classes.textField}
          value={value.name}
          onChange={this.handleChange("name")}
          margin="normal"
        />

        <Button onClick={this.handleUseGeo}>Use current location</Button>
      </form>
    );
  }
}

export default compose(withStyles(style))(EventSearchForm);

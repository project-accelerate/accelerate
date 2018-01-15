import React, { Component } from "react";
import PropTypes from "prop-types";

export class StateWrapper extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    defaultValue: PropTypes.any.isRequired
  };

  state = { value: this.props.defaultValue };

  handleChange = change => {
    this.setState({ value: change });
  };

  render() {
    return React.cloneElement(
      React.Children.only(this.props.children),
      { value: this.state.value, onChange: this.handleChange },
      null
    );
  }
}

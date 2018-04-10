import React, { Component } from "react";
import PropTypes from "prop-types";

/**
 * Wraps a storybook story in a relatively positioned div of a given
 * height so that it can be sized by its parent without necessarily
 * taking up the whole screen in storybook.
 */
export function withHeight(height) {
  return storyFn => (
    <div style={{ position: "relative", height }}>{storyFn()}</div>
  );
}

/**
 * Storybook data wrapper to bind the onChange and value props
 * of a component so that state changes are shown in the storybook.
 */
export function withStateWrapper(storyFn) {
  return <StateWrapper>{storyFn()}</StateWrapper>;
}

class StateWrapper extends Component {
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

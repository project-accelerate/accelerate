import React from "react";
import PropTypes from "prop-types";
import { compose } from "recompose";
import { withStyles } from "material-ui/styles";
import withRoot from "../lib/material-ui/withRoot";

const styles = {
  "@global": {
    body: {
      fontFamily:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
      fontSize: "14px",
      margin: 0,
      backgroundColor: "#303030"
    }
  }
};
function PageWrapper({ children }) {
  return <div>{children}</div>;
}

PageWrapper.propTypes = {
  children: PropTypes.node.isRequired
};

export default compose(withRoot, withStyles(styles))(PageWrapper);

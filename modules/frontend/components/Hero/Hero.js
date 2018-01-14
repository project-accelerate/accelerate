import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";

const styles = {
  root: {
    position: "relative",
    borderBottom: "2px solid red",
    height: "66vh",

    color: "white",
    textAlign: "center"
  },
  bg: {
    filter: "blur(3px)",
    position: "absolute",
    zIndex: "-1",

    backgroundImage: "url('/static/get-involved.jpg')",
    backgroundPositiondefault: "bottom center",
    backgroundSize: "cover",
    width: "100%",
    height: "100%"
  },
  spacer: {
    display: "block",

    width: "100%"
  },
  content: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",

    backgroundColor: "rgba(200, 50, 50, 0.1)",
    width: "100%",
    height: "100%"
  },
  h1: {
    margin: "0",
    marginBottom: "0.5rem",

    fontSize: "2.5rem",
    textTransform: "uppercase",

    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.6)"
  },
  h2: {
    margin: "0",

    fontWeight: "400",

    textShadow: "1px 1px 2px rgba(0, 0, 0, 0.8)"
  },
  controls: {
    marginTop: "2rem"
  }
};

function Hero({ header, subheader, controls, classes }) {
  return (
    <section className={classes.root}>
      <div className={classes.bg} />
      <div className={classes.content}>
        <span className={classes.spacer} />
        <h1 className={classes.h1}>{header}</h1>
        <h2 className={classes.h2}>{subheader}</h2>
        <div className={classes.controls}>{controls}</div>
      </div>
    </section>
  );
}

export default withStyles(styles)(Hero);

Hero.propTypes = {
  classes: PropTypes.object.isRequired,
  header: PropTypes.node,
  subheader: PropTypes.node,
  controls: PropTypes.node
};

Hero.defaultProps = {
  header: PropTypes.null,
  subheader: PropTypes.null,
  controls: PropTypes.null
};

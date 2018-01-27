/* eslint-disable import/no-extraneous-dependencies */

const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "development.env") });
require("dotenv").config({
  path: path.join(__dirname, "development.default.env")
});

require("babel-polyfill");
const express = require("express");
const { frontend, render } = require("./index");
const { compileRelay } = require("./scripts/tasks");

// Start the relay compiler in watch mode
compileRelay({ watch: true });

frontend.prepare().then(() => {
  const server = express();

  // Stub out the geoip location, as localhost won't work.
  server.use((req, res, next) => {
    req.geolocation = getDebugGeolocation();
    next();
  });

  server.get("*", render);
  server.listen(process.env.PORT);
});

/**
 * Get lat/long coordinates from the environment.
 */
function getDebugGeolocation() {
  try {
    if (process.env.GEOIP) {
      const [longitude, latitude] = JSON.parse(process.env.GEOIP);
      return { longitude, latitude };
    }

    return undefined;
  } catch (error) {
    return undefined;
  }
}

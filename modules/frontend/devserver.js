/* eslint-disable import/no-extraneous-dependencies */

const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "development.env") });
require("dotenv").config({
  path: path.join(__dirname, "development.default.env")
});

require("babel-polyfill");
const express = require("express");
const proxy = require("express-http-proxy");
const url = require("url");
const { withUser } = require("accelerate-authentication");
const cookieParser = require("cookie-parser");
const { createFrontend } = require("./");
const { compileRelay } = require("./scripts/tasks");

// Start the relay compiler in watch mode
compileRelay({ watch: true });

const { server, render } = createFrontend();

server.prepare().then(() => {
  const app = express();

  // Stub out the geoip location, as localhost won't work.
  app.use((req, res, next) => {
    req.geolocation = getDebugGeolocation();
    next();
  });

  server.post("/login", proxyToBackend());
  server.post("/graphql", proxyToBackend());
  server.get("*", cookieParser(), withUser(), render);

  server.listen(process.env.PORT);
});

function proxyToBackend() {
  const { host, protocol } = url.parse(process.env.BACKEND_URL);
  return proxy(host, { https: protocol === "https:" });
}

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

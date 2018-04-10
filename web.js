require("dotenv").config();
require("babel-polyfill");

const express = require("express");
const geoip = require("geoip-lite");
const { EventEmitter } = require("events");
const { createBackend } = require("./modules/api");
const { createFrontend } = require("./modules/frontend");

const { PORT = 3000 } = process.env;
const { server, render } = createFrontend({ dev: false });

server.prepare().then(() => {
  const app = express();
  app.enable("trust proxy");

  app.use((req, res, next) => {
    try {
      const geo = geoip.lookup(req.ip);

      if (geo && geo.ll) {
        const [latitude, longitude] = geo.ll;
        req.geolocation = { latitude, longitude };
      }
    } catch (err) {
      process.stdderr.write(`Error resolving IP: ${err.message}\n`);
    }

    next();
  });

  app.get("/", (req, res) => {
    res.redirect("/feed", 301);
  });

  app.use(createBackend());
  app.get("*", render);

  const appServer = app.listen(PORT, () => {
    module.exports.emit("started", appServer);
  });
});

module.exports = new EventEmitter();

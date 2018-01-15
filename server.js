require("dotenv").config();
require("babel-polyfill");

const express = require("express");
const geoip = require("geoip-lite");
const { createBackend } = require("./modules/api");
const { frontend, render } = require("./modules/frontend");

const { PORT = 3000 } = process.env;

frontend.prepare().then(() => {
  const server = express();
  server.enable("trust proxy");

  server.use((req, res, next) => {
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

  server.get("/", (req, res) => {
    res.redirect("/feed", 301);
  });

  server.use(createBackend());
  server.get("*", render);

  server.listen(PORT);
});

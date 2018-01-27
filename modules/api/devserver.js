/* eslint-disable import/no-extraneous-dependencies */

const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "development.env") });
require("dotenv").config({
  path: path.join(__dirname, "development.default.env")
});

require("babel-polyfill");
require("babel-core/register");

const express = require("express");
const { createBackend } = require("./src/api");

const app = express();
app.use(createBackend());

app.listen(process.env.PORT, () => {
  process.stderr.write(
    `accelerate-api started on http://localhost:${process.env.PORT}\n`
  );
  process.stderr.write(
    `API documentation & playground served from http://localhost:${
      process.env.PORT
    }/graphql-ui\n`
  );
});

/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */

if (process.env.NODE_ENV !== "production") {
  const path = require("path");

  require("dotenv").config({
    path: path.join(__dirname, "..", "development.env")
  });
  require("dotenv").config({
    path: path.join(__dirname, "..", "development.default.env")
  });
}

export * from "./withUser";
export * from "./loginEndpoint";
export * from "./authDirectives";

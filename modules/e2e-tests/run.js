/* eslint-disable global-require */

const { execSync } = require("child_process");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({
    path: "./development.env"
  });

  require("dotenv").config({
    path: "./development.default.env"
  });
}

const browsers = process.env.E2E_TEST_BROWSERS;

execSync(
  `testcafe ${browsers} --screenshots ./failures --screenshots-on-fails tests/**/*.test.js`
);

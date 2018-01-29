/* eslint-disable global-require */

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: "./db/development.env" });
  require("dotenv").config({
    path: "./db/development.default.env"
  });
}

module.exports = {
  client: "pg",
  connection: process.env.DATABASE_URL,
  seeds: {
    directory: "db/seeds"
  },
  migrations: {
    directory: "db/migrations"
  }
};

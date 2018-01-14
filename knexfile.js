require("dotenv").config();

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

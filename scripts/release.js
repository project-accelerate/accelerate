const { execSync } = require("child_process");

if (
  process.env.HEROKU_APP_NAME &&
  process.env.HEROKU_APP_NAME.match(/^accelerate-dev-pr/)
) {
  // In review apps, we drop the database and start from scratch on each commit.
  execSync("npm run db:revert", { stdio: "inherit" });
  execSync("npm run db:migrate", { stdio: "inherit" });
  execSync("npm run db:seed", { stdio: "inherit" });
} else {
  // Otherwise, we just run our migrations.
  execSync("npm run db:migrate", { stdio: "inherit" });
}

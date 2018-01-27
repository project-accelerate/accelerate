const { execSync, spawnSync } = require("child_process");
const { isString } = require("util");

const SCHEMA_PATH = require.resolve("accelerate-api/schema.graphql");

exports.compileRelay = function compileRelay({ watch }) {
  const command = [
    "relay-compiler",
    "--src .",
    "--include 'pages/**'",
    "--include 'components/**'",
    "--exclude '**/__generated__/**'",
    `--schema "${SCHEMA_PATH}"`,
    "--watchman false",
    watch && "--watch"
  ]
    .filter(isString)
    .join(" ");

  if (watch) {
    compileRelay({ watch: false });
    spawnSync(command, { stdio: "inherit" });
  } else {
    execSync(command, { stdio: "inherit" });
  }
};

exports.bundle = function bundle() {
  execSync("next build", { stdio: "inherit" });
};

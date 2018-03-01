require("babel-polyfill");

require("dotenv").config({ path: "development.env" });
require("dotenv").config({ path: "development.default.env" });

const { spawn } = require("child_process");
const { createBackend } = require("accelerate-api");
const express = require("express");

const app = express();
app.use(createBackend());

app.listen(process.env.PORT, error => {
  if (error) {
    process.stderr.write(error.message);
    process.stderr.write("\n");
    process.exit(1);
  }

  try {
    spawn("jest", ["--runInBand", "--forceExit"], { stdio: "inherit" })
      .on("exit", code => process.exit(code))
      .on("error", () => process.exit(1));
  } catch (err) {
    process.exit(1);
  }
});

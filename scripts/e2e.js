const { exec } = require("child_process");

process.env.PORT = 8000;

require("../web").on("started", () => {
  exec("npm test", { cwd: "modules/e2e-tests" }, (error, stdout) => {
    process.stdout.write(stdout);
    process.exit(error ? 1 : 0);
  });
});

const { execSync } = require("child_process");
const path = require("path");

runTests({ moduleName: "frontend" });

function runTests({ moduleName }) {
  const modulePath = path.join(__dirname, "..", "modules", moduleName);
  const codecov = path.join(__dirname, "..", "node_modules", ".bin", "codecov");

  execSync("npm test", { cwd: modulePath, stdio: "inherit" });

  if (process.env.CI) {
    execSync(codecov, { cwd: modulePath, stdio: "inherit" });
  }
}

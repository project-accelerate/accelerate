const { execSync } = require("child_process");
const path = require("path");

const includeIntegationTests = process.argv.some(
  arg => arg === "--integration"
);

const submitCoverage = process.argv.some(arg => arg === "--submitCoverage");

runTests({ moduleName: "frontend" });
runTests({
  moduleName: "api",
  testCommand: includeIntegationTests ? "test:integration" : "test"
});

function runTests({ moduleName, testCommand = "test" }) {
  const modulePath = path.join(__dirname, "..", "modules", moduleName);
  const codecov = path.join(__dirname, "..", "node_modules", ".bin", "codecov");

  execSync(`yarn ${testCommand}`, { cwd: modulePath, stdio: "inherit" });

  if (submitCoverage) {
    execSync(codecov, { cwd: modulePath, stdio: "inherit" });
  }
}

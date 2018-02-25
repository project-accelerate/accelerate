const { execSync } = require("child_process");
const path = require("path");

// Ordering matters here!
// If module A is a dependency of module B, A must appear after B
bootstrapModule("api");
bootstrapModule("api-interface");
bootstrapModule("frontend");

/**
 * Install the module's dependencies and run its build script
 */
function bootstrapModule(moduleName) {
  const modulePath = path.join(__dirname, "..", "modules", moduleName);

  execSync("yarn", {
    cwd: modulePath,
    stdio: "inherit"
  });
  execSync("yarn build", { cwd: modulePath, stdio: "inherit" });
}

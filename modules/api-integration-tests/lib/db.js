/* eslint-env jest */

import { execSync } from "child_process";
import * as path from "path";

export function setupDatabase() {
  execSync("yarn db:migrate", { cwd: path.resolve("../.."), stdio: "inherit" });
}

export function teardownDatabase() {
  execSync("yarn db:revert", { cwd: path.resolve("../.."), stdio: "inherit" });
}

export function withUniqueDatabase() {
  beforeEach(setupDatabase);
  afterEach(teardownDatabase);
}

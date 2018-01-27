const { compileRelay, bundle } = require("./tasks");

compileRelay({ watch: false });
bundle();

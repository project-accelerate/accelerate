const fetch = require("node-fetch");
const fs = require("fs");

const COUNT = 500;
const LOCATIONS_SEED_FILE = "db/seeds/data/locations.json";

async function fetchLocations() {
  const locations = loadLocations();

  for (let i = 0; i < COUNT; i += 1) {
    const response = await fetch("http://api.postcodes.io/random/postcodes/");
    if (!response.ok) {
      process.stderr.write("Failed to generate location\n");
      process.exit(1);
    }

    const { result } = await response.json();
    if (result.latitude && result.longitude && result.postcode) {
      locations.push(result);
    }

    if (i % 100 === 0) {
      process.stderr.write("Failed to generate location\n");
      process.stderr.write(`generated ${i} of COUNT\n`);
      fs.writeFileSync(LOCATIONS_SEED_FILE, JSON.stringify(locations), "utf8");
    }
  }
}

function loadLocations() {
  try {
    return JSON.parse(fs.readFileSync(LOCATIONS_SEED_FILE, "utf8"));
  } catch (_) {
    return [];
  }
}

fetchLocations();

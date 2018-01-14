const uuid = require("uuid").v4;
const generate = require("./data/generate");
const postgis = require("knex-postgis");

const EVENT_COUNT = process.env.DATABASE_SEED_EVENT_COUNT || 1000;

exports.seed = async db => {
  await db("event").del();
  const gis = postgis(db);

  for (let i = 0; i < EVENT_COUNT; i += 1) {
    if (i % 100 === 0) {
      process.stderr.write(`Generated ${i} of ${EVENT_COUNT} events\n`);
    }

    const dates = generate.dates();
    const streetName = generate.streetNames();
    const venueName = generate.venueNames();
    const location = generate.location();
    const town = getTown(location);

    await db("event").insert([
      {
        id: uuid(),
        title: generate.eventTitle(),
        organiser: generate.eventOrganiser(),
        start_date: dates.startDate.toISOString(),
        end_date: dates.endDate.toISOString(),
        description: generate.eventDescription(),
        address: [venueName, streetName, town].join("\n"),
        postcode: location.postcode,
        location: gis.point(location.longitude, location.latitude),
        extra_information: "TODO",
        suitability_information: JSON.stringify([])
      }
    ]);
  }
};

function getTown(location) {
  return (
    location.parish && location.parish.replace(/\(.*\)/g, "").split(",")[0]
  );
}

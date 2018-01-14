exports.up = async db => {
  await db.raw("CREATE EXTENSION IF NOT EXISTS postgis");

  await db.schema.createTable("event", table => {
    table
      .uuid("id")
      .primary()
      .notNullable();
    table.text("title").notNullable();
    table.text("organiser").notNullable();
    table.dateTime("start_date").notNullable();
    table.dateTime("end_date").notNullable();
    table.text("description").notNullable();
    table.text("address").notNullable();
    table.text("postcode").notNullable();
    table.specificType("location", "geography").notNullable();
    table.text("extra_information").notNullable();
    table.jsonb("suitability_information").notNullable();
  });

  // Used for paginating event feed results
  await db.raw("CREATE INDEX event_sdid ON event (start_date, id)");
};

exports.down = async db => {
  await db.schema.dropTable("event");
};

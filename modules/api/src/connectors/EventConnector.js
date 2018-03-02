import {
  db,
  gis,
  isLessThan,
  distanceFrom,
  pair,
  sortColumn,
  sortClauses,
  toCamelCase,
  fromCamelCase,
  columnIsGreaterThan
} from "../lib/db";
import { createBatchingGetById } from "../lib/connectorUtils";

export default class EventConnector {
  getById = createBatchingGetById({
    async loadResources(ids) {
      return db
        .select("*")
        .from("event")
        .whereIn("id", ids)
        .then(toCamelCase);
    }
  });

  /** Insert a new event into the database */
  async create({ event: { location, ...eventProps } }) {
    const event = {
      ...eventProps,
      location: gis.makePoint(location.longitude, location.latitude)
    };

    await db("event").insert([fromCamelCase(event)]);
  }

  /** Get events near to a location */
  nearbyEvents({ location, distanceInKM, startDate, startId, limit }) {
    const distanceInMeters = distanceFrom("location", location);

    return db
      .select("id", "start_date", db.select(distanceInMeters).as("distance"))
      .from("event")
      .where(isLessThan(distanceInMeters, distanceInKM * 1000))
      .modify(q => {
        if (startDate && startId) {
          q.andWhere(
            columnIsGreaterThan(
              "(start_date, id)",
              pair(new Date(startDate), startId)
            )
          );
        }
      })
      .orderByRaw(
        sortClauses(sortColumn("start_date", "asc"), sortColumn("id", "asc"))
      )
      .limit(limit)
      .then(toCamelCase);
  }
}

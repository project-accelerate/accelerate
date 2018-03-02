import uuid from "uuid";
import { log } from "../lib/logger";
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

export default class EventTableConnector {
  getById = createBatchingGetById({
    async loadResources(ids) {
      log.debug("EventConnector.getById", ids);

      return db
        .select("*")
        .from("event")
        .whereIn("id", ids)
        .then(toCamelCase);
    }
  });

  /** Insert a new event into the database */
  async create(props) {
    log.debug("EventConnector.create", props);

    const { location, startDate, endDate, ...eventProps } = props;

    const event = {
      ...eventProps,
      id: uuid(),
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      location: gis.makePoint(location.longitude, location.latitude)
    };

    await db("event").insert([fromCamelCase(event)]);
    return event;
  }

  /** Get events near to a location */
  nearbyEvents(props) {
    log.debug("EventConnector.create", props);

    const { location, distanceInKM, startDate, startId, limit } = props;

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

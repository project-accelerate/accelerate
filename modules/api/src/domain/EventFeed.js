import { encodeCursor, decodeCursor } from "../lib/cursor";
import { Model } from "./Model";
import { Event } from "./Event";

export class EventFeed extends Model {
  static async forPostcode(query, context) {
    const { postcode, distanceInKM, cursor, limit = 10 } = query;
    const { PostcodeConnector, EventTableConnector } = context.connectors;

    const location = await PostcodeConnector.getById(postcode);

    if (!location) {
      throw new Error("Invalid postcode");
    }

    const { startDate, startId } = decodeCursor(cursor);

    const events = await EventTableConnector.nearbyEvents({
      location,
      distanceInKM,
      limit,
      startDate,
      startId
    });

    return new EventFeed({ events }, context);
  }

  get edges() {
    return this.events.map(eventData => ({
      node: new Event(eventData.id, this.context),
      cursor: encodeCursor({
        startDate: eventData.startDate,
        startId: eventData.id
      }),
      distance: eventData.distance
    }));
  }
}

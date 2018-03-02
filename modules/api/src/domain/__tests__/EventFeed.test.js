/* eslint-env jest */

import { EventFeed } from "../EventFeed";
import { Event } from "../Event";
import { encodeCursor } from "../../lib/cursor";
import {
  validPostcode,
  eventStartDate,
  fakeConnectors
} from "./lib/fakeContext";

describe("EventFeed", () => {
  describe("forPostcode", () => {
    const context = {};

    beforeEach(() => {
      context.connectors = fakeConnectors();
    });

    it("should return events for postcode", async () => {
      const feed = await EventFeed.forPostcode(
        { postcode: validPostcode, distanceInKM: 10 },
        context
      );

      expect(feed.edges).toEqual([
        {
          node: new Event("1", context),
          cursor: encodeCursor({ startDate: eventStartDate, startId: "1" }),
          distance: 10
        },
        {
          node: new Event("2", context),
          cursor: encodeCursor({ startDate: eventStartDate, startId: "2" }),
          distance: 20
        },
        {
          node: new Event("3", context),
          cursor: encodeCursor({ startDate: eventStartDate, startId: "3" }),
          distance: 30
        }
      ]);
    });

    it("should use pagination cursor", async () => {
      await EventFeed.forPostcode(
        {
          postcode: validPostcode,
          distanceInKM: 10,
          cursor: encodeCursor({ startDate: eventStartDate, startId: "1" })
        },
        context
      );

      expect(
        context.connectors.EventTableConnector.nearbyEvents
      ).toHaveBeenCalledWith(
        expect.objectContaining({
          startDate: eventStartDate.toJSON(),
          startId: "1"
        })
      );
    });

    it("should throw for invalid postcode", async () => {
      await expect(
        EventFeed.forPostcode(
          {
            postcode: "123",
            distanceInKM: 10,
            cursor: encodeCursor({ startDate: eventStartDate, startId: "1" })
          },
          context
        )
      ).rejects.toThrow();
    });
  });
});

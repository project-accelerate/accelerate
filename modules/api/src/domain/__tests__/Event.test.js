/* eslint-env jest */

import { Event } from "../Event";
import {
  fakeConnectors,
  validPostcode,
  validPostcodeLocation,
  createdObjectId
} from "./lib/fakeContext";

describe("Event", () => {
  const context = {};
  const otherEventProps = { a: 1, b: 2 };

  describe("create", () => {
    it("should create the event and return the Event object", async () => {
      context.connectors = fakeConnectors();

      const event = await Event.create(
        { postcode: validPostcode, ...otherEventProps },
        context
      );

      expect(
        context.connectors.EventTableConnector.create
      ).toHaveBeenCalledWith({
        location: validPostcodeLocation,
        postcode: validPostcode,
        ...otherEventProps
      });

      expect(event).toEqual(new Event(createdObjectId, context));
    });

    it("should throw for invalid postcode", async () => {
      context.connectors = fakeConnectors();

      await expect(
        Event.create({ postcode: "", ...otherEventProps }, context)
      ).rejects.toThrow();
    });
  });

  it("should return short description", async () => {
    context.connectors = {
      EventTableConnector: {
        getById: () => ({
          description: "foo"
        })
      }
    };

    const event = new Event("123", context);
    expect(typeof await event.shortDescription).toBe("string");
  });

  it("should return long description", async () => {
    context.connectors = {
      EventTableConnector: {
        getById: () => ({
          description: "foo"
        })
      }
    };

    const event = new Event("123", context);
    expect(typeof await event.longDescription).toBe("string");
  });
});

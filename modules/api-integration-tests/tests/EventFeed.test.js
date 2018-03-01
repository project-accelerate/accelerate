/* eslint-env jest */

import { times, last } from "lodash";
import { endOfTomorrow, addHours } from "date-fns";
import { withUniqueDatabase } from "../lib/db";
import { createEventRequest, defaultTestPostcode } from "../lib/data";
import { createEvent } from "../lib/mutations";
import { eventFeed } from "../lib/queries";

const PAGE_SIZE = 10;
const TEST_EVENT_COUNT = 15;

describe("eventFeed", () => {
  withUniqueDatabase();

  const events = times(TEST_EVENT_COUNT, i =>
    createEventRequest({
      title: `event ${i}`,
      startDate: addHours(endOfTomorrow(), i)
    })
  );

  beforeEach(async () => {
    // Seed with all the test events
    jest.setTimeout(20000);
    await Promise.all(events.map(event => createEvent({ event })));
  });

  it("should return first page of events, ordered by start time/date", async () => {
    const { eventFeed: { edges } } = await eventFeed({
      postcode: defaultTestPostcode,
      distanceInKM: 10
    });

    const expectedEvents = events.slice(0, PAGE_SIZE);

    expect(edges).toHaveLength(PAGE_SIZE);
    expectedEvents.forEach((event, i) => {
      expect(edges[i].node).toMatchObject({ title: event.title });
    });
  });

  it("should return next page of events when requested", async () => {
    const firstPage = await eventFeed({
      postcode: defaultTestPostcode,
      distanceInKM: 10
    });

    const { eventFeed: { edges } } = await eventFeed({
      postcode: defaultTestPostcode,
      distanceInKM: 10,
      cursor: last(firstPage.eventFeed.edges).cursor
    });

    const nextPageStart = PAGE_SIZE;
    const nextPageSize = TEST_EVENT_COUNT - nextPageStart;
    const expectedEvents = events.slice(
      nextPageStart,
      nextPageStart + nextPageSize
    );

    expect(edges).toHaveLength(nextPageSize);

    expectedEvents.forEach((event, i) => {
      expect(edges[i].node).toMatchObject({ title: event.title });
    });
  });
});

import * as faker from "faker";
import { addHours, endOfTomorrow } from "date-fns";

/** Default postcode given to generic test events */
export const defaultTestPostcode = "OX26 2UB";

/** Request to create a generic test event */
export function createEventRequest(overrides = {}) {
  return {
    title: faker.lorem.lines(1),
    organiser: faker.lorem.lines(1),
    startDate: addHours(endOfTomorrow(), 1),
    endDate: addHours(endOfTomorrow(), 3),
    description: faker.lorem.paragraphs(3),
    postcode: defaultTestPostcode,
    address: "Some Place\n\nSome Road\nSome City",
    extraInformation: faker.lorem.paragraph(),
    suitabilityInformation: [],
    ...overrides
  };
}

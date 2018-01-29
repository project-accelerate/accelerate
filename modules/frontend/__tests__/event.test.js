/* eslint-env jest */

import React from "react";
import faker from "faker/locale/en_GB";
import renderer from "react-test-renderer";
import EventPage from "../pages/event";

describe("/event", () => {
  it("should match snapshot", () => {
    const tree = renderer.create(
      <EventPage
        event={{
          title: faker.lorem.words(3),
          address: faker.address.streetAddress(),
          organiser: faker.lorem.words(3),
          startDate: "2018-01-23T20:00:00.000Z",
          endDate: "2018-01-23T22:00:00.000Z",
          longDescription: faker.lorem.paragraphs(5),
          postcode: faker.address.zipCode()
        }}
      />
    );

    expect(tree.toJSON()).toMatchSnapshot();
  });
});

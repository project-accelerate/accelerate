/* eslint-env jest */

import React from "react";
import { times, noop } from "lodash";
import faker from "faker/locale/en_GB";
import renderer from "react-test-renderer";
import FeedPage from "../pages/feed";

const feedData = times(10, () => ({
  node: {
    id: faker.random.uuid(),
    title: faker.lorem.words(3),
    address: faker.address.streetAddress(),
    organiser: faker.lorem.words(3),
    startDate: "2018-01-23T20:00:00.000Z",
    endDate: "2018-01-23T22:00:00.000Z",
    shortDescription: faker.lorem.paragraphs(5),
    postcode: faker.address.zipCode()
  }
}));

describe("/feed", () => {
  it("should display with events in feed", () => {
    const tree = renderer.create(
      <FeedPage
        postcode={faker.address.zipCode()}
        eventFeed={{ edges: feedData }}
        showSearch={noop}
        hideSearch={noop}
        searchVisible={false}
      />
    );

    expect(tree.toJSON()).toMatchSnapshot();
  });

  it("should display with no events in feed", () => {
    const tree = renderer.create(
      <FeedPage
        postcode={faker.address.zipCode()}
        eventFeed={{ edges: [] }}
        showSearch={noop}
        hideSearch={noop}
        searchVisible={false}
      />
    );

    expect(tree.toJSON()).toMatchSnapshot();
  });
});

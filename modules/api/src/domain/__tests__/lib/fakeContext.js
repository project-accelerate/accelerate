/* eslint-env jest */

export const validPostcode = "AB1 2CD";
export const validPostcodeLocation = {
  latitude: 123,
  longitude: 456
};
export const eventStartDate = new Date();
export const createdObjectId = "created-object";

export function fakeConnectors() {
  const connectors = {
    PostcodeConnector: {
      getById: postcode => {
        if (postcode === validPostcode) {
          return validPostcodeLocation;
        }

        return undefined;
      }
    },
    EventTableConnector: {
      create: props => ({
        ...props,
        id: createdObjectId
      }),
      nearbyEvents: query => {
        const { location } = query;

        if (location.latitude === 123 && location.longitude === 456) {
          return [
            { id: "1", distance: 10, startDate: eventStartDate },
            { id: "2", distance: 20, startDate: eventStartDate },
            { id: "3", distance: 30, startDate: eventStartDate }
          ];
        }

        return undefined;
      }
    }
  };

  Object.keys(connectors).forEach(typeKey => {
    const connector = connectors[typeKey];
    Object.keys(connector).forEach(propKey => {
      if (typeof connector[propKey] === "function") {
        jest.spyOn(connector, propKey);
      }
    });
  });

  return connectors;
}

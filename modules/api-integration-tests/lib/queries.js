import { query } from "./query";

export function eventFeed(opts) {
  return query({
    query: `
      query EventFeed($postcode: String!, $distanceInKM: Float!, $cursor: String) {
        eventFeed(postcode: $postcode, distanceInKM: $distanceInKM, cursor: $cursor) {
          edges {
            cursor
            node {
              title
            }
          }
        }
      }
    `,
    variables: opts
  });
}

import { fetchQuery } from "./testFetch";

export function eventFeed(opts) {
  return fetchQuery({
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

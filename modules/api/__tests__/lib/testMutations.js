import { fetchQuery } from "./testFetch";

export function createEvent({ event }) {
  return fetchQuery({
    query: `
      mutation CreateEvent($event: CreateEvent!) {
        createEvent(request: $event) { event { id } }
      }
    `,
    variables: { event }
  });
}

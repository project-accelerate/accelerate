import { query } from "./query";

export function createEvent({ event }) {
  return query({
    query: `
      mutation CreateEvent($event: CreateEvent!) {
        createEvent(request: $event) { event { id } }
      }
    `,
    variables: { event }
  });
}

import { createApolloFetch } from "apollo-fetch";

const defaultFetch = createApolloFetch({ uri: process.env.BACKEND_URL });

export async function query({
  query: queryString,
  variables,
  fetch = defaultFetch
}) {
  const res = await fetch({ query: queryString, variables });
  if (res.errors) {
    throw res.errors[0];
  }

  return res.data;
}

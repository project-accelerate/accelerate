import { Environment, Network, RecordSource, Store } from "relay-runtime";
import fetch from "isomorphic-fetch";

let environment = null;

export default function browserApiInterface({ records = {} } = {}) {
  if (environment) {
    return environment;
  }

  const network = Network.create(fetchQuery);
  const store = new Store(new RecordSource(records));

  environment = new Environment({
    network,
    store
  });

  return environment;
}

function fetchQuery(operation, variables) {
  return fetch("/graphql", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      query: operation.text,
      variables
    })
  }).then(response => response.json());
}

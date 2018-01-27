import { Environment, Store, Network, RecordSource } from "relay-runtime";
import { Network as LocalLink } from "relay-local-schema";
import { createSchema, createContext } from "accelerate-api";
import { fetchQuery } from "./fetchQuery";

// Server Relay environment created per-request (not cached)
export default function initEnvironment({ records = {}, backendUrl } = {}) {
  return new Environment({
    network: createNetwork({ backendUrl }),
    store: new Store(new RecordSource(records))
  });
}

function createNetwork({ backendUrl }) {
  // If the backend is running in a different process, resolve queries
  // over the network
  if (backendUrl) {
    return Network.create(fetchQuery({ backendUrl }));
  }

  // Otherwise, resolve queries within this process
  return LocalLink.create({
    schema: createSchema(),
    contextValue: createContext()
  });
}

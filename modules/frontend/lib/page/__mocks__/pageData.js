import { identity } from "lodash";

/**
 * Mock out withData HOC to be a no-op.
 *
 * This allows fetched data to be passed directly into a root component as a prop, skipping
 * the network fetch
 */
export default function mockWithData() {
  return identity;
}

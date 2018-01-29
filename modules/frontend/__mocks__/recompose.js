import { identity } from "lodash";

const recompose = require.requireActual("recompose");

/**
 * Mock out withState HOC to be a no-op.
 *
 * This allows state to be injected directly into a tested component via props
 */
export function withState() {
  return identity;
}

module.exports = {
  ...recompose,
  withState
};

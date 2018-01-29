const relay = require.requireActual("react-relay");

/**
 * Mock out createFragmentContainer HOC to be a no-op.
 *
 * This allows stubbed out data to be passed into the root component as a prop, which
 * is then passed directly into any child FragmentContainers
 */
function createFragmentContainer(WrappedComponent) {
  return WrappedComponent;
}

module.exports = {
  ...relay,
  createFragmentContainer
};

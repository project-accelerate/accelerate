import { identity } from "lodash";

/*
 * Create a resolver function that fetches a resource from a named connector,
 * then returns a specified property from that resource, optionally transforming
 * it using a provided transform function.
 */
export function getProperty({
  connector: connectorName,
  transform = identity,
  fromKey
}) {
  return (id, props, { connectors }, { fieldName }) => {
    const connector = connectors[connectorName];

    return connector
      .getById(id)
      .then(result => result[fromKey || fieldName])
      .then(transform);
  };
}

/**
 * Create a resolver funcion that simply returns the parent value as the result of
 * the resolver.
 *
 * This is suitable for an `id` property of a node in the schema. The parent value
 * (representing the node) should just be its ID.
 */
export function nodeID() {
  return id => id;
}

/**
 * Create a resolver function to get a node by ID.
 *
 * This simply returns the id parameter as the result of the resolver. Since a node
 * in the schema is represented by its ID, we don't need to actually fetch anything
 * until a property of the node is needed.
 */
export function getNode() {
  return (_, { id }) => id;
}

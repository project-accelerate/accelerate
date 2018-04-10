import { parse } from "graphql";
import * as fs from "fs";

/*
 * Wrap a model type to produce a resolver map for that type.
 * 
 * This handles the common case where there is a 1-1 correspondence between
 * the fields defined for a  and those of a model.
 */
export function resolversForNode(
  ModelType,
  { schemaDef = defaultSchema() } = {}
) {
  const schema = parse(schemaDef);
  const typeName = ModelType.name;

  const schemaType = schema.definitions.find(
    def => def.name.value === typeName
  );
  const resolvers = {};

  schemaType.fields.forEach(field => {
    const fieldName = field.name.value;

    resolvers[fieldName] = async (id, props, context) => {
      const model = await new ModelType(id, context);

      if (typeof model[fieldName] === "function") {
        return model[fieldName](props);
      }

      return model[fieldName];
    };
  });

  return resolvers;
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

function defaultSchema() {
  return fs.readFileSync(require.resolve("../../schema.graphql"), "utf8");
}

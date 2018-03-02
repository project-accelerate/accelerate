/* eslint-env jest */

import { Node } from "../../domain/Node";
import { resolversForNode, getNode } from "../resolverUtils";

describe("createModelResolvers", () => {
  class ExampleModel extends Node {
    static getById(id, context) {
      return new ExampleModel({ id }, context);
    }

    foo = "fooValue";

    uppercase(props) {
      return props.string.toUpperCase();
    }
  }

  const schemaDef = `
    type ExampleModel {
      id: ID!
      foo: String!
      uppercase(string: String!): String!
    }
  `;

  it("should generate a resolver functions for domain object properties", async () => {
    const resolvers = resolversForNode(ExampleModel, { schemaDef });
    expect(await resolvers.foo("123", {}, {})).toEqual("fooValue");
  });

  it("should generate a resolver functions for domain object methods", async () => {
    const resolvers = resolversForNode(ExampleModel, { schemaDef });
    expect(await resolvers.uppercase("123", { string: "abc" }, {})).toEqual(
      "ABC"
    );
  });
});

describe("getNode", () => {
  it("should return id param", () => {
    const resolve = getNode();
    expect(resolve(undefined, { id: "123" })).toEqual("123");
  });
});

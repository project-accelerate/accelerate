/* eslint-env jest */

import { Node } from "../Node";

describe("Node", () => {
  describe("when initialised with an ID", () => {
    it("should vend the id", () => {
      expect(new Node("123", {})).toHaveProperty("id", "123");
    });
  });

  describe("when initialised with another node", () => {
    it("should vend the id", () => {
      const otherNode = new Node("123", {});
      expect(new Node(otherNode, {})).toHaveProperty("id", "123");
    });
  });

  describe("getFieldsFromConnector", () => {
    it("should add methods to fetch from the connector", async () => {
      const remoteData = {
        123: { foo: 1 }
      };
      const MyConnector = {
        getById: async id => remoteData[id]
      };

      class MyNode extends Node {}
      MyNode.getFieldsFromConnector("MyConnector", ["foo"]);

      const node = new MyNode("123", { connectors: { MyConnector } });
      expect(await node.foo).toEqual(1);
    });
  });
});

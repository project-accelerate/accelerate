import { createBatchingGetById } from "../connectorUtils";

/* eslint-env jest */

describe("createBatchingGetById", () => {
  it("should resolve from id => resource map", async () => {
    const getById = createBatchingGetById({
      async loadResources(keys) {
        return { a: { id: keys[0] }, b: { id: keys[1] } };
      }
    });

    const a = getById("a");
    const b = getById("b");

    expect([await a, await b]).toEqual([{ id: "a" }, { id: "b" }]);
  });

  it("should resolve from result array with id field", async () => {
    const getById = createBatchingGetById({
      async loadResources(keys) {
        return [{ id: keys[0] }, { id: keys[1] }];
      }
    });

    const a = getById("a");
    const b = getById("b");

    expect([await a, await b]).toEqual([{ id: "a" }, { id: "b" }]);
  });

  it("should resolve from result array with primary key field", async () => {
    const getById = createBatchingGetById({
      primaryKey: "customId",

      async loadResources(keys) {
        return [{ customId: keys[0] }, { customId: keys[1] }];
      }
    });

    const a = getById("a");
    const b = getById("b");

    expect([await a, await b]).toEqual([{ customId: "a" }, { customId: "b" }]);
  });
});

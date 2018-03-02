/* eslint-env jest */

import { decodeCursor, encodeCursor } from "../cursor";

describe("cursor", () => {
  it("should decode encoded value", () => {
    const value = { foo: 1 };
    expect(decodeCursor(encodeCursor(value))).toEqual(value);
  });

  it("decoding should default to provided default value", () => {
    expect(decodeCursor(undefined, { defaultValue: "foo" })).toEqual("foo");
  });
});

import invariant from "invariant";

export class Model {
  constructor(data, context) {
    invariant(
      typeof data !== "undefined",
      "Missing data argument to %s constructor ",
      this.constructor.name
    );
    invariant(
      typeof context !== "undefined",
      "Missing context argument to %s constructor",
      this.constructor.name
    );

    Object.assign(this, data, context, { context });
  }
}

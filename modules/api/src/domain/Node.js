import invariant from "invariant";
import { Model } from "./Model";

/**
 * Domain object representing a Node in the GraphQL schema.
 *
 * Nodes are like entities. They are models that can be represented as
 */
export class Node extends Model {
  constructor(otherNodeOrId, context) {
    const id =
      typeof otherNodeOrId === "string" ? otherNodeOrId : otherNodeOrId.id;

    invariant(
      typeof id === "string",
      "Expected %s to be initialised with a string ID",
      id
    );

    super({ id }, context);
  }

  /**
   * Binds the specified fields to fields from the data returned by named connector.
   *
   * This is useful in the common case where a field of the model is just a field
   * in some data returned from the databse (or some other source).
   *
   * The connector must implement a getById method.
   */
  static getFieldsFromConnector(ConnectorName, fields) {
    fields.forEach(field => {
      Object.defineProperty(this.prototype, field, {
        async get() {
          const connector = this.connectors[ConnectorName];
          const data = await connector.getById(this.id);

          return data[field];
        }
      });
    });
  }
}

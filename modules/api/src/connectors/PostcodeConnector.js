import fetch from "node-fetch";
import { log } from "../lib/logger";
import { createBatchingGetById } from "../lib/connectorUtils";

const POSTCODES_API = "http://postcodes.io";

export default class PostcodeConnector {
  getById = createBatchingGetById({
    primaryKey: "postcode",

    async loadResources(postcodes) {
      log.debug("PostcodeConnector.getById", postcodes);

      const response = await fetch(`${POSTCODES_API}/postcodes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          postcodes
        })
      });

      if (!response.ok) {
        throw new Error(`GET /postcodes => ${await response.text()}`);
      }

      const { result } = await response.json();
      return result.map(item => item.result);
    }
  });
}

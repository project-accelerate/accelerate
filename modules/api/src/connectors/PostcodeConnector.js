import DataLoader from "dataloader";
import fetch from "node-fetch";
import { dataloaderResult } from "../lib/connectorUtils";

const POSTCODES_API = "http://postcodes.io";

export default class PostcodeConnector {
  /** Get a single event, or multiple events, by id */
  loader = new DataLoader(async postcodes => {
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
    return dataloaderResult({
      fromRows: result,
      forKeys: postcodes,
      indexBy: "query",
      valueFrom: "result"
    });
  });
}

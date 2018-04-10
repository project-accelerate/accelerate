import { keyBy } from "lodash";
import DataLoader from "dataloader";

/**
 * Creates a getById method implementation for a resource connector where the
 * resource is simply fetched by ID.
 *
 * This uses the DataLoader library to batch and de-duplicate requests for resources
 * of the same type. It adds some conveniences to identify the returned resources with
 * the requested resources (the DataLoader library uses position in the result array,
 * which is really annoying to use).
 */
export function createBatchingGetById({ primaryKey = "id", loadResources }) {
  const loader = new DataLoader(async ids => {
    const results = await loadResources(ids);

    if (Array.isArray(results)) {
      const indexedResults = keyBy(results, primaryKey);
      return ids.map(id => indexedResults[id]);
    }

    return ids.map(id => results[id]);
  });

  return id => loader.load(id);
}

import { keyBy, iteratee } from "lodash";

/**
 * Convert an array of result objects to the format expected by DataLoader
 */
export function dataloaderResult({
  fromRows,
  forKeys,
  indexBy = "id",
  valueFrom
} = {}) {
  const indexed = keyBy(fromRows, indexBy);
  const getValue = iteratee(valueFrom);

  return forKeys.map(id => getValue(indexed[id]));
}

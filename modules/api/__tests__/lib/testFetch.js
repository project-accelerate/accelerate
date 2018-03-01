/* eslint-disable no-underscore-dangle */

import { execute, parse } from "graphql";
import { createContext, createSchema } from "../../src/api";

/**
 * Execute a query against an the-process GraphQl API and return the query result,
 * or raise an exception if the query fails
 */
export async function fetchQuery({ query, variables }) {
  const result = await execute({
    schema: createSchema(),
    contextValue: createContext(),
    document: parse(query),
    variableValues: variables
  });

  if (result.errors) {
    throw result.errors[0];
  }

  return result.data;
}

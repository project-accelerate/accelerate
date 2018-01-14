import knex from "knex";
import knexPostgis from "knex-postgis";
import { mapKeys, camelCase, snakeCase } from "lodash";
import config from "../../../knexfile";

export const db = knex(config);
export const gis = knexPostgis(db);

export function distanceFrom(column, location) {
  const { longitude, latitude } = location;

  return db.raw(
    `ST_distance_sphere("${column}"::geometry, ST_MakePoint(?, ?))`,
    [longitude, latitude]
  );
}

export function isLessThan(lhs, rhs) {
  return db.raw(`? <= ?`, [lhs, rhs]);
}

export function isGreaterThan(lhs, rhs) {
  return db.raw(`? > ?`, [lhs, rhs]);
}

export function squared(x) {
  return db.raw(`? ^ 2`, [x]);
}

export function multiply(lhs, rhs) {
  return db.raw(`? * ?`, [lhs, rhs]);
}

export function sortValue(x, order) {
  return db.raw(`? ${order}`, [x]);
}

export function sortColumn(x, order) {
  return db.raw(`${x} ${order}`);
}

export function pair(x, y) {
  return db.raw(`(?, ?)`, [x, y]);
}

export function sortClauses(x, y) {
  return db.raw(`?, ?`, [x, y]);
}

export function as(type, value) {
  return db.raw(`?::${type}`, [value]);
}

export function toCamelCase(rows) {
  return rows.map(row => mapKeys(row, (_, key) => camelCase(key)));
}

export function fromCamelCase(row) {
  return mapKeys(row, (_, key) => snakeCase(key));
}

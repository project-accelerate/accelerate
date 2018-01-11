import { keyBy, iteratee, identity } from 'lodash'

export function dataloaderResult({ fromRows, forKeys, indexBy = 'id', valueFrom } = {}) {
  const indexed = keyBy(fromRows, indexBy)
  const getValue = iteratee(valueFrom)

  return forKeys.map(id => getValue(indexed[id]))
}

export function encodeResultsPage({ limit, rows, getCursor }) {
  const nextRow = rows[limit]
  const returnedRows = rows.slice(0, limit)

  return {
    nextCursor: encodeCursor(getCursor(nextRow)),
    edges: returnedRows.map(row => ({
      cursor: encodeCursor(getCursor(row)),
      node: row.id
    })) 
  }
}

export function encodeCursor(cursor) {
  return Buffer.from(JSON.stringify(cursor), 'utf8').toString('base64')
}

export function decodeCursor(cursor, { defaultValue } = {}) {
  return cursor ? JSON.parse(Buffer.from(cursor, 'base64').toString('utf8')) : defaultValue
}

export function getProperty({ connector, transform = identity, fromKey }) {
  return (id, props, { connectors }, { fieldName }) => {
    const { loader } = connectors[connector]
    return loader.load(id).then(result => result[fromKey || fieldName]).then(transform)
  }
}

export function nodeID() {
  return (id) => id
}

export function getNode() {
  return (_, { id }) => id
}

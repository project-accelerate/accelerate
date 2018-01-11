import PropTypes from 'prop-types'
import { fromPairs } from 'lodash'

export function connection(nodeType) {
  return PropTypes.shape({
    edges: PropTypes.arrayOf(
      PropTypes.shape({
        node: nodeType.isRequired
      }).isRequired
    ).isRequired
  }) 
}

export const fragment = PropTypes.object

export function urlInfo(...params) {
  return PropTypes.shape({
    query: fromPairs(
      params.map(param => [param, PropTypes.string.isRequired])
    ).isRequired
  })
}

connection.empty = {
  edges: []
}

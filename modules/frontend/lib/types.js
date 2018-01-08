import PropTypes from 'prop-types'

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

connection.empty = {
  edges: []
}

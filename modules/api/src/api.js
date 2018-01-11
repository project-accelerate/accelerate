import express from 'express'
import bodyParser from 'body-parser'
import fs from 'fs'
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express'
import { makeExecutableSchema } from 'graphql-tools'
import { forEach, mapValues } from 'lodash'
import * as path from 'path'
import * as EventResolvers from './resolvers/EventResolver'
import EventConnector from './connectors/EventConnector'
import PostcodeConnector from './connectors/PostcodeConnector'
import { getNode } from './utils';

const typeDefs = fs.readFileSync(path.join(__dirname, '..', 'schema.graphql'), 'utf8')

const connectorClasses = {
  EventConnector,
  PostcodeConnector,
}

const resolverModules = [
  EventResolvers,
]

export function createSchema() {
  return makeExecutableSchema({
    typeDefs,
    resolvers: mergeTypeResolvers(resolverModules),
  })
}

export function createContext() {
  return {
    connectors: mapValues(connectorClasses, C => new C())
  }
}

export function createBackend() {
  const app = express()

  if (process.env.NODE_ENV !== 'production') {
    app.get('/graphql-ui', graphiqlExpress({ endpointURL: '/graphql' }))
  }

  app.post('/graphql', bodyParser.json(), graphqlExpress(() => ({
    schema: createSchema(),
    context: createContext()
  })))

  return app
}

function mergeTypeResolvers(modules) {
  const resolverMap = {
    Query: {
      node: getNode()
    }
  }

  forEach(modules, (resolverModule) => {
    forEach(resolverModule, (resolvers, typeName) => {
      resolverMap[typeName] = resolverMap[typeName] || {}

      forEach(resolvers, (resolverFn, propertyName) => {
        resolverMap[typeName][propertyName] = resolverFn
      })
    })
  })

  return resolverMap
}

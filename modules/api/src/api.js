import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import fs from "fs";
import {
  withUser,
  loginEndpoint,
  authDirectives
} from "accelerate-authentication";
import { graphqlExpress, graphiqlExpress } from "apollo-server-express";
import { makeExecutableSchema } from "graphql-tools";
import { forEach, mapValues } from "lodash";
import * as path from "path";
import EventResolvers from "./resolvers/EventResolver";
import EventTableConnector from "./connectors/EventTableConnector";
import PostcodeConnector from "./connectors/PostcodeConnector";
import { getNode } from "./lib/resolverUtils";

const typeDefs = fs.readFileSync(
  path.join(__dirname, "..", "schema.graphql"),
  "utf8"
);

const connectorClasses = {
  EventTableConnector,
  PostcodeConnector
};

const resolverModules = [EventResolvers];

export function createSchema() {
  return makeExecutableSchema({
    typeDefs,
    resolvers: mergeTypeResolvers(resolverModules),
    directiveResolvers: authDirectives
  });
}

export function createContext(req) {
  return {
    connectors: mapValues(connectorClasses, C => new C()),
    user: req.user
  };
}

export function createBackend() {
  const app = express();

  if (process.env.ENABLE_GRAPHIQL && JSON.parse(process.env.ENABLE_GRAPHIQL)) {
    app.get("/graphql-ui", graphiqlExpress({ endpointURL: "/graphql" }));
  }

  app.post("/login", bodyParser.json(), loginEndpoint());

  app.post(
    "/graphql",
    cookieParser(),
    withUser(),
    bodyParser.json(),
    graphqlExpress(req => ({
      schema: createSchema(),
      context: createContext(req)
    }))
  );

  return app;
}

function mergeTypeResolvers(modules) {
  const resolverMap = {
    Query: {
      node: getNode()
    }
  };

  forEach(modules, resolverModule => {
    forEach(resolverModule, (resolvers, typeName) => {
      resolverMap[typeName] = resolverMap[typeName] || {};

      forEach(resolvers, (resolverFn, propertyName) => {
        resolverMap[typeName][propertyName] = resolverFn;
      });
    });
  });

  return resolverMap;
}

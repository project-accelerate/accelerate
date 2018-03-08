# Accelerate Frontend

This module contains the public API for the Accelerate app.

## Quickstart

* Make sure you've followed the initial setup guide and general workflow outlined in the [Project Readme](../../readme.md)

* To run this locally, you will need a `development.env` file containing some secret credentials. You can ask for an up-to-date configuration file on the #accelerate-dev Slack channel.

* To run this locally, you will need a local Postgres database. Follow the instructions in the [Project Readme](../../readme.md) to get this installed and configured.

* Run `yarn start` in this directory.

* Make sure that the development.env file in any other modules that need to access this are configured to point to the URL that your local API is running on.

* The API has an interactive GraphiQL documentation viewer & explorer running at `/graphql-api`.

## Code Structure

* The code is organised using the [Model/Connector/Resolver pattern](https://www.apollographql.com/docs/graphql-tools/resolvers.html). These are connected to a GraphQL schema using the graphql-tools library.

  * The *Schema* defines the structure of the API. It is defined in the [./schema.graphql](./schema.graphql) file.

    * Relay, which we use as our frontend GraphQL client library, places a few requirements on how the schema is structured. Check out the [documentation](https://facebook.github.io/relay/docs/en/graphql-server-specification.html) for more on this this. But we can roughly summarise it as:

      * Some of the types defined in the schema implement the `Node` interface. These are like what some other frameworks refer to as entities. They have an ID field and should be fetchable by ID. If a domain object class inherits from Node, this will be configured automatically.

      * Paginated result types should have a particular structure and use cursor-based pagination.

      * Mutations should have a particular structure.

  * *Connectors* define database access, calls to remote APIs, etc. They live in the [connectors](./src/connectors) directory.

    * In other frameworks, these are sometimes referred to as Repositories.

    * Connectors should correspond to a. A database entity, 

    * We use Facebook's [DataLoader](https://github.com/facebook/dataloader) library to batch and de-duplicate database queries and remote API calls.

  * *Models* contain most of the domain logic. They live in the [domain](./src/domain) directory.

    * Models should inherit from the `Model` class. Models representing nodes should inherit from the `Node` class.

    * 

    * Nodes fetch data and run database queries lazily. This makes it easy to aggregate data from different services under a single type in the public API. This means that, rather than initialising a node with data, you only need to initialise it with its ID.

  * *Resolvers* map the domain models onto the GraphQL schema. They live in the [resolvers](./src/resolvers) directory.

    * Resolvers should contain as little logic as possibe. Really, they should just call through to the appropriate model and return the result.

    * Resolvers for nodes should defer all fields to the domain model, using the `resolversForNode` utility.

  * Utilities and helpers live in the [lib](./src/lib) directory.

* Unit tests live in a directory called `__tests__` placed in the same directory as the code they are testing.

  * Domain models and utilities should be unit tested. Aim for 100% coverage of these.

  * Connectors and resolvers don't really need to be unit tested. They should be covered by integration tests.

  * Run unit tests using `yarn test`

* Integration tests live in the top-level [`__tests__`](./__tests__) directory.

  * Run the integration tests using `yarn test:integration`

  * You will need have a local postgres database in order to run these. Note that running the integration tests will delete all data from the database.

  * Try to cover as much of the expected behavior for a given schema type as possible. 

## Coding guidelines

* In general, try to follow TDD principles and write tests before you write code.

* If you want to discuss how to implement a feature, please ask on #accelerate-dev. If you're working on a feature, you might want to try opening a pull request the work in progress so that t's easy to collaborate with other people and ask for help on work-in-progress code.

## Getting Help

Please feel free to ask on Slack (#accelerate-dev) if you need help getting started or are stuck on anything!

Some technologies are used extensively throughout this project. If you aren't already, you might want to familiarise yourself with them. The main ones (in rough order of importance) are:

### GraphQL

https://graphql.org/

GraphQL is an alternative to REST for writing APIs for apps and websites. It makes it easy to write self-documenting, evolvable APIs that aggregate data from different web services and databases.

Recommended reading:

* [Intro To GraphQL](http://graphql.org/learn/)

### Relay

https://facebook.github.io/relay/

Relay is a library developed by Facebook and designed to work with React and the [GraphQL](http://graphql.org/) query language.

Relay makes binding UI components to remote data really simple and includes React components that help implementing things like pull-to-refresh, infinite scroll, etc.

Recommended reading:

* [Intro To Relay](https://facebook.github.io/relay/docs/en/introduction-to-relay.html)

> Note that we use *Relay Modern*, the new version. Some documentation you find might be for *Relay Classic*, which is quite different.

### GraphQL Tools

https://www.apollographql.com/docs/graphql-tools/

Material UI provides a set of pre-built React components, which follow Google's Material Design specification. If you're looking for a pre-built UI element, you probably want to check the Material UI documentation.

Material UI uses a styling approach that may be new. CSS classes are defined in an object that lives in the same file as your React component, then attached to it using `withStyles`.

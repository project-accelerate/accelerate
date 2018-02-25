# Accelerate Frontend

This module contains the frontend for the Accelerate app.

## Quickstart

* Make sure you've followed the initial setup guide and general workflow outlined in the [Project Readme](../../readme.md)

* Run `yarn start` in this directory.

## Code Structure

* Pages live in the [pages](./pages) directory. They should export a React component as the default export, which is used as the top-level component for that page. Pages are based on file structure, so [pages/event.js](./pages/event.js) will map to `/event`.

  * Pages should all be wrapped in a `withData` [HOC](https://reactjs.org/docs/higher-order-components.html). This ensures that they fetch all data required before rendering the page.

* All other components live in the [components](./components) directory.

  * There should be one component per file. Styles and data dependencies should be defined in the same file as the component.

  * Components should have their own directory, which should contain the component, along with storybook files, and any sub-components that aren't used by other components.

* Tests live in a directory called `__tests__` placed in the same directory as the code they are testing.

  * Tests are written using the [Jest](https://facebook.github.io/jest/) framework. It is a 'batteries-included' framework that includes lots of assertion matchers, helpers for testing React components.

    * Run them using `yarn test`

  * Tests for pages live in the top-level directory (the same one as this readme). They are an exception to the convention because otherwise they would be treated as pages by the build system.

* Styles are defined using [Javascript Style Sheets](http://cssinjs.org/json-api?v=v9.6.0). These are defined as objects in the same file as the associated component and linked with them using the `withStyles` [HOC](https://reactjs.org/docs/higher-order-components.html). They get compiled to CSS as part of the build process.

* Data dependencies are defined as [GraphQL](http://graphql.org/) queries. These are defined in the same files.

* All other code (utility functions, [HOCs](https://reactjs.org/docs/higher-order-components.html), etc) goes in the [lib](./lib) directory.

## Coding guidelines

* If you're writing a working on a page, make sure that it has a [snapshot test](https://facebook.github.io/jest/docs/en/snapshot-testing.html) covering its various states. See the [./\_\_tests\_\_](./__tests__) directory for some examples.

* In general, try to follow TDD principles and write tests before you write code.

* If you want to discuss how to implement a feature, please ask on #accelerate-dev. If you're working on a feature, you might want to try opening a pull request the work in progress so that t's easy to collaborate with other people and ask for help on work-in-progress code.

* Try to keep your React components as simple as possible. Prefer writing your components as pure functions, extracting complex logic out into [HOCs](https://reactjs.org/docs/higher-order-components.html). These keeps code nice and reusable, keeps complexity down, and makes it easier to write unit tests.

## Getting Help

Please feel free to ask on Slack (#accelerate-dev) if you need help getting started or are stuck on anything!

Some technologies are used extensively throughout this project. If you aren't already, you might want to familiarise yourself with them. The main ones (in rough order of importance) are:

### React

https://reactjs.org

React is a framework developed by Facebook for writing interactive Javascript applications in a modular way. It provides the view layer of the Accelerate app.

Recommended reading:

* [Intro To React](https://reactjs.org/tutorial/tutorial.html)
* [Thinking in React](https://reactjs.org/docs/thinking-in-react.html)

### Relay

https://facebook.github.io/relay/

Relay is a library developed by Facebook and designed to work with React and the [GraphQL](http://graphql.org/) query language. It handles fetching data from our API.

Relay makes binding UI components to remote data really simple and includes React components that help implementing things like pull-to-refresh, infinite scroll, etc.

Recommended reading:

* [Intro To GraphQL](http://graphql.org/learn/)
* [Intro To Relay](https://facebook.github.io/relay/docs/en/introduction-to-relay.html)

> Note that we use *Relay Modern*, the new version. Some documentation you find might be for *Relay Classic*, which is quite different.

### Material UI

https://material-ui-next.com/

Material UI provides a set of pre-built React components, which follow Google's Material Design specification. If you're looking for a pre-built UI element, you probably want to check the Material UI documentation.

Material UI uses a styling approach that may be new. CSS classes are defined in an object that lives in the same file as your React component, then attached to it using `withStyles`.

### Storybooks

https://storybook.js.org/

Storybooks provide a development environment for working on React components in isolation from the rest of the app. Stories are example instances of a React component (eg: a user profile with some pre-set data about the user).

This project has includes a storybook. It follows the convention of picking stories up from any file ending in `.stories.js`. You can launch the storybook server by running `yarn storybook` from the command-line.

### Nextjs

https://github.com/zeit/next.js

Nextjs is used to handle page routing, the web server and build system. Although slightly opinionated, it gives us lots of nice performance features (server-side rendering, code-splitting, css-inlining, image optimisation) for free.

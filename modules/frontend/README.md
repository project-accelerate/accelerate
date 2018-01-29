# Accelerate Frontend

This module contains the frontend for the Accelerate app.


## Quickstart

*Note that any terminal commands mentioned here should be run from the frontend directory. Make sure you're in `accelerate/modules/frontend`, not `accelerate`.*

* Make sure you've followed the initial setup guide and general workflow outlined in the [Project Readme](../../readme.md)

* Start the app by running `gulp` from the command line.

* If you're building or prototyping a new component or page, the best thing to do is create a storybook for it first (see below), then integrate it into the app later. You can run the storybook server with `npm run storybook`.

* If your feature needs to talk to the backend, you can use the API explorer to get documentation and try running queries against a real backend. You can start this by running `gulp` and visiting https://accelerate-dev.herokuapp.com/graphql-ui.


## Project Structure

* Pages live in the [pages](./pages) directory. They should export a React component as the default export, which is used as the top-level component for that page. Pages are based on file structure, so [pages/event.js](./pages/event.js) will map to `/event`.

  * Pages should all be wrapped in a `withData` component. This ensures that they fetch all data required before rendering the page.

* All other components live in the [components](./components) directory.

  * Try to stick to just defining a single component per file.

  * Components should have their own directory, which should contain the component, along with storybook files, and any sub-components that aren't used by other components.

* Tests live in a directory called `__tests__` placed in the same directory as the code they are testing.

  * Tests for pages live in the top-level directory (the same one as this readme). They are an exception to the convention because otherwise they would be treated as pages by the build system. 

* Styles are defined using [Javascript Style Sheets](http://cssinjs.org/json-api?v=v9.6.0). These are defined as objects in the same file as the associated component and linked with them using the `withStyles` decorator. They get compiled to CSS as part of the build process.

* Data dependencies are defined as [GraphQL](http://graphql.org/) queries. These are defined in the same files.

* All other code should go in the `lib` directory.


## Coding guidelines

*This is a work in progress. If you have any questions suggestions, please ask on #accelerate-dev or file an issue*

* If you're writing a new page, make sure that it has a [snapshot test](https://facebook.github.io/jest/docs/en/snapshot-testing.html) covering its various different states. See the [./\_\_tests\_\_](./__tests__) directory for some examples.

* In general, write tests for anything that has at least one if statement in it. Tests should live in a directory called `__tests__` in the same directory as the code it's testing. You can run tests with `npm test`.

* Try to keep view components as simple as possible. Prefer writing your components as pure functions, extracting complex logic out into separate functions and writing tests for them them.


## Gettting Help

Please feel free to ask on Slack (#accelerate-dev) if you need help getting started or are stuck on anything!

Some technologies are used extensively thoughout this project. If you aren't already, you might want to familiarise yourself with them. The main ones (in rough order of importance) are:


### React

https://reactjs.org

React is a framework developed by Facebook for writing interactive Javascript applications in a modular way. It provides the view layer of the Accelerate app. 

Recommended reading:

  * [Intro To React](https://reactjs.org/tutorial/tutorial.html)
  * [Thinking in React](https://reactjs.org/docs/thinking-in-react.html)


### Relay

https://facebook.github.io/relay/

Relay is a library developed by Facebook and designed to work with React and a server-side technology called GraphQL. It handles fetching data from our API.

Relay makes binding UI components to remote data really simple and includes React components that help implementing things like pull-to-refresh, infinite scroll, etc. 

Recommended reading:

  * [Intro To GraphQL](http://graphql.org/learn/)
  * [Intro To Relay](https://facebook.github.io/relay/docs/en/introduction-to-relay.html)


Note that we use *Relay Modern*, the new version. Some documentation you find might be for *Relay Classic*, which is quite different.


### Material UI

https://material-ui-next.com/

Material UI provides a set of pre-built React components, which follow Google's Material Design specification. If you're looking for a pre-built UI element, you probably want to check the Material UI documentation.

Material UI uses a styling approach that may be new. CSS classes are defined in an object that lives in the same file as your React component, then attached to it using `withStyles`.


### Storybooks

https://storybook.js.org/

Storybooks provide a development environment for working on React components in isolation from the rest of the app. Stories are example instances of a React component (eg: a user profile with some pre-set data about the user).

This project has includes a storybook. It follows the convention of picking stories up from any file ending in `.stories.js`. You can launch the storybook server by running `npm run storybook` from the command-line.


### Nextjs

https://github.com/zeit/next.js

Next.js is used to handle page routing, the web server and build system. Although slightly opinionated, it gives us lots of nice performance features (server-side rendering, code-splitting, css-inlining, image optimisation) for free.


### Higer-order components

Not a library, but a design pattern used extensively in this project. Check out https://reactjs.org/docs/higher-order-components.html for more information.

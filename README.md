Accelerate
===

This project contains the accelerate app. It is a single page application served from Heroku. The primary technologies:

* React for the view layer
* Next.js as the page server
* Node.js for the backend.
* PostgreSQL as the primary data store
* Relay/GraphQL for interfacing between the front and backend.

The codebase is split into separate modules, which are deployed to a single Heroku app. You can find these in the `/modules` directory. Check each module's documentation for more information.

Getting started
===

Prerequisites
---
* [Node.js](https://nodejs.org/)
* [Watchman](https://facebook.github.io/watchman/docs/install.html)
* [Gulp](https://gulpjs.com/) (`npm install -g gulp-cli`)

Installation
---
````
git clone https://github.com/project-accelerate/accelerate.git
cd accelerate
npm install
````

You will need a `.env` file containing your dev configuration at the root of the project. This is not checked into the git repo, but you will be able to obtain one on the slack channel.

Development workflow
---

````
## Starts a local development server
gulp

## Run linters against source and fix an auto-fixable errors
npm run lint:fix

## Run linters against source and fix an auto-fixable errors
npm run pretty
````

As part of the install, this repository adds githooks to automatically
run the lint & code-formatting scripts on commit.

If you aren't able to commit, try running the linter and fixing the errors.

Running against a local database
---

[TODO]


Contributing guide
===

[TODO]


License
===

[TODO]
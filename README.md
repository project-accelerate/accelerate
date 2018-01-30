# Accelerate

This project contains the accelerate app. It is a single page application served from Heroku. The primary technologies used are:

* React for the view layer
* Next.js as the page server
* Node.js for the backend.
* PostgreSQL as the primary data store
* Relay/GraphQL for interfacing between the front and backend.

The codebase is split into separate modules, which are deployed to a single Heroku app. You can find these in the [modules]('./modules') directory. Check each module's documentation for more information.

## Getting started

### Prerequisites

* [Node.js](https://nodejs.org/)
* [Git](https://git-scm.com/)

### Installation and first run

> Instructions are given for Mac/Linux systems, but we intend to support development on Windows.
> Please open an issue or ask in #accelerate-dev if you have any issues running on Windows.

````bash
git clone https://github.com/project-accelerate/accelerate.git
cd accelerate
npm install
cd modules/frontend
npm start
````

### Next steps

Check out the documentation for the relevant module. Unless you know otherwise, it's probably either the [frontend](./modules/frontend) or [api](./modules/api).

## Infrastructure Overview

> If you aren't familiar with Heroku, then this can serve as a very quick intro, but you should check [Heroku's documentation](https://devcenter.heroku.com) for more information.

This app is split into separate modules, which you can find in the [modules](./modules) directory.

Some of these modules are libraries imported in other modules, some will be run as worker (background) processes on Heroku, others will define routes that are mounted into the web process.

* Check the [Procfile](./Procfile) for details about worker process (everything except web and release processes is a worker).

* Check [web.js](./web.js) for the modules mounted into the web process. Only these will be accessible from the web.

Modules can be run as self-contained services in development. When they connect to external services, they may need configuring with URLs, credentials, etc.

Wherever possible, a base config sufficient to run locally will be included (base configs are defined in `development.base.env` files).

In some cases (such as where secret credentials are required, or if you want to connect to a service running locally) you may need to provide overrides. These are placed in a fine named `development.env` in the root dir of the module. Where configuration is needed to run a module locally, it will be documented in the module's readme. The base config should document what each configuration variables is used for.

## Database Configuration

Database migrations and test data seeds are written using [Knex](http://knexjs.org/) and live in [db](./db).

Migrations are automatically run on deployment. Test data seeds are automatically added to the development database on deploy.

You don't need a local database for frontend development. However if you want to get started with a local database (for example if you're), you can spin up a docker image and seed it with test events by running:

```bash
docker run -d -p 5432:5432 mdillon/postgis
npm run db:migrate
npm run db:seed
```

If you want to add a new migration file, you can scaffold a new one by running:

```bash
npm run db:add-migration "name-of-migration"
```

# Shoply

Shoply is a simple shopping list app that allows adding items to a list and checking them off.

Currently just a single list is supported, but it could easily be extended to support multiple lists.

Shoply is Phoenix application with a React frontend, which is served using the Phoenix server.

It uses PostgreSQL for data persistance.

## Requirements

To run this application in development a few system dependencies are needed:

- the Erlang VM and the Elixir programming language
- Node.js, NPM, Yarn (for the frontend)
- a PostgreSQL database

See the [Phoenix installation][phoenix-installation] guide for more detailed instructions.

## Setup

- Check out the repo
- Install Elixir dependencies with `mix deps.get`
- Install frontend dependencies with `cd assets && yarn install`
- Copy `config/dev.secret.template.exs` to `config/dev.secret.exs` and populate with your environment-specific configuration.
- Create and migrate the database with `mix ecto.setup`
- Start the Phoenix endpoint with `mix phx.server`

Now you can visit [`localhost:4000`](http://localhost:4000) from your browser.

## Project Structure

The app is a Phoenix project with the backend code in the `lib` directory. The frontend code lives in the `assets` directory. The Phoenix server statically serves the frontend assets. In dev mode it will also compile and bundle the assets for the browser. For prod deployment the `mix assets.deploy` command is used to create the production asset bundle, complete with digests.

A dockerfile is included to create an easily deployable image.

## Testing

Tests are split into two suites: Frontend and Backend.

### Frontend Tests

To run the frontent tests run `yarn test` from the `/assets` directory.

The frontend tests use [jest][jest] with [react-testing-library][testing-library] and [mock-service-worker][msw] to allow testing against the network whilst keeping control of API responses. react-testing-library is used to render a component and events are fired against the dom to simulate user interations. MSW is used to intercept graphql requests and provide the expected responses.

### Backend Tests

Run `mix test` from the project root. A database is required for these tests. The DB will be created and migrated automatically if required. If your DB credentials do not match those in `config/test.exs`, copy `config/test.secret.template.exs` to `config/test.secret.exs` and populate with your environment-specific configuration.

There are two main sets of tests: lower-level module tests for the item CRUD and higher level integration-style tests for interacting with the graphql API.

Each test is run inside its own DB transaction so they can run concurrently without polluting database state for other tests.

EE Version Number: `5b8d0fd276b6d288905ed2f63a934e057e8feca2`

[phoenix-installation]: https://hexdocs.pm/phoenix/installation.html
[testing-library]: https://testing-library.com/
[jest]: https://jestjs.io/
[msw]: https://mswjs.io/

# Shoply

This is Phoenix application with a React frontend, which is served using the Phoenix server.

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
- Start the Phoenix endpoint with `mix phx.server`

Now you can visit [`localhost:4000`](http://localhost:4000) from your browser.

EE Version Number: `5b8d0fd276b6d288905ed2f63a934e057e8feca2`

[phoenix-installation]: https://hexdocs.pm/phoenix/installation.html

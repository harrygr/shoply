import * as React from "react";
import { render, waitFor } from "@testing-library/react";
import { ShoppingList } from "./ShoppingList";
import { createClient, Provider } from "urql";
import { setupServer } from "msw/node";
import { graphql } from "msw";
import { ListItemsQuery, ListItemsQueryVariables } from "../generated/graphql";

describe("ShoppingList", () => {
  const server = setupServer();

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  const listItemsQuery = graphql.query<ListItemsQuery, ListItemsQueryVariables>(
    "ListItems",
    (_req, res, ctx) => {
      return res(
        ctx.data({ items: [{ id: "1", name: "Figs", checkedAt: null }] })
      );
    }
  );

  it("renders a list of items as returned from the API", async () => {
    server.use(listItemsQuery);

    const { getByDisplayValue } = render(
      <Provider value={createClient({ url: "/graphql" })}>
        <ShoppingList />
      </Provider>
    );

    await waitFor(() => getByDisplayValue("Figs"));
  });
});

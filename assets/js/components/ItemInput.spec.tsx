import * as React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react";

import { createClient, Provider } from "urql";
import { setupServer } from "msw/node";
import { graphql } from "msw";
import {
  CreateItemMutation,
  CreateItemMutationVariables,
} from "../generated/graphql";
import { ItemInput } from "./ItemInput";

describe("ShoppingList", () => {
  const server = setupServer();

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("allows creating a new item", async () => {
    const createItemSpy = jest.fn();
    const createItemMutation = graphql.mutation<
      CreateItemMutation,
      CreateItemMutationVariables
    >("CreateItem", (req, res, ctx) => {
      createItemSpy();
      return res(
        ctx.data({
          createItem: {
            id: "99",
            name: req.variables.input.name,
            checkedAt: null,
          },
        })
      );
    });
    server.use(createItemMutation);
    const { getByRole, container } = render(
      <Provider value={createClient({ url: "/graphql" })}>
        <ItemInput />
      </Provider>
    );

    const input = getByRole("textbox", { name: /add a new item/i });
    fireEvent.change(input, { target: { value: "cheese" } });

    fireEvent.submit(container.querySelector("form")!);

    await waitFor(() => expect(createItemSpy).toHaveBeenCalled());
  });
});

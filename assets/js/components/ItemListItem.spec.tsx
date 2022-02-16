import * as React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react";
import { createClient, Provider } from "urql";
import { ItemListItem } from "./ItemListItem";
import { graphql } from "msw";
import {
  DeleteItemMutation,
  DeleteItemMutationVariables,
  UpdateItemMutation,
  UpdateItemMutationVariables,
} from "../generated/graphql";
import { setupServer } from "msw/node";

describe("ItemListItem", () => {
  const updateItemMutation = graphql.mutation<
    UpdateItemMutation,
    UpdateItemMutationVariables
  >("UpdateItem", (req, res, ctx) => {
    return res(
      ctx.data({
        updateItem: {
          id: req.variables.id,
          name: req.variables.input.name,
          checkedAt: req.variables.input.checkedAt,
        },
      })
    );
  });

  const server = setupServer();

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("allows checking an item", () => {
    server.use(updateItemMutation);
    const item = { id: "55", name: "bread", checkedAt: null };

    const { getByRole, debug, getByDisplayValue } = render(
      <Provider value={createClient({ url: "/graphql" })}>
        <ItemListItem item={item} />
      </Provider>
    );

    expect(getByDisplayValue(/bread/i)).not.toBeUndefined();
    const checkbox = getByRole("checkbox", {
      name: /checked/i,
    }) as HTMLInputElement;

    expect(checkbox.checked).toBe(false);

    fireEvent.click(checkbox);

    expect(checkbox.checked).toBe(true);
  });

  it("allows updating an item name", () => {
    server.use(updateItemMutation);
    const item = { id: "55", name: "bread", checkedAt: null };

    const { getByRole, debug, getByDisplayValue } = render(
      <Provider value={createClient({ url: "/graphql" })}>
        <ItemListItem item={item} />
      </Provider>
    );

    expect(getByDisplayValue(/bread/i)).not.toBeUndefined();
    const nameInput = getByRole("textbox", {
      name: /item name/i,
    }) as HTMLInputElement;

    fireEvent.change(nameInput, { target: { value: "cheese" } });
    fireEvent.blur(nameInput);

    expect(getByDisplayValue(/cheese/i)).not.toBeUndefined();
  });

  it("allows deleting an item", async () => {
    const deleteSpy = jest.fn();
    const deleteItemMutation = graphql.mutation<
      DeleteItemMutation,
      DeleteItemMutationVariables
    >("DeleteItem", (req, res, ctx) => {
      deleteSpy(req.variables.id);
      return res(
        ctx.data({
          deleteItem: {
            id: req.variables.id,
            name: "deleted item",
            checkedAt: null,
          },
        })
      );
    });

    server.use(deleteItemMutation);
    const item = { id: "55", name: "bread", checkedAt: null };

    const { getByRole, debug, getByDisplayValue, queryByDisplayValue } = render(
      <Provider value={createClient({ url: "/graphql" })}>
        <ItemListItem item={item} />
      </Provider>
    );

    expect(getByDisplayValue(/bread/i)).not.toBeUndefined();

    fireEvent.click(
      getByRole("button", {
        name: /delete item/i,
      })
    );
    await waitFor(() => expect(deleteSpy).toHaveBeenCalledWith(item.id));
  });
});

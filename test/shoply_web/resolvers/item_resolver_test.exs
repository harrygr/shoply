defmodule ShoplyWeb.ItemResolverTest do
  use ShoplyWeb.ConnCase

  import Shoply.ShoppingFixtures

  test "getting a list of items", ctx do
    _items = [
      item_fixture(%{name: "item 1"}),
      item_fixture(%{name: "item 2"}),
      item_fixture(%{name: "item 3"})
    ]

    query =
      ShoplyWeb.AbsintheHelpers.query_skeleton("""
        query  {
          items {
            id
            name
            checkedAt
          }
        }
      """)

    res = ctx.conn |> post("/graphql", query) |> json_response(200)

    assert %{
             "items" => [
               %{"checkedAt" => nil, "id" => _, "name" => "item 1"},
               %{"checkedAt" => nil, "id" => _, "name" => "item 2"},
               %{"checkedAt" => nil, "id" => _, "name" => "item 3"}
             ]
           } = res["data"]
  end

  test "creating an item", ctx do
    mutation =
      ShoplyWeb.AbsintheHelpers.mutation_skeleton(
        """
          mutation CreateItem($input: ItemInput!)  {
            createItem(input: $input) {
              id
              name
              checkedAt
            }
          }
        """,
        %{"input" => %{"name" => "chips"}}
      )

    res = ctx.conn |> post("/graphql", mutation) |> json_response(200)

    assert %{
             "createItem" => %{"checkedAt" => nil, "id" => _, "name" => "chips"}
           } = res["data"]
  end

  test "updating an item", ctx do
    item = item_fixture(%{name: "dup"})

    mutation =
      ShoplyWeb.AbsintheHelpers.mutation_skeleton(
        """
          mutation UpdateItem($id: ID!, $input: ItemInput!)  {
            updateItem(id: $id, input: $input) {
              id
              name
              checkedAt
            }
          }
        """,
        %{"id" => item.id, "input" => %{"name" => "dip"}}
      )

    res = ctx.conn |> post("/graphql", mutation) |> json_response(200)

    assert %{
             "updateItem" => %{"checkedAt" => nil, "id" => _, "name" => "dip"}
           } = res["data"]
  end

  test "deleting an item", ctx do
    item = item_fixture()

    mutation =
      ShoplyWeb.AbsintheHelpers.mutation_skeleton(
        """
        mutation DeleteItem($id: ID!)  {
          deleteItem(id: $id) {
            id
            name
            checkedAt
          }
        }
        """,
        %{"id" => item.id}
      )

    res = ctx.conn |> post("/graphql", mutation) |> json_response(200)
    assert res["errors"] == nil

    assert %{
             "deleteItem" => %{"id" => _}
           } = res["data"]
  end
end

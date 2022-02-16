defmodule ShoplyWeb.Schema do
  use Absinthe.Schema

  alias Shoply.Shopping
  import_types(Absinthe.Type.Custom)

  object :item do
    field(:id, non_null(:id))
    field(:name, non_null(:string))
    field(:checked_at, :string)
  end

  input_object :item_input do
    field(:name, non_null(:string))
    field(:checked_at, :string)
  end

  query do
    field :ping, :string do
      resolve(fn _, _ -> {:ok, "pong"} end)
    end

    field :items, non_null(list_of(non_null(:item))) do
      resolve(fn _, _ -> {:ok, Shopping.list_items()} end)
    end
  end

  mutation do
    field :create_item, :item do
      arg(:input, non_null(:item_input))

      resolve(fn _, %{input: input}, _ -> Shoply.Shopping.create_item(input) end)
    end

    field :update_item, :item do
      arg(:id, non_null(:id))
      arg(:input, non_null(:item_input))

      resolve(fn _, %{id: id, input: input}, _ ->
        with %Shopping.Item{} = item <- Shopping.get_item!(id) do
          Shopping.update_item(item, input)
        end
      end)
    end

    field :delete_item, :item do
      arg(:id, non_null(:id))

      resolve(fn _, %{id: id}, _ ->
        with %Shopping.Item{} = item <- Shopping.get_item!(id) do
          Shopping.delete_item(item)
        end
      end)
    end
  end
end

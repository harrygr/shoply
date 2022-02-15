defmodule Shoply.ShoppingFixtures do
  @moduledoc """
  This module defines test helpers for creating
  entities via the `Shoply.Shopping` context.
  """

  @doc """
  Generate a item.
  """
  def item_fixture(attrs \\ %{}) do
    {:ok, item} =
      attrs
      |> Enum.into(%{name: "some name"})
      |> Shoply.Shopping.create_item()

    item
  end
end

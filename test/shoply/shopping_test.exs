defmodule Shoply.ShoppingTest do
  use Shoply.DataCase

  alias Shoply.Shopping

  describe "items" do
    alias Shoply.Shopping.Item

    import Shoply.ShoppingFixtures

    @invalid_attrs %{name: nil}

    test "list_items/0 returns all items" do
      item = item_fixture()
      assert Shopping.list_items() == [item]
    end

    test "get_item!/1 returns the item with given id" do
      item = item_fixture()
      assert Shopping.get_item!(item.id) == item
    end

    test "create_item/1 with valid data creates a item" do
      valid_attrs = %{name: "some name"}

      assert {:ok, %Item{} = item} = Shopping.create_item(valid_attrs)
      assert item.name == "some name"
    end

    test "create_item/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Shopping.create_item(@invalid_attrs)
    end

    test "update_item/2 with valid data updates the item" do
      item = item_fixture()
      update_attrs = %{name: "some updated name"}

      assert {:ok, %Item{} = item} = Shopping.update_item(item, update_attrs)
      assert item.name == "some updated name"
    end

    test "update_item/2 with invalid data returns error changeset" do
      item = item_fixture()
      assert {:error, %Ecto.Changeset{}} = Shopping.update_item(item, @invalid_attrs)
      assert item == Shopping.get_item!(item.id)
    end

    test "marking an item as checked and unchecked" do
      item = item_fixture()

      assert {:ok, checked_item} = Shopping.update_item(item, %{checked_at: DateTime.utc_now()})

      assert checked_item.checked_at

      assert {:ok, unchecked_item} = Shopping.update_item(item, %{checked_at: nil})
      refute unchecked_item.checked_at
    end

    test "delete_item/1 deletes the item" do
      item = item_fixture()
      assert {:ok, %Item{}} = Shopping.delete_item(item)
      assert_raise Ecto.NoResultsError, fn -> Shopping.get_item!(item.id) end
    end

    test "change_item/1 returns a item changeset" do
      item = item_fixture()
      assert %Ecto.Changeset{} = Shopping.change_item(item)
    end
  end
end

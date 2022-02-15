defmodule Shoply.Shopping.Item do
  use Ecto.Schema
  import Ecto.Changeset

  schema "items" do
    field :name, :string
    field :checked_at, :naive_datetime
    timestamps()
  end

  @doc false
  def changeset(item, attrs) do
    item
    |> cast(attrs, [:name, :checked_at])
    |> validate_required([:name])
  end
end

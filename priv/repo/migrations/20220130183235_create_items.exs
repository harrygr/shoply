defmodule Shoply.Repo.Migrations.CreateItems do
  use Ecto.Migration

  def change do
    create table(:items) do
      add :name, :string, null: false
      add :checked_at, :utc_datetime, null: true

      timestamps()
    end
  end
end

# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     Shoply.Repo.insert!(%Shoply.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.

Shoply.Shopping.create_item(%{name: "Add your items to the list"})

Shoply.Shopping.create_item(%{
  name: "Check things off when you're done with them",
  checked_at: DateTime.utc_now()
})

defmodule Shoply.Repo do
  use Ecto.Repo,
    otp_app: :shoply,
    adapter: Ecto.Adapters.Postgres
end

defmodule Shoply.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  @impl true
  def start(_type, _args) do
    children = [
      # Start the Ecto repository
      Shoply.Repo,
      # Start the Telemetry supervisor
      ShoplyWeb.Telemetry,
      # Start the PubSub system
      {Phoenix.PubSub, name: Shoply.PubSub},
      # Start the Endpoint (http/https)
      ShoplyWeb.Endpoint
      # Start a worker by calling: Shoply.Worker.start_link(arg)
      # {Shoply.Worker, arg}
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: Shoply.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  @impl true
  def config_change(changed, _new, removed) do
    ShoplyWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end

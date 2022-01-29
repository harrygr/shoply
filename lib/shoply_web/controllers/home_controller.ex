defmodule ShoplyWeb.HomeController do
  use ShoplyWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end
end

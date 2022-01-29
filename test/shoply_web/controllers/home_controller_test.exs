defmodule ShoplyWeb.HomeControllerTest do
  use ShoplyWeb.ConnCase

  test "GET /", %{conn: conn} do
    conn = get(conn, "/")
    assert html_response(conn, 200) =~ ~s(<div id="⚛️"></div>)
  end
end

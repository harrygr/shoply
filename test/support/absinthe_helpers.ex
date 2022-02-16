defmodule ShoplyWeb.AbsintheHelpers do
  def query_skeleton(query, variables \\ %{}) do
    %{
      "operationName" => "",
      "query" => "#{query}",
      "variables" => variables
    }
  end

  def mutation_skeleton(query, variables \\ %{}) do
    %{
      "operationName" => "",
      "query" => "#{query}",
      "variables" => variables
    }
  end
end

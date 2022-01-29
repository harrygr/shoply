import Config

config :shoply, Shoply.Repo,
  hostname: "localhost",
  username: "postgres",
  password: nil,
  database: "shoply_test#{System.get_env("MIX_TEST_PARTITION")}"

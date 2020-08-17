const config = {
  apiPrefix: "/api",
  server: {
    port: process.env.PORT || 3000,
    name: "Group-Service",
  },
  db: {
    connectionString: `mongodb://${process.env.DB_SERVER || "mongo:27017/"}${
      process.env.DB_NAME || "groupDB"
    }${
      process.env.DB_REPLICA_NAME
        ? `?replicaSet=${process.env.DB_REPLICA_NAME}`
        : ""
    }`,
    port: process.env.DB_PORT || 27017,
  },
  env: {
    prod: "prod",
    dev: "dev",
  },
  RootAncestorId: "כובעי הקש" || process.env.ROOT_ANCESTOR_ID,
};

export default config;

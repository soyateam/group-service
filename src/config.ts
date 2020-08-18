const config = {
  apiPrefix: "/api",
  server: {
    port: process.env.PORT || 3000,
    name: "Group-Service",
  },
  db: {
    connectionString: `mongodb://${process.env.DB_SERVER || "mongo:27017/"}${process.env.DB_NAME || "groupDB"}${
      process.env.DB_REPLICA_NAME ? `?replicaSet=${process.env.DB_REPLICA_NAME}` : ""
    }`,
    port: process.env.DB_PORT || 27017,
  },
  env: {
    prod: "prod",
    dev: "dev",
  },
  RootAncestorId: process.env.ROOT_ANCESTOR_ID || "5e56858e4203fc40043591a5",
};

export default config;

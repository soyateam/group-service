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
  endpoints: {
    kartoffelAPI: {
      baseURL:
        process.env.KARTOFFEL_API ||
        "http://kartoffel-master.eastus.cloudapp.azure.com:3000/api",
    },
    OSpike: {
      baseURL: process.env.OSPIKE_URL || "https://51.144.178.121:1337/",
    },
  },
};

export default config;

const config = {
  apiPrefix: "/api",
  server: {
    port: process.env.PORT || 3000,
    name: "group-Service",
  },
  db: {
    connectionString: `mongodb://${
      process.env.DB_USERNAME != undefined && process.env.DB_PASSWORD != undefined
        ? `${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@`
        : ""
    }${process.env.DB_SERVER || "mongo"}:${process.env.DB_PORT || 27017}/${process.env.DB_NAME || "groupDB"}`,
  },
  env: {
    prod: "prod",
    dev: "dev",
    node: process.env.NODE_ENV || "dev",
  },
  RootAncestorId: process.env.ROOT_ANCESTOR_ID || "5e56858e4203fc40043591a5",
  authentication: {
    key: process.env.AUTHENTICATION_PUBLIC_KEY || "publickey",
    required: process.env.AUTHENTICATION_REQUIRED || false,
  },
};

export default config;

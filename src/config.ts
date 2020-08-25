const config = {
  apiPrefix: '/api',
  server: {
    port: process.env.PORT || 3000,
    name: 'group-Service',
  },
  db: {
    connectionString: `mongodb://${process.env.MONGO_CONNECTION_STRING}/${process.env.GROUP_DB_NAME}`,
  },
  env: {
    prod: 'prod',
    dev: 'dev',
    node: process.env.NODE_ENV || 'dev',
  },
  RootAncestorId: process.env.ROOT_ANCESTOR_ID || '5e56858e4203fc40043591a5',
};

export default config;

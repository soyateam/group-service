const config = {
  apiPrefix: '/api',
  server: {
    port: process.env.PORT || 3000,
    name: 'group-Service',
  },
  db: {
    connectionString: process.env.MONGO_CONNECTION_STRING || 'mongodb://mongo:27017',
  },
  env: {
    prod: 'prod',
    dev: 'dev',
    node: process.env.NODE_ENV || 'dev',
  },
  RootAncestorId: process.env.ROOT_ANCESTOR_ID || '5e56858e4203fc40043591a5',
  cors: {
    allowedOrigin: process.env.ALLOWED_ORIGIN || '*',
  },
};

export default config;

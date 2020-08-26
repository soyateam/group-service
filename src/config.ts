const config = {
  apiPrefix: '/api',
  server: {
    port: process.env.PORT || 3000,
    name: 'group-service',
  },
  db: {
    connectionString: process.env.MONGO_CONNECTION_STRING || 'mongodb://mongo:27017',
    logs: {
      connectionStringLogs:
        process.env.MONGO_CONNECTION_STRING_LOGS || 'mongodb://admin:Aa123456@ds063789.mlab.com:63789/groups',
      expiredInSec: 2592000, // 30 days
    },
  },
  env: {
    prod: 'prod',
    dev: 'dev',
    node: process.env.NODE_ENV || 'dev',
  },

  RootAncestorId: process.env.ROOT_ANCESTOR_ID || '5f44bd02c532d1bca5fd48bb',
};

export default config;

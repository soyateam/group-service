const config = {
  apiPrefix: '/api',
  server: {
    port: process.env.PORT || 3000,
    name: 'group-service',
  },
  db: {
    connectionString: process.env.MONGO_CONNECTION_STRING || 'mongodb://mongo:27017',
    logs: {
      connectionStringLogs: process.env.MONGO_CONNECTION_STRING_LOGS || 'mongodb://mongo:27017/logs',
      expiredInSec: 2592000, // 30 days
    },
  },
  env: {
    prod: 'prod',
    dev: 'dev',
    node: process.env.NODE_ENV || 'dev',
  },

  RootAncestorId: process.env.ROOT_ANCESTOR_ID || '5db805a8216dad5ed3b9efbf',
};

export default config;

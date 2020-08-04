
const config = {
    server: {
      port: process.env.PORT || 8000,
      name: 'Hierarchy-Service',
    },
    db: {
      connectionString: `mongodb://${process.env.DB_SERVER || 'localhost:27017/'}${process.env.DB_NAME || 'birthdayDB'}${
        process.env.DB_REPLICA_NAME ? `?replicaSet=${process.env.DB_REPLICA_NAME}` : ''
      }`,
      port: process.env.DB_PORT || 27017,
    },
    env: {
      prod: 'production',
      dev: 'development',
    },
    endpoints: {
      users: {
        api: process.env.USER_API || '/api/user',
        rpc: process.env.USERS_RPC_ENDPOINT || 'localhost:8086',
      },
    },
  };
  
  export default config;
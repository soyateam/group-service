import * as mongoose from 'mongoose';
import { Server } from './server';
import config from './config';
import { SeverityLevel } from './utils/logger/severityLevel';
import { log } from './utils/logger/logger';

process.on('uncaughtException', (err: Error) => {
    console.error('Unhandled Exception', err.stack);
    process.exit(1);
  });
  
  process.on('unhandledRejection', (err) => {
    console.error('Unhandled Rejection', err);
    process.exit(1);
  });
  
  const connectToMongo = async () => {
    log(SeverityLevel.INFO, `[MongoDB] trying to mongo server:  ${config.db.connectionString}`, 'connectToMongo');
    try {
      await mongoose.connect(config.db.connectionString, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
      });
    } catch (err) {
      log(SeverityLevel.ERROR, `did not connect to ${config.db.connectionString}. error: ${err}`, 'connectToMongo');
      return;
    }
  
    log(SeverityLevel.INFO, `successfully connected: ${config.db.connectionString}`, 'connectToMongo');
  };

  (async () => {
    await connectToMongo();
    const server: Server = Server.bootstrap();
    server.listen();
  
    server.app.on('close', () => {
      log(SeverityLevel.INFO, `Server closed`, 'Server');
    });
  })();
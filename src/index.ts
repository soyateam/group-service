import { Server } from './server';
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
  

  (async () => {
    const server: Server = Server.bootstrap();
    server.listen();
  
    server.app.on('close', () => {
      log(SeverityLevel.INFO, `Server closed`, 'Server');
    });
  })();
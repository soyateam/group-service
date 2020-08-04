import * as winston from 'winston';
import config from '../../config';
import { SeverityLevel } from './severityLevel';

export const logger = winston.createLogger({ defaultMeta: { service: config.server.name } });

if (process.env.NODE_ENV !== 'prod') {
  logger.add(
      new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss',
        }),
        winston.format.json(),
      ),
    }),
  );
}

/**
 * logs the data with its given parameters.
 * @param severity - the kind of log created.
 * @param name - name of the log. in our case, the function called.
 * @param description - description in text.
 * @param traceID - id to correlate to if there are several logs with some connection.
 * @param user - the user requesting for the service.
 * @param meta - additional optional information.
 */
export const log = (
  severity: SeverityLevel,
  name: string,
  description: string,
  correlationId?: string,
  user?: string,
  more?: object,
) => {
  logger.log({ name, correlationId, user, level: severity, message: description, ...more });
};
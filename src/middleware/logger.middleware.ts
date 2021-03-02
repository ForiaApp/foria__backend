
import winston, { LoggerOptions } from 'winston';

import type { ForioMiddleware } from '../server';

export const LoggerMiddleware = (overrides: LoggerOptions = {}): ForioMiddleware => {
  const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
      new winston.transports.Console({
        format: winston.format.prettyPrint({ colorize: true }),
      }),
    ],
    ...overrides,
  });

  return async function Logger(context, next) {
    context.logger = logger;

    await next();
  };
};

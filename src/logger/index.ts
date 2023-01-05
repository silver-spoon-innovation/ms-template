import { createLogger, transports, format, Logger } from 'winston';
import rTracer from 'cls-rtracer';

const rTracerFormat = format.printf((info: any): string => {
  const rid = rTracer.id();
  return rid ? `${info.timestamp} [request-id:${rid}]: ${info.message}` : `${info.timestamp}: ${info.message}`;
});

const logger: Logger = createLogger({
  level: 'info',
  format: format.combine(format.timestamp(), rTracerFormat),
  defaultMeta: { service: 'ms-template' },
  transports: [
    // error: 0
    // info: 1

    // - Write all logs with importance level of `error` or less to `error.log`
    new transports.File({ filename: 'error.log', level: 'error' }),
    // - Write all logs with importance level of `info` or less to `combined.log`
    new transports.File({ filename: 'combined.log', level: 'info' }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new transports.Console());
}

export default logger;
import { Application } from 'express'
import winston, { exitOnError, loggers } from 'winston';
import morgan from 'morgan';
import moment from 'moment';

const ERROR_LOG_PATH = './logs/error.log';
const COMBINED_LOG_PATH = './logs/combined.log';
const HTTP_LOG_PATH = './logs/http.log';

const createLogger = ({ level = 'info', moduleName = 'node-log' }) => {
  const logger = winston.createLogger({
    level,
    transports: [
      new winston.transports.Console(),
      //
      // - Write all logs with level `error` and below to `error.log`
      // - Write all logs with level `info` and below to `combined.log`
      //
      new winston.transports.File({
        filename: ERROR_LOG_PATH,
        level: 'error',
        handleExceptions: true,
        maxsize: 5242880, // 5MB
        maxFiles: 5
      }),
      new winston.transports.File({
        filename: COMBINED_LOG_PATH,
        handleExceptions: true
      }),
    ],
    exitOnError: false,
    format: winston.format.combine(
      winston.format.label({
        label: moduleName,
      }),
      winston.format.timestamp(),
      winston.format.json(),
      winston.format.printf((info) => {
        const localDateTime = moment(info.timestamp).format('YYYY-MM-DD hh:mm:ss');
        if (info instanceof Error) {
          return `${localDateTime} ${info.label} [${info.level}]: ${info.message}, ${info.stack}`;
        }
        return `${localDateTime} ${info.label} [${info.level}]: ${info.message}`;
      })
    ),
  });

  //
  // If we're not in production then log to the `console` with the format:
  // `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
  //
  // logger.add(new winston.transports.Console({
  //   format: winston.format.simple(),
  // }));

  return logger;
};

const log = createLogger({ level: 'info', moduleName: 'node-logger' });

export default log;


const createHttpLogger = (app: Application) => {
  const httpLogger = winston.createLogger({
    transports: [
      new winston.transports.File({
        level: 'info',
        filename: HTTP_LOG_PATH,
        handleExceptions: true,
        maxsize: 1048576, // 1MB
        maxFiles: 2,
      }),
      new winston.transports.Console({
        level: 'debug',
        handleExceptions: true,
      })
    ],
    exitOnError: false
  })
  
  const httpLoggerStream = {
    write: (message: string) => {
      httpLogger.info(message)
    }
  }

  app.use(morgan('combined', { stream: httpLoggerStream }));
}

export {
  createHttpLogger
}

import winston from 'winston';
import moment from 'moment';



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
        filename: './logs/error.log',
        level: 'error',
      }),
      new winston.transports.File({ filename: './logs/combined.log' }),
    ],
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

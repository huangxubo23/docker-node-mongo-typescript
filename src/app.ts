import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import path from 'path';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import { RegisterRoutes } from './routes';
import log, { createHttpLogger } from './config/log';
import { UncaughtExceptionError, errorHandler } from './error';
import redis from './utils/redis';

import * as itemController from './controllers/item';

const isProd = process.env.NODE_ENV === 'production';

console.info('==NODE_ENV==', process.env.NODE_ENV);

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
createHttpLogger(app);

process.on('uncaughtException', (error) => {
  log.info('==uncaughtException==');
  log.error(new UncaughtExceptionError(error.message));
});

process.on('unhandledRejection', (error: any) => {
  log.info('==unhandledRejection==');
  log.error(new UncaughtExceptionError(error.message || error.name));
});

// Connect to MongoDB
mongoose
  .connect(
    'mongodb://localhost:27017/mongo', // 'mongodb://mongo:27017/mongo',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
  )
  .then(() => log.info('MongoDB Connected'))
  .catch((err) => {
    log.error(err);
  });

app.get('/', itemController.getItem);
app.post('/item/add', itemController.addItem);
if (!isProd) {
  const swaggerDocument = require('./swagger-ui/swagger.json');
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  app.use('/docs', swaggerUi.serve, async (_req: Request, res: Response) => {
    return res.send(
      swaggerUi.generateHTML(await import('./swagger-ui/swagger.json'))
    );
  });
}

RegisterRoutes(app);

app.use(errorHandler);

redis.init();

export default app;

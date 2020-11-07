import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import errorHandler from 'errorhandler';
import path from 'path';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import { ValidateError } from 'tsoa';
import { RegisterRoutes } from './routes';

import * as itemController from './controllers/item';

const isDev = process.env.NODE_ENV === 'development';
console.info('==NODE_ENV==', process.env.NODE_ENV);

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(errorHandler());

// Connect to MongoDB
mongoose
  .connect(
    'mongodb://localhost:27017/mongo', // 'mongodb://mongo:27017/mongo',
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => {
    console.log(err);
  });

app.get('/', itemController.getItem);
app.post('/item/add', itemController.addItem);
if (isDev) {
  const swaggerDocument = require('./swagger-ui/swagger.json');
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  app.use(
    '/docs',
    swaggerUi.serve,
    async (_req: Request, res: Response) => {
      return res.send(
        swaggerUi.generateHTML(await import('./swagger-ui/swagger.json'))
      );
    }
  );
  // app.use(errorHandler())
}

RegisterRoutes(app);

app.use(
  (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
  ): Response | void => {
    if (err instanceof ValidateError) {
      console.warn(`Caught Validation Error for ${req.path}:`, err.fields);
      return res.status(422).json({
        message: 'Validation Failed',
        data: err?.fields,
      });
    }
    if (err instanceof Error) {
      return res.status(500).json({
        message: 'Internal Server Error',
        data: err,
      });
    }

    next();
  }
);

export default app;

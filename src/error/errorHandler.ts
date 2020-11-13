import { Request, Response, NextFunction } from 'express';
import { Error as MongooseError, CastError } from 'mongoose';
import { ValidateError } from 'tsoa';
import { StatusCodes } from 'http-status-codes'
import log from '../config/log';
import Code from '../config/code';
import { ErrorResponse } from '../config/response';

const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  log.error(`path:${req.path}, ${JSON.stringify(err)}`);
  if (err instanceof ValidateError) {
    // 422 - Tsoa ValidateError
    log.error('Tsoa ValidateError')
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json(
      new ErrorResponse({
        code: Code.VALIDATION_FAILED,
        data: err?.fields,
      })
    );
  } else if (err instanceof MongooseError && err.name === 'ValidationError') {
    // 422 - Mongoose ValidationError
    log.error('Mongoose ValidationError')
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json(
      new ErrorResponse({
        code: Code.VALIDATION_FAILED,
        data: err?.message,
      })
    );
  } else if (err instanceof Error) {
    // 500 - Internal Server Error
    log.error(`Internal Server Error, name:${err.name}, message:${err.message}`)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(
      new ErrorResponse({
        code: Code.INTERNAL_SERVER_ERROR,
        data: err?.message,
      })
    );
  }
  next();
};

export default errorHandler;

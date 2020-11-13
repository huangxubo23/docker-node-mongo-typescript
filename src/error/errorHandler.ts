import { Request, Response, NextFunction } from 'express';
import { Error } from 'mongoose';
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
  if (err instanceof ValidateError) {
    log.error(`${req.path}, ${JSON.stringify(err.fields)}`);
    // 422 - VALIDATION_FAILED
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json(
      new ErrorResponse({
        code: Code.VALIDATION_FAILED,
        data: err?.fields,
      })
    );
  } else if (err instanceof Error) {
    // 500 - Internal Server Error
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

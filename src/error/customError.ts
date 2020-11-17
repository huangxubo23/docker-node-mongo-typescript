import { StatusCodes } from 'http-status-codes';
import Code from '../config/code';

interface CustomErrorProps {
  name: string;
  message: string;
  code: number;
  statusCode: number;
}

class CustomError extends Error {
  code: number;
  statusCode: number;
  constructor(error: CustomErrorProps) {
    const { name, message, code = 5000, statusCode = 200 } = error
    super(message);
    this.name = name;
    this.code = code;
    this.statusCode = statusCode;
  }

  // 序列化错误对象
  toJSON() {
    return {
      name: this.name,
      message: this.message,
    }
  }
}

const ErrorTypes = {
  ValidationError: 'ValidationError',
  UncaughtExceptionError: 'UncaughtExceptionError',
  ForbiddenError: 'ForbiddenError',
  UnauthorizedExceptionError: 'UnauthorizedExceptionError'
}

class ValidationError extends CustomError {
  constructor(message: string) {
    super({
      name: ErrorTypes.ValidationError,
      message,
      code: Code.VALIDATION_FAILED,
      statusCode: StatusCodes.UNPROCESSABLE_ENTITY,
    });
  }
}

interface ForbiddenErrorProps {
  code: number;
  message: string;
}
class ForbiddenError extends CustomError {
  constructor(error: ForbiddenErrorProps) {
    super({
      name: ErrorTypes.ForbiddenError,
      message: error.message,
      code: error.code,
      statusCode: StatusCodes.FORBIDDEN,
    });
  }
}

class UncaughtExceptionError extends CustomError {
  constructor(message: string) {
    super({
      name: ErrorTypes.UncaughtExceptionError,
      message,
      code: Code.INTERNAL_SERVER_ERROR,
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR
    });
  }
}

class UnauthorizedExceptionError extends CustomError {
  constructor(message: string) {
    super({
      name: ErrorTypes.UnauthorizedExceptionError,
      message,
      code: Code.UNAUTHORIZED_EXCEPTION_ERROR,
      statusCode: StatusCodes.UNAUTHORIZED
    });
  }
}

export {
  CustomError,
  ErrorTypes,
  ValidationError,
  ForbiddenError,
  UncaughtExceptionError,
  UnauthorizedExceptionError
}
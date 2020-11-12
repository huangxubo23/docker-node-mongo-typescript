class CustomError extends Error {
  constructor(name: string, message: string) {
    super(message);
    this.name = name || 'CustomError';
    this.message = message;
  }

  // 序列化错误对象
  toJSON() {
    return {
      error: {
        name: this.name,
        message: this.message,
        stack: this.stack
      }
    }
  }
}

const ErrorTypes = {
  ValidationError: 'ValidationError',
  UncaughtExceptionError: 'UncaughtExceptionError'
}

class ValidationError extends CustomError {
  constructor(message: string) {
    super(ErrorTypes.ValidationError, message);
    this.message = message;
  }
}

class UncaughtExceptionError extends CustomError {
  constructor(message: string) {
    super(ErrorTypes.UncaughtExceptionError, message);
    this.message = message;
  }
}

export {
  CustomError,
  ErrorTypes,
  ValidationError,
  UncaughtExceptionError
}



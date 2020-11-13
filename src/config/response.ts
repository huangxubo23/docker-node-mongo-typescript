import Code from './code';
import code, { CodeMessage } from './code';

export interface CommonResponse<T> {
  success: boolean
  code: number
  message: string
  data: T
}

export interface BaseResponseProps<T> {
  success: boolean;
  code: code;
  message?: string;
  data: T;
}

class BaseResponse {
  success: boolean;
  code: number;
  message: string;
  data: any;
  constructor({ success, code, data }: BaseResponseProps<any>) {
    this.success = success;
    this.code = code;
    this.message = CodeMessage[code];
    this.data = data;
  }
}

export class SuccessResponse extends BaseResponse {
  constructor(data: any) {
    super({ data, code: Code.SUCCESS, success: true });
  }
}

type ErrorResponseProps = Pick<BaseResponseProps<any>, 'code' | 'data'>;
// type ErrorResponseProps = Omit<CommonResponseProps<any>, 'success' | 'message'>;

export class ErrorResponse extends BaseResponse {
  constructor(data: ErrorResponseProps) {
    super({ data: data.data, code: data.code || code.INTERNAL_SERVER_ERROR, success: false });
  }
}

/**
 * format success Response
 * @param data 
 */
export function formatSuccessResponse(data: any) {
  return new SuccessResponse(data)
}

/**
 * format error Response
 * @param data 
 */
export function formatErrorResponse(data: ErrorResponseProps) {
  return new ErrorResponse(data)
}
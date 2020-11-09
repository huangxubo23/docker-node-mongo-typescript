export interface CommonResponse<T> {
  success: boolean
  code: number
  message: string
  data: T
}

export interface ErrorResponseModel {
  status: number;

  /**
   * @minLength 2
   */
  message: string;

  /**
   * @ignore
   */
  hidden?: string;
}
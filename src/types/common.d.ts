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
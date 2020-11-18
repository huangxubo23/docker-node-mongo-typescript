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

export interface Pagination<T> {
  /**
   * 当前分页
   */
  currentPage: number;
  /**
   * 分页大小
   */
  pageSize: number;
  /**
   * 分页总条数
   */
  total: number;
  /**
   * 分页数据
   */
  list: Array<T>;
}

export interface PaginationParams {
  /**
   * 当前分页
   */
  currentPage: number;
  /**
   * 分页大小
   */
  pageSize: number;
}
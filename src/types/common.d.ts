export interface CommonResponse<T> {
  success: boolean
  code: number
  message: string
  data: T
}
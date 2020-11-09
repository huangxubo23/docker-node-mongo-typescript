export interface User {
  /**
   * 用户ID
   */
  id: number;
  /**
   * 用户邮箱
   */
  email: string;
  /**
   * 用户名
   * @minLength 3
   * @maxLength 20
   * @pattern ^[a-zA-Z]+$
   * @example "demoName"
   */
  name: string;
  /**
   * 用户状态
   */
  status?: 'online' | 'offline';
  /**
   * 用户手机号码
   */
  phoneNumbers: string[];
}

export type UserCreationParams = Pick<User, 'email' | 'name' | 'phoneNumbers'>;
export interface User {
  /**
   * 用户名
   * @minLength 3
   * @maxLength 20
   * @example "demoName"
   */
  userName: string;
  // /**
  //  * 密码
  //  * @minLength 6
  //  * @maxLength 30
  //  */
  // password: string;
  /**
   * 昵称
   * @minLength 3
   * @maxLength 50
   */
  nickName?: string;
  /**
   * 手机号
   * @pattern ^1[3-9]\d{9}$
   */
  phone: string;
  /**
   * 邮箱
   */
  email?: string;
}

export interface UserRegisterParams extends User {
  /**
   * 密码
   * @minLength 6
   * @maxLength 30
   */
  password: string;
}

export type UserLoginParams = Pick<UserRegisterParams, 'userName' | 'password'>;

export type UserCreationParams = Pick<UserRegisterParams, 'userName' | 'password'>;

export type UserPatchParams = Pick<User, 'nickName' | 'email'> & { 
  /**
   * 手机号
   * @pattern ^1[3-9]\d{9}$
   */
  phone?: string
};

export type UserUpdateParams = Pick<User, 'phone'> & { 
  // /**
  //  * 昵称
  //  * @minLength 3
  //  * @maxLength 50
  //  */
  nickName: string;
  /**
   * 邮箱
   */
  email: string;
};
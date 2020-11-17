enum Code {
  SUCCESS = 10000, // 成功
  USER_HAS_REGISTERED = 11000, // 用户已注册
  VALIDATION_FAILED = 40000, // 表单验证失败
  UNAUTHORIZED_EXCEPTION_ERROR = 40100, // 用户未登录
  INTERNAL_SERVER_ERROR = 50000, // 服务器错误
}

const CodeMessage = {
  [Code.SUCCESS]: 'Success',
  [Code.USER_HAS_REGISTERED]: 'User has registered',
  [Code.VALIDATION_FAILED]: 'Validation Failed',
  [Code.UNAUTHORIZED_EXCEPTION_ERROR]: 'User not login',
  [Code.INTERNAL_SERVER_ERROR]: 'Internal Server Error',
}

export default Code;

export {
  CodeMessage
}

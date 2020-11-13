enum Code {
  SUCCESS = 10000, // 成功
  VALIDATION_FAILED = 40000, // 表单验证失败
  INTERNAL_SERVER_ERROR = 50000, // 服务器错误
}

const CodeMessage = {
  [Code.SUCCESS]: 'Success',
  [Code.VALIDATION_FAILED]: 'Validation Failed',
  [Code.INTERNAL_SERVER_ERROR]: 'Internal Server Error',
}

export default Code;

export {
  CodeMessage
}

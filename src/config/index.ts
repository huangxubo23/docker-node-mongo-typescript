const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = 1 * 60 * 60; // use seconds, 60: '60 seconds', '10h', '7d', '120':'120ms'
const REDIS_EXPIRE_SECONDS = JWT_EXPIRES_IN;
const REDIS_HOST = process.env.REDIS_HOST;

const platform_names = {
  'taobao': '淘宝',
  'jd': '京东'
}

export {
  JWT_SECRET,
  JWT_EXPIRES_IN,
  REDIS_HOST,
  REDIS_EXPIRE_SECONDS,
  platform_names
}



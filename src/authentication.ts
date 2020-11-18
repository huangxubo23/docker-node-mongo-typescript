import { Request } from 'express';
import Token from './utils/token';

export async function expressAuthentication(
  request: Request,
  securityName: string,
  scopes?: string[]
): Promise<any> {
  console.info('==expressAuthentication==', securityName);
  let token;
  switch (securityName) {
    case 'api_key':
      token = request.query.access_token || request.body.access_token;
      break;
    case 'authorization':
    default:
      token = request.headers.authorization;
      break;
  }
  const user = await Token.check(token);
  return Promise.resolve(user);
}

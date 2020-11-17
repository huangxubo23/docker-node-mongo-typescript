import * as express from 'express';
import jwt from 'jsonwebtoken';
import userService from './services/user';
import { UnauthorizedExceptionError } from './error';
import { JWT_SECRET } from './config';

export async function expressAuthentication(
  request: express.Request,
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
  console.info('==token==', token);

  if (!token) {
    throw new UnauthorizedExceptionError(`Verify user fail: token is ${token}`);
  }

  try {
    const rawToken = String(token);
    const tokenData: any = jwt.verify(rawToken, JWT_SECRET);
    const userId = tokenData.id;
    const user = await userService.findById(userId);
    if (!user) {
      throw new UnauthorizedExceptionError('Verify user fail: User not exit');
    }

    // (request as any).user = user;

    return Promise.resolve(user);
  } catch (error) {
    throw new UnauthorizedExceptionError(`Verify user fail: ${error.message}`);
  }
}


import jwt from 'jsonwebtoken';
import redis from '../utils/redis';
import { JWT_SECRET, JWT_EXPIRES_IN, REDIS_EXPIRE_SECONDS } from '../config';
import { User } from '../types/user';
import { UnauthorizedExceptionError } from '../error';
import userService from '../services/user';
import log from '../config/log';

const token = {
  sign: (user: User) => {
    const token = jwt.sign({
      id: String(user.id),
    }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });
    redis.set(token, JSON.stringify({ value: token, createDate: Date.now() }));
    redis.expire(token, REDIS_EXPIRE_SECONDS);
    return token;
  },
  remove: (token: string) => {
    redis.delete(token);
  },
  check: async (token: string): Promise<User> => {
    console.info('==check token==', token);
    try {
      if (!token) {
        throw new Error(`Verify user fail: token is ${token}`);
      }
      const rawToken = String(token);
      const tokenData: any = jwt.verify(rawToken, JWT_SECRET);
      const userId = tokenData.id;
      const user = await userService.findById(userId);
      if (!user) {
        throw new Error('Verify user fail: User not exit');
      }
      const redisToken = await redis.get(rawToken);
      console.info('==redisToken==', redisToken);
      if (!redisToken) {
        throw new Error('Verify user fail: Token is expired');
      }

      // (request as any).user = user;
      return user;
    } catch (error) {
      log.error(`Check token error: ${JSON.stringify(error)}`);
      let errMsg = error.message;
      switch (error.name) {
        case 'TokenExpiredError': {
          // {"name":"TokenExpiredError","message":"jwt expired","expiredAt":"2020-11-18T04:12:47.000Z"}
          // overwrite the error message
          errMsg = 'Check token error: Token is expired';
          break;
        }
        default: {
          break;
        }
      }
      throw new UnauthorizedExceptionError(errMsg);
    }
  }
}

export default token;
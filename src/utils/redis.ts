import redis, { RedisClient } from 'redis';
import { REDIS_HOST } from '../config';
import log from '../config/log';

class Redis {
  private redisClient: RedisClient;
  public initSuccess: boolean = false;
  public init() {
    this.redisClient = redis.createClient({
      host: REDIS_HOST,
    });
    this.redisClient.on('connect', () => {
      log.info(`Redis has connected: ${REDIS_HOST}`);
      this.initSuccess = true;
    });
  }
  public set(key: string, value: string) {
    console.info('==redis set==', key, value);
    this.redisClient.set(key, value, redis.print);
  }
  public async get(key: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.redisClient.get(key, (err, val) => {
        console.info('==Redis get==', key, err, val);
        if (err) {
          reject(err);
        }
        if (!val) {
          reject(new Error(`Redis get [${key}] is empty`));
        }
        resolve(val);
      });
    })
  }
  public expire(key: string, seconds: number) {
    console.info('==redis expire==', key, seconds);
    this.redisClient.expire(key, seconds, redis.print);
  }
  public delete(key: string) {
    this.redisClient.del(key, redis.print);
  }
}

export default new Redis();
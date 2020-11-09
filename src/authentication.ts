import * as express from 'express';

export function expressAuthentication(
  request: express.Request,
  securityName: string,
  scopes?: string[]
): Promise<any> {
  console.info('==expressAuthentication==', securityName)
  if (securityName === 'api_key') {
    let token;
    if (request.query && request.query.access_token) {
      token = request.query.access_token;
    }

    if (token === 'test') {
      return Promise.resolve({
        id: 1,
        name: 'ApiKey',
        email: 'example@email.com',
        phoneNumbers: ['15521117205'],
        status: 'online'
      });
    } else {
      return Promise.reject({});
    }
  }

  if (securityName === 'authorization') {
    const token = request.body.authorization || request.query.authorization || request.headers['authorization'];
    console.info('==authorization==', token);

    if (token === 'test') {
      return Promise.resolve({
        id: 1,
        name: 'Token',
        email: 'example@email.com',
        phoneNumbers: ['15521117205'],
        status: 'online'
      });
    } else {
      return Promise.reject({});
    }
  }
}

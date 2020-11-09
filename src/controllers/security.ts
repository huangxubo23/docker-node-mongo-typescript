import { Get, Route, Tags, Security, Request, Response, Controller } from 'tsoa';
import { ErrorResponseModel } from '../types/common';
import { User } from '../types/user';

interface RequestWithUser {
  user?: any;
}

@Tags('Auth 用户授权登录模块')
@Route('auth')
export class SecurityTestController extends Controller {
  /**
   * 
   * @param request 
   */
  @Response<ErrorResponseModel>('default', 'Unexpected error')
  @Security('api_key')
  @Get('query')
  public async GetWithApi(@Request() request: RequestWithUser): Promise<User> {
    console.info('==request==', request.user);
    return Promise.resolve(request.user);
  }

  @Response<ErrorResponseModel>('default', 'Unexpected error')
  @Security('authorization')
  @Get('header')
  public async GetWithToken(@Request() request: RequestWithUser): Promise<User> {
    console.info('==request token==', request.user);
    return Promise.resolve(request.user);
  }
}
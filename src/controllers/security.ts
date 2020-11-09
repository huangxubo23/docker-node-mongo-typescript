import { Get, Route, Security, Request, Response, Controller } from 'tsoa';
import { ErrorResponseModel } from '../types/common';
import { User } from '../types/user';

interface RequestWithUser {
  user?: any;
}

@Route('SecurityTest')
export class SecurityTestController extends Controller {
  @Response<ErrorResponseModel>('default', 'Unexpected error')
  @Security('api_key')
  @Get()
  public async GetWithApi(@Request() request: RequestWithUser): Promise<User> {
    console.info('==request==', request.user);
    return Promise.resolve(request.user);
  }

  @Response<ErrorResponseModel>('default', 'Unexpected error')
  @Security('authorization')
  @Get('auth')
  public async GetWithToken(@Request() request: RequestWithUser): Promise<User> {
    console.info('==request token==', request.user);
    return Promise.resolve(request.user);
  }
}
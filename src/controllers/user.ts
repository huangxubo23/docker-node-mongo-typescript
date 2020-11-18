import {
  Body,
  Controller,
  Get,
  Path,
  Post,
  Put,
  Patch,
  Delete,
  Query,
  Route,
  Request,
  SuccessResponse,
  Response,
  Tags,
  Security,
  Header,
  Head
} from 'tsoa';
import { Request as ExRequest } from 'express';
import bcrypt from 'bcryptjs';
import { User, UserCreationParams, UserRegisterParams, UserLoginParams, UserPatchParams, UserUpdateParams } from '../types/user';
import userService from '../services/user';
import { formatSuccessResponse, CommonResponse } from '../config/response';
import { ForbiddenError, ValidationError } from '../error';
import Code from '../config/code';
import Token from '../utils/token';

@Route('user')
@Tags('User 用户模块')
export class UserController extends Controller {
  /**
   * 用户注册
   */
  @Response('403', 'code:11000, User has been registered')
  @SuccessResponse('200', 'Register Success') // Custom success response
  @Post('register')
  public async register(
    @Body() requestBody: UserRegisterParams,
    @Request() req: ExRequest
  ): Promise<CommonResponse<User>> {
    try {
      const user = await userService.register(requestBody);
      return formatSuccessResponse(user);
    } catch (error) {
      switch (error.code) {
        case 11000:
          throw new ForbiddenError({
            code: Code.USER_HAS_REGISTERED,
            message: `User name: ${requestBody.userName}, has been resgistered.`
          });
        default: {
          throw error;
        }
      }
    }
  }

  /**
   * 用户登录
   */
  @SuccessResponse('301', 'redirect') // Custom success response
  @Post('login')
  public async login(
    @Body() requestBody: UserLoginParams
  ): Promise<CommonResponse<User>> {
    const { userName, password } = requestBody;
    const user = await userService.login(userName);
    if (!user) {
      throw new ValidationError('Current user does not exist')
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      throw new ValidationError('Password is invalid')
    }

    const rtnUser = userService.formatUser(user);
    const token = Token.sign(rtnUser);
    this.setHeader('authorization', token);
    return formatSuccessResponse({
      user: rtnUser,
      token
    });
  }

  /**
   * Get user detail through header authorization
   * @param req 
   */
  @Security('authorization')
  @Get('detail')
  public async detail(
    @Request() req: ExRequest
  ): Promise<User> {
    const user = (req as any).user;
    return user;
  }

  /**
   * Get user info through access_token in query
   * @param req 
   */
  @Security('api_key')
  @Get('info')
  public async info(
    @Request() req: ExRequest
  ): Promise<User> {
    const user = (req as any).user;
    return user;
  }

  /**
   * 修改用户名称
   * @param userName 用户名称
   */
  @Security('authorization')
  @Patch('patch')
  public async patch(
    // @Path() userId: number,
    @Request() req: ExRequest,
    // @Query() userName: string,
    @Body() patchUser: UserPatchParams,
  ): Promise<User> {
    const user = (req as any).user;
    console.info('==patch==', user.id, patchUser);
    const newUser = userService.path(user.id, patchUser);
    return newUser;
  }

  /**
   * 修改用户信息
   * @param userId 用户ID
   * @param requestBody 用户信息
   */
  @Security('authorization')
  @Put('update')
  public async update(
    @Request() req: ExRequest,
    @Body() updateUser: UserUpdateParams
  ): Promise<User> {
    const user = (req as any).user;
    const newUser = userService.update(user.id, updateUser);
    return newUser;
  }

  /**
   * 删除用户
   * @param userId 用户ID
   */
  @Security('authorization')
  @Delete('delete')
  public async delete(
    @Request() req: ExRequest,
  ): Promise<boolean> {
    const user = (req as any).user;
    const isDelete = userService.delete(user.id);
    return isDelete;
  }
}

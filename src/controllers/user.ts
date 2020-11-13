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
  SuccessResponse,
  Tags,
} from 'tsoa';
import { User, UserCreationParams } from '../types/user';
import { UserService } from '../services/user';
import { formatSuccessResponse, CommonResponse } from '../config/response';

@Route('user')
@Tags('User 用户模块')
export class UserController extends Controller {
  /**
   * 获取用户信息
   * @param userId 用户ID
   * @param name 用户名称
   */
  @Get('{userId}')
  public async getUser(
    @Path() userId: number,
    @Query() name?: string
  ): Promise<User> {
    return new UserService().get(userId, name);
  }

  /**
   * 删除用户
   * @param userId 用户ID
   */
  @Delete('{userId}')
  public async deleteUser(
    @Path() userId: number
  ): Promise<CommonResponse<number>> {
    return formatSuccessResponse(userId);
  }

  /**
   * 修改用户信息
   * @param userId 用户ID
   * @param requestBody 用户信息
   */
  @Put('{userId}')
  public async updateUser(
    @Path() userId: number,
    @Body() requestBody: UserCreationParams
  ): Promise<CommonResponse<{ userId: number } & UserCreationParams>> {
    return formatSuccessResponse({ userId, ...requestBody });
  }

  /**
   * 修改用户名称
   * @param userId 用户ID
   * @param userName 用户名称
   */
  @Patch('{userId}')
  public async patchUser(
    @Path() userId: number,
    @Query() userName: string
  ): Promise<CommonResponse<{ userId: number } & UserCreationParams>> {
    return formatSuccessResponse({ userId, userName });
  }

  /**
   * 新建用户
   */
  @SuccessResponse('201', 'Created') // Custom success response
  @Post('add')
  public async createUser(
    @Body() requestBody: UserCreationParams
  ): Promise<void> {
    this.setStatus(201); // set return status 201
    new UserService().create(requestBody);
    return;
  }
}

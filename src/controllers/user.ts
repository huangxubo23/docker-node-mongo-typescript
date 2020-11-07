import {
  Body,
  Controller,
  Get,
  Path,
  Post,
  Put,
  Delete,
  Query,
  Route,
  SuccessResponse,
  Tags,
} from 'tsoa';
import { User, UserCreationParams } from '../types/user';
import { UsersService } from '../services/user';

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
    return new UsersService().get(userId, name);
  }

  /**
   * 删除用户
   * @param userId 用户ID
   */
  @Delete('{userId}')
  public async deleteUser(
    @Path() userId: number
  ): Promise<any> {
    return {
      success: true,
      message: '删除用户成功',
      code: 10000,
      data: { userId }
    }
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
  ): Promise<any> {
    return {
      success: true,
      message: '修改用户成功',
      code: 10000,
      data: { userId, requestBody }
    }
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
    new UsersService().create(requestBody);
    return;
  }
}

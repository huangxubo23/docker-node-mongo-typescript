import { UserModel, UserDocument } from '../models/user';
import {
  User as IUser,
  UserPagination,
  UserRegisterParams,
  UserPatchParams,
  UserUpdateParams,
} from '../types/user';
import { PaginationParams } from '../types/common';

class BaseUser implements IUser {
  userName: string;
  nickName: string;
  phone: string;
  email: string;
  id: string;
  constructor(user: UserDocument) {
    this.userName = user.userName;
    this.nickName = user.nickName;
    this.phone = user.phone;
    this.email = user.email || '';
    this.id = user._id;
  }
}

export class UserService {
  public formatUser(user: UserDocument): IUser {
    return new BaseUser(user);
  }
  public async register(user: UserRegisterParams): Promise<IUser> {
    const newUser = new UserModel(user);
    const res = await newUser.save();
    return this.formatUser(res);
  }

  public async login(userName: string): Promise<UserDocument> {
    const user = await UserModel.findOne({
      userName,
    });
    return user;
  }

  public async find({
    currentPage,
    pageSize,
  }: PaginationParams): Promise<UserPagination> {
    const users = await UserModel.find()
      .limit(pageSize * 1)
      .skip((currentPage - 1) * pageSize)
      // .select('userName nickName -_id')
      // .select({ userName: 1, nickName: 1, phone: 1, email: 1, _id: 0 })
      .exec();

    // get total documents in the collection
    const total = await UserModel.countDocuments();

    return {
      currentPage,
      pageSize,
      total,
      list: users.map((user) => this.formatUser(user)),
    };
  }

  public async findById(userId: string): Promise<IUser> {
    const user = await UserModel.findById(userId);
    return this.formatUser(user);
  }

  public async path(userId: string, info: UserPatchParams): Promise<IUser> {
    const user = await UserModel.findByIdAndUpdate(userId, info, { new: true });
    return this.formatUser(user);
  }

  public async update(userId: string, info: UserUpdateParams): Promise<IUser> {
    const user = await UserModel.findByIdAndUpdate(userId, info, { new: true });
    return this.formatUser(user);
  }

  public async delete(userId: String) {
    try {
      await UserModel.findByIdAndDelete(userId);
      return true;
    } catch (error) {
      throw error;
    }
  }
}

const userService = new UserService();

export default userService;

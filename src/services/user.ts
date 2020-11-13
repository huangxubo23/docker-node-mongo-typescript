import { User, UserCreationParams } from '../types/user';

export class UserService {
  public get(id: number, name?: string): User {
    return {
      id,
      email: 'example@gmail.com',
      name: name ?? 'Harry Huang',
      status: 'online',
      phoneNumbers: [],
    };
  }

  public create(userCreationParams: UserCreationParams): User {
    return {
      id: Math.floor(Math.random() * 10000), // Random
      status: 'online',
      ...userCreationParams,
    };
  }
}
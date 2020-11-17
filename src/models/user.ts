import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { UserRegisterParams } from '../types/user';
import { phoneReg } from '../utils'

export type UserDocument = mongoose.Document & UserRegisterParams;

// 定义一个用户模型，username是唯一的索引，表示不能被重复
const UserSchema = new mongoose.Schema({
  userName: { type: String, required: true, unique: true, minlength: 3, maxlength: 20 },
  nickName: { type: String, minlength: 3, maxlength: 50 },
  phone: {
    type: String,
    validate: {
      validator: (value: string) => {
        console.info('==phone==', value, phoneReg.test(value))
        return phoneReg.test(value);
      },
      message: props => `${props.value} is not a valid phone number!`
    },
  },
  email: { type: String },
  password: {
    type: String,
    required: true,
    minlength: 6, 
    maxlength: 100,
    set(val: string) {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(val, salt);
      return hash;
    },
  },
});

export const UserModel = mongoose.model<UserDocument>('User', UserSchema);

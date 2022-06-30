import { Schema } from 'mongoose';
import * as mongoose from 'mongoose';

export interface UserModel {
  name: string;
  surname: string;
  birthday: Date;
  cf: string;
  email: string;
  address: string;
  zipCode: number;
  city: string;
  passwordHash: number;
  passwordSalt: number;
}

module.exports = function () {
  const UserSchema = new Schema<UserModel>({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    birthday: { type: Date, required: true },
    cf: { type: String, required: true, unique: true, lowercase: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    address: { type: String, required: true },
    zipCode: { type: Number, required: true },
    city: { type: String, required: true },
    passwordHash: { type: Number, required: true },
    passwordSalt: { type: Number, required: true },
  });
  return mongoose.model('User', UserSchema);
};

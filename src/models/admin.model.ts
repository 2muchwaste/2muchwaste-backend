import { IUser } from './user.model';
import mongoose, { Schema } from 'mongoose';
import { Roles } from '../enums/Roles';

const userSchema = mongoose.model('User');
export interface IAdmin extends IUser {}

const adminSchema = userSchema.discriminator(
  Roles.ADMIN.toString(),
  new Schema({})
);

export default adminSchema;

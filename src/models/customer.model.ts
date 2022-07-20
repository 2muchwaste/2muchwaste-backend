import { Schema } from 'mongoose';
import { IUser } from './user.model';
import { Roles } from '../enums/Roles';

const mongoose = require('mongoose');
const userSchema = mongoose.model('User');

export interface INotification {
  date: Date;
  text: string;
  read: boolean;
  depositID: Schema.Types.ObjectId;
}

export interface ICustomer extends IUser {
  notifications: INotification[];
}

const NotificationSchema = new Schema<INotification>({
  date: { type: Date, required: true },
  text: { type: String, required: true },
  read: { type: Boolean, required: true },
  depositID: { type: Schema.Types.ObjectId, required: false, ref: 'Deposits' },
});

const customerSchema = userSchema.discriminator(
  Roles.CUSTOMER.toString(),
  new Schema({
    notifications: { type: [NotificationSchema], required: false },
  })
);

export default customerSchema;

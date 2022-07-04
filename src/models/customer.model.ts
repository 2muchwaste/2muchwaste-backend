import { Schema } from 'mongoose';
import { userDefinitions, UserModel } from './user.model';
import bcrypt from 'bcrypt';

const mongoose = require('mongoose');

interface NotificationModel {
  date: Date;
  text: string;
  read: boolean;
  depositID: Schema.Types.ObjectId;
}

export interface CustomerModel extends UserModel {
  notifications: NotificationModel[];
}

module.exports = () => {
  const NotificationSchema = new Schema<NotificationModel>({
    date: { type: Date, required: true },
    text: { type: String, required: true },
    read: { type: Boolean, required: true },
    depositID: { type: Schema.Types.ObjectId, required: true, ref: 'Deposits' },
  });
  const customerSchema = new Schema<CustomerModel>({
    ...userDefinitions,
    notifications: { type: [NotificationSchema], required: false },
  });
  const saltRounds = 8;
  customerSchema.pre('save', async next => {
    // @ts-ignore
    if (this.isModified('passwordHash')) {
      // @ts-ignore
      this.passwordHash = await bcrypt.hash(this.passwordHash, saltRounds);
    }
    next();
  });
  return mongoose.model('Customer', customerSchema);
};

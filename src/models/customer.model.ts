import { Schema } from 'mongoose';
import { userDefinitions, UserModel } from './user.model';

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
  return mongoose.model('Customer', customerSchema);
};

import { Schema } from 'mongoose';

const mongoose = require('mongoose');

interface NotificationModel {
  date: Date;
  text: string;
  read: boolean;
  depositID: Schema.Types.ObjectId;
}

export interface CustomerModel {
  email: string;
  passwordHash: number;
  passwordSalt: number;
  name: string;
  surname: string;
  cf: string;
  address: string;
  zipCode: string;
  notifications: NotificationModel[];
}

module.exports = function () {
  const NotificationSchema = new Schema<NotificationModel>({
    date: { type: Date, required: true },
    text: { type: String, required: true },
    read: { type: Boolean, required: true },
    depositID: { type: Schema.Types.ObjectId, required: true },
  });
  const customerSchema = new Schema<CustomerModel>({
    email: { type: String, required: true, unique: true, lowercase: true },
    passwordHash: { type: Number, required: true },
    passwordSalt: { type: Number, required: true },
    name: { type: String, required: true },
    surname: { type: String, required: true },
    cf: { type: String, required: true, unique: true, lowercase: true },
    address: { type: String, required: true },
    zipCode: { type: String, required: true },
    notifications: { type: [NotificationSchema], required: false },
  });
  return mongoose.model('Customer', customerSchema);
};

import { Schema } from 'mongoose';

const mongoose = require('mongoose');

interface INotification {
  date: Date;
  text: string;
  read: boolean;
  depositID: Schema.Types.ObjectId;
}

export interface IUser {
  email: string;
  passwordHash: number;
  passwordSalt: number;
  name: string;
  surname: string;
  cf: string;
  address: string;
  notifications: INotification[];
}

module.exports = function () {
  const NotificationSchema = new Schema<INotification>({
    date: { type: Date, required: true },
    text: { type: String, required: true },
    read: { type: Boolean, required: true },
    depositID: { type: Schema.Types.ObjectId, required: true },
  });
  const UserSchema = new Schema<IUser>({
    email: { type: String, required: true, unique: true, lowercase: true },
    passwordHash: { type: Number, required: true },
    passwordSalt: { type: Number, required: true },
    name: { type: String, required: true },
    surname: { type: String, required: true },
    cf: { type: String, required: true },
    address: { type: String, required: true },
    notifications: { type: [NotificationSchema], required: false },
  });
  return mongoose.model('User', UserSchema);
};

import { Schema } from 'mongoose';

const mongoose = require('mongoose');

export interface OperatorNotificationModel {
  dumpsterID: Schema.Types.ObjectId;
  managedByOperator: Schema.Types.ObjectId;
  date: Date;
  type: string;
  status: string;
}

module.exports = function () {
  const OperatorNotificationSchema = new Schema<OperatorNotificationModel>({
    type: {
      type: String,
      required: true,
      default: ErrorTypes.ERROR,
      enum: Object.values(ErrorTypes),
    },
    status: {
      type: String,
      required: true,
      default: NotificationStatus.PENDING,
      enum: Object.values(NotificationStatus),
    },
    dumpsterID: { type: Schema.Types.ObjectId, required: true },
    managedByOperator: { type: Schema.Types.ObjectId, required: true },
  });
  return mongoose.model('OperatorNotification', OperatorNotificationSchema);
};

import { Schema } from 'mongoose';

const mongoose = require('mongoose');

export interface OperatorNotificationModel {
  dumpsterID: Schema.Types.ObjectId;
  managedByOperator: Schema.Types.ObjectId;
  date: Date;
  type: string;
  status: string;
}

module.exports = () => {
  const OperatorNotificationSchema = new Schema<OperatorNotificationModel>({
    type: {
      type: String,
      required: true,
      default: DumpsterErrorTypes.ERROR,
      enum: Object.values(DumpsterErrorTypes),
    },
    status: {
      type: String,
      required: true,
      default: NotificationStatus.PENDING,
      enum: Object.values(NotificationStatus),
    },
    dumpsterID: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Dumpster',
    },
    managedByOperator: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  });
  return mongoose.model('OperatorNotification', OperatorNotificationSchema);
};

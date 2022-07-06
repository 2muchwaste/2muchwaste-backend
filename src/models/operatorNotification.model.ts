import { Schema } from 'mongoose';

const mongoose = require('mongoose');

export interface IOperatorNotification {
  dumpsterID: Schema.Types.ObjectId;
  managedByOperator: Schema.Types.ObjectId;
  date: Date;
  type: string;
  status: string;
}

const OperatorNotificationSchema = new Schema<IOperatorNotification>({
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

export default mongoose.model(
  'OperatorNotification',
  OperatorNotificationSchema
);

import { Schema } from 'mongoose';
import { DumpsterErrorTypes } from '../enums/DumpsterErrorTypes';
import { NotificationStatus } from '../enums/NotificationStatus';

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
    required: false,
    ref: 'User',
  },
  date:{
    type: Date,
    required: true,
  }
});

export default mongoose.model(
  'OperatorNotification',
  OperatorNotificationSchema
);

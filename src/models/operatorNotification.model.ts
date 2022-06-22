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
    type: { type: String, required: true },
    status: { type: String, required: true },
    dumpsterID: { type: Schema.Types.ObjectId, required: true },
    managedByOperator: { type: Schema.Types.ObjectId, required: true },
  });
  return mongoose.model('OperatorNotification', OperatorNotificationSchema);
};
import { Schema } from 'mongoose';

const mongoose = require('mongoose');

export interface PaymentModel {
  userID: Schema.Types.ObjectId;
  invoiceIssueDate: Date;
  paymentDate: Date;
  value: number;
  status: string;
}

module.exports = function () {
  const OperatorNotificationSchema = new Schema<PaymentModel>({
    userID: { type: Schema.Types.ObjectId, required: true },
    invoiceIssueDate: { type: Date, required: true },
    paymentDate: { type: Date, required: false },
    value: { type: Number, required: true },
    status: { type: String, required: true },
  });
  return mongoose.model('OperatorNotification', OperatorNotificationSchema);
};

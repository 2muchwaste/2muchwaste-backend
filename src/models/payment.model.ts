import { Schema } from 'mongoose';
import { PaymentStatus } from '../enums/PaymentStatus';

const mongoose = require('mongoose');

export interface IPayment {
  userID: Schema.Types.ObjectId;
  invoiceIssueDate: Date;
  paymentDate: Date;
  value: number;
  status: string;
}

const PaymentSchema = new Schema<IPayment>({
  userID: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  invoiceIssueDate: { type: Date, required: true },
  paymentDate: { type: Date, required: false },
  value: { type: Number, required: true },
  status: {
    type: String,
    required: true,
    default: PaymentStatus.PENDING,
    enum: Object.values(PaymentStatus),
  },
});

export default mongoose.model('Payment', PaymentSchema);

import { Schema } from 'mongoose';
import { TrashTypes } from '../enums/TrashTypes';

const mongoose = require('mongoose');

export interface IDeposit {
  date: Date;
  quantity: number;
  type: string;
  price: number;
  openingTimeSeconds: number;
  dumpsterID: Schema.Types.ObjectId;
  userID: Schema.Types.ObjectId;
}

const DepositSchema = new Schema<IDeposit>({
  date: { type: Date, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  type: {
    type: String,
    required: true,
    default: TrashTypes.MIXED,
    enum: Object.values(TrashTypes),
  },
  openingTimeSeconds: { type: Number, required: true },
  dumpsterID: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Dumpster',
  },
  userID: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
});
export default mongoose.model('Deposits', DepositSchema);

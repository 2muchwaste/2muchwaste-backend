import { Schema } from 'mongoose';

const mongoose = require('mongoose');

interface DepositModel {
  date: Date;
  quantity: number;
  type: string;
  price: number;
  openingTimeSeconds: number;
  dumpsterID: Schema.Types.ObjectId;
  userID: Schema.Types.ObjectId;
}

interface DepositsModel {
  deposits: DepositModel[];
}

module.exports = function () {
  const DepositSchema = new Schema<DepositModel>({
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
    dumpsterID: { type: Schema.Types.ObjectId, required: true },
    userID: { type: Schema.Types.ObjectId, required: true },
  });
  const DepositsSchema = new Schema<DepositsModel>({
    deposits: { type: [DepositSchema], required: true },
  });
  return mongoose.model('Deposits', DepositsSchema);
};

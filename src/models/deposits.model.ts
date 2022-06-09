import { Schema } from 'mongoose';

const mongoose = require('mongoose');

interface IDeposit {
  date: Date;
  quantity: number;
  type: string;
  price: number;
  dumpsterID: Schema.Types.ObjectId;
  userID: Schema.Types.ObjectId;
}

interface IDeposits {
  deposits: IDeposit[];
}

module.exports = function () {
  const DepositSchema = new Schema<IDeposit>({
    date: { type: Date, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    type: { type: String, required: true },
    // dumpsterID
    // userID
  });
  const DepositsSchema = new Schema<IDeposits>({
    deposits: { type: [DepositSchema], required: true },
  });
  return mongoose.model('Deposits', DepositsSchema);
};

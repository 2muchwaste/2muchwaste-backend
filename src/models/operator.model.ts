import { Schema } from 'mongoose';

const mongoose = require('mongoose');

interface IEmpty {
  date: Date;
  dumpsterID: Schema.Types.ObjectId;
}

export interface OperatorModel {
  email: string;
  name: string;
  surname: string;
  address: string;
  cf: string;
  birthday: Date;
  passwordHash: number;
  passwordSalt: number;
  area: string;
  empties: IEmpty[];
}

module.exports = function () {
  const EmptySchema = new Schema<IEmpty>({
    date: { type: Date, required: true },
    dumpsterID: { type: Schema.Types.ObjectId, required: true },
  });
  const OperatorSchema = new Schema<OperatorModel>({
    email: { type: String, required: true, unique: true, lowercase: true },
    name: { type: String, required: true },
    surname: { type: String, required: true },
    address: { type: String, required: true },
    cf: { type: String, required: true, unique: true, lowercase: true },
    birthday: { type: Date, required: true },
    passwordHash: { type: Number, required: true },
    passwordSalt: { type: Number, required: true },
    empties: { type: [EmptySchema], required: false },
  });
  return mongoose.model('Operator', OperatorSchema);
};

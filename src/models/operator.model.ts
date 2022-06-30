import { Schema } from 'mongoose';
import { UserModel } from './user.model';

const mongoose = require('mongoose');

interface IEmpty {
  date: Date;
  dumpsterID: Schema.Types.ObjectId;
}

export interface OperatorModel extends UserModel {
  districts: Schema.Types.ObjectId[];
  empties: IEmpty[];
}

module.exports = function () {
  const EmptySchema = new Schema<IEmpty>({
    date: { type: Date, required: true },
    dumpsterID: { type: Schema.Types.ObjectId, required: true },
  });
  const OperatorSchema = new Schema<OperatorModel>({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    birthday: { type: Date, required: true },
    cf: { type: String, required: true, unique: true, lowercase: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    address: { type: String, required: true },
    zipCode: { type: Number, required: true },
    city: { type: String, required: true },
    passwordHash: { type: String, required: true },
    passwordSalt: { type: String, required: true },
    districts: { type: [Schema.Types.ObjectId], required: false },
    empties: { type: [EmptySchema], required: false },
  });
  return mongoose.model('Operator', OperatorSchema);
};

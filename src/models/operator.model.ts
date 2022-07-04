import { Schema } from 'mongoose';
import { userDefinitions, UserModel } from './user.model';

const mongoose = require('mongoose');

interface IEmpty {
  date: Date;
  dumpsterID: Schema.Types.ObjectId;
}

export interface OperatorModel extends UserModel {
  districts: Schema.Types.ObjectId[];
  empties: IEmpty[];
}

module.exports = () => {
  const EmptySchema = new Schema<IEmpty>({
    date: { type: Date, required: true },
    dumpsterID: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Dumpster',
    },
  });
  const OperatorSchema = new Schema<OperatorModel>({
    ...userDefinitions,
    districts: { type: [Schema.Types.ObjectId], required: false },
    empties: { type: [EmptySchema], required: false },
  });
  return mongoose.model('Operator', OperatorSchema);
};

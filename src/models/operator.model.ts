import { Schema } from 'mongoose';
import { IUser } from './user.model';
import { Roles } from '../enums/Roles';

const mongoose = require('mongoose');
const userSchema = mongoose.model('User');

interface IEmpty {
  date: Date;
  dumpsterID: Schema.Types.ObjectId;
}

export interface IOperator extends IUser {
  districts: Schema.Types.ObjectId[];
  empties: IEmpty[];
}

const EmptySchema = new Schema<IEmpty>({
  date: { type: Date, required: true },
  dumpsterID: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Dumpster',
  },
});
const operatorSchema = userSchema.discriminator(
  Roles.OPERATOR.toString(),
  new Schema({
    districts: { type: [Schema.Types.ObjectId], required: false, ref: 'Areas' },
    empties: { type: [EmptySchema], required: false },
  })
);

export default operatorSchema;

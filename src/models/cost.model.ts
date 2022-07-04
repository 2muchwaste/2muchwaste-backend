import { Schema } from 'mongoose';
import { TrashTypes } from '../enums/TrashTypes';

const mongoose = require('mongoose');

export interface CostModel {
  type: string;
  pricePerKilogram: number;
}

module.exports = () => {
  const CostSchema = new Schema<CostModel>({
    type: {
      type: String,
      required: true,
      unique: true,
      default: TrashTypes.MIXED,
      enum: Object.values(TrashTypes),
    },
    pricePerKilogram: { type: Number, required: true },
  });
  return mongoose.model('OperatorNotification', CostSchema);
};

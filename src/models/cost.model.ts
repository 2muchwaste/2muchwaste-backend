import { Schema } from 'mongoose';
import { TrashTypes } from '../enums/TrashTypes';

const mongoose = require('mongoose');

export interface ICost {
  type: string;
  pricePerKilogram: number;
}

const CostSchema = new Schema<ICost>({
  type: {
    type: String,
    required: true,
    unique: true,
    default: TrashTypes.MIXED,
    enum: Object.values(TrashTypes),
  },
  pricePerKilogram: { type: Number, required: true },
});

export default mongoose.model('OperatorNotification', CostSchema);

import { Schema } from 'mongoose';
import { TrashTypes } from '../enums/TrashTypes';

const mongoose = require('mongoose');

export interface IDumpster {
  type: string;
  latitude: number;
  longitude: number;
  address: string;
  city: string;
  zipCode: number;
  area: string;
  maxWeight: number;
  actualWeight: number;
  limitUsablePercentage: number;
  openingSecondsDuration: number;
  available: boolean;
}

const DumpsterSchema = new Schema<IDumpster>({
  type: {
    type: String,
    required: true,
    default: TrashTypes.MIXED,
    enum: Object.values(TrashTypes),
  },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  zipCode: { type: Number, required: true },
  area: { type: String, required: true },
  maxWeight: { type: Number, required: true },
  actualWeight: { type: Number, required: true },
  limitUsablePercentage: { type: Number, required: true },
  openingSecondsDuration: { type: Number, required: true },
  available: { type: Boolean, required: true },
});

export default mongoose.model('Dumpster', DumpsterSchema);

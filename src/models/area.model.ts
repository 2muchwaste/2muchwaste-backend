import { Schema } from 'mongoose';

const mongoose = require('mongoose');

export interface IArea {
  zipCode: number;
  name: string;
  streets: string[];
}

const AreaSchema = new Schema<IArea>({
  zipCode: { type: Number, required: true },
  name: { type: String, required: true },
  streets: { type: [String], required: false },
});

AreaSchema.index({ zipCode: 1, name: 1 }, { unique: true });

export default mongoose.model('Areas', AreaSchema);

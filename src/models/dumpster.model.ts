import { Schema } from 'mongoose';

const mongoose = require('mongoose');

export interface IDumpster {
  type: string;
  latitude: number;
  longitude: number;
  address: string;
  area: string;
  maxWeight: number;
  actualWeight: number;
  available: boolean;
}

module.exports = function () {
  const DumpsterSchema = new Schema<IDumpster>({
    type: { type: String, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    address: { type: String, required: true },
    area: { type: String, required: true },
    maxWeight: { type: Number, required: true },
    actualWeight: { type: Number, required: true },
    available: { type: Boolean, required: true },
  });
  return mongoose.model('Dumpster', DumpsterSchema);
};

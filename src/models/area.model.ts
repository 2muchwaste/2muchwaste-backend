import { Schema } from 'mongoose';

const mongoose = require('mongoose');

export interface IArea {
  zipCode: number;
  name: string;
  addresses: string[];
}

export interface IAreas {
  areas: IArea[];
}

const DistrictsSchema = new Schema<IArea>({
  zipCode: { type: Number, required: true },
  name: { type: String, required: true },
  addresses: { type: [String], required: false },
});
const AreasSchema = new Schema<IAreas>({
  areas: { type: [DistrictsSchema], required: true },
});

export default mongoose.model('Areas', AreasSchema);

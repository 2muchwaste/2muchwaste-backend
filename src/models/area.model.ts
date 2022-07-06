import { Schema } from 'mongoose';

const mongoose = require('mongoose');

export interface IDistrict {
  name: string;
  addresses: string[];
}

export interface IDistricts {
  zipCode: number;
  districts: IDistrict[];
}

export interface IAreas {
  areas: IDistricts[];
}

const DistrictSchema = new Schema<IDistrict>({
  name: { type: String, required: true },
  addresses: { type: [String], required: true },
});
const DistrictsSchema = new Schema<IDistricts>({
  zipCode: { type: Number, required: true },
  districts: { type: [DistrictSchema], required: true },
});
const AreasSchema = new Schema<IAreas>({
  areas: { type: [DistrictsSchema], required: true },
});

export default mongoose.model('Areas', AreasSchema);

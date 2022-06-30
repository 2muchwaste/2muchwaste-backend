import { Schema } from 'mongoose';

const mongoose = require('mongoose');

interface DistrictModel {
  name: string;
  addresses: string[];
}

interface DistrictsModel {
  zipCode: number;
  districts: DistrictModel[];
}

interface AreasModel {
  areas: DistrictsModel[];
}

module.exports = () => {
  const DistrictSchema = new Schema<DistrictModel>({
    name: { type: String, required: true },
    addresses: { type: [String], required: true },
  });
  const DistrictsSchema = new Schema<DistrictsModel>({
    zipCode: { type: Number, required: true },
    districts: { type: [DistrictSchema], required: true },
  });
  const AreasSchema = new Schema<AreasModel>({
    areas: { type: [DistrictsSchema], required: true },
  });
  return mongoose.model('Areas', AreasSchema);
};

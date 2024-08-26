import { Schema } from 'mongoose';

export const VehicleSchema = new Schema({
  make: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: Number, required: true },
  vin: { type: String, required: true, unique: true },
  licensePlate: { type: String, required: true, unique: true },
});

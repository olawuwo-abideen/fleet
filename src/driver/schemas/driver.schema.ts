import { Schema } from 'mongoose';

export const DriverSchema = new Schema({
  name: { type: String, required: true },
  licenseNumber: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  address: { type: String, required: true },
});

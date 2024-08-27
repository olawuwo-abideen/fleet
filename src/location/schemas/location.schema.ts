import { Schema } from 'mongoose';

export const LocationSchema = new Schema({
  vehicleId: { type: Schema.Types.ObjectId, ref: 'Vehicle', required: true },
  timestamp: { type: Date, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
});
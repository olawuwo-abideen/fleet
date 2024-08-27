import { Schema } from 'mongoose';

export const IncidentSchema = new Schema({
  vehicleId: { type: Schema.Types.ObjectId, ref: 'Vehicle', required: true },
  driverId: { type: Schema.Types.ObjectId, ref: 'Driver', required: true },
  date: { type: Date, required: true },
  description: { type: String, required: true },
});

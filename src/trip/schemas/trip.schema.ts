import { Schema } from 'mongoose';

export const TripSchema = new Schema({
  vehicleId: { type: Schema.Types.ObjectId, ref: 'Vehicle', required: true },
  driverId: { type: Schema.Types.ObjectId, ref: 'Driver', required: true },
  routeId: { type: Schema.Types.ObjectId, ref: 'Route', required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date },
});

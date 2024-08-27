import { Schema } from 'mongoose';

export const MaintenanceSchema = new Schema({
  vehicleId: { type: Schema.Types.ObjectId, ref: 'Vehicle', required: true },
  maintenanceDate: { type: Date, required: true },
  description: { type: String, required: true },
  cost: { type: Number, required: true },
});

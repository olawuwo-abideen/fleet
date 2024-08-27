// fuel.schema.ts
import { Schema } from 'mongoose';

export const FuelSchema = new Schema({
  vehicleId: { type: Schema.Types.ObjectId, ref: 'Vehicle', required: true },
  date: { type: Date, required: true },
  quantity: { type: Number, required: true },
  cost: { type: Number, required: true },
});

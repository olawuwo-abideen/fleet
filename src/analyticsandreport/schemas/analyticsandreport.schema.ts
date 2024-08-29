import { Schema } from 'mongoose';

export const FuelSchema = new Schema({
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  reportType: { type: Number, required: true },
  cost: { type: Number, required: true },
});

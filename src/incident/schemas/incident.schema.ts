import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({
  timestamps: true,
})
export class Incident {
  
  @Prop( { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle' }) 
  vehicleId: string;
  
  @Prop( { type: mongoose.Schema.Types.ObjectId, ref: 'Driver' }) 
  driverId: string;

  @Prop()
  date: Date;

  @Prop()
  description: string;


}

export const IncidentSchema = SchemaFactory.createForClass(Incident);
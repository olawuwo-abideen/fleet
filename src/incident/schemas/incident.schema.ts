import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export enum Type {
  Accident = 'Accident',
  Breakdown = 'Breakdown',
  TrafficViolation= 'Traffic_Violation',
  Other = 'Other'
}

@Schema({
  timestamps: true,
})
export class Incident {

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: mongoose.Schema.Types.ObjectId;  
  
  @Prop( { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle' }) 
  vehicleId: string;
  
  @Prop( { type: mongoose.Schema.Types.ObjectId, ref: 'Driver' }) 
  driverId: string;

  @Prop()
  date: Date;

  @Prop()
  description: string;

  @Prop()
  location: string;

  @Prop()
  incidenceType: Type;

}

export const IncidentSchema = SchemaFactory.createForClass(Incident);
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
 import { Document } from 'mongoose';

@Schema({
  timestamps: true,
})
export class Incident extends  Document{
  
  @Prop()
  vehicleId: string;
  
  @Prop()
  driverId: string;

  @Prop()
  date: Date;

  @Prop()
  description: string;

  @Prop()
  address: string;


}

export const IncidentSchema = SchemaFactory.createForClass(Incident);
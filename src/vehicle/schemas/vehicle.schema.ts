import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
 import { Document } from 'mongoose';

@Schema({
  timestamps: true,
})
export class Vehicle extends  Document{
  
  @Prop()
  vehicleMaker: string;
  
  @Prop()
  Model: number;

  @Prop()
  year: Date;

  @Prop()
  vin: number;

  @Prop()
  licensePlate: string;


}

export const VehicleSchema = SchemaFactory.createForClass(Vehicle);
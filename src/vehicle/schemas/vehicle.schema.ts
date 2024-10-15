import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
})
export class Vehicle extends  Document{
  
  @Prop()
  make: string;
  
  @Prop()
  vehicleModel: string;

  @Prop()
  year: string;

  @Prop()
  licensePlate: number;

  @Prop()
  vin: string;
  
  @Prop()
  status: Date;

  @Prop()
  fuelType: string;



}



export const VehicleSchema = SchemaFactory.createForClass(Vehicle);
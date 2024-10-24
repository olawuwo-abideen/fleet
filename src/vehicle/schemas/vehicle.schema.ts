import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from '../../auth/schemas/user.schema';


export enum Type {
  Petrol = 'Petrol',
  Diesel = 'Diesel',
}

@Schema({
  timestamps: true,
})
export class Vehicle {
  @Prop()
  make: string;
  
  @Prop()
  vehicleModel: string;

  @Prop()
  year: number;

  @Prop()
  licensePlate: number;

  @Prop()
  vin: string;
  
  @Prop()
  status: string;

  @Prop()
  fuelType: Type;

  @Prop()
  images?: object[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;


}


export const VehicleSchema = SchemaFactory.createForClass(Vehicle);
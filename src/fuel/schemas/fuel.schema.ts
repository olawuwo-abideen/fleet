import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
 import { Document } from 'mongoose';

@Schema({
  timestamps: true,
})
export class Fuel extends  Document{
  
  @Prop()
  vehicleId: string;
  
  @Prop()
  date: Date;

  @Prop()
  quantity: string;

  @Prop()
  cost: number;

}

export const FuelSchema = SchemaFactory.createForClass(Fuel);
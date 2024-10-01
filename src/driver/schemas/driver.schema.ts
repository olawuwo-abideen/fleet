import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
 import { Document } from 'mongoose';

@Schema({
  timestamps: true,
})
export class Driver extends  Document{
  
  @Prop()
  firstName: string;
  
  @Prop()
  lastName: string;

  @Prop()
  licenseNumber: string;

  @Prop()
  phoneNumber: number;

  @Prop()
  address: string;


}

export const DriverSchema = SchemaFactory.createForClass(Driver);
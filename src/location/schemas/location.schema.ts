import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
})
export class Location extends  Document{
  
  @Prop()
  vehicleId: string;
  
  @Prop()
  timestamp: Date;

  @Prop()
  latitude: string;

  @Prop()
  longitude: number;

}

export const LocationSchema = SchemaFactory.createForClass(Location);
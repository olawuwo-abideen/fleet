import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {now} from "mongoose";



@Schema({
  timestamps: false,
   versionKey: false 
})
export class sensorData {

  @Prop()
  vehicle_id: string;


  @Prop(({default: now()}))
  timestamp: Date


  @Prop(({ required: true, enum: ['GPS', 'Fuel Level', 'Speed'] }))
  sensor_type: string;


  @Prop()
  sensor_value: string;
}

export const sensorDataSchema = SchemaFactory.createForClass(sensorData);

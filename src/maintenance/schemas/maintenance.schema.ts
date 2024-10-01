import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
})
export class Maintenance extends  Document{
  
  @Prop()
  vehicleId: string;
  
  @Prop()
  maintenanceDate: Date;

  @Prop()
  description: string;

  @Prop()
  cost: number;

}

export const MaintenanceSchema = SchemaFactory.createForClass(Maintenance);
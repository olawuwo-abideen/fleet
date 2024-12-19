import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({
timestamps: true,
})
export class Maintenance {

@Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
userId: mongoose.Schema.Types.ObjectId;  

@Prop( { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle' }) 
vehicleId: string;

@Prop()
maintenanceDate: Date;

@Prop()
description: string;

@Prop()
cost: number;

}

export const MaintenanceSchema = SchemaFactory.createForClass(Maintenance);
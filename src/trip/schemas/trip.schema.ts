import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({
timestamps: true,
})
export class Trip {
@Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
userId: mongoose.Schema.Types.ObjectId;  

@Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle' })
vehicleId: string;

@Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Driver' })
driverId: string;

@Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Route' })
routeId: string;

@Prop()
startTime: Date;

@Prop()
endTime: Date;
}

export const TripSchema = SchemaFactory.createForClass(Trip);
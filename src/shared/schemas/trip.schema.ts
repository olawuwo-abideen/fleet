import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';


export enum TripStatus {
Ongoing = 'ongoing',
Completed = 'completed'
}



@Schema({
timestamps: true,
})
export class Trip {
@Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
userId: mongoose.Schema.Types.ObjectId;  

@Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle' })
vehicleId: mongoose.Schema.Types.ObjectId;

@Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Driver' })
driverId: mongoose.Schema.Types.ObjectId;


@Prop({ enum: TripStatus, default: TripStatus.Ongoing })
status: TripStatus;

@Prop()
startTime: Date;

@Prop()
endTime: Date;
}

export const TripSchema = SchemaFactory.createForClass(Trip);
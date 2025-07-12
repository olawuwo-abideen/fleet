import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';


@Schema({
timestamps: true,
})
export class Fuel {

@Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
userId: mongoose.Schema.Types.ObjectId;  

@Prop( { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle' }) 
vehicleId: mongoose.Types.ObjectId;

@Prop()
date: Date;

@Prop()
litres: number;

@Prop()
pricePerLitre:number


@Prop()
cost: number;

}

export const FuelSchema = SchemaFactory.createForClass(Fuel);




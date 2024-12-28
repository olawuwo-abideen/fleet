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
licensePlate: string;

@Prop()
vin: string;


@Prop()
fuelType: Type;

@Prop()
images?: object[];



}


export const VehicleSchema = SchemaFactory.createForClass(Vehicle);
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum Type {
Petrol = 'Petrol',
Diesel = 'Diesel',
}

@Schema({ timestamps: true })
export class Vehicle extends Document {
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

@Prop({ type: [String] })
images?: string[];

@Prop({ type: { lat: Number, lng: Number }, default: null })
location?: { lat: number; lng: number };

@Prop({ default: true })
isAvailable: boolean;
}

export const VehicleSchema = SchemaFactory.createForClass(Vehicle);

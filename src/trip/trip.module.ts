import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { TripController } from './trip.controller';
import { TripService } from './trip.service';
import {Trip, TripSchema} from './schemas/trip.schema'

@Module({
imports: [
MongooseModule.forFeature([{ name: Trip.name, schema: TripSchema }]),
PassportModule.register({ defaultStrategy: 'jwt' }), 
],
controllers: [TripController],
providers: [TripService],
})
export class TripModule {}

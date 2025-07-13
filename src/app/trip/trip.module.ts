import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { TripController } from './controllers/trip.controller';
import { TripService } from './services/trip.service';
import {Trip, TripSchema} from '../../shared/schemas/trip.schema'
import { Vehicle, VehicleSchema } from '../../shared/schemas/vehicle.schema';
import { User, UserSchema } from '../../shared/schemas/user.schema';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';

@Module({
imports: [
MongooseModule.forFeature([
  { name: Trip.name, schema: TripSchema },
  { name: Vehicle.name, schema: VehicleSchema },
  { name: User.name, schema: UserSchema },
]),
AuthModule,
UserModule,
PassportModule.register({ defaultStrategy: 'jwt' }), 
],
controllers: [TripController],
providers: [TripService],
})
export class TripModule {}

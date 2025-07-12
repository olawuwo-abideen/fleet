import { Module } from '@nestjs/common';
import { FuelController } from './controllers/fuel.controller';
import { FuelService } from './services/fuel.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { Fuel, FuelSchema } from '../../shared/schemas/fuel.schema';
import { Vehicle, VehicleSchema } from 'src/shared/schemas/vehicle.schema';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';

@Module({
imports: [
MongooseModule.forFeature([
{ name: Fuel.name, schema: FuelSchema },
{ name: Vehicle.name, schema: VehicleSchema }
]),
AuthModule,
UserModule,
PassportModule.register({ defaultStrategy: 'jwt' }), 
],
controllers: [FuelController],
providers: [FuelService],
})
export class FuelModule {}

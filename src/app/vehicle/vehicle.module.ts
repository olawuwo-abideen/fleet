import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { VehicleController } from './controllers/vehicle.controller';
import { VehicleService } from './services/vehicle.service';
import { Vehicle, VehicleSchema } from '../../shared/schemas/vehicle.schema';
import { Maintenance, MaintenanceSchema } from '../../shared/schemas/maintenance.schema';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';

@Module({
imports: [
MongooseModule.forFeature([
    { name: Vehicle.name, schema: VehicleSchema },
    { name: Maintenance.name, schema: MaintenanceSchema }
]),
AuthModule,
UserModule,
PassportModule.register({ defaultStrategy: 'jwt' }), 
],
controllers: [VehicleController],
providers: [VehicleService],
})
export class VehicleModule {}

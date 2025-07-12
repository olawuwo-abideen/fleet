import { Module } from '@nestjs/common';
import { AdminController } from './controllers/admin.controller';
import { AdminService } from './services/admin.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { User, UserSchema } from '../../shared/schemas/user.schema';
import { Vehicle, VehicleSchema } from 'src/shared/schemas/vehicle.schema';
import { Trip, TripSchema } from 'src/shared/schemas/trip.schema';
import { Maintenance, MaintenanceSchema } from 'src/shared/schemas/maintenance.schema';
import { Fuel, FuelSchema } from 'src/shared/schemas/fuel.schema';
import { AuthModule } from '../auth/auth.module';
import { Admin, AdminSchema } from 'src/shared/schemas/admin.schema';
import { AdminAuthGuard } from './guard/adminguard';
import { JwtAdminStrategy } from './strategy/admin-strategy';

@Module({
  imports: [
    
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Vehicle.name, schema: VehicleSchema },
      { name: Trip.name, schema: TripSchema },
      { name: Maintenance.name, schema: MaintenanceSchema },
      { name: Fuel.name, schema: FuelSchema },
      { name: Admin.name, schema: AdminSchema }
    ]),
    AuthModule
    ],
  controllers: [AdminController],
  providers: [AdminService, AdminAuthGuard, JwtAdminStrategy],
  exports: [AdminService, AdminAuthGuard],
})
export class AdminModule {}
 
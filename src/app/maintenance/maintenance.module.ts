import { Module } from '@nestjs/common';
import { MaintenanceController } from './controllers/maintenance.controller';
import { MaintenanceService } from '../maintenance/services/maintenance.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { Maintenance, MaintenanceSchema} from '../../shared/schemas/maintenance.schema'
import { Vehicle, VehicleSchema } from 'src/shared/schemas/vehicle.schema';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';

@Module({
imports: [
MongooseModule.forFeature([
    { name: Maintenance.name, schema: MaintenanceSchema},
    { name: Vehicle.name, schema: VehicleSchema}
]),
AuthModule,
UserModule,
PassportModule.register({ defaultStrategy: 'jwt' }), 
],
controllers: [MaintenanceController],
providers: [MaintenanceService],
})
export class MaintenanceModule {}

import { Module } from '@nestjs/common';
import { IncidentController } from './controllers/incident.controller';
import { IncidentService } from './services/incident.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { Incident, IncidentSchema } from '../../shared/schemas/incident.schema';
import { Vehicle, VehicleSchema } from 'src/shared/schemas/vehicle.schema';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';

@Module({
imports: [
MongooseModule.forFeature([
    { name: Incident.name, schema: IncidentSchema },
    { name: Vehicle.name, schema: VehicleSchema }
]),
AuthModule,
UserModule,
PassportModule.register({ defaultStrategy: 'jwt' }), 
],
controllers: [IncidentController],
providers: [IncidentService],
})
export class IncidentModule {}

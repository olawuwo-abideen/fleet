import { Module } from '@nestjs/common';
import { TripModule } from './trip/trip.module';
import { MaintenanceModule } from './maintenance/maintenance.module';
import { FuelModule } from './fuel/fuel.module';
import { IncidentModule } from './incident/incident.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ThrottlerModule } from '@nestjs/throttler';
import { VehicleModule } from './vehicle/vehicle.module';
import { AuthModule } from './auth/auth.module';
import { EmailModule } from '../shared/email/email.module';
import { AdminModule } from './admin/admin.module';

         
@Module({
imports: [
ThrottlerModule.forRoot([
{
ttl: 5 * 1000,
limit: 3,
}, 
]),
ConfigModule.forRoot({
envFilePath:`.env`,
isGlobal:true,
}),
MongooseModule.forRoot(process.env.DB_URI),
AdminModule,
AuthModule, 
UserModule, 
TripModule, 
MaintenanceModule, 
FuelModule, 
IncidentModule, 
VehicleModule, 
EmailModule, 

],
controllers: [],
providers: [],
})
export class AppModule {}
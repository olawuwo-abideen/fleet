import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
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
import { EmailModule } from './email/email.module';
@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        ttl: 5 * 1000,
        limit: 3,
      },
    ]),
    ConfigModule.forRoot({
//  envFilePath: `.env.${process.env.NODE_ENV}`,
      envFilePath:`.env`,
      isGlobal:true,
    }),
    MongooseModule.forRoot(process.env.DB_URI),
    TripModule, 
    MaintenanceModule, 
    FuelModule, 
    IncidentModule, 
    UserModule, 
    VehicleModule, 
    AuthModule, 
    EmailModule
   
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
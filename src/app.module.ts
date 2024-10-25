import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TripModule } from './trip/trip.module';
import { RouteModule } from './route/route.module';
import { MaintenanceModule } from './maintenance/maintenance.module';
import { FuelModule } from './fuel/fuel.module';
import { IncidentModule } from './incident/incident.module';
import { LocationModule } from './location/location.module';
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
    RouteModule, 
    MaintenanceModule, 
    FuelModule, 
    IncidentModule, 
    LocationModule, 
    UserModule, 
    VehicleModule, 
    AuthModule, 
    EmailModule
   
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}



// import { Module } from '@nestjs/common';
// import { ConfigModule } from '@nestjs/config';
// import { MongooseModule } from '@nestjs/mongoose';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
// import { AuthModule } from './auth/auth.module';
// import { ThrottlerModule } from '@nestjs/throttler';
// import { EmailModule } from './email/email.module';

// @Module({
//   imports: [
//     ThrottlerModule.forRoot([
//       {
//         ttl: 5 * 1000,
//         limit: 3,
//       },
//     ]),
//     ConfigModule.forRoot({
//       envFilePath: `.env`,
//       // envFilePath: `.env.${process.env.NODE_ENV}`,
//       isGlobal: true,
//     }),
//     MongooseModule.forRoot(process.env.DB_URI),
//     AuthModule,
//   ],
//   controllers: [AppController],
//   providers: [AppService],
// })
// export class AppModule {}


import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { VehicleModule } from './vehicle/vehicle.module';
import { DriverModule } from './driver/driver.module';
import { TripModule } from './trip/trip.module';
import { RouteModule } from './route/route.module';
import { MaintenanceModule } from './maintenance/maintenance.module';
import { FuelModule } from './fuel/fuel.module';
import { IncidentModule } from './incident/incident.module';
import { LocationModule } from './location/location.module';
import { AnalyticsandreportModule } from './analyticsandreport/analyticsandreport.module';
import { UserModule } from './user/user.module';
import { NotificationModule } from './notification/notification.module';

@Module({
  imports: [AuthModule, VehicleModule, DriverModule, TripModule, RouteModule, MaintenanceModule, FuelModule, IncidentModule, LocationModule, AnalyticsandreportModule, UserModule, NotificationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

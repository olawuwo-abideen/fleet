import { Module } from '@nestjs/common';
import { MaintenanceController } from './maintenance.controller';
import { MaintenanceService } from './maintenance.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { Maintenance, MaintenanceSchema} from './schemas/maintenance.schema'

@Module({
imports: [
MongooseModule.forFeature([{ name: Maintenance.name, schema: MaintenanceSchema }]),
PassportModule.register({ defaultStrategy: 'jwt' }), 
],
controllers: [MaintenanceController],
providers: [MaintenanceService],
})
export class MaintenanceModule {}

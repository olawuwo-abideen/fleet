import { Module } from '@nestjs/common';
import { MaintenanceController } from './controllers/maintenance.controller';
import { MaintenanceService } from '../maintenance/services/maintenance.service';
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

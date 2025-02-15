import { Module } from '@nestjs/common';
import { IncidentController } from './controllers/incident.controller';
import { IncidentService } from './services/incident.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { Incident, IncidentSchema } from './schemas/incident.schema';

@Module({
imports: [
MongooseModule.forFeature([{ name: Incident.name, schema: IncidentSchema }]),
PassportModule.register({ defaultStrategy: 'jwt' }), 
],
controllers: [IncidentController],
providers: [IncidentService],
})
export class IncidentModule {}

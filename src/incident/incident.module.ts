import { Module } from '@nestjs/common';
import { IncidentController } from './incident.controller';

@Module({
  controllers: [IncidentController]
})
export class IncidentModule {}

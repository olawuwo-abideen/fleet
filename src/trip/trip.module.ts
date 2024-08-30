import { Module } from '@nestjs/common';
import { TripController } from './trip.controller';

@Module({
  controllers: [TripController]
})
export class TripModule {}

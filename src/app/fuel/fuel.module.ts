  import { Module } from '@nestjs/common';
  import { FuelController } from './controllers/fuel.controller';
  import { FuelService } from './services/fuel.service';
  import { MongooseModule } from '@nestjs/mongoose';
  import { PassportModule } from '@nestjs/passport';
  import { Fuel, FuelSchema } from './schemas/fuel.schema';

  @Module({
  imports: [
  MongooseModule.forFeature([{ name: Fuel.name, schema: FuelSchema }]),
  PassportModule.register({ defaultStrategy: 'jwt' }), 
  ],
  controllers: [FuelController],
  providers: [FuelService],
  })
  export class FuelModule {}

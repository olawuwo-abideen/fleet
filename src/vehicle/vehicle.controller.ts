import { 
    Body,
    Controller,
    Get,
    Post,
    Query
  } from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { VehicleSchema } from './schemas/vehicle.schema';
import { CreateDriverDto } from 'src/driver/dto/create-driver.dto';


@Controller('vehicle')
export class VehicleController {
constructor(private readonly vehicleService: VehicleService) {}

@Post()
async createSensorData(
  @Body()
  vehicle: CreateDriverDto,
): Promise<VehicleSchema> {
  return this.VehicleService.create(vehicle);
}


}

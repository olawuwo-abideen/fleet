import {
  Controller,
  Get,
  Param,
  UseGuards
} from '@nestjs/common';
import { VehicleService } from '../services/vehicle.service';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../../../shared/decorators/roles.decorator';
import { Role } from '../../auth/enums/role.enum';
import { RolesGuard } from '../../auth/guards/roles.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ApiResponseDto } from 'src/shared/dto/api-response';

@ApiBearerAuth()
@ApiTags('Vehicle')
@Controller('vehicle')
export class VehicleController {
  constructor(private vehicleService: VehicleService) {}

  @Get()
  @ApiOperation({ summary: 'Get all vehicles' })
  @Roles(Role.Dispatcher)
  @UseGuards(AuthGuard(), RolesGuard)
  async getAllVehicles() {
    const vehicles = await this.vehicleService.findAll();
    return new ApiResponseDto('All vehicles retrieved successfully', vehicles);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get vehicle by ID' })
  @Roles(Role.Driver, Role.Dispatcher)
  @UseGuards(AuthGuard(), RolesGuard)
  async getVehicle(@Param('id') id: string) {
    const vehicle = await this.vehicleService.findById(id);
    return new ApiResponseDto(`Vehicle with ID ${id} retrieved successfully`, vehicle);
  }

  @Get('maintenance/:id')
  @ApiOperation({ summary: 'Get vehicle maintenance history' })
  async getMaintenanceHistory(@Param('id') id: string) {
    const maintenance = await this.vehicleService.getMaintenanceHistory(id);
    return new ApiResponseDto(`Maintenance history for vehicle ID ${id}`, maintenance);
  }

  @Get('available')
  @ApiOperation({ summary: 'Get all available vehicles' })
  async getAvailableVehicles() {
    const vehicles = await this.vehicleService.getAvailableVehicles();
    return new ApiResponseDto('Available vehicles retrieved successfully', vehicles);
  }
}

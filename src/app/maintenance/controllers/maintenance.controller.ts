import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { MaintenanceService } from '../services/maintenance.service';
import {
  CreateMaintenanceDto,
  UpdateMaintenanceDto,
} from '../dto/maintenance.dto';
import { Maintenance } from '../../../shared/schemas/maintenance.schema';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../../../shared/decorators/roles.decorator';
import { Role } from '../../auth/enums/role.enum';
import { RolesGuard } from '../../auth/guards/roles.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ApiResponseDto } from 'src/shared/dto/api-response';

@ApiBearerAuth()
@ApiTags('Maintenance')
@Controller('maintenance')
export class MaintenanceController {
  constructor(private maintenanceService: MaintenanceService) {}

  @Get()
  @ApiOperation({ summary: 'Get all maintenance records' })
  @UseGuards(AuthGuard(), RolesGuard)
  async getAllMaintenances() {
    const data = await this.maintenanceService.findAll();
    return new ApiResponseDto('All maintenance records retrieved successfully', data);
  }

  @Post()
  @ApiOperation({ summary: 'Create maintenance record' })
  @Roles(Role.Mechanic)
  @UseGuards(AuthGuard(), RolesGuard)
  async createMaintenance(@Body() data: CreateMaintenanceDto) {
    const created = await this.maintenanceService.create(data);
    return new ApiResponseDto('Maintenance record created successfully', created);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get maintenance by ID' })
  @Roles(Role.Driver, Role.Mechanic)
  @UseGuards(AuthGuard(), RolesGuard)
  async getMaintenance(@Param('id') id: string) {
    const record = await this.maintenanceService.findById(id);
    return new ApiResponseDto(`Maintenance with ID ${id} retrieved successfully`, record);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update maintenance record by ID' })
  @Roles(Role.Mechanic)
  @UseGuards(AuthGuard(), RolesGuard)
  async updateMaintenance(
    @Param('id') id: string,
    @Body() maintenance: UpdateMaintenanceDto,
  ) {
    const updated = await this.maintenanceService.updateById(id, maintenance);
    return new ApiResponseDto(`Maintenance with ID ${id} updated successfully`, updated);
  }
}

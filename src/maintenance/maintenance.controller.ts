import {
Body,
Controller,
Delete,
Get,
HttpStatus,
Param,
Post,
Put,
Req,
UseGuards
} from '@nestjs/common';
import { MaintenanceService } from './maintenance.service';
import { CreateMaintenanceDto, UpdateMaintenanceDto } from './dto/maintenance.dto';
import { Maintenance } from './schemas/maintenance.schema';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('maintenance')
@Controller('maintenance')
export class MaintenanceController {

constructor(private maintenanceService: MaintenanceService) {}

@Get()
@ApiOperation({ summary: 'Get all Maintainace' })
@ApiResponse({
  status: HttpStatus.OK,
  description:
    'Data fetched successfully.',
})
@UseGuards(AuthGuard(), RolesGuard)
async getAllMaintenances(@Req() req): Promise<Maintenance[]>{
return this.maintenanceService.findAll(req.user)
}

@Post()
@ApiOperation({ summary: 'Create maintainance' })
@ApiBody({ type: CreateMaintenanceDto, description: 'Maintainance Data' })
@ApiResponse({
  status: HttpStatus.CREATED,
  description:
    'Data Successfully created',
})
@Roles(Role.Admin)
@UseGuards(AuthGuard(), RolesGuard)
async createMaintenance(
@Body()
maintenance: CreateMaintenanceDto,
@Req() req,
): Promise<Maintenance> {
return this.maintenanceService.create(maintenance, req.user);
}

@Get(':id')
@ApiOperation({ summary: 'Get maintainace by id' })
@ApiResponse({
  status: HttpStatus.OK,
  description:
    'Data fetched successfully.',
})
@Roles(Role.Driver, Role.Admin)
@UseGuards(AuthGuard(), RolesGuard)
async getMaintenance(
@Param('id')
id: string,
@Req() req
): Promise<Maintenance> {
return this.maintenanceService.findById(id, req.user);
}

@Put(':id')
@ApiOperation({ summary: 'Update maintainance data by id' })
@ApiBody({ type: CreateMaintenanceDto, description: 'Maintainance Data' })
@ApiResponse({
  status: HttpStatus.OK,
  description:
    'Data updated successfully',
})
@Roles(Role.Admin)
@UseGuards(AuthGuard(), RolesGuard)
async updateMaintenance(
@Param('id') id: string,
@Body() maintenance: UpdateMaintenanceDto,
@Req() req
): Promise<Maintenance> {
return this.maintenanceService.updateById(id, maintenance, req.user);
}


}

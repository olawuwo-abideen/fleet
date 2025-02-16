import {
Body,
Controller,
Get,
HttpStatus,
Param,
Post,
Put,
UseGuards
} from '@nestjs/common';
import { MaintenanceService } from '../services/maintenance.service';
import { CreateMaintenanceDto, UpdateMaintenanceDto } from '../dto/maintenance.dto';
import { Maintenance } from '../schemas/maintenance.schema';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../../../shared/decorators/roles.decorator';
import { Role } from '../../auth/enums/role.enum';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {CurrentUser} from '../../../shared/decorators/user.decorator'
import {User} from '../../../app/auth/schemas/user.schema';


@ApiBearerAuth()
@ApiTags('Maintenance')
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
async getAllMaintenances(@CurrentUser() user: User): Promise<{ message: string; data: Maintenance[]; }>{
return this.maintenanceService.findAll(user)
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
  @CurrentUser() user: User,
@Body()
maintenance: CreateMaintenanceDto
): Promise<{ message: string; data: Maintenance; }> {
return this.maintenanceService.create(user, maintenance);
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
  @CurrentUser() user: User,
@Param('id')
id: string,
): Promise<{ message: string; data: Maintenance; }> {
return this.maintenanceService.findById(user, id);
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
  @CurrentUser() user: User,
@Param('id') id: string,
@Body() maintenance: UpdateMaintenanceDto,
): Promise<{ message: string; data: Maintenance; }> {
return this.maintenanceService.updateById(user, id, maintenance);
}


}

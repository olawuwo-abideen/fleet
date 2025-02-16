import {
Body,
Controller,
Get,
HttpStatus,
Param,
Post,
Put,
Req,
UseGuards
} from '@nestjs/common';
import { IncidentService } from '../services/incident.service';
import { CreateIncidentDto, UpdateIncidentDto } from '../dto/incident.dto';
import { Incident } from '../schemas/incident.schema';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../../../shared/decorators/roles.decorator';
import { Role } from '../../auth/enums/role.enum';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {CurrentUser} from '../../../shared/decorators/user.decorator'
import {User} from '../../../app/auth/schemas/user.schema'


@ApiBearerAuth()
@ApiTags('Incident')
@Controller('incident')
export class IncidentController {
constructor(private incidentService: IncidentService) {}


@Get()
@ApiOperation({ summary: 'Get all Incident' })
@ApiResponse({
  status: HttpStatus.OK,
  description:
    'Data fetched successfully.',
})
@Roles(Role.Admin, Role.Driver)
@UseGuards(AuthGuard(), RolesGuard)
async getAllTrips(@CurrentUser() user: User): Promise<{ message: string; data: Incident[]; }> {
return this.incidentService.findAll(user);
}

@Post()
@ApiOperation({ summary: 'Create incident' })
@ApiBody({ type: CreateIncidentDto, description: 'Incident Data' })
@ApiResponse({
  status: HttpStatus.CREATED,
  description:
    'Data Successfully created',
})
@UseGuards(AuthGuard(), RolesGuard)
async createIncident(
  @CurrentUser() user: User,
@Body() incident: CreateIncidentDto,
): Promise<{ message: string; data: Incident; }> {
return this.incidentService.create(user, incident);
}

@Get(':id')
@ApiOperation({ summary: 'Get Incident by id' })
@ApiResponse({
  status: HttpStatus.OK,
  description:
    'Data fetched successfully.',
})
@UseGuards(AuthGuard(), RolesGuard)
async getIncident(
  @CurrentUser() user: User,
@Param('id') id: string,
@Req() req
): Promise<{ message: string; data: Incident; }> {
return this.incidentService.findById(user, id);
}

@Put(':id')
@ApiOperation({ summary: 'Update incident data by id' })
@ApiBody({ type: UpdateIncidentDto, description: 'Incident Data' })
@ApiResponse({
  status: HttpStatus.OK,
  description:
    'Data updated successfully',
})
@UseGuards(AuthGuard(), RolesGuard)
async updateIncident(
  @CurrentUser() user: User,
@Param('id') id: string,
@Body() incident: UpdateIncidentDto,
): Promise<{ message: string; data: Incident; }> {
return this.incidentService.updateById( user, id, incident);
}


}

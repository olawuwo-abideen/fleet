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
import { IncidentService } from './incident.service';
import { CreateIncidentDto, UpdateIncidentDto } from './dto/incident.dto';
import { Incident } from './schemas/incident.schema';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('incident')
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
async getAllTrips(@Req() req): Promise<Incident[]> {
return this.incidentService.findAll(req.user);
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
@Body()
incident: CreateIncidentDto,
@Req() req,
): Promise<Incident> {
return this.incidentService.create(incident, req.user);
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
@Param('id') id: string,
@Req() req
): Promise<Incident> {
return this.incidentService.findById(id, req.user);
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
@Param('id') id: string,
@Body() incident: UpdateIncidentDto,
@Req() req,
): Promise<Incident> {
return this.incidentService.updateById(id, incident, req.user);
}


}

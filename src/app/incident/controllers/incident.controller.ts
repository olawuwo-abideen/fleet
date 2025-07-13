import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { IncidentService } from '../services/incident.service';
import { CreateIncidentDto, UpdateIncidentDto } from '../dto/incident.dto';
import { Incident } from '../../../shared/schemas/incident.schema';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../../../shared/decorators/roles.decorator';
import { Role } from '../../auth/enums/role.enum';
import { RolesGuard } from '../../auth/guards/roles.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ApiResponseDto } from '../../../shared/dto/api-response';

@ApiBearerAuth()
@ApiTags('Incident')
@Controller('incident')
export class IncidentController {
  constructor(private incidentService: IncidentService) {}

  @Get()
  @ApiOperation({ summary: 'Get all incidents' })
  @Roles(Role.Driver, Role.Dispatcher)
  @UseGuards(AuthGuard(), RolesGuard)
  async getAllIncidence() {
    const data = await this.incidentService.findAll();
    return new ApiResponseDto('All incident records retrieved successfully', data);
  }

  @Post()
  @ApiOperation({ summary: 'Create incident' })
  @Roles(Role.Driver)
  @UseGuards(AuthGuard(), RolesGuard)
  async createIncident(@Body() data: CreateIncidentDto) {
    const created = await this.incidentService.create(data);
    return new ApiResponseDto('Incident created successfully', created);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get incident by ID' })
  @Roles(Role.Driver, Role.Dispatcher)
  @UseGuards(AuthGuard(), RolesGuard)
  async getIncident(@Param('id') id: string) {
    const incident = await this.incidentService.findById(id);
    return new ApiResponseDto(`Incident with ID ${id} retrieved successfully`, incident);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update incident by ID' })
  @Roles(Role.Driver)
  @UseGuards(AuthGuard(), RolesGuard)
  async updateIncident(
    @Param('id') id: string,
    @Body() incident: UpdateIncidentDto,
  ) {
    const updated = await this.incidentService.updateById(id, incident);
    return new ApiResponseDto(`Incident with ID ${id} updated successfully`, updated);
  }
}

import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Req,
    UseGuards
  } from '@nestjs/common';
import { IncidentService } from './incident.service';
import { CreateIncidentDto } from './dto/create-incident.dto';
import { UpdateIncidentDto } from './dto/update-incident.dto';
import { Incident } from './schemas/incident.schema';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('incident')
export class IncidentController {
    constructor(private incidentService: IncidentService) {}
    
    @Get()
    @Roles(Role.Admin)
    @UseGuards(AuthGuard(), RolesGuard)
    async getAllIncidents(): Promise<Incident[]>{
      return this.incidentService.findAll()
  }

  @Post()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard(), RolesGuard)
  async createIncident(
    @Body()
    incident: CreateIncidentDto,
    @Req() req,
  ): Promise<Incident> {
    return this.incidentService.create(incident, req.user);
  }

  @Get(':id')
  @Roles(Role.Driver, Role.Admin)
  @UseGuards(AuthGuard(), RolesGuard)
  async getIncident(
    @Param('id')
    id: string,
  ): Promise<Incident> {
    return this.incidentService.findById(id);
  }

  @Put(':id')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard(), RolesGuard)
  async updateIncident(
    @Param('id')
    id: string,
    @Body()
    incident: UpdateIncidentDto,
  ): Promise<Incident> {
    return this.incidentService.updateById(id, incident);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard(), RolesGuard)
  async deleteIncident(
    @Param('id')
    id: string,
  ): Promise<{ deleted: boolean }> {
    return this.incidentService.deleteById(id);
  }

}

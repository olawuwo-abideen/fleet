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
import { MaintenanceService } from './maintenance.service';
import { CreateMaintenanceDto } from './dto/create-maintenance.dto';
import { UpdateMaintenanceDto } from './dto/update-maintenance.dto';
import { Maintenance } from './schemas/maintenance.schema';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('maintenance')
export class MaintenanceController {
    
    constructor(private maintenanceService: MaintenanceService) {}
    
    @Get()
    @Roles(Role.Admin)
    @UseGuards(AuthGuard(), RolesGuard)
    async getAllMaintenances(): Promise<Maintenance[]>{
      return this.maintenanceService.findAll()
  }

  @Post()
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
  @Roles(Role.Driver, Role.Admin)
  @UseGuards(AuthGuard(), RolesGuard)
  async getMaintenance(
    @Param('id')
    id: string,
  ): Promise<Maintenance> {
    return this.maintenanceService.findById(id);
  }

  @Put(':id')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard(), RolesGuard)
  async updateMaintenance(
    @Param('id')
    id: string,
    @Body()
    maintenance: UpdateMaintenanceDto,
  ): Promise<Maintenance> {
    return this.maintenanceService.updateById(id, maintenance);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard(), RolesGuard)
  async deleteMaintenance(
    @Param('id')
    id: string,
  ): Promise<{ deleted: boolean }> {
    return this.maintenanceService.deleteById(id);
  }


}

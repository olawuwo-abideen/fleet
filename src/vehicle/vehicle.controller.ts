import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Query,
    Req,
    UseGuards,
  } from '@nestjs/common';
  import { VehicleService } from './vehicle.service';
  import { CreateVehicleDto } from './dto/create-vehicle.dto';
  import { UpdateVehicleDto } from './dto/update-vehicle.dto';
  import { Vehicle } from './schemas/vehicle.schema';
  import { Query as ExpressQuery } from 'express-serve-static-core';
  import { AuthGuard } from '@nestjs/passport';
  import { Roles } from 'src/auth/decorators/roles.decorator';
  import { Role } from 'src/auth/enums/role.enum';
  import { RolesGuard } from 'src/auth/guards/role.guards';
  
  @Controller('vehicle')
  export class VehicleController {
    constructor(private vehicleService: VehicleService) {}
  
    @Get()
    @Roles(Role.Driver, Role.Admin)
    @UseGuards(AuthGuard(), RolesGuard)
    async getAllVehicles(@Query() query: ExpressQuery): Promise<Vehicle[]> {
      return this.vehicleService.findAll(query);
    }
  
    @Post()
    @UseGuards(AuthGuard())
    async createVehicle(
      @Body()
      vehicle: CreateVehicleDto,
      @Req() req,
    ): Promise<Vehicle> {
      return this.vehicleService.create(vehicle, req.user);
    }
  
    @Get(':id')
    async getVehicle(
      @Param('id')
      id: string,
    ): Promise<Vehicle> {
      return this.vehicleService.findById(id);
    }
  
    @Put(':id')
    async updateVehicle(
      @Param('id')
      id: string,
      @Body()
      vehicle: UpdateVehicleDto,
    ): Promise<Vehicle> {
      return this.vehicleService.updateById(id, vehicle);
    }
  
    @Delete(':id')
    async deleteVehicle(
      @Param('id')
      id: string,
    ): Promise<{ deleted: boolean }> {
      return this.vehicleService.deleteById(id);
    }
  

  }
  
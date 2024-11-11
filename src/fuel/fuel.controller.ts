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
import { FuelService } from './fuel.service';
import { CreateFuelDto } from './dto/create-fuel.dto';
import { UpdateFuelDto } from './dto/update-fuel.dto';
import { Fuel } from './schemas/fuel.schema';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';


@Controller('fuel')
export class FuelController {
    constructor(private fuelService: FuelService) {}

    @Get()
    @Roles(Role.Admin, Role.Driver)
    @UseGuards(AuthGuard(), RolesGuard)
    async getAllFuel(): Promise<Fuel[]>{
        return this.fuelService.findAll()
    }

  @Post()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard(), RolesGuard)
  @UseGuards(AuthGuard())
  async createFuel(
    @Body()
    fuel: CreateFuelDto,
    @Req() req,
  ): Promise<Fuel> {
    return this.fuelService.create(fuel, req.user);
  }

  @Get(':id')
  @Roles(Role.Driver, Role.Admin)
  @UseGuards(AuthGuard(), RolesGuard)
  async getFuel(
    @Param('id')
    id: string,
  ): Promise<Fuel> {
    return this.fuelService.findById(id);
  }

  @Put(':id')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard(), RolesGuard)
  async updateFuel(
    @Param('id')
    id: string,
    @Body()
    fuel: UpdateFuelDto,
  ): Promise<Fuel> {
    return this.fuelService.updateById(id, fuel);
  }


}

import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { FuelService } from '../services/fuel.service';
import { CreateFuelDto, UpdateFuelDto } from '../dto/fuel.dto';
import { Fuel } from '../../../shared/schemas/fuel.schema';
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
@ApiTags('Fuel')
@Controller('fuel')
export class FuelController {
  constructor(private fuelService: FuelService) {}

  @Get()
  @ApiOperation({ summary: 'Get all fuel purchased' })
  async getAllFuels() {
    const data = await this.fuelService.findAll();
    return new ApiResponseDto('All fuel purchase records retrieved successfully', data);
  }

  @Post()
  @ApiOperation({ summary: 'Create fuel purchased' })
  @Roles(Role.Dispatcher)
  @UseGuards(AuthGuard(), RolesGuard)
  async createFuel(@Body() data: CreateFuelDto) {
    const fuel = await this.fuelService.create(data);
    return new ApiResponseDto('Fuel purchase record created successfully', fuel);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get fuel purchased by id' })
  @Roles(Role.Dispatcher)
  @UseGuards(AuthGuard(), RolesGuard)
  async getFuel(@Param('id') id: string) {
    const fuel = await this.fuelService.findById(id);
    return new ApiResponseDto(`Fuel record with ID ${id} retrieved successfully`, fuel);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update fuel purchased by id' })
  @Roles(Role.Dispatcher)
  @UseGuards(AuthGuard(), RolesGuard)
  async updateFuel(@Param('id') id: string, @Body() data: UpdateFuelDto) {
    const fuel = await this.fuelService.updateById(id, data);
    return new ApiResponseDto(`Fuel record with ID ${id} updated successfully`, fuel);
  }
}

import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { TripService } from '../services/trip.service';
import { CreateTripDto, UpdateTripDto } from '../dto/trip.dto.ts';
import { Trip, TripStatus } from '../../../shared/schemas/trip.schema';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../../auth/guards/roles.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { User } from '../../../shared/schemas/user.schema';
import { CurrentUser } from '../../../shared/decorators/user.decorator';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { Role } from 'src/app/auth/enums/role.enum';
import { ApiResponseDto } from 'src/shared/dto/api-response';

@ApiBearerAuth()
@ApiTags('Trip')
@Controller('trip')
export class TripController {
  constructor(private readonly tripService: TripService) {}

  @Get()
  @ApiOperation({ summary: 'Get all trips' })
  @Roles(Role.Dispatcher)
  @UseGuards(AuthGuard(), RolesGuard)
  async getAllTrips() {
    const data = await this.tripService.findAll();
    return new ApiResponseDto('All trips retrieved successfully', data);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new trip' })
  @Roles(Role.Dispatcher)
  @UseGuards(AuthGuard(), RolesGuard)
  async createTrip(@Body() trip: CreateTripDto) {
    const created = await this.tripService.create(trip);
    return new ApiResponseDto('Trip created successfully', created);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get trip by ID' })
  @Roles(Role.Dispatcher, Role.Driver)
  @UseGuards(AuthGuard(), RolesGuard)
  async getTrip(@CurrentUser() user: User, @Param('id') id: string) {
    const trip = await this.tripService.findById(user, id);
    return new ApiResponseDto(`Trip with ID ${id} retrieved successfully`, trip);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update trip by ID' })
  @Roles(Role.Dispatcher)
  @UseGuards(AuthGuard(), RolesGuard)
  async updateTrip(@Param('id') id: string, @Body() trip: UpdateTripDto) {
    const updated = await this.tripService.updateById(id, trip);
    return new ApiResponseDto(`Trip with ID ${id} updated successfully`, updated);
  }

  @Put('status/:id')
  @ApiOperation({ summary: 'Update trip status by ID' })
  @Roles(Role.Driver)
  @UseGuards(AuthGuard(), RolesGuard)
  async updateTripStatus(@Param('id') id: string, @Body('status') status: TripStatus) {
    const updatedTrip = await this.tripService.updateStatus(id, status);
    return new ApiResponseDto(`Trip status updated successfully`, updatedTrip);
  }

  @Get('ongoing')
  @ApiOperation({ summary: 'Get all ongoing trips' })
  @Roles(Role.Dispatcher)
  @UseGuards(AuthGuard(), RolesGuard)
  async getOngoingTrips() {
    const ongoingTrips = await this.tripService.getOngoingTrips();
    return new ApiResponseDto('Ongoing trips retrieved successfully', ongoingTrips);
  }
}

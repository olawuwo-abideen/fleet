import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TripService } from './trip.service';
import { CreateTripDto, UpdateTripDto } from './dto/trip.dto.ts';
import { Trip } from './schemas/trip.schema';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/guards/roles.guard';
@Controller('trip')
export class TripController {
  constructor(private readonly tripService: TripService) {}

  @Get()
  @UseGuards(AuthGuard(), RolesGuard)
  async getAllTrips(@Req() req): Promise<Trip[]> {
    return this.tripService.findAllByUser(req.user);
  }

  @Post()
  @UseGuards(AuthGuard(), RolesGuard)
  async createTrip(
    @Body() trip: CreateTripDto,
    @Req() req,
  ): Promise<Trip> {
    return this.tripService.create(trip, req.user);  
  }

  @Get(':id')
  @UseGuards(AuthGuard(), RolesGuard)
  async getTrip(
    @Param('id') id: string,
    @Req() req,
  ): Promise<Trip> {
    return this.tripService.findByIdAndUser(id, req.user);  // Ensure trip belongs to user
  }

  @Put(':id')
  @UseGuards(AuthGuard(), RolesGuard)
  async updateTrip(
    @Param('id') id: string,
    @Body() trip: UpdateTripDto,
    @Req() req,
  ): Promise<Trip> {
    return this.tripService.updateByIdAndUser(id, trip, req.user);  // Update the trip for user
  }
}
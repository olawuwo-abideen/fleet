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
import { TripService } from './trip.service';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import { Trip } from './schemas/trip.schema';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('trip')
export class TripController {

    constructor(private tripService: TripService) {}
    
  @Get()
  @UseGuards(AuthGuard(), RolesGuard)
  async getAllTrips(): Promise<Trip[]>{
        return this.tripService.findAll()
    }

  @Post()
  @UseGuards(AuthGuard(), RolesGuard)
  async createTrip(
    @Body()
    trip: CreateTripDto,
    @Req() req,
  ): Promise<Trip> {
    return this.tripService.create(trip, req.user);
  }

  @Get(':id')
  @UseGuards(AuthGuard(), RolesGuard)
  async getTrip(
    @Param('id')
    id: string,
  ): Promise<Trip> {
    return this.tripService.findById(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard(), RolesGuard)
  async updateTrip(
    @Param('id')
    id: string,
    @Body()
    trip: UpdateTripDto,
  ): Promise<Trip> {
    return this.tripService.updateById(id, trip);
  }
}

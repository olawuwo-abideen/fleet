import {
Body,
Controller,
Get,
HttpStatus,
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
import { RolesGuard } from '../auth/guards/roles.guard';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('trip')
@Controller('trip')
export class TripController {
constructor(private readonly tripService: TripService) {}

@Get()
@ApiOperation({ summary: 'Get all trip' })
@ApiResponse({
  status: HttpStatus.OK,
  description:
    'Data fetched successfully.',
})
@UseGuards(AuthGuard(), RolesGuard)
async getAllTrips(@Req() req): Promise<Trip[]> {
return this.tripService.findAll(req.user);
}

@Post()
@ApiOperation({ summary: 'Create trip' })
@ApiBody({ type: CreateTripDto, description: 'Trip Data' })
@ApiResponse({
  status: HttpStatus.CREATED,
  description:
    'Data Successfully created',
})
@UseGuards(AuthGuard(), RolesGuard)
async createTrip(
@Body() trip: CreateTripDto,
@Req() req,
): Promise<Trip> {
return this.tripService.create(trip, req.user);  
}

@Get(':id')
@ApiOperation({ summary: 'Get trip by id' })
@ApiResponse({
  status: HttpStatus.OK,
  description:
    'Data fetched successfully.',
})
@UseGuards(AuthGuard(), RolesGuard)
async getTrip(
@Param('id') id: string,
@Req() req,
): Promise<Trip> {
return this.tripService.findById(id, req.user);  
}

@Put(':id')
@ApiOperation({ summary: 'Update fuel data by id' })
@ApiBody({ type: UpdateTripDto, description: 'Trip Data' })
@ApiResponse({
  status: HttpStatus.OK,
  description:
    'Data updated successfully',
})
@UseGuards(AuthGuard(), RolesGuard)
async updateTrip(
@Param('id') id: string,
@Body() trip: UpdateTripDto,
@Req() req,
): Promise<Trip> {
return this.tripService.updateById(id, trip, req.user); 
}
}
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
import { TripService } from '../services/trip.service';
import { CreateTripDto, UpdateTripDto } from '../dto/trip.dto.ts';
import { Trip } from '../schemas/trip.schema';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from '../../auth/schemas/user.schema';
import { CurrentUser } from '../../../shared/decorators/user.decorator';

@ApiBearerAuth()
@ApiTags('Trip')
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
async getAllTrips(@CurrentUser() user: User): Promise<{ message: string; data: Trip[]; }> {
return this.tripService.findAll(user);
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
  @CurrentUser() user: User,
@Body() trip: CreateTripDto,
): Promise<{ message: string; data: Trip; }> {
return this.tripService.create(user,trip);  
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
  @CurrentUser() user: User,
@Param('id') id: string,
): Promise<{ message: string; data: Trip; }> {
return this.tripService.findById(user, id);  
}

@Put(':id')
@ApiOperation({ summary: 'Update trip data by id' })
@ApiBody({ type: UpdateTripDto, description: 'Trip Data' })
@ApiResponse({
  status: HttpStatus.OK,
  description:
    'Data updated successfully',
})
@UseGuards(AuthGuard(), RolesGuard)
async updateTrip(
  @CurrentUser() user: User,
@Param('id') id: string,
@Body() trip: UpdateTripDto,
): Promise<{ message: string; data: Trip; }> {
return this.tripService.updateById(user, id, trip); 
}
}
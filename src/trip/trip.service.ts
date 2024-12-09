import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Trip } from './schemas/trip.schema';
import { User } from '../auth/schemas/user.schema';
import { CreateTripDto } from './dto/trip.dto.ts';

@Injectable()
export class TripService {
  constructor(
    @InjectModel(Trip.name)
    private tripModel: mongoose.Model<Trip>,
  ) {}

  // Fetch all trips for the current user
  async findAllByUser(user: User): Promise<Trip[]> {
    return this.tripModel.find({ userId: user._id });  // Use `userId` to filter trips
  }

  // Create a new trip
  async create(trip: CreateTripDto, user: User): Promise<Trip> {
    const data = {
      ...trip,
      userId: user._id,  // Store userId in trip data
      vehicleId: new mongoose.Types.ObjectId(trip.vehicleId),
      driverId: new mongoose.Types.ObjectId(trip.driverId),
      routeId: new mongoose.Types.ObjectId(trip.routeId),
    };
    return this.tripModel.create(data);
  }

  // Fetch a specific trip by ID for the current user
  async findByIdAndUser(id: string, user: User): Promise<Trip> {
    const isValidId = mongoose.isValidObjectId(id);
    if (!isValidId) {
      throw new BadRequestException('Please enter a correct ID.');
    }

    const trip = await this.tripModel.findOne({ _id: id, userId: user._id });  // Filter by userId as well
    if (!trip) {
      throw new NotFoundException('Trip not found or you do not have access.');
    }

    return trip;
  }

  // Update a trip by ID for the current user
  async updateByIdAndUser(id: string, trip: Partial<Trip>, user: User): Promise<Trip> {
    const updatedTrip = await this.tripModel.findOneAndUpdate(
      { _id: id, userId: user._id },  // Ensure userId is also used in the filter
      trip,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updatedTrip) {
      throw new NotFoundException('Trip not found');
    }

    return updatedTrip;
  }
}
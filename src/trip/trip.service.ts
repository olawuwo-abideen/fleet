import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Trip } from './schemas/trip.schema';
import { User } from '../auth/schemas/user.schema';

@Injectable()
export class TripService {
  constructor(
    @InjectModel(Trip.name)
    private tripModel: mongoose.Model<Trip>,
  ) {}

  // Fetch all trips for the current user
  async findAllByUser(user: User): Promise<Trip[]> {
    return this.tripModel.find({ user: user._id });
  }



  async create(trip: Trip, user: User): Promise<Trip> {
    // Convert string IDs to ObjectId
    const data = {
      ...trip,
      user: user._id,
      vehicleId: new mongoose.Types.ObjectId(trip.vehicleId),
      driverId: new mongoose.Types.ObjectId(trip.driverId),
      routeId: new mongoose.Types.ObjectId(trip.routeId),
    };

    return this.tripModel.create(data);
  }

  // Fetch a specific trip by ID that belongs to the current user
  async findByIdAndUser(id: string, user: User): Promise<Trip> {
    const isValidId = mongoose.isValidObjectId(id);
    if (!isValidId) {
      throw new BadRequestException('Please enter a correct ID.');
    }

    const trip = await this.tripModel.findOne({ _id: id, user: user._id });
    if (!trip) {
      throw new NotFoundException('Trip not found or you do not have access.');
    }

    return trip;
  }

  // Update a trip by ID if it belongs to the current user
  async updateByIdAndUser(id: string, trip: Partial<Trip>, user: User): Promise<Trip> {
    const updatedTrip = await this.tripModel.findOneAndUpdate(
      { _id: id, user: user._id },
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

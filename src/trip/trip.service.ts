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


  async findAll(user: User): Promise<Trip[]> {
    return this.tripModel.find({ userId: user._id });  
  }


  async create(trip: CreateTripDto, user: User): Promise<Trip> {
    const data = {
      ...trip,
      userId: user._id, 
      vehicleId: new mongoose.Types.ObjectId(trip.vehicleId),
      driverId: new mongoose.Types.ObjectId(trip.driverId),
      routeId: new mongoose.Types.ObjectId(trip.routeId),
    };
    return this.tripModel.create(data);
  }


  async findById(id: string, user: User): Promise<Trip> {
    const isValidId = mongoose.isValidObjectId(id);
    if (!isValidId) {
      throw new BadRequestException('Please enter a correct ID.');
    }

    const trip = await this.tripModel.findOne({ _id: id, userId: user._id });
    if (!trip) {
      throw new NotFoundException('Trip not found or you do not have access.');
    }

    return trip;
  }

  async updateById(id: string, trip: Partial<Trip>, user: User): Promise<Trip> {
    const updatedTrip = await this.tripModel.findOneAndUpdate(
      { _id: id, userId: user._id },  
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
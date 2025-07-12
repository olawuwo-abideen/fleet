import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Trip, TripStatus } from '../../../shared/schemas/trip.schema';
import { User } from '../../../shared/schemas/user.schema';
import { CreateTripDto, UpdateTripDto } from '../dto/trip.dto.ts';
import { Vehicle } from 'src/shared/schemas/vehicle.schema';
import { Model } from 'mongoose';

@Injectable()
export class TripService {
  constructor(
    @InjectModel(Trip.name) private readonly tripModel: Model<Trip>,
    @InjectModel(Vehicle.name) private readonly vehicleModel: Model<Vehicle>,
    @InjectModel(User.name) private readonly driverModel: Model<User>,
  ) {}

  async findAll(): Promise<Trip[]> {
    return await this.tripModel.find().exec();
  }

  async findById(user: User, id: string): Promise<Trip> {
    if (!mongoose.isValidObjectId(id)) {
      throw new BadRequestException('Invalid trip ID');
    }

    const trip = await this.tripModel.findOne({ _id: id, userId: user._id }).exec();
    if (!trip) {
      throw new NotFoundException('Trip not found');
    }

    return trip;
  }

  async create(tripDto: CreateTripDto): Promise<Trip> {
    const { vehicleId, driverId, startTime } = tripDto;

    if (
      !mongoose.isValidObjectId(vehicleId) ||
      !mongoose.isValidObjectId(driverId)
    ) {
      throw new BadRequestException('Invalid vehicleId or driverId');
    }

    const vehicle = await this.vehicleModel.findById(vehicleId);
    if (!vehicle) {
      throw new NotFoundException('Vehicle not found');
    }

    const driver = await this.driverModel.findById(driverId);
    if (!driver) {
      throw new NotFoundException('Driver not found');
    }

    return await this.tripModel.create({
      vehicleId,
      driverId,
      startTime,
    });
  }

  async updateById(id: string, tripDto: Partial<CreateTripDto>): Promise<Trip> {
    if (!mongoose.isValidObjectId(id)) {
      throw new BadRequestException('Invalid trip ID');
    }

    const updatedTrip = await this.tripModel.findByIdAndUpdate(
      id,
      UpdateTripDto,
      { new: true, runValidators: true },
    );

    if (!updatedTrip) {
      throw new NotFoundException('Trip not found');
    }

    return updatedTrip;
  }

  async updateStatus(tripId: string, status: TripStatus): Promise<Trip> {
    const trip = await this.tripModel.findById(tripId);
    if (!trip) {
      throw new NotFoundException('Trip not found');
    }

    trip.status = status;
    if (status === TripStatus.Completed) {
      trip.endTime = new Date();
    }

    return await trip.save();
  }

  async getOngoingTrips(): Promise<Trip[]> {
    return await this.tripModel
      .find({ status: TripStatus.Ongoing })
      .populate('driverId vehicleId userId');
  }
}

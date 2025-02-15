  import {
  BadRequestException,
  Injectable,
  NotFoundException,
  } from '@nestjs/common';
  import { InjectModel } from '@nestjs/mongoose';
  import * as mongoose from 'mongoose';
  import { Trip } from '../schemas/trip.schema';
  import { User } from '../../auth/schemas/user.schema';
  import { CreateTripDto, UpdateTripDto } from '../dto/trip.dto.ts';

  @Injectable()
  export class TripService {
  constructor(
  @InjectModel(Trip.name)
  private tripModel: mongoose.Model<Trip>,
  ) {}
  // Get all trips
  async findAll(user: User): Promise<{ message: string; data: Trip[] }> {
    const trips = await this.tripModel.find({ userId: user._id }).exec();
    return {
      message: 'Trips retrieved successfully',
      data: trips,
    };
  }

  // Create a new trip
  async create(
    user: User, 
    tripDto: CreateTripDto
  ): Promise<{ message: string; data: Trip }> {
    const data = { ...tripDto, userId: user._id };
    const newTrip = await this.tripModel.create(data);
    return {
      message: 'Trip created successfully',
      data: newTrip,
    };
  }

  // Get trip by ID
  async findById(user: User, id: string): Promise<{ message: string; data: Trip }> {
    if (!mongoose.isValidObjectId(id)) {
      throw new BadRequestException('Invalid trip ID');
    }

    const trip = await this.tripModel.findOne({ _id: id, userId: user._id }).exec();
    if (!trip) {
      throw new NotFoundException('Trip not found');
    }

    return {
      message: 'Trip retrieved successfully',
      data: trip,
    };
  }

  async updateById(
    user: User, 
    id: string, 
    tripDto: UpdateTripDto
  ): Promise<{ message: string; data: Trip }> {
    if (!mongoose.isValidObjectId(id)) {
      throw new BadRequestException('Invalid trip ID');
    }

    const updatedTrip = await this.tripModel.findOneAndUpdate(
      { _id: id, userId: user._id },
      tripDto,
      { new: true, runValidators: true }
    );

    if (!updatedTrip) {
      throw new NotFoundException('Trip not found');
    }

    return {
      message: 'Trip updated successfully',
      data: updatedTrip,
    };
  }


  }
import {
    BadRequestException,
    Injectable,
    NotFoundException,
  } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose'
import { Trip } from './schemas/trip.schema';
import { User } from '../auth/schemas/user.schema';

@Injectable()
export class TripService {

    constructor(
        @InjectModel(Trip.name)
        private tripModel:mongoose.Model<Trip>
    ){}

    async findAll(): Promise<Trip[]> {
        const trips = await this.tripModel.find();
        return trips
    }

    async create(trip: Trip, user: User): Promise<Trip> {
        const data = Object.assign(trip, { user: user._id });
    
        const res = await this.tripModel.create(data);
        return res;
      }
    
      async findById(id: string): Promise<Trip> {
        const isValidId = mongoose.isValidObjectId(id);
    
        if (!isValidId) {
          throw new BadRequestException('Please enter correct id.');
        }
    
        const trip = await this.tripModel.findById(id);
    
        if (!trip) {
          throw new NotFoundException('Trip not found.');
        }
    
        return trip;
      }
    
      async updateById(id: string, trip: Trip): Promise<Trip> {
        return await this.tripModel.findByIdAndUpdate(id, trip, {
          new: true,
          runValidators: true,
        });
      }
    
      async deleteById(id: string): Promise<{ deleted: boolean }> {
        await this.tripModel.findByIdAndDelete(id);
        return { deleted: true };
      }
}

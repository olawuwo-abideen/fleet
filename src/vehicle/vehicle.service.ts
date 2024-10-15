import {
    BadRequestException,
    Injectable,
    NotFoundException,
  } from '@nestjs/common';
  import { InjectModel } from '@nestjs/mongoose';
  import * as mongoose from 'mongoose';
  import { Vehicle } from './schemas/vehicle.schema';
  import { Query } from 'express-serve-static-core';
  import { User } from '../auth/schemas/user.schema';

  
  @Injectable()
  export class VehicleService {
    constructor(
      @InjectModel(Vehicle.name)
      private vehicleModel: mongoose.Model<Vehicle>,
    ) {}
  
    async findAll(query: Query): Promise<Vehicle[]> {
      const resPerPage = 2;
      const currentPage = Number(query.page) || 1;
      const skip = resPerPage * (currentPage - 1);
  
      const keyword = query.keyword
        ? {
            title: {
              $regex: query.keyword,
              $options: 'i',
            },
          }
        : {};
  
      const vehicles = await this.vehicleModel
        .find({ ...keyword })
        .limit(resPerPage)
        .skip(skip);
      return vehicles;
    }
  
    async create(vehicle: Vehicle, user: User): Promise<Vehicle> {
      const data = Object.assign(vehicle, { user: user._id });
  
      const res = await this.vehicleModel.create(data);
      return res;
    }
  
    async findById(id: string): Promise<Vehicle> {
      const isValidId = mongoose.isValidObjectId(id);
  
      if (!isValidId) {
        throw new BadRequestException('Please enter correct id.');
      }
  
      const vehicle = await this.vehicleModel.findById(id);
  
      if (!vehicle) {
        throw new NotFoundException('Vehicle not found.');
      }
  
      return vehicle;
    }
  
    async updateById(id: string, vehicle: Vehicle): Promise<Vehicle> {
      return await this.vehicleModel.findByIdAndUpdate(id, vehicle, {
        new: true,
        runValidators: true,
      });
    }
  
    async deleteById(id: string): Promise<{ deleted: boolean }> {
      await this.vehicleModel.findByIdAndDelete(id);
      return { deleted: true };
    }
  

  }
  
import {
    BadRequestException,
    Injectable,
    NotFoundException,
  } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose'
import { Fuel } from './schemas/fuel.schema';
import { User } from '../auth/schemas/user.schema';


@Injectable()
export class FuelService {
    constructor(
        @InjectModel(Fuel.name)
        private fuelModel:mongoose.Model<Fuel>
    ){}

    async findAll(): Promise<Fuel[]> {
        const fuels = await this.fuelModel.find();
        return fuels
    }

    async create(fuel: Fuel, user: User): Promise<Fuel> {
        const data = Object.assign(fuel, { user: user._id });
    
        const res = await this.fuelModel.create(data);
        return res;
      }
    
      async findById(id: string): Promise<Fuel> {
        const isValidId = mongoose.isValidObjectId(id);
    
        if (!isValidId) {
          throw new BadRequestException('Please enter correct id.');
        }
    
        const fuel = await this.fuelModel.findById(id);
    
        if (!fuel) {
          throw new NotFoundException('Vehicle not found.');
        }
    
        return fuel;
      }
    
      async updateById(id: string, fuel: Fuel): Promise<Fuel> {
        return await this.fuelModel.findByIdAndUpdate(id, fuel, {
          new: true,
          runValidators: true,
        });
      }
    
      async deleteById(id: string): Promise<{ deleted: boolean }> {
        await this.fuelModel.findByIdAndDelete(id);
        return { deleted: true };
      }
}

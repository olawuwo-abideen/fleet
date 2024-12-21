import {
    BadRequestException,
    Injectable,
    NotFoundException,
  } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose'
import { Fuel } from './schemas/fuel.schema';
import { User } from '../auth/schemas/user.schema';
import { CreateFuelDto, UpdateFuelDto } from './dto/fuel.dto';

@Injectable()
export class FuelService {
    constructor(
        @InjectModel(Fuel.name)
        private fuelModel:mongoose.Model<Fuel>
    ){}

    async findAll(user: User): Promise<Fuel[]> {
        const fuels = await this.fuelModel.find({ userId: user._id });
        return fuels
    }

    
      async create(fuel: CreateFuelDto, user: User): Promise<Fuel> {
      const data = {
      ...fuel,
      userId: user._id, 
      vehicleId: new mongoose.Types.ObjectId(fuel.vehicleId),
      };
      return this.fuelModel.create(data);
      }


async findById(id: string, user: User): Promise<Fuel> {
const isValidId = mongoose.isValidObjectId(id);
if (!isValidId) {
throw new BadRequestException('Please enter a correct ID.');
}

const fuel = await this.fuelModel.findOne({ _id: id, userId: user._id });
if (!fuel) {
throw new NotFoundException('Fuel not found ');
}

return fuel;
}


async updateById(id: string, fuel: Partial<Fuel>, user: User): Promise<Fuel> {
const updatedFuel = await this.fuelModel.findOneAndUpdate(
{ _id: id, userId: user._id },  
fuel,
{
  new: true,
  runValidators: true,
},
);

if (!updatedFuel) {
throw new NotFoundException('Fuel not found');
}

return updatedFuel;
}

}

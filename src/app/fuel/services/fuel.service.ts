import {
BadRequestException,
Injectable,
NotFoundException,
UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose'
import { Fuel } from '../schemas/fuel.schema';
import { User } from '../../auth/schemas/user.schema';
import { CreateFuelDto, UpdateFuelDto } from '../dto/fuel.dto';

@Injectable()
export class FuelService {
constructor(
@InjectModel(Fuel.name)
private fuelModel:mongoose.Model<Fuel>
){}

async findAll(user: User): Promise<{message: string; data: Fuel[] }> {
    const fuels = await this.fuelModel.find().exec();
    
    return {
      message: 'Fuels retrieved successfully',
      data: fuels,
    };
  }
  


  async create(
    user: User, 
    fuel: CreateFuelDto
  ): Promise<{ message: string; data: Fuel }> {
    const data = {
      ...fuel,
      userId: user._id,
      vehicleId: new mongoose.Types.ObjectId(fuel.vehicleId),
    };
  
    const newFuel = await this.fuelModel.create(data);
  
    return {
      message: 'Fuel entry created successfully',
      data: newFuel,
    };
  }


  async findById(id: string, user: User): Promise<{ message: string; data: Fuel }> {
    if (!mongoose.isValidObjectId(id)) {
      throw new BadRequestException('Please enter a correct ID.');
    }
  
    const fuel = await this.fuelModel.findOne({ _id: id, userId: user._id });
    if (!fuel) {
      throw new NotFoundException('Fuel not found');
    }
  
    return {
      message: 'Fuel retrieved successfully',
      data: fuel,
    };
  }


  async updateById(
    id: string, 
    fuel: Partial<Fuel>, 
    user: User
  ): Promise<{ message: string; data: Fuel }> {
    if (!mongoose.isValidObjectId(id)) {
      throw new BadRequestException('Please enter a correct ID.');
    }
  
    const updatedFuel = await this.fuelModel.findOneAndUpdate(
      { _id: id, userId: user._id },  
      fuel,
      {
        new: true,
        runValidators: true,
      }
    );
  
    if (!updatedFuel) {
      throw new NotFoundException('Fuel not found');
    }
  
    return {
      message: 'Fuel updated successfully',
      data: updatedFuel,
    };
  }

}

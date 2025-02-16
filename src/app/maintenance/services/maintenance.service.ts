import {
BadRequestException,
Injectable,
NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose'
import { Maintenance } from '../schemas/maintenance.schema';
import { User } from '../../auth/schemas/user.schema';
import { CreateMaintenanceDto, UpdateMaintenanceDto } from '../dto/maintenance.dto';


@Injectable()
export class MaintenanceService {

constructor(
@InjectModel(Maintenance.name)
private maintenanceModel:mongoose.Model<Maintenance>
){}
  async findAll(user: User): Promise<{ message: string; data: Maintenance[] }> {
    const maintenances = await this.maintenanceModel.find({ userId: user._id }).exec();
    
    return {
      message: 'Maintenance records fetched successfully',
      data: maintenances,
    };
  }

  async create(
    user: User, 
    maintenanceDto: CreateMaintenanceDto
  ): Promise<{ message: string; data: Maintenance }> {
    const newMaintenance = await this.maintenanceModel.create({
      ...maintenanceDto,
      userId: user._id,
      vehicleId: new mongoose.Types.ObjectId(maintenanceDto.vehicleId),
    });

    return {
      message: 'Maintenance record created successfully',
      data: newMaintenance,
    };
  }

  async findById(
    user: User, 
    id: string
  ): Promise<{ message: string; data: Maintenance }> {
    if (!mongoose.isValidObjectId(id)) {
      throw new BadRequestException('Invalid maintenance ID');
    }

    const maintenance = await this.maintenanceModel.findOne({ _id: id, userId: user._id });
    if (!maintenance) {
      throw new NotFoundException('Maintenance record not found');
    }

    return {
      message: 'Maintenance record fetched successfully',
      data: maintenance,
    };
  }

ID
  async updateById(
    user: User, 
    id: string, 
    maintenanceDto: UpdateMaintenanceDto
  ): Promise<{ message: string; data: Maintenance }> {
    if (!mongoose.isValidObjectId(id)) {
      throw new BadRequestException('Invalid maintenance ID');
    }

    const updatedMaintenance = await this.maintenanceModel.findOneAndUpdate(
      { _id: id, userId: user._id },
      maintenanceDto,
      { new: true, runValidators: true },
    );

    if (!updatedMaintenance) {
      throw new NotFoundException('Maintenance record not found');
    }

    return {
      message: 'Maintenance record updated successfully',
      data: updatedMaintenance,
    };
  }

}

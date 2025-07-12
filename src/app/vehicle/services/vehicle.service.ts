import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Vehicle } from '../../../shared/schemas/vehicle.schema';
import { Maintenance } from '../../../shared/schemas/maintenance.schema'; 
import { Model } from 'mongoose';

@Injectable()
export class VehicleService {
  constructor(
    @InjectModel(Vehicle.name)
    private readonly vehicleModel: Model<Vehicle>,

    @InjectModel(Maintenance.name) 
    private readonly maintenanceModel: Model<Maintenance>,
  ) {}

  async findAll(): Promise<Vehicle[]> {
    return this.vehicleModel.find().exec();
  }

  async findById(id: string): Promise<Vehicle> {
    if (!mongoose.isValidObjectId(id)) {
      throw new BadRequestException('Invalid vehicle ID.');
    }

    const vehicle = await this.vehicleModel.findById(id);
    if (!vehicle) {
      throw new NotFoundException('Vehicle not found.');
    }

    return vehicle;
  }

  async getMaintenanceHistory(vehicleId: string): Promise<Maintenance[]> {
    if (!mongoose.isValidObjectId(vehicleId)) {
      throw new BadRequestException('Invalid vehicle ID.');
    }

    return this.maintenanceModel
      .find({ vehicleId: new mongoose.Types.ObjectId(vehicleId) })
      .sort({ maintenanceDate: -1 })
      .exec();
  }

  async getAvailableVehicles(): Promise<Vehicle[]> {
    return this.vehicleModel.find({ isAvailable: true }).exec();
  }
}

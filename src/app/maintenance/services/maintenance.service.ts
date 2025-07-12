import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Maintenance } from '../../../shared/schemas/maintenance.schema';
import { CreateMaintenanceDto, UpdateMaintenanceDto } from '../dto/maintenance.dto';
import { Vehicle } from 'src/shared/schemas/vehicle.schema';

@Injectable()
export class MaintenanceService {
  constructor(
    @InjectModel(Maintenance.name)
    private readonly maintenanceModel: mongoose.Model<Maintenance>,
    @InjectModel(Vehicle.name)
    private readonly vehicleModel: mongoose.Model<Vehicle>,
  ) {}

  async findAll(): Promise<Maintenance[]> {
    return await this.maintenanceModel.find().exec();
  }

  async findById(id: string): Promise<Maintenance> {
    if (!mongoose.isValidObjectId(id)) {
      throw new BadRequestException('Invalid maintenance ID');
    }

    const maintenance = await this.maintenanceModel.findById(id).exec();
    if (!maintenance) {
      throw new NotFoundException('Maintenance record not found');
    }

    return maintenance;
  }

  async create(dto: CreateMaintenanceDto): Promise<Maintenance> {
    const { vehicleId, ...rest } = dto;

    if (!mongoose.isValidObjectId(vehicleId)) {
      throw new BadRequestException('Invalid vehicle ID');
    }

    const vehicle = await this.vehicleModel.findById(vehicleId);
    if (!vehicle) {
      throw new NotFoundException('Vehicle not found');
    }

    return await this.maintenanceModel.create({
      vehicleId: new mongoose.Types.ObjectId(vehicleId),
      ...rest,
    });
  }

  async updateById(id: string, dto: UpdateMaintenanceDto): Promise<Maintenance> {
    if (!mongoose.isValidObjectId(id)) {
      throw new BadRequestException('Invalid maintenance ID');
    }

    if (!mongoose.isValidObjectId(dto.vehicleId)) {
      throw new BadRequestException('Invalid vehicle ID');
    }

    const vehicle = await this.vehicleModel.findById(dto.vehicleId);
    if (!vehicle) {
      throw new NotFoundException('Vehicle not found');
    }

    const updated = await this.maintenanceModel.findByIdAndUpdate(id, dto, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      throw new NotFoundException('Maintenance record not found');
    }

    return updated;
  }
}

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Fuel } from '../../../shared/schemas/fuel.schema';
import { CreateFuelDto, UpdateFuelDto } from '../dto/fuel.dto';
import { Vehicle } from '../../../shared/schemas/vehicle.schema';

@Injectable()
export class FuelService {
  constructor(
    @InjectModel(Fuel.name)
    private readonly fuelModel: mongoose.Model<Fuel>,
    @InjectModel(Vehicle.name)
    private readonly vehicleModel: mongoose.Model<Vehicle>,
  ) {}

  async findAll(): Promise<Fuel[]> {
    return await this.fuelModel.find().exec();
  }

  async findById(id: string): Promise<Fuel> {
    if (!mongoose.isValidObjectId(id)) {
      throw new BadRequestException('Please enter a correct ID.');
    }

    const fuel = await this.fuelModel.findById(id);
    if (!fuel) {
      throw new NotFoundException('Fuel not found');
    }

    return fuel;
  }

  async create(fuelDto: CreateFuelDto): Promise<Fuel> {
    const { vehicleId, ...rest } = fuelDto;

    if (!mongoose.isValidObjectId(vehicleId)) {
      throw new BadRequestException('Invalid vehicle ID');
    }

    const vehicle = await this.vehicleModel.findById(vehicleId);
    if (!vehicle) {
      throw new NotFoundException('Vehicle not found');
    }

    return await this.fuelModel.create({
      ...rest,
      vehicleId: new mongoose.Types.ObjectId(vehicleId),
    });
  }

  async updateById(id: string, fuelDto: UpdateFuelDto): Promise<Fuel> {
    if (!mongoose.isValidObjectId(id)) {
      throw new BadRequestException('Invalid fuel ID');
    }

    const { vehicleId, ...rest } = fuelDto;

    if (!mongoose.isValidObjectId(vehicleId)) {
      throw new BadRequestException('Invalid vehicle ID');
    }

    const vehicle = await this.vehicleModel.findById(vehicleId);
    if (!vehicle) {
      throw new NotFoundException('Vehicle not found');
    }

    const updatedFuel = await this.fuelModel.findByIdAndUpdate(
      id,
      {
        ...rest,
        vehicleId: new mongoose.Types.ObjectId(vehicleId),
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updatedFuel) {
      throw new NotFoundException('Fuel record not found');
    }

    return updatedFuel;
  }
}

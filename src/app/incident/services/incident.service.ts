import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Incident } from '../../../shared/schemas/incident.schema';
import { CreateIncidentDto, UpdateIncidentDto } from '../dto/incident.dto';
import { Vehicle } from '../../../shared/schemas/vehicle.schema';

@Injectable()
export class IncidentService {
  constructor(
    @InjectModel(Incident.name)
    private readonly incidentModel: mongoose.Model<Incident>,
    @InjectModel(Vehicle.name)
    private readonly vehicleModel: mongoose.Model<Vehicle>,
  ) {}

  async findAll(): Promise<Incident[]> {
    return await this.incidentModel.find().exec();
  }

  async findById(id: string): Promise<Incident> {
    if (!mongoose.isValidObjectId(id)) {
      throw new BadRequestException('Invalid incident ID');
    }

    const incident = await this.incidentModel.findById(id).exec();
    if (!incident) {
      throw new NotFoundException('Incident not found');
    }

    return incident;
  }

  async create(createIncidentDto: CreateIncidentDto): Promise<Incident> {
    const { vehicleId, ...rest } = createIncidentDto;

    if (!mongoose.isValidObjectId(vehicleId)) {
      throw new BadRequestException('Invalid vehicle ID');
    }

    const vehicle = await this.vehicleModel.findById(vehicleId);
    if (!vehicle) {
      throw new NotFoundException('Vehicle not found');
    }

    return await this.incidentModel.create({
      vehicleId: new mongoose.Types.ObjectId(vehicleId),
      ...rest,
    });
  }

  async updateById(
    id: string,
    updateIncidentDto: UpdateIncidentDto,
  ): Promise<Incident> {
    if (!mongoose.isValidObjectId(id)) {
      throw new BadRequestException('Invalid incident ID');
    }

    const { vehicleId } = updateIncidentDto;

    if (!mongoose.isValidObjectId(vehicleId)) {
      throw new BadRequestException('Invalid vehicle ID');
    }

    const vehicle = await this.vehicleModel.findById(vehicleId);
    if (!vehicle) {
      throw new NotFoundException('Vehicle not found');
    }

    const updatedIncident = await this.incidentModel.findByIdAndUpdate(
      id,
      updateIncidentDto,
      { new: true, runValidators: true },
    );

    if (!updatedIncident) {
      throw new NotFoundException('Incident not found');
    }

    return updatedIncident;
  }

  async deleteById(id: string): Promise<boolean> {
    if (!mongoose.isValidObjectId(id)) {
      throw new BadRequestException('Invalid incident ID');
    }

    const deletedIncident = await this.incidentModel.findByIdAndDelete(id);
    if (!deletedIncident) {
      throw new NotFoundException('Incident not found');
    }

    return true;
  }
}

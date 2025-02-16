import {
BadRequestException,
Injectable,
NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose'
import { Incident } from '../schemas/incident.schema';
import { User } from '../../auth/schemas/user.schema';
import { CreateIncidentDto, UpdateIncidentDto } from '../dto/incident.dto';

@Injectable()
export class IncidentService {

constructor(
@InjectModel(Incident.name)
private incidentModel:mongoose.Model<Incident>
){}
  async findAll(user: User): Promise<{ message: string; data: Incident[] }> {
    const incidents = await this.incidentModel.find({ userId: user._id }).exec();
    return {
      message: 'Incidents retrieved successfully',
      data: incidents,
    };
  }

  async create(
    user: User, 
    incidentDto: CreateIncidentDto
  ): Promise<{ message: string; data: Incident }> {
    const data = { ...incidentDto, userId: user._id };
    const newIncident = await this.incidentModel.create(data);
    return {
      message: 'Incident created successfully',
      data: newIncident,
    };
  }


  async findById(user: User, id: string): Promise<{ message: string; data: Incident }> {
    if (!mongoose.isValidObjectId(id)) {
      throw new BadRequestException('Invalid incident ID');
    }

    const incident = await this.incidentModel.findOne({ _id: id, userId: user._id }).exec();
    if (!incident) {
      throw new NotFoundException('Incident not found');
    }

    return {
      message: 'Incident retrieved successfully',
      data: incident,
    };
  }

  async updateById(
    user: User, 
    id: string, 
    incidentDto: UpdateIncidentDto
  ): Promise<{ message: string; data: Incident }> {
    if (!mongoose.isValidObjectId(id)) {
      throw new BadRequestException('Invalid incident ID');
    }

    const updatedIncident = await this.incidentModel.findOneAndUpdate(
      { _id: id, userId: user._id },
      incidentDto,
      { new: true, runValidators: true }
    );

    if (!updatedIncident) {
      throw new NotFoundException('Incident not found');
    }

    return {
      message: 'Incident updated successfully',
      data: updatedIncident,
    };
  }


  async deleteById(user: User, id: string): Promise<{ message: string }> {
    if (!mongoose.isValidObjectId(id)) {
      throw new BadRequestException('Invalid incident ID');
    }

    const deletedIncident = await this.incidentModel.findOneAndDelete({ _id: id, userId: user._id });

    if (!deletedIncident) {
      throw new NotFoundException('Incident not found');
    }

    return { message: 'Incident deleted successfully' };
  }

}

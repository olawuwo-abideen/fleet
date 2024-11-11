import {
    BadRequestException,
    Injectable,
    NotFoundException,
  } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose'
import { Incident } from './schemas/incident.schema';
import { User } from '../auth/schemas/user.schema';


@Injectable()
export class IncidentService {

    constructor(
        @InjectModel(Incident.name)
        private incidentModel:mongoose.Model<Incident>
    ){}

    async findAll(): Promise<Incident[]> {
        const incident = await this.incidentModel.find();
        return incident
    }

    async create(incident: Incident, user: User): Promise<Incident> {
        const data = Object.assign(incident, { user: user._id });
    
        const res = await this.incidentModel.create(data);
        return res;
      }
    
      async findById(id: string): Promise<Incident> {
        const isValidId = mongoose.isValidObjectId(id);
    
        if (!isValidId) {
          throw new BadRequestException('Please enter correct id.');
        }
    
        const incident = await this.incidentModel.findById(id);
    
        if (!incident) {
          throw new NotFoundException('Maintenance not found.');
        }
    
        return incident;
      }
    
      async updateById(id: string, incident: Incident): Promise<Incident> {
        return await this.incidentModel.findByIdAndUpdate(id, incident, {
          new: true,
          runValidators: true,
        });
      }

}

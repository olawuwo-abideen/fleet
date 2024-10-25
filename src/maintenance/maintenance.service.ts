import {
    BadRequestException,
    Injectable,
    NotFoundException,
  } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose'
import { Maintenance } from './schemas/maintenance.schema';
import { User } from '../auth/schemas/user.schema';

@Injectable()
export class MaintenanceService {

    constructor(
        @InjectModel(Maintenance.name)
        private maintenanceModel:mongoose.Model<Maintenance>
    ){}

    async findAll(): Promise<Maintenance[]> {
        const maintenance = await this.maintenanceModel.find();
        return maintenance
    }

    async create(maintenance: Maintenance, user: User): Promise<Maintenance> {
        const data = Object.assign(maintenance, { user: user._id });
    
        const res = await this.maintenanceModel.create(data);
        return res;
      }
    
      async findById(id: string): Promise<Maintenance> {
        const isValidId = mongoose.isValidObjectId(id);
    
        if (!isValidId) {
          throw new BadRequestException('Please enter correct id.');
        }
    
        const maintenance = await this.maintenanceModel.findById(id);
    
        if (!maintenance) {
          throw new NotFoundException('Maintenance not found.');
        }
    
        return maintenance;
      }
    
      async updateById(id: string, maintenance: Maintenance): Promise<Maintenance> {
        return await this.maintenanceModel.findByIdAndUpdate(id, maintenance, {
          new: true,
          runValidators: true,
        });
      }
    
      async deleteById(id: string): Promise<{ deleted: boolean }> {
        await this.maintenanceModel.findByIdAndDelete(id);
        return { deleted: true };
      }

}

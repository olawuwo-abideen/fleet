import {
BadRequestException,
Injectable,
NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose'
import { Maintenance } from './schemas/maintenance.schema';
import { User } from '../auth/schemas/user.schema';
import { CreateMaintenanceDto, UpdateMaintenanceDto } from './dto/maintenance.dto';
@Injectable()
export class MaintenanceService {

constructor(
@InjectModel(Maintenance.name)
private maintenanceModel:mongoose.Model<Maintenance>
){}

async findAll(user: User): Promise<Maintenance[]> {
return this.maintenanceModel.find({ userId: user._id });  
}

async create(maintenance: CreateMaintenanceDto, user: User): Promise<Maintenance> {
const data = {
...maintenance,
userId: user._id, 
vehicleId: new mongoose.Types.ObjectId(maintenance.vehicleId),
};
return this.maintenanceModel.create(data);
}

async findById(id: string, user: User): Promise<Maintenance> {
const isValidId = mongoose.isValidObjectId(id);
if (!isValidId) {
throw new BadRequestException('Please enter a correct ID.');
}

const maintenance = await this.maintenanceModel.findOne({ _id: id, userId: user._id });
if (!maintenance) {
throw new NotFoundException('Maintenance not found ');
}

return maintenance;
}


async updateById(id: string, maintenance: Partial<Maintenance>, user: User): Promise<Maintenance> {
const updatedMaintenance = await this.maintenanceModel.findOneAndUpdate(
{ _id: id, userId: user._id },  
maintenance,
{
new: true,
runValidators: true,
},
);

if (!updatedMaintenance) {
throw new NotFoundException('Maintenance not found');
}

return updatedMaintenance;
}

}

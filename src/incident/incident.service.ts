import {
BadRequestException,
Injectable,
NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose'
import { Incident } from './schemas/incident.schema';
import { User } from '../auth/schemas/user.schema';
import { CreateIncidentDto, UpdateIncidentDto } from './dto/incident.dto';

@Injectable()
export class IncidentService {

constructor(
@InjectModel(Incident.name)
private incidentModel:mongoose.Model<Incident>
){}

async findAll(user: User): Promise<Incident[]> {
return this.incidentModel.find({ userId: user._id });  
}


async create(incident: CreateIncidentDto, user: User): Promise<Incident> {
const data = {
...incident,
userId: user._id, 
vehicleId: new mongoose.Types.ObjectId(incident.vehicleId),
driverId: new mongoose.Types.ObjectId(incident.driverId),

};
return this.incidentModel.create(data);
}

async findById(id: string, user: User): Promise<Incident> {
const isValidId = mongoose.isValidObjectId(id);
if (!isValidId) {
throw new BadRequestException('Please enter a correct ID.');
}

const incident = await this.incidentModel.findOne({ _id: id, userId: user._id });
if (!incident) {
throw new NotFoundException('Incident not found ');
}

return incident;
}


async updateById(id: string, trip: Partial<Incident>, user: User): Promise<Incident> {
const updatedIncident = await this.incidentModel.findOneAndUpdate(
{ _id: id, userId: user._id },  
trip,
{
new: true,
runValidators: true,
},
);

if (!updatedIncident) {
throw new NotFoundException('Incident not found');
}

return updatedIncident;
}

}

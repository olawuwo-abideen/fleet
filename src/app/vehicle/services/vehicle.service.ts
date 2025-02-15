import {
BadRequestException,
Injectable,
NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose'
import { Vehicle } from '../schemas/vehicle.schema';
import { User } from '../../auth/schemas/user.schema';
import { uploadImages } from '../../../shared/utils/aws';

@Injectable()
export class VehicleService {
constructor(
@InjectModel(Vehicle.name)
private vehicleModel:mongoose.Model<Vehicle>
){}

async findAll(): Promise<Vehicle[]> {
const vehicles = await this.vehicleModel.find();
return vehicles
}

async create(vehicle: Vehicle, user: User): Promise<Vehicle> {
const data = Object.assign(vehicle, { user: user._id });

const res = await this.vehicleModel.create(data);
return res;
}

async findById(id: string): Promise<Vehicle> {
const isValidId = mongoose.isValidObjectId(id);

if (!isValidId) {
throw new BadRequestException('Please enter correct id.');
}

const vehicle = await this.vehicleModel.findById(id);

if (!vehicle) {
throw new NotFoundException('Vehicle not found.');
}

return vehicle;
}

async updateById(id: string, vehicle: Vehicle): Promise<Vehicle> {
return await this.vehicleModel.findByIdAndUpdate(id, vehicle, {
new: true,
runValidators: true,
});
}

async deleteById(id: string): Promise<{ deleted: boolean }> {
await this.vehicleModel.findByIdAndDelete(id);
return { deleted: true };
}

async uploadImages(id: string, files: Array<Express.Multer.File>) {
const vehicle = await this.vehicleModel.findById(id);

if (!vehicle) {
throw new NotFoundException('Vehicle not found.');
}

const images = await uploadImages(files);

vehicle.images = images as object[];

await vehicle.save();

return vehicle;
}
}

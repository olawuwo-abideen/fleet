import {
BadRequestException,
Injectable,
NotFoundException,
UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from '../../../shared/schemas/user.schema';
import { Types } from 'mongoose';
import { Role } from '../../auth/enums/role.enum';
import { Vehicle } from '../../../shared/schemas/vehicle.schema';
import { uploadImages } from '../../../shared/utils/aws';
import { CreateVehicleDto, UpdateVehicleDto } from '../dto/vehicle.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Admin } from '../../../shared/schemas/admin.schema';
import { AdminLoginDto } from '../dto/admin.dto';
import { FilterQuery } from 'mongoose';
import { Trip } from '../../../shared/schemas/trip.schema';
import { Fuel } from '../../../shared/schemas/fuel.schema';
import { Maintenance } from '../../../shared/schemas/maintenance.schema';

@Injectable()
export class AdminService {
constructor(
private readonly jwtService: JwtService,
private readonly configService: ConfigService,
@InjectModel(User.name) private userModel: mongoose.Model<User>,
@InjectModel(Vehicle.name) private vehicleModel: mongoose.Model<Vehicle>,
@InjectModel(Trip.name) private tripModel: mongoose.Model<Trip>,
@InjectModel(Fuel.name) private fuelModel: mongoose.Model<Fuel>,
@InjectModel(Maintenance.name) private maintenanceModel: mongoose.Model<Maintenance>,
@InjectModel(Admin.name) private adminModel: mongoose.Model<Admin>,
) {}

async onModuleInit() {
const email = this.configService.get<string>('ADMIN_EMAIL');
const password = this.configService.get<string>('ADMIN_PASSWORD');

if (!email || !password) {
throw new Error('Email or password is incorrect');
}

const exists = await this.adminModel.exists({ email });
if (!exists) {
const hashedPassword = await bcrypt.hash(password, 10);
await this.adminModel.create({ email, password: hashedPassword });
}
}

public async findOne(where: FilterQuery<Admin>): Promise<Admin | null> {
return this.adminModel.findOne(where);
}

public async login({ email, password }: AdminLoginDto) {
const admin = await this.adminModel.findOne({ email }).select('+password');
if (!admin || !admin.password || !(await bcrypt.compare(password, admin.password))) {
throw new UnauthorizedException('Email or password is incorrect');
}

const token = this.jwtService.sign({ id: admin._id },
{ secret: this.configService.get('JWT_ADMIN_SECRET') },
);
return { token };
}

async getUsers(): Promise<User[]> {
return this.userModel.find({ role: Role.Driver });
}

async getUser(id: string): Promise<User> {
if (!mongoose.isValidObjectId(id)) throw new BadRequestException('Invalid ID');
const user = await this.userModel.findById(id);
if (!user) throw new NotFoundException('User not found');
return user;
}

async deleteUser(id: string): Promise<boolean> {
if (!Types.ObjectId.isValid(id)) throw new BadRequestException('Invalid user ID format');
const deletedUser = await this.userModel.findByIdAndDelete(id);
if (!deletedUser) throw new NotFoundException('User not found');
return true;
}

async createVehicle(vehicle: CreateVehicleDto): Promise<Vehicle> {
return this.vehicleModel.create(vehicle);
}

async updateVehicle(id: string, vehicle: UpdateVehicleDto): Promise<Vehicle> {
return this.vehicleModel.findByIdAndUpdate(id, vehicle, { new: true, runValidators: true });
}

async deleteVehicle(id: string): Promise<boolean> {
await this.vehicleModel.findByIdAndDelete(id);
return true;
}

async uploadImages(
  id: string,
  files: Express.Multer.File[],
): Promise<Vehicle> {
  const vehicle = await this.vehicleModel.findById(id);
  if (!vehicle) throw new NotFoundException('Vehicle not found');

  vehicle.images = await uploadImages(files); 
  await vehicle.save();

  return vehicle;
}


async getVehicleStats() {
const totalVehicles = await this.vehicleModel.countDocuments();
const activeVehicles = await this.vehicleModel.countDocuments({ isAvailable: true });
const fuelStats = await this.fuelModel.aggregate([
{ $group: { _id: '$vehicleId', totalLitres: { $sum: '$litres' }, totalCost: { $sum: '$cost' } } },
]);
return { totalVehicles, activeVehicles, fuelStats };
}

async getTripAnalytics() {
const totalTrips = await this.tripModel.countDocuments();
const completed = await this.tripModel.countDocuments({ status: 'completed' });
const completionRate = totalTrips ? (completed / totalTrips) * 100 : 0;
const avgDurationResult = await this.tripModel.aggregate([
{ $match: { status: 'completed', startTime: { $exists: true }, endTime: { $exists: true } } },
{ $project: { duration: { $divide: [{ $subtract: ['$endTime', '$startTime'] }, 3600000] } } },
{ $group: { _id: null, avgDuration: { $avg: '$duration' } } },
]);
return { totalTrips, completed, completionRate, avgDuration: avgDurationResult[0]?.avgDuration || 0 };
}

async getMaintenanceAnalytics() {
const total = await this.maintenanceModel.countDocuments();
const frequency = await this.maintenanceModel.aggregate([
{ $group: { _id: '$vehicleId', count: { $sum: 1 } } },
]);
const downtime = await this.maintenanceModel.aggregate([
{ $group: { _id: '$vehicleId', totalCost: { $sum: '$cost' } } },
]);
return { total, frequency, downtime };
}

async countAllStaffs(): Promise<number> {
return this.userModel.countDocuments();
}

async getStaffAccountStatus(id: string): Promise<boolean> {
if (!mongoose.isValidObjectId(id)) throw new NotFoundException('Invalid user ID');
const user = await this.userModel.findById(id);
if (!user) throw new NotFoundException(`User with ID ${id} not found`);
return user.accountActivation;
}

async activateStaffAccount(id: string): Promise<boolean> {
if (!mongoose.isValidObjectId(id)) throw new BadRequestException('Invalid user ID');
const user = await this.userModel.findById(id);
if (!user) throw new NotFoundException(`User with ID ${id} not found`);
if (!user.accountActivation) {
user.accountActivation = true;
await user.save();
}
return true;
}

async getCostAnalytics(vehicleId: string) {
if (!mongoose.isValidObjectId(vehicleId)) throw new BadRequestException('Invalid vehicle ID');
const exists = await this.vehicleModel.exists({ _id: vehicleId });
if (!exists) throw new NotFoundException('Vehicle not found');

const vehicleObjectId = new mongoose.Types.ObjectId(vehicleId);
const fuelCosts = await this.fuelModel.aggregate([
{ $match: { vehicleId: vehicleObjectId } },
{ $group: { _id: '$vehicleId', totalFuelCost: { $sum: '$cost' } } },
]);

const maintenanceCosts = await this.maintenanceModel.aggregate([
{ $match: { vehicleId: vehicleObjectId } },
{ $group: { _id: '$vehicleId', totalMaintenanceCost: { $sum: '$cost' } } },
]);

return {
vehicleId,
fuelCost: fuelCosts[0]?.totalFuelCost || 0,
maintenanceCost: maintenanceCosts[0]?.totalMaintenanceCost || 0,
};
}
}

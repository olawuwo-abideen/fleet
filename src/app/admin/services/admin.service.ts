import {
BadRequestException,
Injectable,
NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from '../../auth/schemas/user.schema';
import { Types } from 'mongoose';
import { Role } from '../../auth/enums/role.enum';


@Injectable()
export class AdminService {
constructor(
@InjectModel(User.name)
private userModel:mongoose.Model<User>,
){}

async getAllDrivers(): Promise<{ message: string; drivers: User[] }> {
const drivers = await this.userModel.find({ role: Role.Driver });
return {
message: "Data retrieved successfully",
drivers,
};
}
async findById(id: string): Promise<{ message: string; user: User }> {
const isValidId = mongoose.isValidObjectId(id);

if (!isValidId) {
throw new BadRequestException('Please enter a valid ID.');
}

const user = await this.userModel.findById(id);

if (!user) {
throw new NotFoundException('User not found.');
}

return {
message: "User data retrieved successfully",
user,
};
}

async deleteById(id: string): Promise<{ message: string }> {
if (!Types.ObjectId.isValid(id)) {
throw new BadRequestException('Invalid user ID format.');
}

const deletedUser = await this.userModel.findByIdAndDelete(id);

if (!deletedUser) {
throw new NotFoundException('User not found.');
}

return { message: 'User deleted successfully' };
}

}

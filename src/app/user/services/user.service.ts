import {
BadRequestException,
Injectable,
NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../../../shared/schemas/user.schema';
import { ChangePasswordDto } from '../dto/change-password.dto';
import * as bcrypt from 'bcryptjs';
import { UpdateUserDto } from '../dto/update-user.dto';
import { Model } from 'mongoose';
import { FilterQuery } from 'mongoose';

@Injectable()
export class UserService {
constructor(
@InjectModel(User.name)
private readonly userModel: Model<User>,
) {}

async findOne(filter: FilterQuery<User>): Promise<User | null> {
return this.userModel.findOne(filter).exec();
}

async profile(user: User): Promise<Record<string, any>> {
return user.toObject();
}

async updateProfile(data: UpdateUserDto, user: User): Promise<User> {
const updatedUser = await this.userModel.findByIdAndUpdate(
user._id,
{ $set: data },
{ new: true, runValidators: true },
);

if (!updatedUser) {
throw new NotFoundException('User not found');
}

return updatedUser;
}

async changePassword(user: User, data: ChangePasswordDto): Promise<void> {
const existingUser = await this.userModel.findById(user._id).select('+password');
if (!existingUser) {
throw new NotFoundException('User not found.');
}

const passwordMatch = await bcrypt.compare(data.currentPassword, existingUser.password);
if (!passwordMatch) {
throw new BadRequestException('Incorrect current password.');
}

existingUser.password = await bcrypt.hash(data.password, 10);
await existingUser.save();
}
}

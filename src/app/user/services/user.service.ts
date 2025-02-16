import {
BadRequestException,
Injectable,
NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from '../../auth/schemas/user.schema';
import { ChangePasswordDto } from '../dto/change-password.dto';
import * as bcrypt from 'bcryptjs';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UserService {
constructor(
@InjectModel(User.name)
private userModel:mongoose.Model<User>,

){}

async profile(user: User) {
    return { message: "User profile retrieved successfully", data: user.toObject() };
  }
  
  


async updateProfile(
    data: UpdateUserDto,
    user: User,
    ): Promise<{ message: string; user: User }> {
    const updatedUser = await this.userModel.findByIdAndUpdate(
    user._id,
    { $set: data },
    { new: true, runValidators: true },
    );
    return {
    message: 'Profile updated successfully',
    user: updatedUser,
    };
    }
   


async changePassword(user: User, data: ChangePasswordDto): Promise<{ message: string }> {
    // Fetch user from the database
    const existingUser = await this.userModel.findById(user._id);
    if (!existingUser) {
      throw new NotFoundException('User not found.');
    }

    // Validate current password
    const passwordMatch = await bcrypt.compare(data.currentPassword, existingUser.password);
    if (!passwordMatch) {
      throw new BadRequestException('Incorrect current password.');
    }

    // Hash and update the new password
    const newPassword = await bcrypt.hash(data.password, 10);
    existingUser.password = newPassword;
    await existingUser.save();

    return { message: 'User password updated successfully' };
  }
}

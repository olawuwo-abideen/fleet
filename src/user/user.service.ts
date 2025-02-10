  import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  } from '@nestjs/common';
  import { InjectModel } from '@nestjs/mongoose';
  import * as mongoose from 'mongoose';
  import { User } from '../auth/schemas/user.schema';
  import { uploadImages } from 'src/vehicle/utils/aws';
  import { Types } from 'mongoose';

  @Injectable()
  export class UserService {
  constructor(
  @InjectModel(User.name)
  private userModel:mongoose.Model<User>,
  ){}

  async findAll(): Promise<User[]> {
  const users = await this.userModel.find();
  return users;
  }

  async findById(id: string): Promise<User> {
  const isValidId = mongoose.isValidObjectId(id);

  if (!isValidId) {
  throw new BadRequestException('Please enter correct id.');
  }

  const user = await this.userModel.findById(id);

  if (!user) {
  throw new NotFoundException('User not found.');
  }

  return user;
  }

  async updateById(id: string, user: Partial<User>): Promise<User> {
  if (!Types.ObjectId.isValid(id)) {
  throw new BadRequestException('Invalid user ID format.');
  }

  try {
  const updatedUser = await this.userModel.findByIdAndUpdate(id, user, {
  new: true,
  runValidators: true,
  });

  if (!updatedUser) {
  throw new NotFoundException('User not found.');
  }

  return updatedUser;
  } catch (error) {
  throw new NotFoundException(`Failed to update user: ${error.message}`);
  }
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

  async uploadImages(id: string, files: Array<Express.Multer.File>) {
  const user = await this.userModel.findById(id);

  if (!user) {
  throw new NotFoundException('User not found.');
  }

  const images = await uploadImages(files);

  user.images = images as object[];

  await user.save();

  return user;
  }


  }

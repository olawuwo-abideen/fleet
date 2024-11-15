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
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';


@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel:mongoose.Model<User>,
    @Inject(CACHE_MANAGER) private cacheService: Cache
){}

//   async findAll(): Promise<User[]> {
//     const users = await this.userModel.find();
//     return users
// }
async checkCacheValue(key: string): Promise<any> {
  return this.cacheService.get(key); 
}
async findAll(): Promise<User[]> {
  const cacheKey = 'all-users'; 

  const cachedUsers = await this.checkCacheValue(cacheKey);

  if (cachedUsers) {
    console.log('Returning users from cache');
    return cachedUsers;
  }
  const users = await this.userModel.find();
  await this.cacheService.set(cacheKey, users);

  console.log('Returning users from database and caching');
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
    return await this.userModel.findByIdAndUpdate(id, user, {
      new: true,
      runValidators: true,
    });
  }

  async deleteById(id: string): Promise<{ deleted: boolean }> {
    await this.userModel.findByIdAndDelete(id);
    return { deleted: true };
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

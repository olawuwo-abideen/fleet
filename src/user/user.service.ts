import { Injectable, 
  NotFoundException, 
  UnauthorizedException } from '@nestjs/common';
import { User } from '../auth/schemas/user.schema';


@Injectable()
export class UserService {
  findOne // }
    (arg0: { email: string; }): import("../auth/schemas/user.schema").User | PromiseLike<import("../auth/schemas/user.schema").User> {
      throw new Error('Method not implemented.');
  }

  // constructor(
  //   @InjectRepository(User) private readonly userRepository: Repository<User>,
  //   @InjectRepository(Subscription)
  //   private readonly subscriptionRepository: Repository<Subscription>,
  //   private readonly cloudinaryService: CloudinaryService,
  // ) {}


  // public async findOne(where: FindOptionsWhere<User>): Promise<User | null> {
  //   return await this.userRepository.findOne({ where });
  // }

  // // create verification code
  // public async create(data: DeepPartial<User>): Promise<User> {
  //   const user: User = await this.userRepository.create(data);
  //   return await this.userRepository.save(user);
  // }

  // // update verification code
  // public async update(
  //   where: FindOptionsWhere<User>,
  //   data: QueryDeepPartialEntity<User>,
  // ): Promise<UpdateResult> {
  //   return await this.userRepository.update(where, data);
  // }

  // public async exists(where: FindOptionsWhere<User>): Promise<boolean> {
  //   const user: boolean = await this.userRepository.existsBy(where);

  //   return user;
  // }

  // public async profile(user: User) {
  //   let expired: boolean = false;

  //   if (user.role == UserRole.SELLER) {
  //     const subscription = await this.subscriptionRepository.findOne({
  //       where: {
  //         userId: user.id,
  //         status: SubscriptionStatusEnum.ACTIVE,
  //       },
  //     });

  //     if (!subscription || (subscription && subscription.isExpired)) {
  //       expired = true;
  //     }
  //   }

  //   return {
  //     ...user,
  //     subscription: {
  //       expired,
  //     },
  //   };
  // }

  // public async changePassword(
  //   data: ChangePasswordDto,
  //   user: User,
  // ): Promise<null> {
  //   // Verify if user current password match
  //   if (!(await argon2.verify(user.password, data.currentPassword))) {
  //     throw new BadRequestException(
  //       'The password you entered does not match your current password.',
  //     );
  //   }

  //   // hash new password
  //   const newPassword = await argon2.hash(data.password);

  //   // update user password
  //   await this.update(
  //     { id: user.id },
  //     {
  //       password: newPassword,
  //     },
  //   );

  //   return null;
  // }

  // public async updateProfile(
  //   data: UpdateProfileDto,
  //   image: Express.Multer.File,
  //   user: User,
  // ): Promise<User> {
  //   // Prepare data to update
  //   const isRegistered = data.isRegistered == 'yes' ? true : false;

  //   const dataToUpdate: Partial<User> = {
  //     firstname: data.firstname,
  //     lastname: data.lastname,
  //     businessName: data.businessName,
  //     isRegistered,
  //     rcNumber: data.rcNumber && isRegistered ? data.rcNumber : null,
  //   };

  //   // Upload profile image to Cloudinary
  //   if (image) {
  //     const uploadProfileImage = await this.cloudinaryService.uploadFile(image);
  //     // update update data
  //     dataToUpdate['image'] = uploadProfileImage.secure_url;
  //   }

  //   Object.assign(user, dataToUpdate);

  //   // Update user record in the database
  //   await this.userRepository.save(user);

  //   return user;
  // }


    // async changePassword(userId, oldPassword: string, newPassword: string) {
    //     //Find the user
    //     const user = await this.userModel.findById(userId);
    //     if (!user) {
    //       throw new NotFoundException('User not found...');
    //     }
    
    //     //Compare the old password with the password in DB
    //     const passwordMatch = await bcrypt.compare(oldPassword, user.password);
    //     if (!passwordMatch) {
    //       throw new UnauthorizedException('Wrong credentials');
    //     }
    
    //     //Change user's password
    //     const newHashedPassword = await bcrypt.hash(newPassword, 10);
    //     user.password = newHashedPassword;
    //     await user.save();
    //   }
}

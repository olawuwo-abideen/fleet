import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { EmailService } from 'src/email/email.service';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { nanoid } from 'nanoid';
import { ResetToken } from './schemas/reset-token.schema';
import { ChangePasswordDto } from './dto/change-password.dto'; 

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private emailService: EmailService,
    // private readonly configService: ConfigService,
    // private readonly userService: UserService, 
    @InjectModel(User.name) private UserModel: Model<User>,
    @InjectModel(ResetToken.name) private ResetTokenModel: Model<ResetToken>,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<{ token: string; user: any }> {
    const { firstName, lastName, email, password, role, phoneNumber } = signUpDto;
  
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
  
    try {
      // Create the user in the database
      const user = await this.UserModel.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        role,
        phoneNumber,
      });
  
      // Generate a JWT token
      const token = this.jwtService.sign({ id: user._id });
  
      // Return the token and user data (excluding sensitive information)
      return { 
        token,
        user: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role,
          phoneNumber: user.phoneNumber,
        }
      };
    } catch (error) {
      if (error?.code === 11000) {
        throw new ConflictException('Duplicate Email Entered');
      }
      throw error; // Propagate other errors
    }
  }

  async login(loginDto: LoginDto): Promise<{ token: string; user: any }> {
    const { email, password } = loginDto;
  
    // Find the user by email
    const user = await this.UserModel.findOne({ email });
  
    if (!user) {
      throw new BadRequestException('Invalid email or password');
    }
  
    // Compare the provided password with the stored hashed password
    const isPasswordMatched = await bcrypt.compare(password, user.password);
  
    if (!isPasswordMatched) {
      throw new BadRequestException('Invalid email or password');
    }
  
    // Generate a JWT token
    const token = this.jwtService.sign({ id: user._id });
  
    // Return the token and user data (excluding sensitive information)
    return {
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        phoneNumber: user.phoneNumber,
      },
    };
  }

  async forgotPassword(email: string) {
    //Check that user exists
    const user = await this.UserModel.findOne({ email });

    if (user) {
      //If user exists, generate password reset link
      const expiryDate = new Date();
      expiryDate.setHours(expiryDate.getHours() + 1);

      const resetToken = nanoid(64);
      await this.ResetTokenModel.create({
        token: resetToken,
        userId: user._id,
        expiryDate,
      });
      //Send the link to the user by email
      this.emailService.sendPasswordResetEmail(email, resetToken);
    }

    return { message: 'If this user exists, they will receive an email' };
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    //Find a valid reset token document
    const token = await this.ResetTokenModel.findOneAndDelete({
      token: resetPasswordDto.resetToken,
      expiryDate: { $gte: new Date() },
    });

    if (!token) {
      throw new UnauthorizedException('Invalid link');
    }

    //Change user password (MAKE SURE TO HASH!!)
    const user = await this.UserModel.findById(token.userId);
    if (!user) {
      throw new InternalServerErrorException();
    }

    user.password = await bcrypt.hash(resetPasswordDto.password, 10);
    await user.save();
  }

  async changePassword(userId, data: ChangePasswordDto) {
    const user = await this.UserModel.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found...');
    }

    //Compare the old password with the password in DB
    const passwordMatch = await bcrypt.compare(user.password, data.currentPassword);
    if (!passwordMatch) {
      throw new BadRequestException('The password you entered does not match your current password.');
    }

    //Change user's password
    const newPassword = await bcrypt.hash(data.password, 10);
    user.password = newPassword;
    await user.save();
  }
}

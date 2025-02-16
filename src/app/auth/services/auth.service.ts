import {
BadRequestException,
ConflictException,
HttpStatus,
Injectable,
InternalServerErrorException,
UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../schemas/user.schema';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from '../dto/signup.dto';
import { LoginDto } from '../dto/login.dto';
import { EmailService } from '../../../shared/email/email.service'
import { ResetPasswordDto } from '../dto/reset-password.dto';
import { nanoid } from 'nanoid';
import { ResetToken } from '../schemas/reset-token.schema';
import { ConfigService } from '@nestjs/config';
import {  Response } from 'express';

@Injectable()
export class AuthService {
logger: any;
constructor(
private jwtService: JwtService,
private emailService: EmailService,
private readonly configService: ConfigService,
@InjectModel(User.name) private userModel: Model<User>,
@InjectModel(ResetToken.name) private ResetTokenModel: Model<ResetToken>,
) {}


async signUp(signUpDto: SignUpDto): Promise<{ message: string; token: string; user: any }> {
  const { firstName, lastName, email, password, role, phoneNumber } = signUpDto;

  const existingUser = await this.userModel.findOne({
    $or: [{ email }, { phoneNumber }],
  });

  if (existingUser) {
    if (existingUser.email === email) {
      throw new ConflictException('Email is already registered. Please log in.');
    }
    if (existingUser.phoneNumber === phoneNumber) {
      throw new ConflictException('Phone number is already registered.');
    }
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await this.userModel.create({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    role,
    phoneNumber,
  });

  const token = this.jwtService.sign({ id: user._id });

  return {
    message: "User signed up successfully",
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


async login(loginDto: LoginDto): Promise<{ message: string; token: string; user: any }> {
  const { email, password } = loginDto;

  if (!email || !password) {
    throw new BadRequestException('Email and password are required');
  }


  const user = await this.userModel.findOne({ email }).select('+password');

  if (!user) {
    throw new BadRequestException('Invalid email or password');
  }

  const isPasswordMatched = await bcrypt.compare(password, user.password);
  

  if (!isPasswordMatched) {
    throw new BadRequestException('Invalid email or password');
  }
  const token = this.jwtService.sign({ id: user._id });

  return {
    message: "User logged in successfully",
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

const user = await this.userModel.findOne({ email });

if (user) {

const expiryDate = new Date();
expiryDate.setHours(expiryDate.getHours() + 1);

const resetToken = nanoid(64);
await this.ResetTokenModel.create({
token: resetToken,
userId: user._id,
expiryDate,
});

this.emailService.sendPasswordResetEmail(email, resetToken);
}

return { message: 'If this user exists, they will receive an email' };
}

async resetPassword(resetPasswordDto: ResetPasswordDto) {

const token = await this.ResetTokenModel.findOneAndDelete({
token: resetPasswordDto.resetToken,
expiryDate: { $gte: new Date() },
});

if (!token) {
throw new UnauthorizedException('Invalid link');
}


const user = await this.userModel.findById(token.userId);
if (!user) {
throw new InternalServerErrorException();
}

user.password = await bcrypt.hash(resetPasswordDto.password, 10);
await user.save();
}



async logout(user: Partial<User>, res: Response) {
  if (!user || !user.id) {
    throw new UnauthorizedException('User identification is missing');
  }

  try {
    res.clearCookie('jwt');
    this.logger.log(`User with ID ${user.id} has logged out successfully.`);
    return res.status(HttpStatus.OK).json({ message: 'Sign-out successful' });
  } catch (error) {
    this.logger.error('An error occurred during sign-out.', error);
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      message: 'An error occurred during sign-out. Please try again later.',
    });
  }
}

  }



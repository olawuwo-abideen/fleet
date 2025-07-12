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
import { User } from '../../../shared/schemas/user.schema';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from '../dto/signup.dto';
import { LoginDto } from '../dto/login.dto';
import { EmailService } from '../../../shared/email/email.service'
import { ResetPasswordDto } from '../dto/reset-password.dto';
import { nanoid } from 'nanoid';
import { ResetToken } from '../../../shared/schemas/reset-token.schema';
import { ConfigService } from '@nestjs/config';
import {  Response } from 'express';
@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly emailService: EmailService,
    private readonly configService: ConfigService,
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(ResetToken.name) private readonly resetTokenModel: Model<ResetToken>,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<{ token: string; user: Partial<User> }> {
    const { firstName, lastName, email, password, role, phoneNumber } = signUpDto;

    const existingUser = await this.userModel.findOne({
      $or: [{ email }, { phoneNumber }],
    });

    if (existingUser?.email === email) {
      throw new ConflictException('Email is already registered. Please log in.');
    }

    if (existingUser?.phoneNumber === phoneNumber) {
      throw new ConflictException('Phone number is already registered.');
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

  async login(loginDto: LoginDto): Promise<{ token: string; user: Partial<User> }> {
    const { email, password } = loginDto;

    if (!email || !password) {
      throw new BadRequestException('Email and password are required');
    }

    const user = await this.userModel.findOne({ email }).select('+password');

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new BadRequestException('Invalid email or password');
    }

    const token = this.jwtService.sign({ id: user._id });

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

  async forgotPassword(email: string): Promise<void> {
    const user = await this.userModel.findOne({ email });

    if (user) {
      const expiryDate = new Date();
      expiryDate.setHours(expiryDate.getHours() + 1);

      const resetToken = nanoid(64);

      await this.resetTokenModel.create({
        token: resetToken,
        userId: user._id,
        expiryDate,
      });

      this.emailService.sendPasswordResetEmail(email, resetToken);
    }
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto): Promise<void> {
    const token = await this.resetTokenModel.findOneAndDelete({
      token: resetPasswordDto.resetToken,
      expiryDate: { $gte: new Date() },
    });

    if (!token) {
      throw new UnauthorizedException('Invalid or expired reset token');
    }

    const user = await this.userModel.findById(token.userId);
    if (!user) {
      throw new InternalServerErrorException('User not found');
    }

    user.password = await bcrypt.hash(resetPasswordDto.password, 10);
    await user.save();
  }

  async logout(user: Partial<User>, res: Response): Promise<void> {
    if (!user?.id) {
      throw new UnauthorizedException('User identification is missing');
    }

    try {
      res.clearCookie('jwt');
      res.status(HttpStatus.OK).json({ message: 'Sign-out successful' });
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'An error occurred during sign-out. Please try again later.',
      });
    }
  }
}

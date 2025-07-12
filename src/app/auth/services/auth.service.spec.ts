import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../services/auth.service'; 
import { getModelToken } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { EmailService } from '../../../shared/email/email.service';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcryptjs';
import { User } from '../../../shared/schemas/user.schema';
import { ResetToken } from '../../../shared/schemas/reset-token.schema';
import { ConflictException, BadRequestException, UnauthorizedException, InternalServerErrorException } from '@nestjs/common';
import {Role} from '../enums/role.enum'

const mockUserModel = {
  findOne: jest.fn(),
  create: jest.fn(),
  findById: jest.fn(),
};

const mockResetTokenModel = {
  create: jest.fn(),
  findOneAndDelete: jest.fn(),
};

const mockJwtService = {
  sign: jest.fn(),
};

const mockEmailService = {
  sendPasswordResetEmail: jest.fn(),
};

const mockConfigService = {};

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: JwtService, useValue: mockJwtService },
        { provide: EmailService, useValue: mockEmailService },
        { provide: ConfigService, useValue: mockConfigService },
        { provide: getModelToken(User.name), useValue: mockUserModel },
        { provide: getModelToken(ResetToken.name), useValue: mockResetTokenModel },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jest.clearAllMocks();
  });

  describe('signUp', () => {
    it('should create and return a user', async () => {
      mockUserModel.findOne.mockResolvedValue(null);
      mockUserModel.create.mockResolvedValue({
        _id: 'user123',
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'jane@example.com',
        role: 'driver',
        phoneNumber: '+1234567890',
      });
      mockJwtService.sign.mockReturnValue('token123');

      const result = await service.signUp({
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'jane@example.com',
        password: 'Password123!',
        confirmPassword: 'Password123!',
        role: Role.Driver,
        phoneNumber: '+1234567890',
      });

      expect(result.token).toBe('token123');
      expect(result.user.email).toBe('jane@example.com');
    });

    it('should throw if email already exists', async () => {
      mockUserModel.findOne.mockResolvedValue({ email: 'jane@example.com' });
      await expect(
        service.signUp({
          firstName: 'Jane',
          lastName: 'Doe',
          email: 'jane@example.com',
          password: 'Password123!',
          confirmPassword: 'Password123!',
          role: Role.Driver,
          phoneNumber: '+1234567890',
        }),
      ).rejects.toThrow(ConflictException);
    });
  });

  describe('login', () => {
    it('should log in successfully', async () => {
      const passwordHash = await bcrypt.hash('Password123!', 10);
      mockUserModel.findOne.mockReturnValue({
        select: jest.fn().mockResolvedValue({
          _id: 'user123',
          firstName: 'Jane',
          lastName: 'Doe',
          email: 'jane@example.com',
          password: passwordHash,
          role: 'driver',
          phoneNumber: '+1234567890',
        }),
      });
      mockJwtService.sign.mockReturnValue('token456');

      const result = await service.login({
        email: 'jane@example.com',
        password: 'Password123!',
      });

      expect(result.token).toBe('token456');
    });

    it('should throw if email is missing', async () => {
      await expect(service.login({ email: '', password: 'Password123!' })).rejects.toThrow(BadRequestException);
    });

    it('should throw if credentials are invalid', async () => {
      mockUserModel.findOne.mockReturnValue({ select: jest.fn().mockResolvedValue(null) });
      await expect(service.login({ email: 'wrong@example.com', password: 'wrong' })).rejects.toThrow(BadRequestException);
    });
  });

  describe('forgotPassword', () => {
    it('should send email if user exists', async () => {
      mockUserModel.findOne.mockResolvedValue({ _id: 'user123' });
      mockResetTokenModel.create.mockResolvedValue({});

      const result = await service.forgotPassword('jane@example.com');

      expect(mockEmailService.sendPasswordResetEmail).toHaveBeenCalled();
      expect(result.message).toBe('If this user exists, they will receive an email');
    });
  });

  describe('resetPassword', () => {
    it('should reset password successfully', async () => {
      const user = { save: jest.fn() };
      mockResetTokenModel.findOneAndDelete.mockResolvedValue({ userId: 'user123' });
      mockUserModel.findById.mockResolvedValue(user);

      await expect(
        service.resetPassword({
          resetToken: 'token',
          password: 'Password123!',
          confirmPassword: 'Password123!',
        }),
      ).resolves.toBeUndefined();
    });

    it('should throw if token is invalid', async () => {
      mockResetTokenModel.findOneAndDelete.mockResolvedValue(null);
      await expect(
        service.resetPassword({
          resetToken: 'invalid',
          password: 'Password123!',
          confirmPassword: 'Password123!',
        }),
      ).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('logout', () => {
    it('should logout the user', async () => {
      const res = {
        clearCookie: jest.fn(),
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      service.logger = { log: jest.fn(), error: jest.fn() };

      const result = await service.logout({ id: 'user123' }, res as any);
      expect(res.clearCookie).toHaveBeenCalledWith('jwt');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Sign-out successful' });
    });

    it('should throw if user is missing', async () => {
      await expect(service.logout({}, {} as any)).rejects.toThrow(UnauthorizedException);
    });
  });
});

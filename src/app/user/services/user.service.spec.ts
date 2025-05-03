import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getModelToken } from '@nestjs/mongoose';
import { User } from '../../auth/schemas/user.schema';
import { ChangePasswordDto } from '../dto/change-password.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import * as bcrypt from 'bcryptjs';
import { BadRequestException, NotFoundException } from '@nestjs/common';

// Mock bcrypt
jest.mock('bcryptjs', () => ({
  compare: jest.fn(),
  hash: jest.fn(),
}));

describe('UserService', () => {
  let service: UserService;
  let userModel: any;

  const mockUser = {
    _id: 'user-id',
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'jane@example.com',
    password: 'hashedPassword',
    phoneNumber: '+234555555555',
    address: '123 Street, City',
    role: 'user',
    images: [],
    resetToken: '',
    toObject: jest.fn().mockReturnValue({
      _id: 'user-id',
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'jane@example.com',
    }),
    save: jest.fn(),
  };

  const mockUserModel = {
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getModelToken(User.name),
          useValue: mockUserModel,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userModel = module.get(getModelToken(User.name));

    // Clear mocks before each test
    jest.clearAllMocks();
  });

  describe('profile', () => {
    it('should return user profile', async () => {
      const result = await service.profile(mockUser as unknown as User);
      expect(result).toEqual({
        message: 'User profile retrieved successfully',
        data: mockUser.toObject(),
      });
    });
  });

  describe('updateProfile', () => {
    it('should update and return updated user', async () => {
      const updateDto: UpdateUserDto = {
        firstName: 'Updated',
        lastName: 'User',
        phoneNumber: '+234000000000',
        address: 'New Address',
        images: 'image.png',
      };

      const updatedUser = {
        ...mockUser,
        ...updateDto,
      };

      userModel.findByIdAndUpdate.mockResolvedValue(updatedUser);

      const result = await service.updateProfile(
        updateDto,
        mockUser as unknown as User,
      );

      expect(userModel.findByIdAndUpdate).toHaveBeenCalledWith(
        mockUser._id,
        { $set: updateDto },
        { new: true, runValidators: true },
      );
      expect(result).toEqual({
        message: 'Profile updated successfully',
        user: updatedUser,
      });
    });
  });

  describe('changePassword', () => {
    const changePasswordDto: ChangePasswordDto = {
      currentPassword: 'oldPassword',
      password: 'NewPassword123!',
      confirmPassword: 'NewPassword123!',
    };

    it('should throw NotFoundException if user is not found', async () => {
      userModel.findById.mockResolvedValue(null);

      await expect(
        service.changePassword(mockUser as unknown as User, changePasswordDto),
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw BadRequestException if current password is incorrect', async () => {
      userModel.findById.mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(
        service.changePassword(mockUser as unknown as User, changePasswordDto),
      ).rejects.toThrow(BadRequestException);
    });

    it('should update password successfully', async () => {
      userModel.findById.mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      (bcrypt.hash as jest.Mock).mockResolvedValue('newHashedPassword');

      const result = await service.changePassword(
        mockUser as unknown as User,
        changePasswordDto,
      );

      expect(bcrypt.compare).toHaveBeenCalledWith(
        changePasswordDto.currentPassword,
        mockUser.password,
      );
      expect(bcrypt.hash).toHaveBeenCalledWith(changePasswordDto.password, 10);
      expect(mockUser.password).toBe('newHashedPassword');
      expect(mockUser.save).toHaveBeenCalled();
      expect(result).toEqual({
        message: 'User password updated successfully',
      });
    });
  });
});

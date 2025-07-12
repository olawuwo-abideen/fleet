import { Test, TestingModule } from '@nestjs/testing';
import { AdminService } from './admin.service';
import { getModelToken } from '@nestjs/mongoose';
import { User } from '../../../shared/schemas/user.schema';
import { Role } from '../../auth/enums/role.enum';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import * as mongoose from 'mongoose';

describe('AdminService', () => {
  let service: AdminService;
  let userModel: any;

  const mockDriver = {
    _id: new mongoose.Types.ObjectId(),
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    password: 'hashedpassword',
    phoneNumber: '1234567890',
    role: Role.Driver,
    images: [],
    resetToken: '',
  };

  const userArray = [mockDriver];

  beforeEach(async () => {
    const mockUserModel = {
      find: jest.fn().mockResolvedValue(userArray),
      findById: jest.fn().mockImplementation((id) =>
        id === mockDriver._id.toString() ? Promise.resolve(mockDriver) : Promise.resolve(null)
      ),
      findByIdAndDelete: jest.fn().mockImplementation((id) =>
        id === mockDriver._id.toString() ? Promise.resolve(mockDriver) : Promise.resolve(null)
      ),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AdminService,
        {
          provide: getModelToken(User.name),
          useValue: mockUserModel,
        },
      ],
    }).compile();

    service = module.get<AdminService>(AdminService);
    userModel = module.get(getModelToken(User.name));
  });

  describe('getAllDrivers', () => {
    it('should return all users with role Driver', async () => {
      const result = await service.getAllDrivers();
      expect(userModel.find).toHaveBeenCalledWith({ role: Role.Driver });
      expect(result).toEqual({
        message: 'Data retrieved successfully',
        drivers: userArray,
      });
    });
  });

  describe('findById', () => {
    it('should return a user if ID is valid and user exists', async () => {
      const result = await service.findById(mockDriver._id.toString());
      expect(result).toEqual({
        message: 'User data retrieved successfully',
        user: mockDriver,
      });
    });

    it('should throw BadRequestException if ID is invalid', async () => {
      await expect(service.findById('invalid-id')).rejects.toThrow(BadRequestException);
    });

    it('should throw NotFoundException if user is not found', async () => {
      const nonExistingId = new mongoose.Types.ObjectId().toString();
      await expect(service.findById(nonExistingId)).rejects.toThrow(NotFoundException);
    });
  });

  describe('deleteById', () => {
    it('should delete a user if ID is valid and user exists', async () => {
      const result = await service.deleteById(mockDriver._id.toString());
      expect(result).toEqual({ message: 'User deleted successfully' });
    });

    it('should throw BadRequestException for invalid ID format', async () => {
      await expect(service.deleteById('bad-id')).rejects.toThrow(BadRequestException);
    });

    it('should throw NotFoundException if user does not exist', async () => {
      const nonExistingId = new mongoose.Types.ObjectId().toString();
      await expect(service.deleteById(nonExistingId)).rejects.toThrow(NotFoundException);
    });
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { MaintenanceService } from './maintenance.service';
import { Maintenance } from '../schemas/maintenance.schema';
import { CreateMaintenanceDto, UpdateMaintenanceDto } from '../dto/maintenance.dto';
import { User } from '../../auth/schemas/user.schema';
import mongoose from 'mongoose';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('MaintenanceService', () => {
  let service: MaintenanceService;
  let model: any;

  const mockUser = {
    _id: new mongoose.Types.ObjectId(),
  } as User;

  const mockMaintenance = {
    _id: new mongoose.Types.ObjectId(),
    userId: mockUser._id,
    vehicleId: new mongoose.Types.ObjectId().toString(),
    maintenanceDate: new Date(),
    description: 'Test Maintenance',
    cost: 1000,
    toObject: jest.fn().mockReturnThis(),
  };

  const maintenanceArray = [mockMaintenance];

  const mockMaintenanceModel = {
    find: jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue(maintenanceArray),
    }),
    create: jest.fn().mockResolvedValue(mockMaintenance),
    findOne: jest.fn().mockResolvedValue(mockMaintenance),
    findOneAndUpdate: jest.fn().mockResolvedValue(mockMaintenance),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MaintenanceService,
        {
          provide: getModelToken(Maintenance.name),
          useValue: mockMaintenanceModel,
        },
      ],
    }).compile();

    service = module.get<MaintenanceService>(MaintenanceService);
    model = module.get(getModelToken(Maintenance.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all maintenance records for the user', async () => {
      const result = await service.findAll(mockUser);
      expect(result).toEqual({
        message: 'Maintenance records fetched successfully',
        data: maintenanceArray,
      });
    });
  });

  describe('create', () => {
    it('should create and return a new maintenance record', async () => {
      const dto: CreateMaintenanceDto = {
        vehicleId: mockMaintenance.vehicleId,
        maintenanceDate: mockMaintenance.maintenanceDate,
        description: mockMaintenance.description,
        cost: mockMaintenance.cost,
      };

      const result = await service.create(mockUser, dto);
      expect(result).toEqual({
        message: 'Maintenance record created successfully',
        data: mockMaintenance,
      });
    });
  });

  describe('findById', () => {
    it('should throw BadRequestException if ID is invalid', async () => {
      await expect(service.findById(mockUser, 'invalid-id')).rejects.toThrow(BadRequestException);
    });

    it('should throw NotFoundException if record not found', async () => {
      jest.spyOn(model, 'findOne').mockResolvedValueOnce(null);
      const id = new mongoose.Types.ObjectId().toString();
      await expect(service.findById(mockUser, id)).rejects.toThrow(NotFoundException);
    });

    it('should return the maintenance record if found', async () => {
      const result = await service.findById(mockUser, mockMaintenance._id.toString());
      expect(result).toEqual({
        message: 'Maintenance record fetched successfully',
        data: mockMaintenance,
      });
    });
  });

  describe('updateById', () => {
    it('should throw BadRequestException if ID is invalid', async () => {
      await expect(service.updateById(mockUser, 'bad-id', {} as UpdateMaintenanceDto)).rejects.toThrow(BadRequestException);
    });

    it('should throw NotFoundException if record is not found', async () => {
      jest.spyOn(model, 'findOneAndUpdate').mockResolvedValueOnce(null);
      const id = new mongoose.Types.ObjectId().toString();
      await expect(service.updateById(mockUser, id, {} as UpdateMaintenanceDto)).rejects.toThrow(NotFoundException);
    });

    it('should return updated maintenance record', async () => {
      const dto: UpdateMaintenanceDto = {
        vehicleId: mockMaintenance.vehicleId,
        maintenanceDate: mockMaintenance.maintenanceDate,
        description: 'Updated Description',
        cost: 1200,
      };

      const result = await service.updateById(mockUser, mockMaintenance._id.toString(), dto);
      expect(result).toEqual({
        message: 'Maintenance record updated successfully',
        data: mockMaintenance,
      });
    });
  });
});

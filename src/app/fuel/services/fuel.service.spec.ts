import { Test, TestingModule } from '@nestjs/testing';
import { FuelService } from './fuel.service';
import { getModelToken } from '@nestjs/mongoose';
import { Fuel } from '../schemas/fuel.schema';
import { User } from '../../auth/schemas/user.schema';
import * as mongoose from 'mongoose';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('FuelService', () => {
  let service: FuelService;
  let model: any;

  const mockFuel = {
    _id: new mongoose.Types.ObjectId(),
    userId: new mongoose.Types.ObjectId(),
    vehicleId: new mongoose.Types.ObjectId().toString(),
    date: new Date(),
    litres: 10,
    pricePerLitre: 1000,
    cost: 10000,
  };

  const user: User = {
    _id: mockFuel.userId,
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    password: 'hashedPassword',
    role: 'user',
    phoneNumber: '1234567890',
    images: [],
    resetToken: '',
  } as any;

  beforeEach(async () => {
    const mockModel = {
      find: jest.fn().mockReturnValue({ exec: jest.fn().mockResolvedValue([mockFuel]) }),
      create: jest.fn().mockResolvedValue(mockFuel),
      findOne: jest.fn().mockResolvedValue(mockFuel),
      findOneAndUpdate: jest.fn().mockResolvedValue(mockFuel),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FuelService,
        {
          provide: getModelToken(Fuel.name),
          useValue: mockModel,
        },
      ],
    }).compile();

    service = module.get<FuelService>(FuelService);
    model = module.get(getModelToken(Fuel.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all fuel entries', async () => {
      const result = await service.findAll(user);
      expect(result.message).toBe('Fuels retrieved successfully');
      expect(result.data).toEqual([mockFuel]);
    });
  });

  describe('create', () => {
    it('should create a new fuel entry', async () => {
      const createDto = {
        vehicleId: mockFuel.vehicleId,
        date: mockFuel.date,
        litres: mockFuel.litres,
        pricePerLitre: mockFuel.pricePerLitre,
        cost: mockFuel.cost,
      };

      const result = await service.create(user, createDto);
      expect(result.message).toBe('Fuel entry created successfully');
      expect(result.data).toEqual(mockFuel);
    });
  });

  describe('findById', () => {
    it('should throw BadRequestException for invalid ID', async () => {
      await expect(service.findById('invalid-id', user)).rejects.toThrow(BadRequestException);
    });

    it('should throw NotFoundException if fuel not found', async () => {
      jest.spyOn(model, 'findOne').mockResolvedValueOnce(null);
      const id = new mongoose.Types.ObjectId().toString();
      await expect(service.findById(id, user)).rejects.toThrow(NotFoundException);
    });

    it('should return fuel entry if found', async () => {
      const id = mockFuel._id.toString();
      const result = await service.findById(id, user);
      expect(result.message).toBe('Fuel retrieved successfully');
      expect(result.data).toEqual(mockFuel);
    });
  });

  describe('updateById', () => {
    it('should throw BadRequestException for invalid ID', async () => {
      await expect(service.updateById('bad-id', {}, user)).rejects.toThrow(BadRequestException);
    });

    it('should throw NotFoundException if fuel not found', async () => {
      jest.spyOn(model, 'findOneAndUpdate').mockResolvedValueOnce(null);
      const id = new mongoose.Types.ObjectId().toString();
      await expect(service.updateById(id, {}, user)).rejects.toThrow(NotFoundException);
    });

    it('should return updated fuel entry', async () => {
      const id = mockFuel._id.toString();
      const result = await service.updateById(id, { litres: 15 }, user);
      expect(result.message).toBe('Fuel updated successfully');
      expect(result.data).toEqual(mockFuel);
    });
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { FuelService } from './fuel.service';
import { Fuel } from '../schemas/fuel.schema';
import { Model } from 'mongoose';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import * as mongoose from 'mongoose';
import { CreateFuelDto } from '../dto/fuel.dto';

describe('FuelService', () => {
  let service: FuelService;
  let model: Model<Fuel>;

  const mockFuelModel = {
    find: jest.fn(),
    create: jest.fn(),
    findOne: jest.fn(),
    findOneAndUpdate: jest.fn(),
  };

  const mockUser = {
    _id: new mongoose.Types.ObjectId(),
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    password: 'hashedPassword',
    role: 'USER',
    phoneNumber: '1234567890',
  };

  const mockFuel: Fuel = {
    _id: new mongoose.Types.ObjectId(),
    userId: mockUser._id,
    vehicleId: new mongoose.Types.ObjectId().toHexString(),
    date: new Date(),
    litres: 20,
    pricePerLitre: 2.5,
    cost: 50,
  } as any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FuelService,
        {
          provide: getModelToken(Fuel.name),
          useValue: mockFuelModel,
        },
      ],
    }).compile();

    service = module.get<FuelService>(FuelService);
    model = module.get<Model<Fuel>>(getModelToken(Fuel.name));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all fuels', async () => {
      mockFuelModel.find.mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce([mockFuel]),
      });

      const result = await service.findAll(mockUser as any);
      expect(result.data).toEqual([mockFuel]);
      expect(result.message).toBe('Fuels retrieved successfully');
    });
  });

  describe('create', () => {
    it('should create a new fuel entry', async () => {
      const createFuelDto: CreateFuelDto = {
        vehicleId: mockFuel.vehicleId,
        date: mockFuel.date,
        litres: mockFuel.litres,
        pricePerLitre: mockFuel.pricePerLitre,
        cost: mockFuel.cost,
      };

      mockFuelModel.create.mockResolvedValueOnce(mockFuel);

      const result = await service.create(mockUser as any, createFuelDto);
      expect(result.data).toEqual(mockFuel);
      expect(result.message).toBe('Fuel entry created successfully');
    });
  });

  describe('findById', () => {
    it('should return a fuel entry by ID', async () => {
      mockFuelModel.findOne.mockResolvedValueOnce(mockFuel);
      const result = await service.findById(mockFuel._id.toHexString(), mockUser as any);
      expect(result.data).toEqual(mockFuel);
      expect(result.message).toBe('Fuel retrieved successfully');
    });

    it('should throw BadRequestException for invalid ID', async () => {
      await expect(service.findById('invalid-id', mockUser as any)).rejects.toThrow(BadRequestException);
    });

    it('should throw NotFoundException if fuel not found', async () => {
      mockFuelModel.findOne.mockResolvedValueOnce(null);
      await expect(
        service.findById(new mongoose.Types.ObjectId().toHexString(), mockUser as any),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('updateById', () => {
    it('should update a fuel entry', async () => {
      const updatedFuel = { ...mockFuel, litres: 30 };
      mockFuelModel.findOneAndUpdate.mockResolvedValueOnce(updatedFuel);

      const result = await service.updateById(mockFuel._id.toHexString(), { litres: 30 }, mockUser as any);
      expect(result.data).toEqual(updatedFuel);
      expect(result.message).toBe('Fuel updated successfully');
    });

    it('should throw BadRequestException for invalid ID', async () => {
      await expect(service.updateById('bad-id', {}, mockUser as any)).rejects.toThrow(BadRequestException);
    });

    it('should throw NotFoundException if fuel not found', async () => {
      mockFuelModel.findOneAndUpdate.mockResolvedValueOnce(null);
      await expect(
        service.updateById(new mongoose.Types.ObjectId().toHexString(), {}, mockUser as any),
      ).rejects.toThrow(NotFoundException);
    });
  });
});

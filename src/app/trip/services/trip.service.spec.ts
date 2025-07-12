import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { TripService } from './trip.service';
import { Trip } from '../../../shared/schemas/trip.schema';
import mongoose from 'mongoose';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateTripDto, UpdateTripDto } from '../dto/trip.dto.ts';
import { User } from '../../../shared/schemas/user.schema';

describe('TripService', () => {
  let service: TripService;
  let model: any;

  const mockUser = {
    _id: new mongoose.Types.ObjectId(),
  } as User;

  const mockTrip = {
    _id: new mongoose.Types.ObjectId(),
    userId: mockUser._id,
    vehicleId: new mongoose.Types.ObjectId().toString(),
    driverId: new mongoose.Types.ObjectId().toString(),
    routeId: new mongoose.Types.ObjectId().toString(),
    startTime: new Date('2025-01-01T08:00:00.000Z'),
    endTime: new Date('2025-01-01T10:00:00.000Z'),
  };

  const mockTripModel = {
    find: jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue([mockTrip]),
    }),
    create: jest.fn().mockResolvedValue(mockTrip),
    findOne: jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue(mockTrip),
    }),
    findOneAndUpdate: jest.fn().mockResolvedValue(mockTrip),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TripService,
        {
          provide: getModelToken(Trip.name),
          useValue: mockTripModel,
        },
      ],
    }).compile();

    service = module.get<TripService>(TripService);
    model = module.get(getModelToken(Trip.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all trips for the user', async () => {
      const result = await service.findAll(mockUser);
      expect(model.find).toHaveBeenCalledWith({ userId: mockUser._id });
      expect(result).toEqual({
        message: 'Trips retrieved successfully',
        data: [mockTrip],
      });
    });
  });

  describe('create', () => {
    it('should create a new trip', async () => {
      const dto: CreateTripDto = {
        vehicleId: mockTrip.vehicleId,
        routeId: mockTrip.routeId,
        startTime: mockTrip.startTime,
        endTime: mockTrip.endTime,
      };

      const result = await service.create(mockUser, dto);
      expect(model.create).toHaveBeenCalledWith({ ...dto, userId: mockUser._id });
      expect(result).toEqual({
        message: 'Trip created successfully',
        data: mockTrip,
      });
    });
  });

  describe('findById', () => {
    it('should throw BadRequestException for invalid ID', async () => {
      await expect(service.findById(mockUser, 'invalid-id')).rejects.toThrow(BadRequestException);
    });

    it('should throw NotFoundException if trip not found', async () => {
      jest.spyOn(model, 'findOne').mockReturnValueOnce({
        exec: jest.fn().mockResolvedValue(null),
      });

      const id = new mongoose.Types.ObjectId().toString();
      await expect(service.findById(mockUser, id)).rejects.toThrow(NotFoundException);
    });

    it('should return a trip if found', async () => {
      const id = mockTrip._id.toString();
      const result = await service.findById(mockUser, id);
      expect(model.findOne).toHaveBeenCalledWith({ _id: id, userId: mockUser._id });
      expect(result).toEqual({
        message: 'Trip retrieved successfully',
        data: mockTrip,
      });
    });
  });

  describe('updateById', () => {
    it('should throw BadRequestException for invalid ID', async () => {
      await expect(service.updateById(mockUser, 'invalid-id', {} as UpdateTripDto)).rejects.toThrow(BadRequestException);
    });

    it('should throw NotFoundException if trip not found', async () => {
      jest.spyOn(model, 'findOneAndUpdate').mockResolvedValueOnce(null);
      const id = new mongoose.Types.ObjectId().toString();
      await expect(service.updateById(mockUser, id, {} as UpdateTripDto)).rejects.toThrow(NotFoundException);
    });

    it('should return updated trip', async () => {
      const id = mockTrip._id.toString();
      const dto: UpdateTripDto = {
        vehicleId: mockTrip.vehicleId,
        routeId: mockTrip.routeId,
        startTime: mockTrip.startTime,
        endTime: mockTrip.endTime,
      };

      const result = await service.updateById(mockUser, id, dto);
      expect(model.findOneAndUpdate).toHaveBeenCalledWith(
        { _id: id, userId: mockUser._id },
        dto,
        { new: true, runValidators: true }
      );
      expect(result).toEqual({
        message: 'Trip updated successfully',
        data: mockTrip,
      });
    });
  });
});

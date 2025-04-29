import { Test, TestingModule } from '@nestjs/testing';
import { VehicleService } from './vehicle.service';
import { getModelToken } from '@nestjs/mongoose';
import { Vehicle, Type } from '../schemas/vehicle.schema';
import { User } from '../../auth/schemas/user.schema';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import * as mongoose from 'mongoose';
import { uploadImages } from '../../../shared/utils/aws';

jest.mock('../../../shared/utils/aws', () => ({
  uploadImages: jest.fn().mockResolvedValue([{ url: 'https://example.com/image.jpg' }]),
}));

const mockVehicle = {
  _id: 'vehicle123',
  make: 'Toyota',
  vehicleModel: 'Corolla',
  year: 2020,
  licensePlate: 'ABC-1234',
  vin: '1HGCM82633A004352',
  fuelType: Type.Petrol,
  images: [],
  save: jest.fn(),
};

describe('VehicleService', () => {
  let service: VehicleService;
  let model: any;

  beforeEach(async () => {
    const mockVehicleModel = {
      find: jest.fn(),
      create: jest.fn(),
      findById: jest.fn(),
      findByIdAndUpdate: jest.fn(),
      findByIdAndDelete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VehicleService,
        {
          provide: getModelToken(Vehicle.name),
          useValue: mockVehicleModel,
        },
      ],
    }).compile();

    service = module.get<VehicleService>(VehicleService);
    model = module.get(getModelToken(Vehicle.name));
  });

  describe('findAll', () => {
    it('should return all vehicles', async () => {
      model.find.mockResolvedValue([mockVehicle]);

      const result = await service.findAll();
      expect(result).toEqual([mockVehicle]);
    });
  });

  describe('create', () => {
    it('should create and return a vehicle', async () => {
      const user = { _id: 'user123' } as User;
      const vehicleData = { ...mockVehicle };

      model.create.mockResolvedValue(mockVehicle);

      const result = await service.create(vehicleData as Vehicle, user);
      expect(model.create).toHaveBeenCalledWith(expect.objectContaining({ user: user._id }));
      expect(result).toEqual(mockVehicle);
    });
  });

  describe('findById', () => {
    it('should return a vehicle by ID', async () => {
      const validId = new mongoose.Types.ObjectId().toString(); // valid ObjectId
      model.findById.mockResolvedValue(mockVehicle);
  
      const result = await service.findById(validId);
      expect(result).toEqual(mockVehicle);
    });
  
    it('should throw BadRequestException for invalid ID', async () => {
      const invalidId = 'invalid-id'; // not a valid ObjectId
  
      await expect(service.findById(invalidId)).rejects.toThrow(BadRequestException);
    });
  
    it('should throw NotFoundException if vehicle not found', async () => {
      const validId = new mongoose.Types.ObjectId().toString();
      model.findById.mockResolvedValue(null);
  
      const result = service.findById(validId);
      await expect(result).rejects.toThrow(NotFoundException);
    });
  });
  

  describe('updateById', () => {
    it('should update and return vehicle', async () => {
      model.findByIdAndUpdate.mockResolvedValue(mockVehicle);

      const result = await service.updateById(mockVehicle._id, mockVehicle as Vehicle);
      expect(model.findByIdAndUpdate).toHaveBeenCalledWith(
        mockVehicle._id,
        mockVehicle,
        expect.objectContaining({ new: true, runValidators: true }),
      );
      expect(result).toEqual(mockVehicle);
    });
  });

  describe('deleteById', () => {
    it('should delete vehicle and return { deleted: true }', async () => {
      model.findByIdAndDelete.mockResolvedValue(mockVehicle);

      const result = await service.deleteById(mockVehicle._id);
      expect(model.findByIdAndDelete).toHaveBeenCalledWith(mockVehicle._id);
      expect(result).toEqual({ deleted: true });
    });
  });

  describe('uploadImages', () => {
    it('should upload images and return updated vehicle', async () => {
      model.findById.mockResolvedValue(mockVehicle);
      const files = [{ originalname: 'car.jpg' }] as any;

      const result = await service.uploadImages(mockVehicle._id, files);
      expect(uploadImages).toHaveBeenCalledWith(files);
      expect(mockVehicle.save).toHaveBeenCalled();
      expect(result).toEqual(mockVehicle);
    });

    it('should throw NotFoundException if vehicle is not found', async () => {
      model.findById.mockResolvedValue(null);
      const files = [{ originalname: 'car.jpg' }] as any;

      await expect(service.uploadImages('badId', files)).rejects.toThrow(NotFoundException);
    });
  });
});

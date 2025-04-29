import { Test, TestingModule } from '@nestjs/testing';
import { VehicleController } from './vehicle.controller';
import { VehicleService } from '../services/vehicle.service';
import { Role } from '../../auth/enums/role.enum';
import { Vehicle, Type } from '../schemas/vehicle.schema';

describe('VehicleController', () => {
  let controller: VehicleController;
  let service: VehicleService;

  const mockVehicle: Vehicle = {
    make: 'Toyota',
    vehicleModel: 'Corolla',
    year: 2020,
    licensePlate: 'ABC-1234',
    vin: '1HGCM82633A004352',
    fuelType: Type.Petrol,
    images: [],
  };

  const mockVehicleService = {
    findAll: jest.fn(),
    create: jest.fn(),
    findById: jest.fn(),
    updateById: jest.fn(),
    deleteById: jest.fn(),
    uploadImages: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VehicleController],
      providers: [
        {
          provide: VehicleService,
          useValue: mockVehicleService,
        },
      ],
    }).compile();

    controller = module.get<VehicleController>(VehicleController);
    service = module.get<VehicleService>(VehicleService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAllVehicles', () => {
    it('should return an array of vehicles', async () => {
      mockVehicleService.findAll.mockResolvedValue([mockVehicle]);

      const result = await controller.getAllVehicles();
      expect(result).toEqual([mockVehicle]);
      expect(mockVehicleService.findAll).toHaveBeenCalled();
    });
  });

  describe('createVehicle', () => {
    it('should create and return a vehicle', async () => {
      const req = { user: { _id: 'adminId', role: Role.Admin } };
      mockVehicleService.create.mockResolvedValue(mockVehicle);

      const result = await controller.createVehicle(mockVehicle, req);
      expect(result).toEqual(mockVehicle);
      expect(mockVehicleService.create).toHaveBeenCalledWith(mockVehicle, req.user);
    });
  });

  describe('getVehicle', () => {
    it('should return a single vehicle by ID', async () => {
      mockVehicleService.findById.mockResolvedValue(mockVehicle);

      const result = await controller.getVehicle('123');
      expect(result).toEqual(mockVehicle);
      expect(mockVehicleService.findById).toHaveBeenCalledWith('123');
    });
  });

  describe('updateVehicle', () => {
    it('should update and return the vehicle', async () => {
      mockVehicleService.updateById.mockResolvedValue(mockVehicle);

      const result = await controller.updateVehicle('123', mockVehicle);
      expect(result).toEqual(mockVehicle);
      expect(mockVehicleService.updateById).toHaveBeenCalledWith('123', mockVehicle);
    });
  });

  describe('deleteVehicle', () => {
    it('should delete and return result', async () => {
      mockVehicleService.deleteById.mockResolvedValue({ deleted: true });

      const result = await controller.deleteVehicle('123');
      expect(result).toEqual({ deleted: true });
      expect(mockVehicleService.deleteById).toHaveBeenCalledWith('123');
    });
  });

  describe('uploadImages', () => {
    it('should upload vehicle images', async () => {
      const files: any = [{ originalname: 'car1.jpg' }, { originalname: 'car2.jpg' }];
      mockVehicleService.uploadImages.mockResolvedValue({ message: 'Images uploaded' });

      const result = await controller.uploadImages('123', files);
      expect(result).toEqual({ message: 'Images uploaded' });
      expect(mockVehicleService.uploadImages).toHaveBeenCalledWith('123', files);
    });
  });
});

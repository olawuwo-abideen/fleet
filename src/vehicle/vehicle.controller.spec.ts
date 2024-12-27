import { Test, TestingModule } from '@nestjs/testing';
import { VehicleController } from './vehicle.controller';
import { VehicleService } from './vehicle.service';
import { CreateVehicleDto } from './dto/vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { PassportModule } from '@nestjs/passport';
import { User } from '../auth/schemas/user.schema';
import {Type} from'./schemas/vehicle.schema'

describe('VehicleController', () => {
  let vehicleService: VehicleService;
  let vehicleController: VehicleController;

  const mockVehicle= {
    _id: '61c0ccf11d7bf83d153d7c06',
    user: '61c0ccf11d7bf83d153d7c06',
    make,'Toyota',

    title: 'New Book',
    description: 'Book Description',
    author: 'Author',
    price: 100,
    fuelType: Type.Petrol,
  };

  const mockUser = {
    _id: '61c0ccf11d7bf83d153d7c06',
    name: 'Ghulam',
    email: 'ghulam1@gmail.com',
  };

  const mockVehicleService = {
    findAll: jest.fn().mockResolvedValueOnce([mockVehicle]),
    create: jest.fn(),
    findById: jest.fn().mockResolvedValueOnce(mockVehicle),
    updateById: jest.fn(),
    deleteById: jest.fn().mockResolvedValueOnce({ deleted: true }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
      controllers: [VehicleController],
      providers: [
        {
          provide: VehicleService,
          useValue: mockVehicleService,
        },
      ],
    }).compile();

    vehicleService = module.get<VehicleService>(VehicleService);
    vehicleController = module.get<VehicleController>(VehicleController);
  });

  it('should be defined', () => {
    expect(vehicleController).toBeDefined();
  });

  describe('getAllVehicles', () => {
    it('should get all vehicles', async () => {
      const result = await vehicleController.getAllVehicles({
        keyword: 'test',
      });

      expect(vehicleService.findAll).toHaveBeenCalled();
      expect(result).toEqual([mockVehicle]);
    });
  });

  describe('createBook', () => {
    it('should create a new vehicle', async () => {
      const newBook = {
        title: 'New vehicle',
        description: 'vehicle Description',
        author: 'Author',
        price: 100,
        category: Category.FANTASY,
      };

      mockVehicleService.create = jest.fn().mockResolvedValueOnce(mockVehicle);

      const result = await vehicleController.createVehicle(
        newVehicle as CreateVehicleDto,
        mockUser as User,
      );

      expect(vehicleService.create).toHaveBeenCalled();
      expect(result).toEqual(mockVehicle);
    });
  });

  describe('getBookById', () => {
    it('should get a vehicle by ID', async () => {
      const result = await vehicleController.getVehicle(mockVehicle._id);

      expect(vehicleService.findById).toHaveBeenCalled();
      expect(result).toEqual(mockVehicle);
    });
  });

  describe('updateVehicle', () => {
    it('should update vehicle by its ID', async () => {
      const updatedVehicle = { ...mockVehicle, title: 'Updated name' };
      const vehicle = { title: 'Updated name' };

      mockVehicleService.updateById = jest.fn().mockResolvedValueOnce(updatedVehicle);

      const result = await vehicleController.updateVehicle(
        mockVehicle._id,
        vehicle as UpdateVehicleDto,
      );

      expect(vehicleService.updateById).toHaveBeenCalled();
      expect(result).toEqual(updatedVehicle);
    });
  });

  describe('deleteVehicle', () => {
    it('should delete a vehicle by ID', async () => {
      const result = await vehicleController.deleteVehicle(mockVehicle._id);

      expect(vehicleService.deleteById).toHaveBeenCalled();
      expect(result).toEqual({ deleted: true });
    });
  });
});



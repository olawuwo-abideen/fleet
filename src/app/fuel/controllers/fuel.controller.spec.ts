import { Test, TestingModule } from '@nestjs/testing';
import { FuelController } from './fuel.controller';
import { FuelService } from '../services/fuel.service';
import { CreateFuelDto, UpdateFuelDto } from '../dto/fuel.dto';
import { Fuel } from '../schemas/fuel.schema';
import { Role } from '../../auth/enums/role.enum';
import { User } from '../../auth/schemas/user.schema';

describe('FuelController', () => {
  let controller: FuelController;
  let service: FuelService;

  const mockUser = {
    _id: 'user123',
    email: 'test@example.com',
    role: Role.Admin,
  } as User;

  const mockFuel = {
    _id: '12345',
    vehicleId: '67b089dc3eed037c0bf9b758',
    date: new Date(),
    litres: 50,
    pricePerLitre: 1000,
    cost: 50000,
  } as unknown as Fuel; 
  

  const mockService = {
    findAll: jest.fn().mockResolvedValue({ message: 'Success', data: [mockFuel] }),
    create: jest.fn().mockResolvedValue({ message: 'Created', data: mockFuel }),
    findById: jest.fn().mockResolvedValue({ message: 'Found', data: mockFuel }),
    updateById: jest.fn().mockResolvedValue({ message: 'Updated', data: mockFuel }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FuelController],
      providers: [
        {
          provide: FuelService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<FuelController>(FuelController);
    service = module.get<FuelService>(FuelService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all fuel records', async () => {
    const result = await controller.getAllFuels(mockUser);
    expect(result).toEqual({ message: 'Success', data: [mockFuel] });
    expect(service.findAll).toHaveBeenCalledWith(mockUser);
  });

  it('should create a fuel record', async () => {
    const dto: CreateFuelDto = {
      vehicleId: 'vehicle123',
      date: new Date(),
      litres: 10,
      pricePerLitre: 100,
      cost: 1000,
    };
    const result = await controller.createFuel(mockUser, dto);
    expect(result).toEqual({ message: 'Created', data: mockFuel });
    expect(service.create).toHaveBeenCalledWith(mockUser, dto);
  });

  it('should get fuel by id', async () => {
    const result = await controller.getFuel('fuel123', { user: mockUser });
    expect(result).toEqual({ message: 'Found', data: mockFuel });
    expect(service.findById).toHaveBeenCalledWith('fuel123', mockUser);
  });

  it('should update fuel by id', async () => {
    const dto: UpdateFuelDto = {
      vehicleId: 'vehicle123',
      date: new Date(),
      litres: 20,
      pricePerLitre: 120,
      cost: 2400,
    };
    const result = await controller.updateFuel('fuel123', dto, { user: mockUser });
    expect(result).toEqual({ message: 'Updated', data: mockFuel });
    expect(service.updateById).toHaveBeenCalledWith('fuel123', dto, mockUser);
  });
});

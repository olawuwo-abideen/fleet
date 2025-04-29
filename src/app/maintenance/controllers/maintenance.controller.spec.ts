import { Test, TestingModule } from '@nestjs/testing';
import { MaintenanceController } from './maintenance.controller';
import { MaintenanceService } from '../services/maintenance.service';
import { CreateMaintenanceDto, UpdateMaintenanceDto } from '../dto/maintenance.dto';
import { Role } from '../../auth/enums/role.enum';
import { Maintenance } from '../schemas/maintenance.schema';
import { User } from '../../../app/auth/schemas/user.schema';

const mockUser = {
  _id: 'user123',
  role: Role.Admin,
  email: 'admin@example.com',
} as unknown as User;

const mockMaintenance: Maintenance = {
  _id: 'maint123',
  userId: 'user123' as any,
  vehicleId: 'veh456',
  maintenanceDate: new Date('2025-01-01T08:00:00.000Z'),
  description: 'Oil change',
  cost: 50000,
};

const mockService = {
  findAll: jest.fn(),
  create: jest.fn(),
  findById: jest.fn(),
  updateById: jest.fn(),
};

describe('MaintenanceController', () => {
  let controller: MaintenanceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MaintenanceController],
      providers: [
        {
          provide: MaintenanceService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<MaintenanceController>(MaintenanceController);
  });

  afterEach(() => jest.clearAllMocks());

  describe('getAllMaintenances', () => {
    it('should return all maintenance records for the user', async () => {
      mockService.findAll.mockResolvedValueOnce({ message: 'Success', data: [mockMaintenance] });

      const result = await controller.getAllMaintenances(mockUser);
      expect(result).toEqual({ message: 'Success', data: [mockMaintenance] });
      expect(mockService.findAll).toHaveBeenCalledWith(mockUser);
    });
  });

  describe('createMaintenance', () => {
    it('should create and return a new maintenance record', async () => {
      const dto: CreateMaintenanceDto = {
        vehicleId: 'veh456',
        maintenanceDate: new Date('2025-01-01T08:00:00.000Z'),
        description: 'Oil change',
        cost: 50000,
      };

      mockService.create.mockResolvedValueOnce({ message: 'Created', data: mockMaintenance });

      const result = await controller.createMaintenance(mockUser, dto);
      expect(result).toEqual({ message: 'Created', data: mockMaintenance });
      expect(mockService.create).toHaveBeenCalledWith(mockUser, dto);
    });
  });

  describe('getMaintenance', () => {
    it('should return maintenance by ID', async () => {
      mockService.findById.mockResolvedValueOnce({ message: 'Found', data: mockMaintenance });

      const result = await controller.getMaintenance(mockUser, 'maint123');
      expect(result).toEqual({ message: 'Found', data: mockMaintenance });
      expect(mockService.findById).toHaveBeenCalledWith(mockUser, 'maint123');
    });
  });

  describe('updateMaintenance', () => {
    it('should update and return the maintenance record', async () => {
      const dto: UpdateMaintenanceDto = {
        vehicleId: 'veh456',
        maintenanceDate: new Date('2025-01-01T08:00:00.000Z'),
        description: 'Updated description',
        cost: 60000,
      };

      mockService.updateById.mockResolvedValueOnce({ message: 'Updated', data: mockMaintenance });

      const result = await controller.updateMaintenance(mockUser, 'maint123', dto);
      expect(result).toEqual({ message: 'Updated', data: mockMaintenance });
      expect(mockService.updateById).toHaveBeenCalledWith(mockUser, 'maint123', dto);
    });
  });
});

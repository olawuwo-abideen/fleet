import { Test, TestingModule } from '@nestjs/testing';
import { AdminController } from './admin.controller';
import { AdminService } from '../services/admin.service';
import { Role } from '../../auth/enums/role.enum';
import { User } from '../../../shared/schemas/user.schema';

describe('AdminController', () => {
  let controller: AdminController;
  let adminService: AdminService;

  const mockDriver: User = {
    _id: 'driver123',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    password: 'hashedpassword',
    phoneNumber: '1234567890',
    role: Role.Driver,
    images: [],
    resetToken: '',
  } as User;

  const mockAdminService = {
    getAllDrivers: jest.fn().mockResolvedValue({
      message: 'Data fetched successfully.',
      drivers: [mockDriver],
    }),
    findById: jest.fn().mockResolvedValue({
      message: 'Data fetched successfully.',
      user: mockDriver,
    }),
    deleteById: jest.fn().mockResolvedValue({
      message: 'Data deleted successfully.',
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminController],
      providers: [{ provide: AdminService, useValue: mockAdminService }],
    }).compile();

    controller = module.get<AdminController>(AdminController);
    adminService = module.get<AdminService>(AdminService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAllDriver', () => {
    it('should return all drivers', async () => {
      const result = await controller.getAllDriver();
      expect(result).toEqual({
        message: 'Data fetched successfully.',
        drivers: [mockDriver],
      });
      expect(adminService.getAllDrivers).toHaveBeenCalled();
    });
  });

  describe('getDriver', () => {
    it('should return a driver by id', async () => {
      const result = await controller.getDriver('driver123');
      expect(result).toEqual({
        message: 'Data fetched successfully.',
        user: mockDriver,
      });
      expect(adminService.findById).toHaveBeenCalledWith('driver123');
    });
  });

  describe('deleteDriver', () => {
    it('should delete a driver by id', async () => {
      const result = await controller.deleteDriver('driver123');
      expect(result).toEqual({
        message: 'Data deleted successfully.',
      });
      expect(adminService.deleteById).toHaveBeenCalledWith('driver123');
    });
  });
});

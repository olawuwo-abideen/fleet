import { Test, TestingModule } from '@nestjs/testing';
import { TripController } from './trip.controller';
import { TripService } from '../services/trip.service';
import { CreateTripDto, UpdateTripDto } from '../dto/trip.dto.ts';
import { Trip } from '../../../shared/schemas/trip.schema';
import { User } from '../../../shared/schemas/user.schema';
import { Role } from '../../auth/enums/role.enum';

const mockUser = {
  _id: 'userId123',
  role: Role.Admin,
  email: 'admin@example.com',
} as unknown as User;

const mockTrip: Trip & { _id?: string } = {
  _id: 'trip123',
  userId: 'userId123' as any,
  vehicleId: 'vehicle123',
  driverId: 'driver123',
  routeId: 'route123',
  startTime: new Date('2025-01-01T08:00:00.000Z'),
  endTime: new Date('2025-05-13T18:00:00.000Z'),
};

const mockTripService = {
  findAll: jest.fn(),
  create: jest.fn(),
  findById: jest.fn(),
  updateById: jest.fn(),
};

describe('TripController', () => {
  let controller: TripController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TripController],
      providers: [{ provide: TripService, useValue: mockTripService }],
    }).compile();

    controller = module.get<TripController>(TripController);
  });

  afterEach(() => jest.clearAllMocks());

  describe('getAllTrips', () => {
    it('should return all trips for the user', async () => {
      mockTripService.findAll.mockResolvedValueOnce({ message: 'Success', data: [mockTrip] });

      const result = await controller.getAllTrips(mockUser);
      expect(result).toEqual({ message: 'Success', data: [mockTrip] });
      expect(mockTripService.findAll).toHaveBeenCalledWith(mockUser);
    });
  });

  describe('createTrip', () => {
    it('should create a new trip', async () => {
      const dto: CreateTripDto = {
        vehicleId: 'vehicle123',
        routeId: 'route123',
        startTime: new Date('2025-01-01T08:00:00.000Z'),
        endTime: new Date('2025-05-13T18:00:00.000Z'),
      };

      mockTripService.create.mockResolvedValueOnce({ message: 'Created', data: mockTrip });

      const result = await controller.createTrip(mockUser, dto);
      expect(result).toEqual({ message: 'Created', data: mockTrip });
      expect(mockTripService.create).toHaveBeenCalledWith(mockUser, dto);
    });
  });

  describe('getTrip', () => {
    it('should return trip by ID', async () => {
      mockTripService.findById.mockResolvedValueOnce({ message: 'Found', data: mockTrip });

      const result = await controller.getTrip(mockUser, 'trip123');
      expect(result).toEqual({ message: 'Found', data: mockTrip });
      expect(mockTripService.findById).toHaveBeenCalledWith(mockUser, 'trip123');
    });
  });

  describe('updateTrip', () => {
    it('should update trip by ID', async () => {
      const dto: UpdateTripDto = {
        vehicleId: 'vehicle123',
        routeId: 'route123',
        startTime: new Date('2025-01-01T08:00:00.000Z'),
        endTime: new Date('2025-05-13T18:00:00.000Z'),
      };

      mockTripService.updateById.mockResolvedValueOnce({ message: 'Updated', data: mockTrip });

      const result = await controller.updateTrip(mockUser, 'trip123', dto);
      expect(result).toEqual({ message: 'Updated', data: mockTrip });
      expect(mockTripService.updateById).toHaveBeenCalledWith(mockUser, 'trip123', dto);
    });
  });
});

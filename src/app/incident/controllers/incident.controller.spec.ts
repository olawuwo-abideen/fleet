import { Test, TestingModule } from '@nestjs/testing';
import { IncidentController } from './incident.controller';
import { IncidentService } from '../services/incident.service';
import { CreateIncidentDto, UpdateIncidentDto } from '../dto/incident.dto';
import { Type } from '../../../shared/schemas/incident.schema';
import { Role } from '../../../app/auth/enums/role.enum';
import mongoose from 'mongoose';

describe('IncidentController', () => {
  let controller: IncidentController;
  let service: IncidentService;

  const mockUser: any = {
    _id: new mongoose.Types.ObjectId(),
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    password: 'password',
    phoneNumber: '1234567890',
    role: Role.Driver,
    resetToken: '',
  };

  const mockIncident = {
    userId: new mongoose.Types.ObjectId(),
    vehicleId: 'vehicle123',
    date: new Date(),
    description: 'Accident occurred on highway',
    location: 'Lagos-Ibadan Expressway',
    incidenceType: Type.Accident,
  };

  const mockCreateIncidentDto: CreateIncidentDto = {
    vehicleId: 'vehicle123',
    date: new Date(),
    incidenceType: Type.Accident,
    description: 'Accident occurred on highway',
    location: 'Lagos-Ibadan Expressway',
  };

  const mockUpdateIncidentDto: UpdateIncidentDto = {
    vehicleId: 'vehicle123',
    date: new Date(),
    incidenceType: Type.Accident,
    description: 'Accident occurred on highway',
    location: 'Lagos-Ibadan Expressway',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IncidentController],
      providers: [
        {
          provide: IncidentService,
          useValue: {
            findAll: jest.fn().mockResolvedValue({ message: 'Fetched all incidents', data: [mockIncident] }),
            create: jest.fn().mockResolvedValue({ message: 'Incident created successfully', data: mockIncident }),
            findById: jest.fn().mockResolvedValue({ message: 'Fetched incident', data: mockIncident }),
            updateById: jest.fn().mockResolvedValue({ message: 'Incident updated', data: mockIncident }),
          },
        },
      ],
    }).compile();

    controller = module.get<IncidentController>(IncidentController);
    service = module.get<IncidentService>(IncidentService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAllTrips', () => {
    it('should return a list of incidents', async () => {
      const result = await controller.getAllTrips(mockUser);
      expect(result).toEqual({ message: 'Fetched all incidents', data: [mockIncident] });
    });
  });

  describe('createIncident', () => {
    it('should create a new incident', async () => {
      const result = await controller.createIncident(mockUser, mockCreateIncidentDto);
      expect(result).toEqual({ message: 'Incident created successfully', data: mockIncident });
    });
  });

  describe('getIncident', () => {
    it('should return the incident by id', async () => {
      const result = await controller.getIncident(mockUser, 'incident123', null);
      expect(result).toEqual({ message: 'Fetched incident', data: mockIncident });
    });
  });

  describe('updateIncident', () => {
    it('should update the incident by id', async () => {
      const result = await controller.updateIncident(mockUser, 'incident123', mockUpdateIncidentDto);
      expect(result).toEqual({ message: 'Incident updated', data: mockIncident });
    });
  });
});

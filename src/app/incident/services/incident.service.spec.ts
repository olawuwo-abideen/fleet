import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { IncidentService } from './incident.service';
import { Incident } from '../schemas/incident.schema';
import { CreateIncidentDto, UpdateIncidentDto } from '../dto/incident.dto';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import * as mongoose from 'mongoose';
import { Type } from '../schemas/incident.schema';
import { Role } from '../../auth/enums/role.enum';

describe('IncidentService', () => {
  let service: IncidentService;
  let model: any;

  const mockIncident = {
    _id: new mongoose.Types.ObjectId(),
    userId: new mongoose.Types.ObjectId(),
    vehicleId: 'vehicle123',
    date: new Date('2025-04-29T08:44:56.210Z'),
    description: 'Test incident',
    location: 'Test location',
    incidenceType: Type.Breakdown,
  };

  const mockUser = {
    _id: mockIncident.userId,
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    password: 'hashedpassword',
    role: Role.Driver,
    phoneNumber: '1234567890',
    resetToken: '',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IncidentService,
        {
          provide: getModelToken(Incident.name),
          useValue: {
            find: jest.fn(),
            create: jest.fn(),
            findOne: jest.fn(),
            findOneAndUpdate: jest.fn(),
            findOneAndDelete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<IncidentService>(IncidentService);
    model = module.get(getModelToken(Incident.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all incidents for user', async () => {
      jest.spyOn(model, 'find').mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce([mockIncident]),
      });

      const result = await service.findAll(mockUser as any);

      expect(result).toEqual({
        message: 'Incidents retrieved successfully',
        data: [mockIncident],
      });
    });
  });

  describe('create', () => {
    it('should create a new incident', async () => {
      jest.spyOn(model, 'create').mockImplementation(async () => ({
        ...mockIncident,
        toObject: () => mockIncident,
      }));

      const dto: CreateIncidentDto = {
        vehicleId: 'vehicle123',
        date: new Date('2025-04-29T08:44:56.210Z'),
        description: 'Test incident',
        location: 'Test location',
        incidenceType: Type.Breakdown,
      };

      const result = await service.create(mockUser as any, dto);

      expect(result).toEqual(
        expect.objectContaining({
          message: 'Incident created successfully',
          data: expect.objectContaining({
            vehicleId: dto.vehicleId,
            description: dto.description,
            location: dto.location,
            incidenceType: dto.incidenceType,
          }),
        })
      );

      expect(result.data._id).toBeDefined();
    });
  });

  describe('findById', () => {
    it('should throw BadRequestException for invalid ID', async () => {
      await expect(
        service.findById(mockUser as any, 'invalid_id'),
      ).rejects.toThrow(BadRequestException);
    });

    it('should throw NotFoundException if incident not found', async () => {
      jest.spyOn(model, 'findOne').mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(null),
      });

      const id = new mongoose.Types.ObjectId().toString();
      await expect(service.findById(mockUser as any, id)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should return incident if found', async () => {
      jest.spyOn(model, 'findOne').mockReturnValueOnce({
        exec: jest.fn().mockResolvedValueOnce(mockIncident),
      });

      const id = mockIncident._id.toString();
      const result = await service.findById(mockUser as any, id);
      expect(result).toEqual({
        message: 'Incident retrieved successfully',
        data: mockIncident,
      });
    });
  });

  describe('updateById', () => {
    it('should throw BadRequestException for invalid ID', async () => {
      await expect(
        service.updateById(mockUser as any, 'invalid_id', {} as any),
      ).rejects.toThrow(BadRequestException);
    });

    it('should throw NotFoundException if incident not found', async () => {
      jest
        .spyOn(model, 'findOneAndUpdate')
        .mockResolvedValueOnce(null);

      const id = new mongoose.Types.ObjectId().toString();
      await expect(
        service.updateById(mockUser as any, id, {} as UpdateIncidentDto),
      ).rejects.toThrow(NotFoundException);
    });

    it('should return updated incident', async () => {
      jest
        .spyOn(model, 'findOneAndUpdate')
        .mockResolvedValueOnce(mockIncident);

      const id = mockIncident._id.toString();
      const result = await service.updateById(
        mockUser as any,
        id,
        {} as UpdateIncidentDto,
      );
      expect(result).toEqual({
        message: 'Incident updated successfully',
        data: mockIncident,
      });
    });
  });

  describe('deleteById', () => {
    it('should throw BadRequestException for invalid ID', async () => {
      await expect(
        service.deleteById(mockUser as any, 'invalid_id'),
      ).rejects.toThrow(BadRequestException);
    });

    it('should throw NotFoundException if incident not found', async () => {
      jest
        .spyOn(model, 'findOneAndDelete')
        .mockResolvedValueOnce(null);

      const id = new mongoose.Types.ObjectId().toString();
      await expect(service.deleteById(mockUser as any, id)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should delete the incident successfully', async () => {
      jest
        .spyOn(model, 'findOneAndDelete')
        .mockResolvedValueOnce(mockIncident);

      const id = mockIncident._id.toString();
      const result = await service.deleteById(mockUser as any, id);
      expect(result).toEqual({ message: 'Incident deleted successfully' });
    });
  });
});

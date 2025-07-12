    import { ApiProperty } from '@nestjs/swagger';
    import { IsDateString, IsEnum, IsNotEmpty, IsString, IsUUID} from 'class-validator';
    import {Type} from '../../../shared/schemas/incident.schema'

    export class CreateIncidentDto {

    @ApiProperty({
    required: true,
    description: 'The vehicle id',
    example: '67b09610990d4c34298c4278',
    })
    @IsUUID()
    @IsNotEmpty()
    vehicleId: string;

    @ApiProperty({
    required: true,
    description: 'The incident date ',
    example: '2025-01-01T08:00:00.000Z',
    })
    @IsDateString()
    date: Date;

    @ApiProperty({
    required: true,
    enum:Type,
    description: 'The incident type',
    example: 'Vehicle breakdown',
    })
    @IsNotEmpty()
    @IsEnum(Type, { message: 'Please enter correct incidence type.' })
    incidenceType: Type;

    @ApiProperty({
    required: true,
    description: 'The incident description',
    example: 'The vehicle break down on an highway',
    })
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty({
    required: true,
    description: 'The breakdown location',
    example: 'Lagos-Ibadan Express way',
    })
    @IsString()
    @IsNotEmpty()
    location: string;

    }

    export class UpdateIncidentDto {

    @ApiProperty({
    required: true,
    description: 'The vehicle id',
    example: '67b09610990d4c34298c4278',
    })
    @IsUUID()
    @IsNotEmpty()
    vehicleId: string;


    @ApiProperty({
    required: true,
    description: 'The incident date ',
    example: '2025-01-01T08:00:00.000Z',
    })
    @IsDateString()
    @IsNotEmpty()
    date: Date;

    @ApiProperty({
    required: true,
    enum:Type,
    description: 'The incident type',
    example: 'Vehicle breakdown',
    })
    @IsNotEmpty()
    @IsEnum(Type, { message: 'Please enter correct incidence type.' })
    incidenceType: Type;

    @ApiProperty({
    required: true,
    description: 'The incident description',
    example: 'The vehicle break down on an highway',
    })
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty({
    required: true,
    description: 'The breakdown location',
    example: 'Lagos-Ibadan Express way',
    })
    @IsString()
    @IsNotEmpty()
    location: string;
    }



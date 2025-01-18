    import { ApiProperty } from '@nestjs/swagger';
    import { IsEnum, IsNotEmpty, IsString} from 'class-validator';
    import {Type} from '../schemas/incident.schema'

    export class CreateIncidentDto {

    @ApiProperty({
    required: true,
    description: 'The vehicle id',
    example: 'vsveegu363732bsduhdjd',
    })
    @IsString()
    @IsNotEmpty()
    vehicleId: string;

    @ApiProperty({
    required: true,
    description: 'The driver id',
    example: 'vsveegu363732bsduhdjd',
    })
    @IsString()
    @IsNotEmpty()
    driverId: string;

    @ApiProperty({
    required: true,
    description: 'The incident date ',
    example: '12/5/2025',
    })
    @IsString()
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

    export class UpdateIncidentDto {

    @ApiProperty({
    required: true,
    description: 'The vehicle id',
    example: 'vsveegu363732bsduhdjd',
    })
    @IsString()
    @IsNotEmpty()
    vehicleId: string;

    @ApiProperty({
    required: true,
    description: 'The driver id',
    example: 'vsveegu363732bsduhdjd',
    })
    @IsString()
    @IsNotEmpty()
    driverId: string;

    @ApiProperty({
    required: true,
    description: 'The incident date ',
    example: '12/5/2025',
    })
    @IsString()
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



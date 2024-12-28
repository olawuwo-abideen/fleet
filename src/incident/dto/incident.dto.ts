import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString} from 'class-validator';
import {Type} from '../schemas/incident.schema'

export class CreateIncidentDto {

@ApiProperty()
@IsString()
@IsNotEmpty()
vehicleId: string;

@ApiProperty()
@IsString()
@IsNotEmpty()
driverId: string;

@ApiProperty()
@IsString()
@IsNotEmpty()
date: Date;

@ApiProperty()
@IsNotEmpty()
@IsEnum(Type, { message: 'Please enter correct incidence type.' })
incidenceType: Type;

@ApiProperty()
@IsString()
@IsNotEmpty()
description: string;

@ApiProperty()
@IsString()
@IsNotEmpty()
location: string;

}

export class UpdateIncidentDto {

@ApiProperty()
@IsString()
@IsNotEmpty()
vehicleId: string;

@ApiProperty()
@IsString()
@IsNotEmpty()
driverId: string;

@ApiProperty()
@IsString()
@IsNotEmpty()
date: Date;

@ApiProperty()
@IsNotEmpty()
@IsEnum(Type, { message: 'Please enter correct incidence type.' })
incidenceType: Type;

@ApiProperty()
@IsString()
@IsNotEmpty()
description: string;

@ApiProperty()
@IsString()
@IsNotEmpty()
location: string;
}



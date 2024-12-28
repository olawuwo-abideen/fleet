import { IsNotEmpty, IsString, IsDate} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTripDto {

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
routeId: string;

@ApiProperty()
@IsDate()
@IsNotEmpty()
startTime: Date;


@ApiProperty()
@IsDate()
@IsNotEmpty()
endTime: Date;
}



export class UpdateTripDto {

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
routeId: string;

@ApiProperty()
@IsDate()
@IsNotEmpty()
startTime: Date;


@ApiProperty()
@IsDate()
@IsNotEmpty()
endTime: Date;
}




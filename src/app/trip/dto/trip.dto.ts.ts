import { IsNotEmpty, IsString, IsDate, IsEnum, IsUUID} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TripStatus } from 'src/shared/schemas/trip.schema';

export class CreateTripDto {

@ApiProperty({
required: true,
description: 'The vehicle id',
example: '67b08a263eed037c0bf9b75e',
})
@IsUUID()
@IsNotEmpty()
vehicleId: string;

@ApiProperty({
required: true,
description: 'The driver id',
example: '67b08a263eed037c0bf9b75e',
})
@IsUUID()
@IsNotEmpty()
driverId: string;


@ApiProperty({
required: true,
description: 'The trip start date',
example: '2025-01-01T08:00:00.000Z',
})
@IsDate()
@IsNotEmpty()
startTime: Date;


}



export class UpdateTripDto {

@ApiProperty({
required: true,
description: 'The vehicle id',
example: '67b08a263eed037c0bf9b75e',
})
@IsString()
@IsNotEmpty()
vehicleId: string;

@ApiProperty({
required: true,
description: 'The driver id',
example: '67b08a263eed037c0bf9b75e',
})
@IsString()
@IsNotEmpty()
driverId: string;


@ApiProperty({
required: true,
description: 'The trip start date',
example: '2025-01-01T08:00:00.000Z',
})
@IsDate()
@IsNotEmpty()
startTime: Date;




}



export class UpdateTripStatusDto {


@ApiProperty({
required: true,
description: 'The trip end date ',
example: '13/5/2025',
})
@IsDate()
@IsNotEmpty()
endTime: Date;


@ApiProperty({
required: true,
description: 'The trip status ',
example: '13/5/2025',
})
@IsEnum(TripStatus)
@IsNotEmpty()
tripStatus: TripStatus;



}
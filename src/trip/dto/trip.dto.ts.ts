import { IsNotEmpty, IsString, IsDate} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTripDto {

@ApiProperty({
required: true,
description: 'The vehicle id',
example: 'huds5wqy7wow',
})
@IsString()
@IsNotEmpty()
vehicleId: string;

@ApiProperty({
required: true,
description: 'The driver id',
example: 'w897tcfcsjsns',
})
@IsString()
@IsNotEmpty()
driverId: string;

@ApiProperty({
required: true,
description: 'The route id',
example: 'wuhwyeuhe262ss',
})
@IsString()
@IsNotEmpty()
routeId: string;

@ApiProperty({
required: true,
description: 'The trip start date',
example: '12/5/2025',
})
@IsDate()
@IsNotEmpty()
startTime: Date;


@ApiProperty({
required: true,
description: 'The trip end date ',
example: '13/5/2025',
})
@IsDate()
@IsNotEmpty()
endTime: Date;

}



export class UpdateTripDto {

@ApiProperty({
required: true,
description: 'The vehicle id',
example: 'huds5wqy7wow',
})
@IsString()
@IsNotEmpty()
vehicleId: string;

@ApiProperty({
required: true,
description: 'The driver id',
example: 'w897tcfcsjsns',
})
@IsString()
@IsNotEmpty()
driverId: string;

@ApiProperty({
required: true,
description: 'The route id',
example: 'wuhwyeuhe262ss',
})
@IsString()
@IsNotEmpty()
routeId: string;

@ApiProperty({
required: true,
description: 'The trip start date',
example: '12/5/2025',
})
@IsDate()
@IsNotEmpty()
startTime: Date;


@ApiProperty({
required: true,
description: 'The trip end date ',
example: '13/5/2025',
})
@IsDate()
@IsNotEmpty()
endTime: Date;

}




import { IsNotEmpty, IsString, IsDate} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTripDto {

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
description: 'The route id',
example: '67b08a263eed037c0bf9b75q',
})
@IsString()
@IsNotEmpty()
routeId: string;

@ApiProperty({
required: true,
description: 'The trip start date',
example: '2025-01-01T08:00:00.000Z',
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
example: '67b08a263eed037c0bf9b75e',
})
@IsString()
@IsNotEmpty()
vehicleId: string;


@ApiProperty({
required: true,
description: 'The route id',
example: '67b08a263eed037c0bf9b75q',
})
@IsString()
@IsNotEmpty()
routeId: string;

@ApiProperty({
required: true,
description: 'The trip start date',
example: '2025-01-01T08:00:00.000Z',
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




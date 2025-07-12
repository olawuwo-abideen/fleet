import { IsNotEmpty, IsInt,isDate, IsString, IsEmpty, IsUUID, IsDateString} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFuelDto {

@ApiProperty({
required: true,
description: 'The vehicle id',
example: '67b089dc3eed037c0bf9b758',
})
@IsUUID()
@IsNotEmpty()
vehicleId: string;

@ApiProperty({
required: true,
description: 'The date of purchase',
example: '2025-01-01T08:00:00.000Z',
})
@IsDateString()
@IsNotEmpty()
date: Date;

@ApiProperty({
required: true,
description: 'The fuel litres in number',
example: '2',
})
@IsInt()
@IsNotEmpty()
litres: number;

@ApiProperty({
required: true,
description: 'The fuel price per litres',
example: '1000',
})
@IsInt()
@IsNotEmpty()
pricePerLitre: number;

@ApiProperty({
required: true,
description: 'The fuel total cost',
example: '20000',
})
@IsInt()
@IsNotEmpty()
cost: number;

}




export class UpdateFuelDto {

@ApiProperty({
required: true,
description: 'The vehicle id',
example: '67b089dc3eed037c0bf9b758',
})
@IsString()
@IsNotEmpty()
vehicleId: string;

@ApiProperty({
required: true,
description: 'The date of purchase',
example: '2025-01-01T08:00:00.000Z',
})
@IsDateString()
@IsNotEmpty()
date: Date;

@ApiProperty({
required: true,
description: 'The fuel litres in number',
example: '2',
})
@IsInt()
@IsNotEmpty()
litres: number;

@ApiProperty({
required: true,
description: 'The fuel price per litres',
example: '1000',
})
@IsInt()
@IsNotEmpty()
pricePerLitre: number;

@ApiProperty({
required: true,
description: 'The fuel total cost',
example: '20000',
})
@IsInt()
@IsNotEmpty()
cost: number;


}

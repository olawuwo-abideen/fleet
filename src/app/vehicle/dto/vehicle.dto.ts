import {
IsEnum,
IsInt,
IsNotEmpty,
IsString,
} from 'class-validator';
import { Type } from '../schemas/vehicle.schema';
import { ApiProperty } from '@nestjs/swagger';

export class CreateVehicleDto {

@ApiProperty({
required: true,
description: 'The vehicle make',
example: 'Toyota',
})
@IsString()
@IsNotEmpty()
make: string;

@ApiProperty({
required: true,
description: 'The vehicle model',
example: 'Highlander',
})
@IsString()
@IsNotEmpty()
vehicleModel: string;

@ApiProperty({
required: true,
description: 'The vehicle make yaer',
example: '2020',
})
@IsInt()
@IsNotEmpty()
year: number;

@ApiProperty({
required: true,
description: 'The vehicle license plate',
example: 'FST555DW',
})
@IsString()
@IsNotEmpty()
licensePlate: string;

@ApiProperty({
required: true,
description: 'The vehicle identification number',
example: '55191518910182t6289w',
})
@IsString()
@IsNotEmpty()
vin: string;




@ApiProperty({
required: true,
enum:Type,
description: 'The vehicle fuel type',
example: 'Petrol',
})
@IsNotEmpty()
@IsEnum(Type, { message: 'Please enter correct fuel type.' })
fuelType: Type;


}



export class UpdateVehicleDto {

@ApiProperty({
required: true,
description: 'The vehicle make',
example: 'Toyota',
})
@IsString()
@IsNotEmpty()
make: string;

@ApiProperty({
required: true,
description: 'The vehicle model',
example: 'Highlander',
})
@IsString()
@IsNotEmpty()
vehicleModel: string;

@ApiProperty({
required: true,
description: 'The vehicle make yaer',
example: '2020',
})
@IsInt()
@IsNotEmpty()
year: number;

@ApiProperty({
required: true,
description: 'The vehicle license plate',
example: 'FST555DW',
})
@IsString()
@IsNotEmpty()
licensePlate: string;

@ApiProperty({
required: true,
description: 'The vehicle identification number',
example: '55191518910182t6289w',
})
@IsString()
@IsNotEmpty()
vin: string;




@ApiProperty({
required: true,
enum:Type,
description: 'The vehicle fuel type',
example: 'Petrol',
})
@IsNotEmpty()
@IsEnum(Type, { message: 'Please enter correct fuel type.' })
fuelType: Type;


}


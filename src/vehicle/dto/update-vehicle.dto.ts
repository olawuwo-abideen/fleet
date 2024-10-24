import {
  IsEmpty,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { User } from '../../auth/schemas/user.schema';
import { Type } from '../schemas/vehicle.schema';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateVehicleDto {

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
   make: string;

   @ApiProperty()
  @IsString()
  @IsNotEmpty()
   vehicleModel: string;

   @ApiProperty()
  @IsInt()
  @IsNotEmpty()
   year: number;

   @ApiProperty()
  @IsString()
  @IsNotEmpty()
   licensePlate: number;

   @ApiProperty()
  @IsString()
  @IsNotEmpty()
   vin: string;

   @ApiProperty()
  @IsString()
  @IsNotEmpty()
   status: string;



   @ApiProperty()
  @IsNotEmpty()
  @IsEnum(Type, { message: 'Please enter correct fuel type.' })
   fuelType: Type;

  @IsEmpty({ message: 'You cannot pass user id' })
   user: User;

}

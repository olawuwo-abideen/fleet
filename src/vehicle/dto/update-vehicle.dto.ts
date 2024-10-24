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

export class UpdateVehicleDto {

  @IsString()
  @IsNotEmpty()
  readonly make: string;

  @IsString()
  @IsNotEmpty()
  readonly vehicleModel: string;

  @IsInt()
  @IsNotEmpty()
  readonly year: number;

  @IsString()
  @IsNotEmpty()
  readonly licensePlate: number;

  @IsString()
  @IsNotEmpty()
  readonly vin: string;

  @IsString()
  @IsNotEmpty()
  readonly status: string;


  @IsNotEmpty()
  @IsEnum(Type, { message: 'Please enter correct fuel type.' })
  readonly fuelType: Type;

  @IsEmpty({ message: 'You cannot pass user id' })
  readonly user: User;

}

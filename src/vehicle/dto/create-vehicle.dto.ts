import { IsNotEmpty, IsInt,isDate,IsEmpty, IsString} from 'class-validator';
import { User } from '../../auth/schemas/user.schema';

export class CreateVehicleDto {


  @IsString()
  @IsNotEmpty()
  make: string;

  @IsString()
  @IsNotEmpty()
  vehicleModel: string;

  @IsInt()
  @IsNotEmpty()
  year: number;

  @IsString()
  @IsNotEmpty()
  licensePlate: string;

  @IsString()
  @IsNotEmpty()
  vin: string;

  @IsInt()
  @IsNotEmpty()
  status: string;

  @IsInt()
  @IsNotEmpty()
  fuelType: string;

  @IsEmpty({ message: 'You cannot pass user id' })
  readonly user: User;

}


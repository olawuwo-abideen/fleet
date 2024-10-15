import { IsNotEmpty, IsInt,isDate, IsString} from 'class-validator';


export class UpdateVehicleDto {


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

}


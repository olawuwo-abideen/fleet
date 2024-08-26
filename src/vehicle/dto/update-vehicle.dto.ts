import { IsNotEmpty, IsInt, IsDate, IsString} from 'class-validator';


export class UpdateVehicleDto {

  @IsString()
  @IsNotEmpty()
  make: string;

  @IsDate()
  @IsNotEmpty()
  model: Date;

  @IsInt()
  @IsNotEmpty()
  year: number;

  @IsInt()
  @IsNotEmpty()
  vin: string;

  @IsInt()
  @IsNotEmpty()
  licensePlate: string;
}



import { IsNotEmpty, IsInt, IsDate, IsString} from 'class-validator';


export class CreateVehicleDto {

  @IsString()
  @IsNotEmpty()
  make: string;

  @IsDate()
  @IsNotEmpty()
  model: Date;

  @IsString()
  @IsNotEmpty()
  year: string;

  @IsInt()
  @IsNotEmpty()
  vin: string;

  @IsInt()
  @IsNotEmpty()
  licensePlate: string;
}
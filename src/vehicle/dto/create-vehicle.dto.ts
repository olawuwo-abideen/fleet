import { IsNotEmpty, IsInt, IsString} from 'class-validator';


export class CreateVehicleDto {

  @IsString()
  @IsNotEmpty()
  vehicleMaker: string;

  @IsString()
  @IsNotEmpty()
  Model: string;

  @IsInt()
  @IsNotEmpty()
  year: number;

  @IsString()
  @IsNotEmpty()
  vin: string;

  @IsString()
  @IsNotEmpty()
  licensePlate: string;
}
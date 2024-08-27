import { IsNotEmpty, IsInt,isDate, IsString} from 'class-validator';


export class CreateIncidentDto {

  @IsString()
  @IsNotEmpty()
  vehicleId: string;

  @IsString()
  @IsNotEmpty()
  driverId: string;

  @IsString()
  @IsNotEmpty()
  date: string;

  @IsString()
  @IsNotEmpty()
  description: string;

}


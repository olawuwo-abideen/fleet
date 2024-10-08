import { IsNotEmpty, IsInt,isDate, IsString} from 'class-validator';


export class CreateLocationDto {

  @IsString()
  @IsNotEmpty()
  vehicleId: string;

  @IsString()
  @IsNotEmpty()
  timestamp: string;

  @IsInt()
  @IsNotEmpty()
  latitude: number;

  @IsInt()
  @IsNotEmpty()
  longitude: number;

}


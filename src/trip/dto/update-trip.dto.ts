import { IsNotEmpty, IsInt,isDate, IsString} from 'class-validator';


export class UpdateTripDto {

  @IsString()
  @IsNotEmpty()
  vehicleId: string;

  @IsString()
  @IsNotEmpty()
  driverId: string;

  @IsString()
  @IsNotEmpty()
  routeId: string;

  @IsString()
  @IsNotEmpty()
  startTime: string;


  @IsString()
  @IsNotEmpty()
  endTime: string;
}

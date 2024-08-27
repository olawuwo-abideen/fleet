import { IsNotEmpty, IsInt,isDate, IsString} from 'class-validator';


export class CreateMaintenanceDto {

  @IsString()
  @IsNotEmpty()
  vehicleId: string;

  @IsString()
  @IsNotEmpty()
  maintenanceDate: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsInt()
  @IsNotEmpty()
  cost: number;

}


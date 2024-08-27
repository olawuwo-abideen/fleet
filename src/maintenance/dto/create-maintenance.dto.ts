import { IsNotEmpty, IsInt,isDate, IsString} from 'class-validator';


export class CreateTripDto {

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



// maintenance.dto.ts
export class CreateMaintenanceDto {
    vehicleId: string;
    maintenanceDate: Date;
    description: string;
    cost: number;
  }
  
  export class UpdateMaintenanceDto {
    vehicleId?: string;
    maintenanceDate?: Date;
    description?: string;
    cost?: number;
  }
  
import { IsNotEmpty, IsInt,isDate, IsString} from 'class-validator';


export class CreateFuelDto {

  @IsString()
  @IsNotEmpty()
  vehicleId: string;

  @IsString()
  @IsNotEmpty()
  date: string;

  @IsString()
  @IsNotEmpty()
  quantity: string;

  @IsInt()
  @IsNotEmpty()
  cost: number;

}










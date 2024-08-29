import { IsNotEmpty, IsInt,isDate, IsString} from 'class-validator';


export class CreateReportDto {

  @IsString()
  @IsNotEmpty()
  startDate: string;

  @IsString()
  @IsNotEmpty()
  endDate: string;

  @IsString()
  @IsNotEmpty()
  reportType: string;



}










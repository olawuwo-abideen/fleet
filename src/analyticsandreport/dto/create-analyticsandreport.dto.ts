import { IsNotEmpty, IsString} from 'class-validator';


export class CreateReportDto {

  @IsString()
  @IsNotEmpty()
  startDate: Date;

  @IsString()
  @IsNotEmpty()
  endDate: Date;

  @IsString()
  @IsNotEmpty()
  reportType: string;
  
}










import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString} from 'class-validator';


export class UpdateIncidentDto {

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  vehicleId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  driverId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  date: Date;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

}

  

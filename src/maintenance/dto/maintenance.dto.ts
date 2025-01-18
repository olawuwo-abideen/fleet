  import { ApiProperty } from '@nestjs/swagger';
  import { IsNotEmpty, IsInt, IsString, IsDate} from 'class-validator';


  export class CreateMaintenanceDto {

  @ApiProperty({
  required: true,
  description: 'The vehicel id ',
  example: '673reiojeetfeie',
  })
  @IsString()
  @IsNotEmpty()
  vehicleId: string;

  @ApiProperty({
  required: true,
  description: 'The maintainance day',
  example: '12/5/2025',
  })
  @IsDate()
  @IsNotEmpty()
  maintenanceDate: Date;

  @ApiProperty({
  required: true,
  description: 'The maintainance description',
  example: 'Changing of engine oil',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
  required: true,
  description: 'The maintainance cost',
  example: '50000',
  })
  @IsInt()
  @IsNotEmpty()
  cost: number;

  }



  export class UpdateMaintenanceDto {

  @ApiProperty({
  required: true,
  description: 'The vehicel id ',
  example: '673reiojeetfeie',
  })
  @IsString()
  @IsNotEmpty()
  vehicleId: string;

  @ApiProperty({
  required: true,
  description: 'The maintainance day',
  example: '12/5/2025',
  })
  @IsDate()
  @IsNotEmpty()
  maintenanceDate: Date;

  @ApiProperty({
  required: true,
  description: 'The maintainance description',
  example: 'Changing of engine oil',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
  required: true,
  description: 'The maintainance cost',
  example: '50000',
  })
  @IsInt()
  @IsNotEmpty()
  cost: number;

  }

  import { ApiProperty } from '@nestjs/swagger';
  import { IsNotEmpty, IsInt, IsString, IsDate, IsUUID} from 'class-validator';


  export class CreateMaintenanceDto {

  @ApiProperty({
  required: true,
  description: 'The vehicel id ',
  example: '67b089dc3eed037c0bf9b758',
  })
  @IsUUID()
  @IsNotEmpty()
  vehicleId: string;

  @ApiProperty({
  required: true,
  description: 'The maintainance day',
  example: '2025-01-01T08:00:00.000Z',
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
  example: '67b089dc3eed037c0bf9b758',
  })
  @IsUUID()
  @IsNotEmpty()
  vehicleId: string;

  @ApiProperty({
  required: true,
  description: 'The maintainance day',
  example: '2025-01-01T08:00:00.000Z',
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

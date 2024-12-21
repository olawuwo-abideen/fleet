import { IsNotEmpty, IsInt,isDate, IsString, IsEmpty} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFuelDto {

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  vehicleId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  date: Date;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  quantity: string;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  pricePerLitre: number;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  cost: number;

}




export class UpdateFuelDto {

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  vehicleId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  date: Date;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  quantity: string;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  pricePerLitre: number;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  cost: number;

}

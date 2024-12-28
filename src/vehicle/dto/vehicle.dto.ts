  import {
  IsEmpty,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  } from 'class-validator';
  import { Type } from '../schemas/vehicle.schema';
  import { ApiProperty } from '@nestjs/swagger';

  export class CreateVehicleDto {

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  make: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  vehicleModel: string;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  year: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  licensePlate: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  vin: string;




  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(Type, { message: 'Please enter correct fuel type.' })
  fuelType: Type;


  }



  export class UpdateVehicleDto {

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  make: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  vehicleModel: string;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  year: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  licensePlate: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  vin: string;


  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(Type, { message: 'Please enter correct fuel type.' })
  fuelType: Type;



  }


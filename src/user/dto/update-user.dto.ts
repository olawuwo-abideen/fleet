import { ApiProperty } from '@nestjs/swagger';
import {
    IsMobilePhone,
    IsNotEmpty,
    IsString,
  } from 'class-validator';
  
  export class UpdateUserDto  {
    
    @ApiProperty({
    required: true,
    description: 'The user firstname',
    example: 'Jane',
    })
    @IsNotEmpty()
    @IsString()
    firstName: string;
  
  
    @ApiProperty({
    required: true,
    description: 'The user lastname',
    example: 'Doe',
    })
    @IsNotEmpty()
    @IsString()
    lastName: string;
  
    
    @ApiProperty({
    required: true,
    description: 'The user phonenumber',
    example: '+234555555555',
    })
    @IsNotEmpty()
    @IsMobilePhone()
    phoneNumber: string;


    @ApiProperty({
    required: true,
    description: 'The user address',
    example: 'Lagos',
    })
    @IsNotEmpty()
    @IsString() 
    address: string;
  
  }
  
import {
    IsMobilePhone,
    IsNotEmpty,
    IsString,
  } from 'class-validator';
  
  export class UpdateUserDto  {
    @IsNotEmpty()
    @IsString()
    firstName: string;
  
  
    @IsNotEmpty()
    @IsString()
    lastName: string;
  
    
    @IsNotEmpty()
    @IsMobilePhone()
    phoneNumber: string;


    @IsNotEmpty()
    @IsString() 
    address: string;
  
  }
  
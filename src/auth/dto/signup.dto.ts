import {
    IsEmail,
    IsNotEmpty,
    IsOptional,
    IsString,
    MinLength,
  } from 'class-validator';
  
  export class SignUpDto {
    @IsNotEmpty()
    @IsString()
    readonly firstName: string;

    @IsNotEmpty()
    @IsString()
    readonly lastName: string;
  
    @IsNotEmpty()
    @IsEmail({}, { message: 'Please enter correct email' })
    readonly email: string;
  
    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    readonly password: string;
  

    readonly role: string[];
  }
  
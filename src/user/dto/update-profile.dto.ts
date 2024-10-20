import {
  IsEmail,
  IsMobilePhone,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateProfileDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;


  @IsNotEmpty()
  @IsString()
  lastName: string;

  
  @IsNotEmpty()
  @IsMobilePhone()
  phoneNumber: string;

}

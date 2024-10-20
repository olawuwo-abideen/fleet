import {
  IsEmail,
  IsMobilePhone,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { PasswordMatch } from '../validations/password-match.validation';

export class SignUpDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;


  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsEmail({}, { message: 'Please enter correct email' })
  email: string;

  @IsNotEmpty()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  @MaxLength(20, { message: 'Password must not exceed 20 characters' })
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*-?&])[A-Za-z\d@$!%*-?&]+$/,
    {
      message:
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
    },
  )
  password: string;

  @IsNotEmpty({ message: 'Confirm password is required' })
  @PasswordMatch()
  confirmPassword: string;


  @IsNotEmpty()
  role: string[];

  
  @IsNotEmpty()
  @IsMobilePhone()
  phoneNumber: string;

}

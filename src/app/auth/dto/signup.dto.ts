import {
IsEmail,
IsMobilePhone,
IsNotEmpty,
IsString,
Matches,
MaxLength,
MinLength,
} from 'class-validator';
import { PasswordMatch } from '../../../shared/validations/password-match.validation';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../enums/role.enum';
export class SignUpDto {
    @ApiProperty({
        required: true,
        description: 'The first name of the user',
        example: 'Olawuwo',
      })
@IsNotEmpty()
@IsString()
firstName: string;


@ApiProperty({
    required: true,
    description: 'The last name of the user',
    example: 'Abideen',
  })
@IsNotEmpty()
@IsString()
lastName: string;

@ApiProperty({
    required: true,
    description: 'The user email',
    example: 'abideenolawuwo2000@gmail',
  })
@IsNotEmpty()
@IsEmail({}, { message: 'Please enter correct email' })
email: string;

@ApiProperty({
    required: true,
    description: 'The user password (at least 8 characters)',
    example: 'Password123',
    })
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


@ApiProperty({
    required: true,
    description: 'The user password (at least 8 characters)',
    example: 'Password123',
    })
@IsNotEmpty({ message: 'Confirm password is required' })
@PasswordMatch()
confirmPassword: string;


@ApiProperty({
     enum: ['admin', 'driver'],
    description: 'The status of the user. Allowed values: admin,  user',
    example: 'admin',
  })
@IsNotEmpty()
role: Role;

@ApiProperty({
    required: true,
    description: 'The user phone number',
    example: '+234555555555',
  })
@IsNotEmpty()
@IsMobilePhone()
phoneNumber: string;

}

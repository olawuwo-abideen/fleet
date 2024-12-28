import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { PasswordMatch } from '../validations/password-match.validation';
import { ApiProperty } from '@nestjs/swagger';

export class ResetPasswordDto {

@ApiProperty()
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
@ApiProperty()
@IsNotEmpty()
password: string;

@ApiProperty()
@IsNotEmpty({ message: 'Confirm password is required' })
@PasswordMatch()
confirmPassword: string;

@ApiProperty()
resetToken: string;
}





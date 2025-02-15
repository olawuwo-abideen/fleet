import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { PasswordMatch } from '../../../shared/validations/password-match.validation';
import { ApiProperty } from '@nestjs/swagger';

export class ResetPasswordDto {

    @ApiProperty({
        required: true,
        description: 'The user new password (at least 8 characters)',
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


@ApiProperty({
    required: true,
    description: 'The user confirm new password (at least 8 characters)',
    example: 'Password123',
  })
@IsNotEmpty()
password: string;


@ApiProperty({
    required: true,
    description: 'The user confirm new password (at least 8 characters)',
    example: 'Password123',
  })
@IsNotEmpty({ message: 'Confirm password is required' })
@PasswordMatch()
confirmPassword: string;


@ApiProperty({
    required: true,
    description: 'The user reset password token',
    example: 'tywokqixdxapmquhqrdeqokwugwrdw9wq--=-458hdsgvsfcq5e581f2rd2528y_',
  })
resetToken: string;
}





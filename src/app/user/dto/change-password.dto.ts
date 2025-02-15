  import { IsNotEmpty, Matches, MaxLength, MinLength } from 'class-validator';
  import { PasswordMatch } from 'src/shared/validations/password-match.validation';
  import { ApiProperty } from '@nestjs/swagger';

  export class ChangePasswordDto {
    @ApiProperty({
      required: true,
      description: 'The user current password (at least 8 characters)',
      example: 'Password123',
    })
    @IsNotEmpty({ message: 'Current password is required' })
  @IsNotEmpty({ message: 'Current password is required' })
  currentPassword: string;

  @ApiProperty({
    required: true,
    description: 'The user new password (at least 8 characters)',
    example: 'Password123',
  })
  @IsNotEmpty({ message: 'New password is required' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  @MaxLength(20, { message: 'Password must not exceed 20 characters' })
  @Matches(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*-?&])[A-Za-z\d@$!%*-?&]+$/,
  {
  message:
  'Password must contain at least one uppercase letter, one lowercase letter, and one number',
  },
  )
  password: string;

  @ApiProperty({
    required: true,
    description: 'The user new password (at least 8 characters)',
    example: 'Password123',
  })
  @IsNotEmpty({ message: 'Confirm password is required' })
  @PasswordMatch()
  confirmPassword: string;
  }
